FROM node
WORKDIR /myapp
COPY . .
RUN npm install
CMD [ "npm","run dev" ]