const express = require('express');
const path = require('path');
const fs = require("fs")
const dbData = require('../db/db.json');

// const api = require('./routes/index.js');


const PORT = process.env.port || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.get('/api/notes')
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);

app.post('/api/notes', (req,res) => {
    let db = fs.readFileSync('../db/db.json');
    db = JSON.parse(db)
    res.json(db);

    let inputNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(),
    };
    db.push(userNote)
    fs.writeFileSync('../db/db.json', JSON.stringify(db));
    res.json(db);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);