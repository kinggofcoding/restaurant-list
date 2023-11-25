const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results
const cssIndex = '/stylesheets/index.css'
const cssShow = '/stylesheets/show.css'

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  const keyword = req.query.keyword?.trim()
  const matchedRestaurants = keyword
    ? restaurants.filter((restaurant) =>
        Object.values(restaurant).some((property) => {
          if (typeof property === 'string') {
            return property.toLowerCase().includes(keyword.toLowerCase())
          }
          return false
        })
      )
    : restaurants
  res.render('index', { restaurants: matchedRestaurants, cssPath: cssIndex, keyword })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
