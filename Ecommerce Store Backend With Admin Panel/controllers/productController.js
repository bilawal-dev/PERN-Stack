import prisma from "../database/db.config.js";

export async function getProducts(req, res) {
    const { search } = req.query;

    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search || '',
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: search || '',
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });

        res.status(200).json({ success: true, message: 'Products Recieved Successfully', products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getRelatedProducts(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ success: false, message: 'Product ID Not Found' });
    }

    try {
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!product) {
            return res.status(400).json({ success: false, message: 'Product Not Found' });
        };

        const { products } = await prisma.category.findFirst({
            where: {
                id: product.categoryId
            },
            include: {
                products: {
                    where: {
                        NOT: {
                            id: product.id
                        }
                    },
                    take: 4
                },
            }
        })

        res.status(200).json({ success: true, message: 'Related Products Recieved Successfully', products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getSingleProduct(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ success: false, message: 'Product ID Not Found' });
    }

    try {
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({ success: true, message: 'Product Recieved Successfully', product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}