import { useFetcher, Link } from "react-router-dom"
import Input from "../Input";
import StatusResponse from "../StatusResponse";


interface Props {
    for: "forget-password" | "reset-password"
}

const ResetPasswordForm = (props: React.PropsWithoutRef<Props>) => {

    const fetcher = useFetcher();

    const responseMsg: {
        msg: string;
        success: boolean;
        validEmail: boolean;
        validPassword: boolean;
    } = fetcher.data;

    return (
        <div className="flex flex-col min-h-[75vh] justify-center items-center">
            <div className='w-full pt-20 relative'>
                {responseMsg?.msg && <StatusResponse success={responseMsg?.success} message={responseMsg.msg} />}
                <fetcher.Form method="POST" noValidate className="bg-white px-4 py-6 rounded shadow-lg flex flex-col">
                    <article className="mb-6">
                        <h1 className="text-3xl font-medium mb-2">Reset Password</h1>
                        <p className="text-slate-500">Forgot your password? no worries we got you!</p>
                    </article>
                    {props.for === "forget-password" ?
                        <div className="relative pb-7">
                            <Input name="email" type="email" placeHolder="Email" success={responseMsg?.validEmail} />
                            {responseMsg?.validEmail === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid email</span>}
                        </div>
                        :
                        <div className="relative pb-7">
                            <Input name="password" type="password" placeHolder="New Password" success={responseMsg?.validPassword} />
                            {responseMsg?.validPassword === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Must be between 3 and 20 characters</span>}
                        </div>
                    }
                    <button className="bg-amber-700 text-white py-2 rounded font-medium tracking-wide">{props.for === "forget-password" ? "Reset password" : "Change password"}</button>
                    {props.for === "forget-password" &&
                        <p className="mt-4 text-black">Already have an account? <Link to={"/login"} className="text-amber-700 font-medium">Login</Link></p>
                    }
                </fetcher.Form>
            </div>
        </div>
    )
}

export default ResetPasswordForm