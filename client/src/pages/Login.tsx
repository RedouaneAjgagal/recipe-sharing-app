import { ActionFunction, redirect } from "react-router-dom"
import { validEmail, validPassword } from "../helpers/auth"
import Auth from "../components/auth"
import url from "../config/url"

const Login = () => {

  return (
    <Auth for="login" />
  )
}

export default Login


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
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
    method: request.method,
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

  return redirect("/");
}