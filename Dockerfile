# Create image based on the official Node 6 image from dockerhub
FROM node:6

ARG MAIL_PASSWORD=local
ENV MAIL_PASSWORD ${MAIL_PASSWORD}
ARG REPO_OWNER=local
ENV REPO_OWNER ${REPO_OWNER}
ARG REPO_USERNAME=local
ENV REPO_USERNAME ${REPO_USERNAME}
ARG REPO_PASSWORD=local
ENV REPO_PASSWORD ${REPO_PASSWORD}

# Basics
RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get install -y supervisor git vim

# RUN git clone https://gitlab.com/canaantt/frontEnd-VueJS.git
# Create a directory where our app will be placed
RUN mkdir server
COPY package*.json ./

# Install dependecies
RUN npm install
# RUN npm install pm2 -g
# RUN npm install http-server -g
# COPY /dist .
COPY /server server
# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 3000 8080
# CMD ["/usr/bin/supervisord"]
CMD ["node", "server/app.js"]