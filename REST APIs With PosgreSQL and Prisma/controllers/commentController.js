import prisma from "../database/db.config.js";

export async function getPostComments(req, res) {
    const { postId } = req.params;

    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId
            }
        });

        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function createPostComment(req, res) {
    const { postId } = req.params;

    const { userId, comment } = req.body;

    if (!comment || !postId || !userId) {
        return res.status(400).json({ success: false, message: 'Please provide comment, postId and userId!' })
    };

    try {
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                commentCount: {
                    increment: 1
                }
            }
        })

        const newComment = await prisma.comment.create({
            data: {
                comment,
                postId,
                userId
            }
        });

        res.status(200).json({ success: true, data: newComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateComment(req, res) {
    const { commentId } = req.params;

    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ success: false, message: 'Please provide comment!' })
    }

    try {
        const updatedComment = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                comment
            }
        });

        res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function deleteComment(req, res) {
    const { commentId } = req.params;

    const { postId } = req.body;

    try {

        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                commentCount: {
                    decrement: 1
                }
            }
        })

        const deletedComment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        });

        if (!deletedComment) {
            res.status(400).json({ success: false, message: 'Comment not found in the database!' });
        }

        res.status(200).json({ success: true, data: deletedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}