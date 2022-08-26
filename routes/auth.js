const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");

//REGISTER USER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC),
    });

    try{
        const savedUser = await newUser.save();

        return res.json({
            status: true,
            message: 'success.registration',
            data: savedUser
        });
    }catch(err){
        return res.json({
            status: false,
            message: err.message,
            data: null
        });
    }

});

//Login User
router.post("/login", async (req, res) => {
    const password = req.body.password;

    try{
        const userDetail = await getUser.findOne(req.body.email);

        return res.json({
            status: true,
            message: 'User Login Successful',
            data: userDetail
        });
    }catch(err){
        return res.json({
            status: false,
            message: err.message,
            data: null
        });
    }

});



module.exports = router;