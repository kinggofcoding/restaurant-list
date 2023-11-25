const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results
const cssIndex = '/stylesheets/index.css'
const cssShow = '/stylesheets/show.css'


app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurants, cssPath: cssIndex })
})


app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
  })