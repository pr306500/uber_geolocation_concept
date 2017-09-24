const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
if(process.env.NODE_ENV !== "test"){

  mongoose.connect('mongodb://localhost:27017/uber');

}     
const app = express();
const routes = require('./routes/routes')
const Driver = require('./models/driver');

/* app.use() is used to register the middleware. */

app.use(bodyParser.json())

app.use((err,req,res,next)=>{

res.status(422).send({'error':err.message})


})

routes(app);

module.exports = app;