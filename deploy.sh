#!/bin/bash

# 更新代码
echo "Updating code from git..."
git pull

# 删除所有的Docker容器
echo "Removing Docker containers..."
docker rm -f full-stack-frontend-1 full-stack-backend-1

# 删除所有的Docker镜像
echo "Removing Docker images..."
docker rmi -f full-stack-frontend:latest full-stack-backend:latest

echo "Cleanup completed."

docker compose up -d