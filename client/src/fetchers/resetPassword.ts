import url from "../config/url";
import { validPassword } from "../helpers/auth";

const resetPassword = async (formData: FormData) => {
    const domain = window.location.href;
    const isToken = new URL(domain).searchParams.has("token");
    const isEmail = new URL(domain).searchParams.has("email");

    const newPassword = formData.get("password") as string;

    let result = {
        msg: "",
        success: true,
        validPassword: true
    }

    // check if token and email queries are exist
    if (!isToken || !isEmail) {
        result.msg = "Unauthenticated action.."
        return result;
    }

    // check if its a valid password
    const isValidPassword = validPassword(newPassword);
    if (!isValidPassword) {
        result.validPassword = false
        return result
    }

    // get queries values
    const token = new URL(domain).searchParams.get("token")!
    const email = new URL(domain).searchParams.get("email")!

    // rest password request
    const response = await fetch(`${url}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword })
    });

    const data = await response.json();

    if (!response.ok) {
        result.msg = data.msg;
        result.success = response.ok;
        return result;
    }

    return null;
}

export default resetPassword;