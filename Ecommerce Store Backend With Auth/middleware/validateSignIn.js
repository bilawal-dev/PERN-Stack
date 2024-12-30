import zod from 'zod';

const signinSchema = zod.object({
    email: zod.string({ message: 'Please Provide Email' }).email({ message: 'Please Provide A Valid Email' }),
    password: zod.string({ message: 'Please Provide Password' }).min(8, { message: 'Password Length Must Be Greater Than 8' }),
})

export function validateSignIn(req, res, next) {
    try {
        const result = signinSchema.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.issues[0].message });
    }
}