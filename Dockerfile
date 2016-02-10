FROM node:4.3.0

MAINTAINER Ricardo Sanchez Gregorio "me@richnologies.io"

RUN npm install -g pm2 && npm install -g gulp

ENV PORT=3000
VOLUME ["/app"]
ADD start /start
RUN chmod 755 /start
CMD ["/start"]

EXPOSE 3000
