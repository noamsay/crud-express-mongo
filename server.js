const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs')
//res.render(view, locals)
var db;

MongoClient.connect('mongodb://heroku_914w9hqk":heroku_914w9hqk@ds249503.mlab.com:49503/heroku_914w9hqk', (err, client) => {
  // ... start the server
  if (err) return console.log(err)
  db = client.db('star-wars-quotes')

  // app.listen(3000, function() {
  // console.log('listening on 3000')
  // })

})

console.log('May Node be with you');

app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html')
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

// app.post('/quotes', (req, res) => {
//   console.log('Hellooooooooooooooooo!')
// })

app.post('/quotes', (req, res) => {
  // console.log(req.body)
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })

  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
    // send HTML file populated with quotes here
  })
})
