
const express = require('express');
const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');
const app = express();
// const path = require('path');
// const dbData = require('./db/db.json');


const PORT = process.env.port || 3001;
// const api = require('./routes/index.js');

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});