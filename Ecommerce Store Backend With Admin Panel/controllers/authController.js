import prisma from "../database/db.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const { username, email, password } = req.body;

    try {
        const isUserExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (isUserExists) {
            return res.status(400).json({ success: false, message: 'User With This Email Already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        res.status(200).json({ success: true, message: 'User Account Succesfully Created' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "User With This Email Doesn't Exists" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET);

        res.status(200).json({ success: true, message: 'Sign-In Successful', token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}