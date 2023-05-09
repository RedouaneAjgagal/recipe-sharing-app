import { ActionFunction } from 'react-router-dom'
import ResetPasswordForm from '../components/auth/ResetPasswordForm'
import url from '../config/url'
import { validPassword } from '../helpers/auth'

const ResetPassword = () => {
    return (
        <ResetPasswordForm for='reset-password' />
    )
}

export default ResetPassword

export const action: ActionFunction = async ({ request }) => {
    const isToken = new URL(request.url).searchParams.has("token");
    const isEmail = new URL(request.url).searchParams.has("email");

    const formData = await request.formData();
    const newPassword = formData.get("password") as string;

    let result = {
        msg: "",
        success: false,
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
    const token = new URL(request.url).searchParams.get("token")!
    const email = new URL(request.url).searchParams.get("email")!

    // rest password request
    const response = await fetch(`${url}/auth/reset-password`, {
        method: request.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword })
    });

    const data = await response.json();

    result.msg = data.msg;

    if (response.ok) {
        result.success = true
    }

    return result
}