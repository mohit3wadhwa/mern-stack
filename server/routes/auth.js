const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();


require('../db/connectDB');
const User = require('../models/userSchema');

router.get('/', (req, res) => {
    res.cookie("jwtoken", 'token11111');
    res.send(`Hello from auth.js`);
});


router.post('/register', async (req, res) => {
    const {name, email, phone, work, password, cpassword} = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: "Complete all parameters"});         
    }

    try {
        const userExist = await User.findOne({ email: email});

        if (userExist) {
            return res.status(422).json( {error: "Email already exists!"});
        }

        const user = new User( {name, email, phone, work, password, cpassword} );
        await user.save();
        return res.status(200).json( {message: "User Successfully Registered"} );

    } catch (err) {
        console.log(err);
    }
    
    // User.findOne({email:email})
    // .then((userExist) => {
    //     if(userExist) {
    //         return res.status(422).json({ Error: "Email Exists!"})
    //     } 

    //     const user = new User({name, email, phone, work, password, cpassword});
    //     user.save().then(() => {
    //         res.status(201).json( {message: "Data registered successfully"})
    //     }).catch((err) => res.status(500).json({error: err}));
    // }).catch(err => {console.log(err);});

});

// Login Route

router.post('/login', async (req, res) => {
    try {
        let token; 
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({Error: "Email or password cannot be empty"});
        }

        const userLogin = await User.findOne({email: email});

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            token = await userLogin.generateAuthToken();
            console.log(token)

            

            // res.cookie("jwtoken", token,  {
            //     expires: new Date(Date.now() + 25892000000),
            //     httpOnly: true
            // });
 
            if (isMatch) {
                res.cookie("ttttttttttt000000000000000token", token);
                res.status(200).json({message: "Login Successful"})
            }else {
                res.status(400).json({Error: "Login Failed"})
            }
        }else {
            res.status(400).json({Error: "Login Failed"})
        }
        
        


    } catch (err) {
        console.log(err);
    }
});

module.exports = router;