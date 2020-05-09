var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/subscriptionDB");

const db = mongoose.connection;

db.once("open", () => console.log("Connecting to subscriptionDB succeeded!!!"));
