import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"
import { OAuth2Client } from "google-auth-library";
import { v2 as cloudinary } from "cloudinary";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }
        if (!user.providers.includes("email")) {
            return res.json({ success: false, message: "You signed up with Google. Please set a password first." });
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //Checking user already exists or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            providers: ["email"]
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Route for admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// Route for user googleOauth
// Redirect to Google login
const googleLogin = (req, res) => {
    const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
        prompt: "consent",
    });
    res.redirect(authUrl);
};
// Handle Google callback
const googleCallback = async (req, res) => {
    const code = req.query.code;
    try {
        // Exchange code for tokens
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        // Verify ID token
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        let user = await userModel.findOne({ email: payload.email });
        if (!user) {
            user = new userModel({
                name: payload.name,
                email: payload.email,
                providers: ["google"]
            });
            await user.save();
        } else if (!user.providers.includes("google")) {
            user.providers.push("google");
            await user.save();
        }
        const token = createToken(user._id)
        res.redirect(`http://localhost:5173/success/?token=${token}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Authentication failed");
    }
};
const getUser = async (req, res) => {
    try {
        const { userId } = req
        const userData = await userModel.findById(userId)
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}
const setPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        const { userId } = req
        const user = await userModel.findById(userId)
        if (!newPassword || newPassword.length < 6) {
            return res.json({ message: "Password must be at least 6 characters" });
        }
        const hasEmailProvider = user.providers.includes("email");
        if (hasEmailProvider) {
            if (!oldPassword) {
                return res.json({ success: false, message: "Old password is required to update" });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.json({ success: false, message: "Old password is incorrect" });
            }
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        if (!user.providers.includes("email")) {
            user.providers.push("email");
        }
        user.password = hashedPassword;
        await user.save();
        res.json({ success: true, message: hasEmailProvider ? "Password updated successfully" : "Password set successfully", });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}
const updateProfilepic = async (req, res) => {
    try {
        const { userId } = req
        const user = await userModel.findById(userId)
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_images",
            width: 300,
            height: 300,
            crop: "fill",
        });
        // Update user's picture
        user.image = result.secure_url;
        await user.save();
        res.json({ success: true, message: "Profile image updated", picture: result.secure_url });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}
export { loginUser, registerUser, adminLogin, googleLogin, googleCallback, getUser, setPassword, updateProfilepic }
