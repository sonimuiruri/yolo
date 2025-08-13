#  Winfrey-explanation.md

 1. Build and tag your Docker images, then push them to Dockerhub
   -i had initially built and pushed my Docker images to Dockerhub in ip 2 but i still re-did it just to be sure

3. Create a DigitalOcean Kubernetes cluster (DOKS):

   ```bash
   doctl kubernetes cluster create <> --region <REGION> --node-pool "name=pool1;size=s-2vcpu-4gb;count=3"
   ```

4. Make a `manifests/` folder and add these YAML files:

   * `frontend-deployment.yaml`
   * `backend-deployment.yaml`
   * `mongodb-statefulset.yaml`
   * `frontend-loadbalancer.yaml`
   * `backend-clusterip.yaml`
   * `mongodb-headless.yaml`
   * `pv-claim.yaml` (if using a static PV) or rely on `StorageClass` in the StatefulSet.

5. Use **Deployments** for frontend and backend:

   * Set `replicas` and resource limits.
   * Use clear labels and selectors.
   * Reference your pushed Docker Hub images.

6. Use a **StatefulSet** for MongoDB:

   * Add a headless Service (`ClusterIP: None`).
   * Include `volumeClaimTemplates` for persistent storage.

7. Persistent storage on DigitalOcean:

   * Use DigitalOcean Block Storage with the default `StorageClass` (`do-block-storage`).
   * Ensure PVCs are bound so data survives restarts.

8. Expose services:

   * Frontend → `LoadBalancer` for public access.
   * Backend → `ClusterIP` for internal use.
   * MongoDB → headless Service for pod discovery.

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

10. Check resources:

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

12. Git workflow:

    * Use branches for changes.
    * Commit often with clear messages.
    * Keep a clean structure with `README.md` and `explanation.md`.

13. Naming & tagging:

    * Use versioned tags (e.g., `v1`, `v1.1`).
    * Avoid `latest`.

14. README should have:

    * Deployment steps.
    * Manifest list.
    * Docker Hub image names.
    * Live app URL (`http://<EXTERNAL-IP>:<PORT>`).

15. Push to GitHub with manifests, Dockerfiles, README, and this explanation.
