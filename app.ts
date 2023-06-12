import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import path from "path";

// express
import express from 'express';
const app = express();


// db
import connectDB from './db/connect';

// extra packages
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";
import xssCleaner from "xss-clean";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

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
import rateLimiter from './utils/rateLimiter';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
    ssl_detected: true
});

app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            imgSrc: ["'self'", "https://res.cloudinary.com/dqfrgtxde/image/upload/"]
        }
    },
    crossOriginEmbedderPolicy: {
        policy: "credentialless"
    }
}));
app.use(mongoSanitize());
app.use(xssCleaner());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(fileUpload({ useTempFiles: true, safeFileNames: true }));


// Request Limiter
const apiLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 });

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/recipes', apiLimiter, recipeRouter);
app.use('/api/v1/comments', apiLimiter, commentRouter);
app.use('/api/v1/rates', apiLimiter, rateRouter);
app.use('/api/v1/favourite', apiLimiter, favouriteRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
})

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