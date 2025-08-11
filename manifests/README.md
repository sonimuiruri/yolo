##  My Deployment using DigitalOcean Kubernetes platform


### 1 Create a DigitalOcean Kubernetes Cluster
- Go to the [DigitalOcean Dashboard](https://cloud.digitalocean.com/kubernetes/clusters)  
- Create a cluster

---

### 2 Connect kubectl to Your Cluster
```bash

doctl kubernetes cluster kubeconfig save <winfrey-ip4 > 
```
Verify the connection:

```bash

kubectl get nodes

```
---


### 3 Push Docker Images to Docker Hub
Make sure your backend and frontend images are built and pushed:

```bash

# Backend
docker build -t winfr3y/winfrey-backend-ip:v1 backend/
docker push winfr3y/winfrey-backend-ip:v1

# Frontend
docker build -t winfr3y/winfrey-client-ip:v1 frontend/
docker push winfr3y/winfrey-client-ip:v1

```

---  

### 4 Apply Kubernetes Manifests
Apply all manifests in the manifests folder:

```bash
kubectl apply -f manifests/
```
### 5 Verify Resources
Check that all pods and services are running :
```bash
kubectl get pods
kubectl get svc
```

--- 

### 6 Get the Public IP
Find the EXTERNAL-IP for the frontend service:

```bash

kubectl get svc frontend
```

My output :

  
NAME                TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)        AGE
winfrey-client-ip   LoadBalancer   10.245.125.45   129.212.198.61   80:31775/TCP   23s


[http://129.212.198.61](http://129.212.198.61)<<<<<<OPEN to access my public url





