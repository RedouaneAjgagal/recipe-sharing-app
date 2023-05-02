import crypto from "crypto";

const createHash = (algorithm: string, value: string) => {
    const hashedValue = crypto.createHash(algorithm).update(value).digest('hex');
    return hashedValue;
}

export default createHash;
