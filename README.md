# Ghana Voting App - Kubernetes

Kubernetes deployment of the Ghana Voting Application.

## Images

Using Docker Hub images:
- matthewntsiful/vote:latest
- matthewntsiful/result:latest
- matthewntsiful/worker:latest

## Deploy All at Once

```bash
kubectl apply -f manifests/
```

## Check Status

```bash
kubectl get pods -n ghana-voting
kubectl get svc -n ghana-voting
```

## Cleanup

```bash
kubectl delete namespace ghana-voting
```