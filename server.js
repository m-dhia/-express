const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://4.233.223.134:4200"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Inventaire application." });
});
require("./app/routes/serveur.routes")(app);

// set port and IP, listen for requests
const PORT = process.env.PORT || 3000;
const HOST = '20.19.33.63';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}.`);
});

