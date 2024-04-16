const express = require('express');
const app = express();
const port = 8080;
const knex = require("knex")(require("./knexfile.js")["development"]);

app.get('/', (req, res) => {
  res.status(200).json("hello from route")
})

app.get('/users', function(req, res){
  knex('users')
  .select('*')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
      message:
        'users not available'
    })
  )
})

app.get('/items', function(req, res){
  knex('items')
  .select('*')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
      message:
        'items not available'
    })
  )
})

app.get('/items/:userid', (req,res) => {
  const {userid} = req.params;
  knex('items')
  .select('*')
  .where('UserId', userid)
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
      message:
        'user items not available'
    })
  )
})

app.listen(port, () => console.log(`express server listening on port ${port}`))