const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password){
            res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({$or: [{ username }, { email }]});

        if(user){
            return res.status(400).json({
                message: "User already exists!! Please try another one",
                success: false
            });
        }

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        const createUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if(createUser){
            return res.status(201).json({
                message: "User registered successfully...",
                success: true,
                userData: createUser
            });
        }
        else{
            return res.status(401).json({
                message: "Failed to register user!!",
                success: false
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in register",
            success: false
        });
    }
}

const loginUser = async (req, res) => {

}

module.exports = { registerUser, loginUser }