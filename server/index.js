const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

const scrapers = require('./scrapers')
const db = require('./db')




app.use(express.json())


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// https://www.youtube.com/channel/UCRLEADhMcb8WUdnQ5_Alk7g

// app.use(cors())
app.get('/creators', async (req, res) => {
  const creators = await db.getAllCreators()
  res.send(creators)
})

app.post('/creators', async (req, res) => {
  const channelData = await scrapers.scrapChannel(req.body.channelURL)
  if (channelData) {
    const creators = await db.insertCreator(channelData.name, channelData.avatarURL, req.body.channelURL)
    res.send(creators)
  }

})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})