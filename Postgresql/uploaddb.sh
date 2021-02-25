docker build -t localtest .
docker run -d --name my-postgres-container -p 5432:5432 localtest