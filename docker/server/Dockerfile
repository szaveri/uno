FROM node:12.16.3

WORKDIR /server

# add `/app/node_modules/.bin` to $PATH
ENV PATH /server/node_modules/.bin:$PATH

RUN npm install -g nodemon

CMD ["npm", "run", "devStart"]