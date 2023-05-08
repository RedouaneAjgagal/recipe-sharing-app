import { Link, useFetcher } from "react-router-dom"
import StatusResponse from "../StatusResponse"
import Input from "../Input"


interface Props {
    for: "login" | "register"
}


const Form = (props: React.PropsWithoutRef<Props>) => {
    const fetcher = useFetcher();

    const responseMsg: {
        msg: string;
        success: boolean;
        validEmail: boolean;
        validPassword: boolean;
        validName: boolean
    } = fetcher.data;

    return (
        <section className="w-full pt-12 relative">
            {responseMsg?.msg && <StatusResponse success={responseMsg.success} message={responseMsg.msg} />}
            <fetcher.Form method="POST" action={props.for === "login" ? "/login" : "/register"} noValidate className="bg-white px-4 py-6 rounded shadow-lg flex flex-col">
                <article className="mb-6">
                    <h1 className="text-3xl font-medium mb-2">{props.for === "login" ? "Sign in" : "Sign up"}</h1>
                    <p className="text-slate-500">{props.for === "login" ? "Share your recipes with the world!" : "Be part of the community, and share your recipe!"}</p>
                </article>
                <div>
                    {props.for === "register" &&
                        <div className="relative pb-7">
                            <Input type="text" name="name" placeHolder="Name" success={responseMsg?.validName} />
                            {responseMsg?.validName === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Must be between 3 and 20 characters</span>}
                        </div>
                    }
                    <div className="relative pb-7">
                        <Input type="email" name="email" placeHolder="Email" success={responseMsg?.validEmail} />
                        {responseMsg?.validEmail === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid email</span>}
                    </div>

                    <div className="relative pb-7">
                        <Input type="password" name="password" placeHolder="Password" success={responseMsg?.validPassword} />
                        {responseMsg?.validPassword === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Must be 6 characters and more</span>}
                    </div>
                </div>

                {props.for === "login" &&
                    <div className="flex mb-2">
                        <Link to={"/forget-password"} className="text-amber-700 font-medium">Forgot password?</Link>
                    </div>
                }
                <button className="bg-amber-700 text-white py-2 rounded font-medium tracking-wide">{props.for === "login" ? "Sign in" : "Sign up"}</button>
            </fetcher.Form>
        </section>
    )
}

export default Form