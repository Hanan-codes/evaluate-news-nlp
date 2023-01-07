// var path = require('path')
// const express = require('express')
// const mockAPIResponse = require('./mockAPI.js')
// var bodyParser = require('body-parser')
// var cors = require('cors')
// const dotenv = require('dotenv');
// dotenv.config();

// var json = {
//     'title': 'test json response',
//     'message': 'this is a message 1',
//     'time': 'now'
// }

// const app = express()
// app.use(cors())
// // to use json
// app.use(bodyParser.json())
// // to use url encoded values
// app.use(bodyParser.urlencoded({
//   extended: true
// }))

// //Test .env
// console.log(`Your API key is ${process.env.API_KEY}`);

// app.use(express.static('dist'))

// console.log(JSON.stringify(mockAPIResponse))

// app.get('/', function (req, res) {
//     res.sendFile('dist/index.html')
// })

// app.get('/test', function (req, res) {
//     res.json(mockAPIResponse);
// })



// // designates what port the app will listen to for incoming requests
// app.listen(8081, function () {
//     console.log('Example app listening on port 8081!')
// })

// const API_KEY = process.env.API_KEY;

// Configure the environment variables
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const mockAPIResponse = require('./mockAPI.js')

const MEAN_CLOUD_API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const MEAN_CLOUD_API_KEY = process.env.API_KEY

// Create an instance for the server
const app = express()
// handle cors to avoid cors-origin issue
app.use(cors())
// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Configuring express static directory
app.use(express.static('dist'))
// handle base route
app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/add-url', async (req, res) => {
  const { articleUrl } = req.body
  const meaningCloudUrl = `${MEAN_CLOUD_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${articleUrl}&lang=en`
  try {
    const {
      data: { sentence_list, score_tag, agreement, subjectivity, confidence, irony },
    } = await axios(meaningCloudUrl)
    res.send({
      text: sentence_list[0].text || '',
      score_tag: score_tag,
      agreement: agreement,
      subjectivity: subjectivity,
      confidence: confidence,
      irony: irony,
    })
  } catch (error) {
    console.log(error.message)
  }
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, (error) => {
  if (error) throw new Error(error)
  console.log('Server listening on port 8081!')
})

module.exports = {
  app,
}