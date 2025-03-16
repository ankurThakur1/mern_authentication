require("dotenv").config();
const express = require("express");
const app = express();


app.use(express.json());

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
