var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const API_KEY = process.env.OWN_API_KEY;

router.get('/movies', (req, res) => {

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
 .then(response => response.json())
 .then(data => {
    console.log(data);
   res.json({ movies: data.results });
 });
});


module.exports = router;
