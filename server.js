
const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs")
// const dbData = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.get('/api/notes', (req,res) => {
//     // res.json(notesArray.slice(1));
//   });

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// function createNewNote (body, notesArray) {
//     const newNote = body;
//     if(!Array.isArray(notesArray))
//        notesArray=[]
//        if(notesArray.length === 0)
//           notesArray.push(0);
  
//           body.id = notesArray[0]
//           notesArray[0]++;
  
//           notesArray.push(newNote);
//             fs.writeFileSync(path.join(__dirname, '.db/db.json'), JSON.stringify(notesArray, null, 2)
//           );
//             return newNote;
//   }

// activity 17 
app.post('/api/notes', (req,res) => {
    // const newNote = createNewNote(req.body, notesArray);
    // res.json(newNote);
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    
    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        // key & value - you can just write one word if it's the same.
        const userNote = {
            title,
            text
        };
    //   activity 20
// Obtain existing reviews
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
                parsedNotes.push(userNote);

                // Write updated reviews back to the file
                fs.writeFile('./db/db.json',JSON.stringify(parsedNotes, null, 2),
                (writeErr) =>
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated !')
                );
            }
        });



        const response = {
            status: 'success',
            body: userNote,
        };
        
        console.log(response);
        res.status(201).json(response);
        } else {
        res.status(500).json('Error in posting review');
        }
});


const PORT = process.env.port || 3001;
// const api = require('./routes/index.js');

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});