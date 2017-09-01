'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const models = require('./models');
const sequelize = require('sequelize');
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res) => {
  models.Todo.findAll().then((results) => {
    res.render('index',{todos: results});
  });
});

app.post('/todoAdd',(req,res) => {
  if (req.body.titleInput == ''){
    res.redirect('/');
  }else{
  models.Todo.create({title: req.body.titleInput,details: req.body.detailsInput})
  .then((result) => {
    res.redirect('/');
    });
  };
});

app.post('/todoDelete/:id',(req,res) => {
  models.Todo.findById(req.params.id).then((todo) => {
    return todo.destroy();
  }).then(() => {
    res.redirect('/');
  });
});

app.post('/edit/:id',(req,res) => {
  models.Todo.findById(req.params.id).then((todo) => {
    res.render('edit',{todo: todo});
  });
});

app.post('/todoEdit/:id',(req,res) => {
  models.Todo.update({title: req.body.titleEdit,details: req.body.detailsEdit},{where: {id: req.params.id}})
  .then(function(todo){
    res.redirect('/');
  });
});


app.listen(3000);
