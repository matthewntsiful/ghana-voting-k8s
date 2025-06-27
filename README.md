# Ghana Voting System - Kubernetes Deployment

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

A cloud-native voting application for Ghana's political parties, built with microservices architecture and deployed on Kubernetes. This system allows citizens to vote for their preferred political parties and view real-time results.

## 🏛️ Political Parties Supported

- **NPP** - New Patriotic Party
- **NDC** - National Democratic Congress  
- **CPP** - Convention People's Party
- **PNC** - People's National Convention
- **GFP** - Ghana Freedom Party
- **IND** - Independent Candidates

## 🏗️ Architecture Overview

This application follows a microservices architecture with the following components:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Vote App  │    │ Result App  │    │   Worker    │
│  (Python)   │    │ (Node.js)   │    │    (C#)     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
              ┌─────────────┴─────────────┐
              │                           │
         ┌─────────┐                ┌──────────┐
         │  Redis  │                │PostgreSQL│
         │ (Queue) │                │   (DB)   │
         └─────────┘                └──────────┘
```

### Components

- **Vote App** (Frontend): Python Flask application for casting votes
- **Result App** (Dashboard): Node.js application for viewing results
- **Worker** (Processor): C# .NET application that processes votes from Redis queue to PostgreSQL
- **Redis**: Message queue for vote processing
- **PostgreSQL**: Persistent storage for vote counts

## 📸 Screenshots

### Voting Interface
![Vote App Screenshot](screenshots/vote-app.png)
*Citizens can select their preferred political party and cast their vote*

### Results Dashboard  
![Results App Screenshot](screenshots/results-app.png)
*Real-time voting results with party colors and vote counts*

### Worker Processing
![Worker Screenshot](screenshots/worker-app.png)
*Background worker processing votes and updating the database*

## 🚀 Quick Start

### Prerequisites

- Kubernetes cluster (local or cloud)
- kubectl configured
- Docker (for building custom images)
- NGINX Ingress Controller

### Deployment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ghana-voting-k8s
   ```

2. **Deploy to Kubernetes**
   ```bash
   # Apply all manifests in order
   kubectl apply -f manifests/
   ```

3. **Verify deployment**
   ```bash
   kubectl get pods -n vote-app
   kubectl get services -n vote-app
   ```

4. **Access the application**
   ```bash
   # Add to /etc/hosts
   echo "127.0.0.1 vote.local" | sudo tee -a /etc/hosts
   
   # Access voting: http://vote.local/vote
   # Access results: http://vote.local/results
   ```

## 🔧 Configuration

### Environment Variables

The application uses ConfigMaps and environment variables for configuration:

- `REDIS_HOST`: Redis server hostname
- `POSTGRES_HOST`: PostgreSQL server hostname  
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name

### Party Configuration

Political parties are configured in `config/parties.json`:

```json
{
  "NPP": {"name": "New Patriotic Party", "color": "#0F4CA8"},
  "NDC": {"name": "National Democratic Congress", "color": "#006B3F"}
}
```

## 📁 Project Structure

```
ghana-voting-k8s/
├── config/                 # Configuration files
│   ├── db-config.env       # Database configuration
│   └── parties.json        # Political parties setup
├── db-init/               # Database initialization
│   └── init.sql           # SQL schema and seed data
├── manifests/             # Kubernetes manifests
│   ├── 01-namespace.yaml  # Namespace definition
│   ├── 02-config.yaml     # ConfigMaps
│   ├── 03-parties-config.yaml
│   ├── 04-postgres.yaml   # PostgreSQL deployment
│   ├── 05-redis.yaml      # Redis deployment
│   ├── 06-vote-app.yaml   # Vote application
│   ├── 07-result-app.yaml # Results application
│   ├── 08-worker.yaml     # Worker service
│   ├── 09-worker-service-ingress.yaml
│   └── 10-ingress.yaml    # Ingress configuration
├── vote/                  # Python Flask voting app
│   ├── static/css/        # Stylesheets
│   ├── templates/         # HTML templates
│   ├── app.py            # Main application
│   └── Dockerfile        # Container image
├── result/               # Node.js results app
│   ├── public/           # Static files
│   ├── src/              # Source code
│   ├── server.js         # Main server
│   └── Dockerfile        # Container image
└── worker/               # C# worker service
    ├── Program.cs        # Main worker logic
    ├── Worker.csproj     # Project file
    └── Dockerfile        # Container image
```

## 🛠️ Development

### Building Custom Images

```bash
# Build vote app
cd vote/
docker build -t your-registry/vote:latest .

# Build result app  
cd result/
docker build -t your-registry/result:latest .

# Build worker
cd worker/
docker build -t your-registry/worker:latest .
```

### Local Development

1. **Start dependencies**
   ```bash
   docker run -d --name redis -p 6379:6379 redis:alpine
   docker run -d --name postgres -p 5432:5432 \
     -e POSTGRES_PASSWORD=postgres postgres:13
   ```

2. **Run applications locally**
   ```bash
   # Vote app
   cd vote/
   pip install flask redis
   python app.py

   # Result app
   cd result/
   npm install
   npm start

   # Worker
   cd worker/
   dotnet run
   ```

## 🔍 Monitoring & Troubleshooting

### Check Application Status

```bash
# View all resources
kubectl get all -n vote-app

# Check pod logs
kubectl logs -f deployment/vote-app -n vote-app
kubectl logs -f deployment/result-app -n vote-app  
kubectl logs -f deployment/worker -n vote-app

# Check ingress
kubectl describe ingress vote-results-ingress -n vote-app
```

### Common Issues

1. **Pods not starting**: Check resource limits and node capacity
2. **Database connection issues**: Verify PostgreSQL service and credentials
3. **Redis connection issues**: Ensure Redis service is running
4. **Ingress not working**: Verify NGINX Ingress Controller is installed

## 🔒 Security Considerations

- Database credentials are stored in ConfigMaps (consider using Secrets in production)
- No authentication implemented (add OAuth/OIDC for production)
- Network policies should be implemented for production deployments
- Consider using service mesh for enhanced security

## 📊 Scaling

The application supports horizontal scaling:

```bash
# Scale vote app
kubectl scale deployment vote-app --replicas=5 -n vote-app

# Scale result app
kubectl scale deployment result-app --replicas=3 -n vote-app

# Scale worker (be careful with database connections)
kubectl scale deployment worker --replicas=2 -n vote-app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Ghana Electoral Commission for inspiration
- Kubernetes community for excellent documentation
- Docker for containerization platform

---

**Note**: This is a demonstration application. For production use in actual elections, additional security, audit trails, and compliance measures would be required.