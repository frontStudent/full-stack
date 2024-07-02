# 设置基础镜像
FROM node:latest as build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其他文件
COPY . .

# 构建应用
RUN npm run build

# 用nginx来提供前端静态文件
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
