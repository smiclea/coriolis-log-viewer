// @flow

import express from 'express'

import LogViewApi from './LogViewApi'

const router = express.Router()

// $FlowIgnore
router.get('/', (req, res) => {
  res.json({ version: '1.0.0' })
})

LogViewApi(router)

export default router
