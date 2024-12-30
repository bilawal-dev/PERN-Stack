import prisma from "../database/db.config.js";

export async function getAllUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
                comments: true
            }
        });

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                posts: true,
                comments: true
            }
        });

        if(!user){
            return res.status(400).json({ success: false, message: 'User not found in the database!' });
        }

        res.status(200).json({ success: true, data: user });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide name, email and password!' })
    };

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(findUser){
            // return res.status(400).json({ success: false, message: 'User with this email already exists!' })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        res.status(200).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ success: false, message: 'Please provide name, email and password!'});
    }
    
    try {
        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                password
            }
        });

        res.status(200).json({ success: true, data: updateUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id
            }
        });

        if(!deleteUser){
            res.status(400).json({ success: false, message: 'User not found in the database!' });
        }

        res.status(200).json({ success: true, data: deleteUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}