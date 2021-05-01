var express = require('express');
var router = express.Router();
const request = require('request');
const token = process.env.GITHUB_TOKEN;
const rootURL = 'https://api.chucknorris.io/jokes/';

/* GET home page. */
router.get('/', function(req, res) {
  const category = req.query.category;
  const options = {
    url: `${rootURL}random?category=${category}`,
    headers: {
      'User-Agent': 'samrevanoor',
      Authorization: `token ${token}`
    }
  };
  request(options, function(err, response,body){
    console.log(`category: ${category}`);
    const jokeData = JSON.parse(body);
    res.render('index', { categories:["dev", "music"], jokeData });
  })
});

module.exports = router;
