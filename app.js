var express = require("express");

var moviesRoute = require("./routes/movies");
var membersRoute = require("./routes/members");
var subscriptionsRoute = require("./routes/subscriptions");

const bodyParser = require("body-parser");

require("./config/databse");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.use("/movies", moviesRoute);
app.use("/members", membersRoute);
app.use("/subscriptions", subscriptionsRoute);

app.listen(3000);

module.exports = app;
