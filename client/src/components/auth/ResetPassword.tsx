import { useFetcher, Link } from "react-router-dom"
import Input from "../Input";

const ResetPassword = () => {

    const fetcher = useFetcher();

    return (
        <div className="flex flex-col min-h-[75vh] justify-center items-center">
            <div className='w-full pt-12 relative'>
                <fetcher.Form method="POST" action="/forget-password" noValidate className="bg-white px-4 py-6 rounded shadow-lg flex flex-col">
                    <article className="mb-6">
                        <h1 className="text-3xl font-medium mb-2">Reset Password</h1>
                        <p className="text-slate-500">Forgot your password? no worries we got you!</p>
                    </article>
                    <div className="relative pb-7">
                        <Input name="email" type="email" placeHolder="Email" success={true} />
                    </div>
                    <button className="bg-amber-700 text-white py-2 rounded font-medium tracking-wide">Reset password</button>
                    <p className="mt-4 text-black">Already have an account? <Link to={"/login"} className="text-amber-700 font-medium">Login</Link></p>
                </fetcher.Form>
            </div>
        </div>
    )
}

export default ResetPassword