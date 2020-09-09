const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const register_routes = require('./routes/register_routes');

const app = express();
const port = 3000;


mongoose.connect(`mongodb+srv://${config.db.username}:${config.db.password}@notifiercluster.6ixv2.mongodb.net/${config.db.name}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log("Could not connect do database");
});

db.once('open', () => {
  console.log("Successfully connected to database");
});

app.use('/register', register_routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});