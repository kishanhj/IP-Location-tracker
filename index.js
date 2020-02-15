const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//connecting to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;



app.use('/public', static);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

configRoutes(app);

connection.once('open', ()=>{
  console.log("MongoDB database connection established successfully");
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
