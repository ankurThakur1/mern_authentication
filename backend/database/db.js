const mongoose = require("mongoose");


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database connected successfully...😀`);
    } catch (error) {
        console.log("Failed to connect with database...!!");
        process.exit(1);
    }
}

module.exports = connectToDB;