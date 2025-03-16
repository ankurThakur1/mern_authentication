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
    try {
        const { email, password } = req.body;

        if(!email || !password){
            res.status(400).json({
                message: "email and password are required",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message: "User doesn't exists in our database!! Please register first",
                success: false
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(404).json({
                message: "Invalid Credentials",
                success: false
            });
        }

        const token = jwt.sign({userId: user._id}, process.env.AUTH_SECRET, { expiresIn: "1d" });

        return res.status(200).json({
            message: "User logged in successfully...",
            success: true,
            userData: user,
            accessToken: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in login",
            success: false
        });
    }
}

const userProfile = async (req, res) => {
    try {
        const { userId } = req.user;

        const loggedInUser = await User.findById(userId).select("-password");

        return res.status(200).json({
            message: `Welcome ${loggedInUser.username}`,
            success: true,
            userData: loggedInUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in profile",
            success: false
        });
    }
}

module.exports = { registerUser, loginUser, userProfile }