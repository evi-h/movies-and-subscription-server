var express = require("express");
var cors = require("cors");

var moviesRoute = require("./routes/movies");
var membersRoute = require("./routes/members");
var subscriptionsRoute = require("./routes/subscriptions");
var usersRoute = require("./routes/users");

const bodyParser = require("body-parser");

require("./config/databse");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.use("/movies", moviesRoute);
app.use("/members", membersRoute);
app.use("/subscriptions", subscriptionsRoute);
app.use("/users", usersRoute);

app.listen(3100);

module.exports = app;
