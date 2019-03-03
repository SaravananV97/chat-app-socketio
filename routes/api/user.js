const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const jwtSecret = require("../../config/keys").jwtSecret;
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
    
    const username = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    console.log({username, email, password});
    User.findOne({username}).then((user) =>{
        if(user){
            res.json({userName: "Username already exists"});
            return;
        }
        const newUser = new User({username, email, password});
        newUser.save().then((user) => {
            payload = {id: user.id, username: user.username};
            jwt.sign(payload, jwtSecret, {expiresIn: 24*60*60}, (err, token) => {
                if(err){
                    throw new Error(err);
                }
                else{
                    res.json({token});
                }
            });
            })
    .catch((err) => {
        throw new Error(err);
    });
});
});

router.post("/login", async (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    console.log({username, password})
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
                res.json({passwordErr: "Invalid Password"});
            } 
        }
        else{
            res.json({userErr: "Invalid userName"});
        }
    })
    .catch(err => {throw new Error(err)}) 
});

module.exports = router;