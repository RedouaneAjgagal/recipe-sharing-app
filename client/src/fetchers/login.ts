import url from "../config/url";
import { validEmail, validPassword } from "../helpers/auth";

export const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // check for valid values
    const isValidEmail = validEmail(email);
    const isValidPassword = validPassword(password);

    let result = {
        msg: "",
        success: true,
        validEmail: true,
        validPassword: true
    }

    if (!isValidEmail) {
        result.validEmail = false;
    }
    if (!isValidPassword) {
        result.validPassword = false;
    }

    if (!result.validEmail || !result.validPassword) {
        return result;
    }

    // if both email and password are valid values then post request
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        result.msg = data.msg;
        result.success = false;
        return result
    }

    return null;
}

export default login