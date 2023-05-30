import url from "../config/url";
import { validEmail } from "../helpers/auth";

export const forgetPassword = async (formData: FormData) => {
    const email = formData.get("email") as string;

    // check if valid email
    const isValidEmail = validEmail(email);

    let result = {
        msg: "",
        success: false,
        validEmail: true
    }

    if (!isValidEmail) {
        result.validEmail = false;
        return result;
    }

    // if its a valid email then post request
    const response = await fetch(`${url}/auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const data = await response.json();

    result.msg = data.msg;

    if (response.ok) {
        result.success = true
    }

    return result
}

export default forgetPassword;