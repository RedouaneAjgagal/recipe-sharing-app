import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

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
import rateLimit from 'express-rate-limit';
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// middlewares
import errorHandlerMiddleware from './middlewares/error-handler';
import notFoundMiddleware from './middlewares/not-found';


// routes
import authRouter from './routes/authRouter';



app.use(helmet());
app.use(mongoSanitize());
app.use(xssCleaner());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api/v1', apiLimiter);
app.use('/api/v1/auth', authRouter);




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