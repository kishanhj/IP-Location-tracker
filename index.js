const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require("express-handlebars");
const port = process.env.PORT||3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use('/public', static);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

configRoutes(app);
app.listen(port, () => {
  console.log('routes are running on http://localhost:3000');
});
