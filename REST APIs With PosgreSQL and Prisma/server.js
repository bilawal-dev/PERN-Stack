import express from "express";
import usersRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";

const app = express();

const port = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/user', usersRoute);

app.use('/api/post', postRoute);

app.use('/api/comment', commentRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});