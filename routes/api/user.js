const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const jwtSecret = require("../../config/keys").jwtSecret;
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({username}).then((user) =>{

        if(user){
            res.status(403).json({err: "Username already exists"});
            return;
        }
        const newUser = new User({username, email, password});
        newUser.save().then(() => res.status(201).json({msg: "User registration success"}))
    })
    .catch((err) => {
        throw new Error(err);
    });
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username}).then( async (user) => {
        if(user){
            const isMatched = await user.isValidPassword(password);
            if(isMatched){
                payload = {id: user.id, username: user.username};
                jwt.sign(payload, jwtSecret, {expiresIn: 24*60*60}, (err, token) => {
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        res.json({token});
                    }
                });
            }
            else{
                res.status(401).json({msg: "Invalid Password"});
            } 
        }
    })
    .catch(err => {throw new Error(err)}) 
});

module.exports = router;