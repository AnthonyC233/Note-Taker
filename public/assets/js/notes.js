const express = require('express');
const path = require('path');
const dbData = require('./');

app.use(express.static('public'))

app.get('/api/notes', (req,res) => res.json(dbData));