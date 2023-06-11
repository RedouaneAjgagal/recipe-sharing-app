import url from "../config/url";

const verifyEmail = async (token: string | null, email: string | null) => {
    if (!token || !email) {
        throw new Error("Invalid authentication");
    }
    const response = await fetch(`${url}/auth/verify-email?token=${token}&email=${email}`);
    const data = await response.json() as { msg: string };
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data.msg;
}
export default verifyEmail;