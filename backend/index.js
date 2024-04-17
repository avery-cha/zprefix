const express = require('express');
var cors = require('cors')
const app = express();
const port = 8080;
const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(cors())

// app.UseCors(builder =>
//             builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
// app.use((req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://localhost:8080");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
// });

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

app.get('/users/:userid', function(req, res){
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

app.get('/items/:itemid', (req,res) => {
  const {itemid} = req.params;
  knex('items')
  .select('*')
  .where('Id', itemid)
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
      message:
        'individual item not available'
    })
  )
})

//PATCH

app.patch('/update/:itemid', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
  const { Name, Description, Quantity } = req.body;
  const { itemid } = req.params
  let updates = {};
  if(Name) updates.Name = Name
  if(Description) updates.Description = Description
  if(Quantity) updates.Quantity = Quantity
  knex('items')
  .where('Id', itemid)
  .update(updates)
  .then(response => {
    res.status(201).send("updated successfully")
  })
})


//DELETE

app.delete('/remove/:itemid', (req, res) => {
  const { itemid } = req.params;
  knex('items')
  .where('Id', itemid)
  .del()
  .then(deleted => {
    if (deleted) res.status(202).send(`Item ${itemid} deleted`)
    else res.status(404).send(`Item ${itemid} not found`)
  })
})

//POST
app.post('/items/new/:userid', (req, res) => {
  const {UserId} = req.params;
  const { Name, Description, Quantity } = req.body;
  knex('items')
  .insert({ UserId,  Name, Description, Quantity })
  .then(response =>{
    res.status(201).json({ Name, Description, Quantity })
  })
})

app.post('/users/new', (req, res) => {
  const {First, Last, Username, Password} = req.body;
  knex('users')
  .insert({First, Last, Username, Password})
  .then(response => res.status(201).json({First, Last, Username, Password}) )
})


app.listen(port, () => console.log(`express server listening on port ${port}`))