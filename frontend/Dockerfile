FROM node:16.17.0-bullseye-slim
WORKDIR /frontend/
EXPOSE 3000
COPY ./package.json /frontend/
RUN yarn install
COPY . .

CMD ["yarn", "run", "dev"]
