#  Winfrey-explanation.md

 1. Build and tag your Docker images, then push them to Dockerhub
   - I had initially built and pushed my Docker images to Docker Hub in IP 2, but I re-did it to ensure they were up to date for Kubernetes.

3. Create a DigitalOcean Kubernetes cluster (DOKS):
  - Used DigitalOcean as my cloud platform

4. Made a `manifests/` folder and add these YAML files:

   * `frontend-deployment.yaml`
   * `backend-deployment.yaml`
   * `mongodb-statefulset.yaml`
   * `frontend-loadbalancer.yaml`
   * `backend-clusterip.yaml`
   * `mongodb-headless.yaml`
   

5. MongoDB with StatefulSet

- **StatefulSet** ensures stable network identities for MongoDB pods.
- **Headless Service** configured with `ClusterIP: None` for DNS-based pod access.
- **Persistent Storage** via `volumeClaimTemplates`.
- **Storage Class**: `do-block-storage` (DigitalOcean’s default block storage).
- **PVC** was successfully bound, confirming persistence setup:

```bash
kubectl get pvc
mongo-persistent-storage-mongodb-0   Bound   1Gi   RWO   do-block-storage
```


6. Service Exposure

- **Frontend Service** → `LoadBalancer`  
  - **External IP**: `138.197.224.177`  
  - **Port**: `80` (public access to web app)  

- **Backend Service** → `ClusterIP`  
  - Internal only  
  - **Port**: `5000`  

- **MongoDB Service** → `Headless`  
  - Internal DNS resolution for StatefulSet pods  
  - No external exposure  


7. Service exposure:

   * Frontend Service → LoadBalancer

               External IP: 138.197.224.177
               Port: 80

   * Backend Service → ClusterIP

               Internal only, port 5000

   * MongoDB Service → Headless, for internal DNS resolution by StatefulSet



9. Apply manifests in order:

   ```bash
   kubectl apply -f pv-claim.yaml
   kubectl apply -f mongodb-headless.yaml
   kubectl apply -f mongodb-statefulset.yaml
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f backend-clusterip.yaml
   kubectl apply -f frontend-deployment.yaml
   kubectl apply -f frontend-loadbalancer.yaml
   ```

10. Verification:

    ```bash
    kubectl get pods,svc,sts,pvc
    kubectl describe pod <pod-name>
    kubectl logs <pod-name>
    kubectl describe svc <service-name>
    ```

11. Test persistence:

    * Add data in the app.
    * Delete the MongoDB pod.
    * After restart, confirm the data is still there.

12. GitHub & Documentation
   - All manifests and Dockerfiles committed to GitHub.

   - README.md includes:

       * Deployment steps

       * Manifest list

       * Docker Hub image names

       * Live app URL: http://138.197.224.177

   - explanation.md (this file) documents:

        * Deployment logic

        * Storage setup

        *  Service exposure strategy

        * Testing steps