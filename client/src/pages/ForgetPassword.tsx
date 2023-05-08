import ResetPassword from '../components/auth/ResetPassword'
import { ActionFunction } from 'react-router-dom'
import { validEmail } from '../helpers/auth'
import url from '../config/url'

const ForgetPassword = () => {
    return (
        <ResetPassword />
    )
}

export default ForgetPassword


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
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
        method: request.method,
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