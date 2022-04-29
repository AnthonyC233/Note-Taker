const fs = require("fs");
const router = require('express').Router();

// function createNewNote (body, notesArray) {
//     const newNote = body;
//     if(!Array.isArray(notesArray))
//        notesArray=[]
//        if(notesArray.length === 0)
//           notesArray.push(0);
  
//           body.id = notesArray[0]
//           notesArray[0]++;
  
//           notesArray.push(newNote);
//             fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesArray, null, 2)
//           );
//             return newNote;
//   }

router.get ('/notes', (req, res) => {
  var store = require('../db/db.json');
  res.json(store);
});

router.post('/notes', (req,res) => { 
  var store = require('../db/db.json');
  store.push(req.body);
  fs.writeFile ('./db/db.json', JSON.stringify(store), err => {
    if (err) throw err;
  });
  res.json(store);
});

module.exports = router;