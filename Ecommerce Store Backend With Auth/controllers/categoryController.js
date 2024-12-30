import prisma from "../database/db.config.js";

export async function getAllCategories(req, res) {
    try {
        const categories = await prisma.category.findMany({})

        res.status(200).json({ success: true, message: 'Categories Recieved Successfully', categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getCategoryProduct(req, res) {
    const { name } = req.params;

    if (!name) {
        res.status(400).json({ success: false, message: 'Category Name Not Found' });
    }

    try {
        const { products } = await prisma.category.findFirst({
            where: {
                name
            },
            include: {
                products: true
            },
        })

        res.status(200).json({ success: true, message: 'Products Recieved Successfully', products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}