var express = require('express');
var mongoose = require('mongoose')
var userRoutes = require("./routes/user.js")
var employeeRoutes = require("./routes/employee.js")

const SERVER_PORT = 8080
const DB_CONNECTION_STRING = "mongodb+srv://admin:root@cluster0.zs62fly.mongodb.net/comp123_assignment1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var app = express();
var api = express();

app.use(express.json())
app.use(express.urlencoded())

api.use("/user", userRoutes)
api.use("/emp", employeeRoutes)

app.use("/api/v1/", api);

app.get("/api/v1", (req, res) =>{
  res.status(200).send('Hello World!');
});

app.listen(SERVER_PORT, ()=> {
  console.log(`App is running on ${SERVER_PORT}`);
});
