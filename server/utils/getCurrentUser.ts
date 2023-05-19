import { verifyToken } from "./createToken";

export const getUser = (accessToken: string) => {
    let userInfo: { id: string; name: string; role: string; } | undefined = undefined;
    try {
        userInfo = verifyToken(accessToken) || undefined
    } catch (error) {
        userInfo = undefined;
    }
    return userInfo
}