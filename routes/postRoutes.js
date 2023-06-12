const express = require("express")
const { auth } = require("../middleware/auth");
const { PostModel } = require("../model/postModel.js");
const jwt = require("jsonwebtoken")

const postRoutes = express.Router();
postRoutes.use(auth)

postRoutes.post("/add", async (req, res) => {

    try {
        const post = new PostModel(req.body);
        await post.save();
        res.json({ msg: "new post has enn added", post: req.body })

    } catch (error) {
        res.json({ msg: error.msg })
    }

})


postRoutes.get("/", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, "masai");
    try {
        const post = await PostModel.find({ userId: decode.userId });
        res.json(post)
    } catch (error) {
        res.json({ msg: error.msg })
    }

})

postRoutes.patch("/update", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, "masai");
    const payload = req.body
    try {
        await PostModel.findByIdAndUpdate({ _id: decode.userId }, payload)

        res.json({ msg: "updated post" })

    } catch (error) {
        res.json({ msg: error.msg })
    }

})

postRoutes.delete("/delete", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, "masai");
    try {
        await PostModel.findByIdAndDelete({ _id: decode.userId })
        res.json({ msg: "deleted post" })
    } catch (error) {
        res.json({ msg: error.msg })
    }

})

postRoutes.get("/top", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, "masai");
    try {
        const post = await PostModel.find({ userId: decode.userId }).sort({ " no_of_comments": -1 }).limit(3);
        res.json(post)

    } catch (error) {
        res.json({ msg: error.msg })
    }

})






module.exports = { postRoutes }