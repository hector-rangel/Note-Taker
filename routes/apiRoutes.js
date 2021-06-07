const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const notesData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');


// ROUTING
module.exports = (app) => {
    
    // API GET REQUEST
    app.get('/api/notes', (req, res) => {
        
        //READ 'db.json' file
        let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        console.log(JSON.stringify(data));        
        
        // Send read data to response of 'get' request
        res.json(data)
    
    });

    // API POST REQUEST
    app.post('/api/notes', (req, res) => {
        const newNote = req.body;

        console.log(JSON.stringify(newNote));

        // assigns a unique ID number to the new note
        newNote.id = uuidv4();

        // reads data from db.json and saves new note
        let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        data.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(data));

        res.json(data);
    });

};