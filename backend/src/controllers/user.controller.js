import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign(
        { _id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

const setAuthCookie = (res, token) => {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

const userRegister = async (req, res) => {

    try {
        const { fullName, email, userName, password } = req.body;

        if (!fullName || !email || !userName || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { userName }]
        })

        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const user = await User.create({
            fullName,
            userName,
            email,
            password
        })

        const token = generateToken(user._id);
        setAuthCookie(res, token);

        const { password: _pw, ...safeUser } = user.toObject();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: safeUser
        })

    } catch (error) {
        console.log("Error in user registration:", error);

        // Send 500 response for server errors
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const userLogin = async (req, res) => {

    try {
        const { email, userName, password } = req.body;

        if ((!email && !userName) || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email or username and password are required'
            });
        }

        // Find user by email OR username
        const user = await User.findOne({
            $or: [
                ...(email ? [{ email }] : []),
                ...(userName ? [{ userName }] : [])
            ]
        });


        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email/username or password'
            });
        }

        const isPasswordCorrect = await user.isPassword(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = generateToken(user._id);
        setAuthCookie(res, token);

        const { password: _pw, ...safeUser } = user.toObject();

        res.status(200).json({
            success: true,
            message: 'User loggedIn successfully',
            token,
            user: safeUser
        })

    } catch (error) {
        console.log("Error in user login:", error);

        // Send 500 response for server errors
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const userDetail = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password") ; 

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User Not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User found successfully',
            user
        })
    } catch (error) {
        console.log('Error in fetching detail of user: ', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export {
    userRegister,
    userLogin,
    userDetail
}