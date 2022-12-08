from ubuntu:20.04

WORKDIR /root

RUN apt-get update && apt-get install -y curl gnupg
RUN curl --silent --location https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

WORKDIR /root/coriolis-log-viewer

ADD ./ .

RUN yarn install --production
RUN yarn build
ENTRYPOINT [ "yarn", "start" ]
EXPOSE 3020
