# Kubernetes & Docker demo

Run a kubernetes cluster locally

# Outline

- Create a simple node/express app
    - `package.json`
    - `index.js`
- Put the node app into a docker container
    -  `Dockerfile`
    -  `.dockerignore`
- Run the docker container on a Kubernetes cluster
    -  `kube/app.yaml` 

# Dockerising the Node app

See https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

Create the `Dockerfile` and `.dockerignore` files
\
\
Build the docker image
Use the `-t` flag to set a tag
```
docker build . -t seif/kubernetes-day
```
\
See the image
```
docker images
```
\
Run the image
```
docker run -p 3001:3001 -d seif/kubernetes-day
```
`-d` runs in detached mode  (so it runs in the background)  
`-p` to redirect public port to private port

\
The container is now running. To list containers:
``` 
docker ps
```
You should now be able to make requests to port 3001:
```console
$ curl localhost:3001/
Hello there!
```
\
Shutdown the image:
```
docker kill <container id>
```
You can find the container id via `docker ps`. You only have to type the first three characters.

And now it should no longer work:
```console
% curl localhost:3001/
curl: (7) Failed to connect to localhost port 3001: Connection refused
```

# Running it with Kubernetes

See:
- https://birthday.play-with-docker.com/kubernetes-docker-desktop/
- https://learnk8s.io/deploying-nodejs-kubernetes/


Create the `kube/app.yaml` file 

Enable Kubernetes in Docker Desktop settings. This will also install `kubectl`

To run the app, `apply` the yaml manifest
```
kubectl apply -f kube
```

Pods will now be created. You can see the pods by:
```console
% kubectl get pods 
NAME                          READY   STATUS    RESTARTS   AGE
simple-app-74f7455684-p4gcp   1/1     Running   0          4s
simple-app-74f7455684-wsrzx   1/1     Running   0          3s
```

The app is now running, and you can access it via the correct port. In this case, in the yaml, we set the `targetPort` to `3001` as our Node app listens to that port, then define the `nodePort` as `30005` (must be between 30000-32767 by default ). 

So now we can access our app locally on port 30005:

```console
% curl localhost:30005/
Hello there! 
```
\
To shutdown the app:
```
kubectl delete -f kube
```
