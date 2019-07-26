// @flow

export default (router: any) => {
  router.get('/log', async (req, res) => {
    res.json({ log: true })
  })
}
