import { Link, useFetcher } from "react-router-dom"
import StatusResponse from "../StatusResponse"


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
    } = fetcher.data;

    return (
        <section className="w-full pt-12 relative">
            {responseMsg?.msg && <StatusResponse success={responseMsg.success} message={responseMsg.msg} />}
            <fetcher.Form method="POST" action="/login" noValidate className="bg-white px-4 py-6 rounded shadow-lg flex flex-col">
                <article className="mb-6">
                    <h1 className="text-3xl font-medium mb-2">Sign in</h1>
                    <p className="text-slate-500">Share your recipes with the world!</p>
                </article>
                <div>
                    <div className="relative pb-7">
                        <input type="email" id="email" name="email" placeholder="Email" className={`border  rounded p-2 w-full ${responseMsg?.validEmail === false ? "border-red-700" : "border-gray-300"}`} />
                        {responseMsg?.validEmail === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid email</span>}
                    </div>

                    <div className="relative pb-7">
                        <input type="password" id="password" name="password" placeholder="Password" className={`border  rounded p-2 w-full ${responseMsg?.validPassword === false ? "border-red-700" : "border-gray-300"}`} />
                        {responseMsg?.validPassword === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Must be 6 characters and more</span>}
                    </div>
                </div>

                <div className="flex mb-2">
                    <Link to={"/forget-password"} className="text-amber-700 font-medium">Forgot password?</Link>
                </div>
                <button className="bg-amber-700 text-white py-2 rounded font-medium tracking-wide">Sign in</button>
            </fetcher.Form>
        </section>
    )
}

export default Form