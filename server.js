require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./database/db.js");
const authRouter = require("./routes/user.route.js");


connectToDB();

app.use(express.json());

app.use("/api/auth", authRouter);



app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Authentication Project in MERN",
        success: true
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
