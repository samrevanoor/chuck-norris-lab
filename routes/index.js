var express = require('express');
var router = express.Router();
const request = require('request');
const token = process.env.GITHUB_TOKEN;
const jokeURL = 'https://api.chucknorris.io/jokes/random?category=';
const categoriesURL = 'https://api.chucknorris.io/jokes/categories/'

router.get('/', function (req, res) {
  request(categoriesURL, function (err, response, categoriesJSON) {
    const categories = JSON.parse(categoriesJSON);
    if (req.query.category) {
      request(jokeURL + req.query.category, function (error, response, jokeJSON) {
        const jokeData = JSON.parse(jokeJSON).value;
        res.render('index', { categories, jokeData, categoryChosen: req.query.category })
      })
    } else {
      res.render('index', { categories, jokeData: null, categoryChosen: null })
    }
  })
})

module.exports = router;
