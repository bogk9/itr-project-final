const express = require("express");
const bodyParser = require("body-parser");
const algoliasearch = require('algoliasearch')
const cors = require("cors");
const path = require("path");
const controller = require('./controllers/user.controller');
const algolia = require('./libs/algolia')
const PORT = process.env.PORT || 3001;
const publicPath = path.join(__dirname, "..", "build");
const app = express();
var corsOptions = {
  origin: "http://localhost:" + PORT.toString(),
};

algolia();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
