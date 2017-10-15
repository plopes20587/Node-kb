const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check conncection
db.once('open', function(){
  console.log('Connected to mongodb');
});

// Check for DB errors
db.on('error', function(){
  console.log(err);
});

// Init App
const app = express();

// Bring in models
let Article = require('./models/article');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
//parse application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));


// Home Route
app.get('/', function(req,res) {
  Article.find({}, function(err, articles) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
  /*let articles = [
    {
      id: 1,
      title: 'Article one',
      author: 'Pat Lopes',
      body: 'This is article one'
    },
    {
      id: 2,
      title: 'Article two',
      author: 'John Doe',
      body: 'This is article two'
    },
    {
      id: 3,
      title: 'Article three',
      author: 'Jenn Sally',
      body: 'This is article three'
    }
  ];*/

});

// Get single article
app.get('/article/:id', function(req,res){
  Article.findById(req.params.id, function(err, article){
    res.render('article', {
      article: article
    });
  });
});


// Add Route
app.get('/articles/add', function(req,res){
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Add submit POST Route
app.post('/articles/add', function(req, res){
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err){
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Start server
app.listen(3000, function () {
  console.log('Server started on port 3000....');
});
