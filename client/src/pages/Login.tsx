import Form from "../components/auth/Form"
import { ActionFunction, Link, } from "react-router-dom"
import { validEmail, validPassword } from "../helpers/auth"

const Login = () => {

  return (
    <div className="flex flex-col min-h-[75vh] justify-center items-center">
      <Form for="login" />
      <p className="mt-4 text-black">You dont have an account yet? <Link to={"/register"} className="text-amber-700 font-medium">Join now</Link></p>
    </div>
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
    success: false,
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

  // if both email and password are valid values then fetch
  const response = await fetch(`http://localhost:5000/api/v1/auth/login`, {
    method: request.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  const data = await response.json();

  result.msg = data.msg
  if (response.ok) {
    result.success = true
  }

  return result
}