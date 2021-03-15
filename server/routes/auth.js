const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello from auth.js`);
});

router.post('/register', (req, res) => {
    console.log(req.body)
    res.send('Registration Page');
});

module.exports =router;