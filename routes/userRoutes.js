const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {

    const { name, email, gender, pass, age, city, is_married } = req.body

    const user = await UserModel.findOne({ email });
    if (user) {
        res.json({ msg: "user already exist, please login" })
    } else {
        try {
            bcrypt.hash(pass, 5, async (err, hash) => {
                if (err) {
                    res.json({ msg: err.message })
                }
                else {
                    const user = new UserModel({ name, email, gender, pass: hash, age, city, is_married });
                    await user.save();
                    res.json({ msg: "new uer has been added" })
                }
            })

        }
        catch (error) {
            res.json({ msg: error.message })
        }
    }

})


userRouter.post("/login", async (req, res) => {

    const { email, pass } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: user._id, user: user.name }, "masai");
                    res.json({ msg: "user has been logged in !!", token })
                } else {
                    res.json({ msg: "wrong credentials" })
                }

            })
        } else {
            res.json({ msg: "User does not exist, please register" })
        }

    } catch (error) {
        res.json({ msg: error.message })
    }

})





module.exports = { userRouter }