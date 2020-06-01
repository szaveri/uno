# pull official base image
FROM node:12.16.3

# set working directory
WORKDIR /app

RUN rm -rf build/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
RUN npm install -g --silent nodemon

# start app
CMD ["npm", "run", "serve"]