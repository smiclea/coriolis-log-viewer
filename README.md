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

```
PORT=3010
BASENAME=''
NODE_MODE='production'
```

For development, you may instead create a `.env` file to store all the environment variables above, they will be loaded when running `yarn start`.

The `./env.js` file holds the default values for each of these variables.

- PORT: the port on which to run the node server
- BASENAME: the basename URL path of the licensing app (empty string means the URL of the application is at the root of the website's URL)
- NODE_MODE: specify whether to configure the server for development or production