docker build -t gpsolinski/multi-client:latest -t gpsolinski/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t gpsolinski/multi-server:latest -t gpsolinski/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t gpsolinski/multi-worker:latest -t gpsolinski/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push gpsolinski/multi-client:latest
docker push gpsolinski/multi-client:$SHA
docker push gpsolinski/multi-server:latest
docker push gpsolinski/multi-server:$SHA
docker push gpsolinski/multi-worker:latest
docker push gpsolinski/multi-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/client-deployment client=gpsolinski/multi-client:$SHA
kubectl set image deployments/server-deployment server=gpsolinski/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=gpsolinski/multi-worker:$SHA