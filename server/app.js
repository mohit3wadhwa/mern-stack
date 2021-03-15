const express = require('express');
const mongoose = require('mongoose');

const app = express();
const DB = 'mongodb+srv://mohit3wadhwa:PASSWORD@cluster0.fumpn.mongodb.net/myPilotDB?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connection Successful');

}).catch((err) => {
    console.log('Unsuccessful Connection')
});


// Middleware

const middleware = (req, res, next) => {
    console.log('This is middleware');
    next();
};

//middleware();


app.get('/', (req, res) => {
    res.send('Hello Heloo! from server')
});

app.get('/aboutme', middleware, (req, res) => {
    res.send('Hello Heloo! from about me')
});

app.get('/contact', (req, res) => {
    res.send('Hello Heloo! from contact')
});


app.listen(3000, () => {
    console.log("Server is running ...")
})
