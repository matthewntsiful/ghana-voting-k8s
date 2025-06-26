using StackExchange.Redis;
using Npgsql;
using System.Text.Json;
using System.IO;

// Load party configuration
var partiesJson = File.ReadAllText("/config/parties.json");
var parties = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(partiesJson);

// Get environment variables
var redisHost = Environment.GetEnvironmentVariable("REDIS_HOST") ?? "redis";
var pgHost = Environment.GetEnvironmentVariable("POSTGRES_HOST") ?? "db";
var pgUser = Environment.GetEnvironmentVariable("POSTGRES_USER") ?? "postgres";
var pgPass = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD") ?? "postgres";
var pgDb = Environment.GetEnvironmentVariable("POSTGRES_DB") ?? "postgres";

// Connect to Redis
var redis = ConnectionMultiplexer.Connect(redisHost);
var sub = redis.GetSubscriber();

// Connect to Postgres
var connString = $"Host={pgHost};Username={pgUser};Password={pgPass};Database={pgDb}";
var pgConn = new NpgsqlConnection(connString);
pgConn.Open();

// Subscribe to Ghana votes
sub.Subscribe("ghana_votes", (channel, partyCode) => {
    try
    {
        using var cmd = new NpgsqlCommand(
            "UPDATE votes SET count = count + 1 WHERE party_code = @partyCode",
            pgConn
        );
        cmd.Parameters.AddWithValue("partyCode", partyCode.ToString());
        cmd.ExecuteNonQuery();
        Console.WriteLine($"Processed vote for: {partyCode}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error processing vote: {ex.Message}");
    }
});

Console.WriteLine("Worker started. Listening for Ghana votes...");
await Task.Delay(-1); // Keep running