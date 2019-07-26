// @flow

export default {
  port: process.env.PORT || 3020,
  nodeMode: process.env.NODE_MODE || 'production',
  basename: process.env.BASENAME || '',
}
