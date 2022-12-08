# Coriolis Log Viewer #

![screenshot](https://github.com/smiclea/coriolis-log-viewer/blob/master/images/screenshot.png)

## Production Setup ##

1. yarn install --production
2. yarn build
3. yarn start

## Development Setup ##

1. `NODE_MODE='development'`
2. yarn install
3. yarn start

`yarn start` launches the node server and builds the UI. To start the node server without building the UI, use `node server --no-ui`

## Environment Variables ##

```(bash)
PORT=3010
BASENAME=''
NODE_MODE='production'
```

For development, you may instead create a `.env` file to store all the environment variables above, they will be loaded when running `yarn start`.

The `./env.js` file holds the default values for each of these variables.

- PORT: the port on which to run the node server
- BASENAME: the basename URL path of the licensing app (empty string means the URL of the application is at the root of the website's URL)
- NODE_MODE: specify whether to configure the server for development or production


## Run in Docker container ##
To build the docker image:
```(bash)
docker build --pull --rm -f "Dockerfile" -t coriolislogviewer:latest "."
```

Create and start the container from image:
```(bash)
docker create --name coriolis-log-viewer --network host coriolislogviewer:latest
docker start coriolis-log-viewer
```

To get access information:
```(bash)
docker logs coriolis-log-viewer
```
output should contain:
```
Server is available at http://localhost:3020
```
