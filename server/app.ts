import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

// express
import express from 'express';
const app = express();


// db
import connectDB from './db/connect';

// configs
import origin from './config/origin';


// extra packages
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";
import xssCleaner from "xss-clean";
import fileUpload from "express-fileupload";
import rateLimit from 'express-rate-limit';
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // Limit each IP to 60 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// middlewares
import errorHandlerMiddleware from './middlewares/error-handler';
import notFoundMiddleware from './middlewares/not-found';


// routes
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import recipeRouter from './routes/recipeRouter';
import commentRouter from './routes/commentRouter';
import rateRouter from './routes/rateRouter';
import favouriteRouter from './routes/favouriteRouter';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
    ssl_detected: true
});

app.use(cors({
    origin
}));
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssCleaner());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(fileUpload({ useTempFiles: true, safeFileNames: true }));


app.use('/api/v1', apiLimiter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/rates', rateRouter);
app.use('/api/v1/favourite', favouriteRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI!);
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
}

start();