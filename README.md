# Ghana Voting System - Kubernetes Microservices

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

A cloud-native voting system for Ghana, built with Python, Node.js, and C# microservices, orchestrated by Kubernetes. The system allows citizens to vote for political parties and view real-time results.

---

## 📸 Screenshots

### Voting App
![Vote App Screenshot](screenshots/vote-app.png)
*Placeholder: Add a screenshot of the voting interface here.*

### Results Dashboard
![Results App Screenshot](screenshots/results-app.png)
*Placeholder: Add a screenshot of the results dashboard here.*

### Worker Service
![Worker Screenshot](screenshots/worker-app.png)
*Placeholder: Add a screenshot of the worker logs or dashboard here.*

---

## 🏗️ Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Vote App  │    │ Result App  │    │   Worker    │
│  (Python)   │    │ (Node.js)   │    │    (C#)     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
         ┌─────────┐              ┌──────────┐
         │  Redis  │              │PostgreSQL│
         │ (Queue) │              │   (DB)   │
         └─────────┘              └──────────┘
```

- **Vote App**: Python Flask frontend for casting votes
- **Result App**: Node.js dashboard for real-time results
- **Worker**: C# .NET service processing votes from Redis to PostgreSQL
- **Redis**: Message queue
- **PostgreSQL**: Persistent storage

---

## 🚀 Quick Start

### Prerequisites
- Kubernetes cluster (local or cloud)
- kubectl configured
- Docker (for building images)
- NGINX Ingress Controller

### Deployment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ghana-voting-k8s
   ```

2. **Build and push images**
   ```bash
   # Build and push vote app
   cd vote && docker build -t <your-dockerhub>/vote:latest . && docker push <your-dockerhub>/vote:latest
   # Build and push result app
   cd ../result && docker build -t <your-dockerhub>/result:latest . && docker push <your-dockerhub>/result:latest
   # Build and push worker
   cd ../worker && docker build -t <your-dockerhub>/worker:latest . && docker push <your-dockerhub>/worker:latest
   ```

3. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f manifests/
   ```

4. **Access the apps**
   - Add to /etc/hosts:
     ```bash
     echo "127.0.0.1 vote.local worker.local" | sudo tee -a /etc/hosts
     ```
   - Vote app: http://vote.local/vote
   - Results app: http://vote.local/results
   - Worker health: http://worker.local/

---

## 📁 Project Structure

```
ghana-voting-k8s/
├── config/                 # Configuration files
├── db-init/               # Database initialization
├── manifests/             # Kubernetes manifests
├── result/                # Node.js results app
├── screenshots/           # App screenshots
├── vote/                  # Python Flask voting app
└── worker/                # C# worker service
```

---

## 🛠️ Development & Troubleshooting

- Build and run each service locally as described above
- Use `kubectl logs` to view logs for each deployment
- Use `kubectl get all -n vote-app` to check resource status
- For Ingress issues, check the NGINX Ingress Controller and use `kubectl describe ingress ...`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.