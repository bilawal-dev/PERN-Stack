import prisma from "../database/db.config.js";

export async function getAllPosts(req, res) {
    const { order, searchQuery } = req.query;

    let page = req.query.page;
    let limit = req.query.limit;

    if (!page || page <= 0) {
        page = 1;
    }

    if (!limit || limit <= 0 || limit > 10) {
        limit = 10;
    }

    const skip = (page - 1) * limit;

    try {
        const posts = await prisma.post.findMany({
            skip: skip,
            take: Number(limit),
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: order === 'desc' ? 'desc' : 'asc'
            },
            where: {
                OR: [
                    {
                        title: {
                            contains: searchQuery || '',
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchQuery || '',
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });

        const totalPosts = await prisma.post.count();
        const totalPages = Math.ceil(totalPosts / limit); // Math.ceil() rounds up the number

        res.status(200).json({ success: true, data: posts, meta: { totalPosts, totalPages } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getPost(req, res) {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!post) {
            return res.status(400).json({ success: false, message: 'Post not found in the database!' });
        }

        res.status(200).json({ success: true, data: post });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function createPost(req, res) {
    const { userId, title, description } = req.body;

    if (!userId || !title || !description) {
        return res.status(400).json({ success: false, message: 'Please provide userId, title and description!' })
    };

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                description,
                userId
            }
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updatePost(req, res) {
    const { id } = req.params;

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Please provide userId, title and description!' })
    }

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                description
            }
        });

        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function deletePost(req, res) {
    const { id } = req.params;

    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id
            }
        });

        if (!deletedPost) {
            res.status(400).json({ success: false, message: 'Post not found in the database!' });
        }

        res.status(200).json({ success: true, data: deletedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}