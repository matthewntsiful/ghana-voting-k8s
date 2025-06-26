from flask import Flask, request, render_template
import redis
import json
import os

app = Flask(__name__)
r = redis.Redis(host=os.environ.get('REDIS_HOST', 'redis'), port=6379, decode_responses=True)

# Load parties from shared config
with open('/config/parties.json', 'r') as f:
    parties = json.load(f)

@app.route('/')
def index():
    return render_template('index.html', parties=parties)

@app.route('/vote', methods=['POST'])
def vote():
    party_code = request.form['vote']
    party_name = parties.get(party_code, {}).get('name', 'Unknown Party')
    r.publish('ghana_votes', party_code)
    return render_template('confirmation.html', party_name=party_name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)