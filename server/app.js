const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path:'./config.env'});

require('./connectDB');
require('./models/userSchema');
app.use(express.json());

app.use(require('./routes/auth'));


const PORT = process.env.PORT;



// const DB = 'mongodb+srv://mohit3wadhwa:PASSWORD@cluster0.fumpn.mongodb.net/myPilotDB?retryWrites=true&w=majority';



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


app.listen(PORT, () => {
    console.log(`Server is running ...at ${PORT}`)
})
