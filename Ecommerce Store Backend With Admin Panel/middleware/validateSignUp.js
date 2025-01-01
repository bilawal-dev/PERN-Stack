import zod from "zod";

const signupSchema = zod.object({
    username: zod.string({ message: "Please Provide Username" }),
    email: zod.string({ message: 'Please Provide Email' }).email({ message: 'Please Provide A Valid Email' }),
    password: zod.string({ message: 'Please Provide A Password' }).min(8, { message: 'Password Length Must Be Greater Than 8' }),
});

export function validateSignUp(req, res, next) {
    try {
        const result = signupSchema.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.issues[0].message });
    }
}