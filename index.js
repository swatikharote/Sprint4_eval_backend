const express = require("express");
const { userRouter } = require("./routes/userRoutes");
const { connection } = require("./db")
const { postRoutes } = require("./routes/postRoutes");
require("dotenv").config();
const cors = require("cors")


const app = express();
app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use("/posts", postRoutes)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connecyted to db");
    } catch (error) {
        console.log("Server error");
    }
})