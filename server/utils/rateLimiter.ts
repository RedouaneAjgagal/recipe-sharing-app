import { rateLimit } from "express-rate-limit";


const rateLimiter = ({ windowMs, max }: { windowMs: number, max: number }) => {
    const apiLimiter = rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false
    });
    return apiLimiter;
}

export default rateLimiter;

