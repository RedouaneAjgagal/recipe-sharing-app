import { ActionFunction, redirect } from "react-router-dom"
import Auth from "../components/auth"
import { validName, validEmail, validPassword } from "../helpers/auth"
import url from "../config/url"

const Register = () => {
    return (
        <Auth for="register" />
    )
}

export default Register


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // check for valid values
    const isValidName = validName(name);
    const isValidEmail = validEmail(email);
    const isValidPassword = validPassword(password);

    let result = {
        msg: "",
        success: true,
        validName: true,
        validEmail: true,
        validPassword: true,
    }

    if (!isValidName) {
        result.validName = false
    }
    if (!isValidEmail) {
        result.validEmail = false
    }
    if (!isValidPassword) {
        result.validPassword = false
    }

    if (!result.validName || !result.validEmail || !result.validPassword) {
        return result;
    }

    // if all the values are valid then post request
    const response = await fetch(`${url}/auth/register`, {
        method: request.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    
    if (!response.ok) {
        result.msg = data.msg;
        result.success = false;
        return result;
    }

    return redirect("/login");
}