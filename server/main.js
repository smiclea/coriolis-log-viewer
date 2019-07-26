// @flow

import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import router from './api/router'
import env from '../env'

const app = express()
const PORT = env.port

app.use(bodyParser.json())
app.use(cookieParser())

if (env.nodeMode === 'development' && !process.argv.find(a => a === '--no-ui')) {
  require('./dev')(app)
}

// Write file to disk with process env variables, so that the client code can read
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}
fs.writeFileSync('./dist/env.js', `window.env = {
  NODE_MODE: '${env.nodeMode}',
}`)

app.use(express.static('dist'))
app.use('/api', router)

if (env.nodeMode === 'development') {
  // $FlowIgnore
  app.use((req, res) => {
    res.redirect(`${req.baseUrl}/#${req.url}`)
  })
} else {
  // $FlowIgnore
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`\x1b[36mServer is available at http://localhost:${PORT}\x1b[0m`)
})
