import express from 'express';
import { configDotenv } from 'dotenv';
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import categoryRoute from './routes/categoryRoute.js'

configDotenv();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use('/api/auth', authRoute);

app.use('/api/products', productRoute);

app.use('/api/category', categoryRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(function(error, req, res, next){
    console.log('Global Catch');
    res.json({ success: false, message: error })
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});