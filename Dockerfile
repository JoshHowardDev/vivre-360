FROM node:18-alpine
WORKDIR /dist
COPY . .
RUN npm install
RUN npm run build
EXPOSE 1210
ENTRYPOINT [ "node", "--es-module-specifier-resolution=node", "dist/server/server.js" ]