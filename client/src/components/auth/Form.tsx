import { Link, useNavigate } from "react-router-dom"
import StatusResponse from "../StatusResponse"
import Input from "../Input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import register from "../../fetchers/register"
import { ImSpinner2 } from "react-icons/im"
import login from "../../fetchers/login"


interface Props {
    for: "login" | "register"
}


const Form = (props: React.PropsWithoutRef<Props>) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: props.for === "register" ? register : login,
        onSuccess: (errors) => {
            if (errors) return;
            if (props.for === "register") {
                navigate("/login");
                return;
            }
            const expiresIn = 2 * 60 * 60 * 1000;
            const expiresAt = new Date(Date.now() + expiresIn).toISOString();
            localStorage.setItem("exp", expiresAt);
            queryClient.invalidateQueries(["authentication"]);
            navigate("/");
        }
    });

    const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);
    }

    const errors = mutation.data as {
        msg?: string;
        success?: boolean;
        validName?: boolean;
        validEmail?: boolean;
        validPassword?: boolean;
    }

    return (
        <section className="w-full pt-12 relative">
            {errors?.msg && <StatusResponse success={errors.success!} message={errors.msg} />}
            <form action={props.for === "login" ? "/login" : "/register"} noValidate className="bg-white px-4 py-6 rounded shadow-lg flex flex-col" onSubmit={registerHandler}>
                <article className="mb-6">
                    <h1 className="text-3xl font-medium mb-2">{props.for === "login" ? "Sign in" : "Sign up"}</h1>
                    <p className="text-slate-500">{props.for === "login" ? "Share your recipes with the world!" : "Be part of the community, and share your recipe!"}</p>
                </article>
                <div>
                    {props.for === "register" &&
                        <div className="relative pb-7">
                            <Input type="text" name="name" placeHolder="Name" success={errors?.validName!} />
                            {errors?.validName === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Must be between 3 and 20 characters</span>}
                        </div>
                    }
                    <div className="relative pb-7">
                        <Input type="email" name="email" placeHolder="Email" success={errors?.validEmail!} />
                        {errors?.validEmail === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid email</span>}
                    </div>

                    <div className="relative pb-7">
                        <Input type="password" name="password" placeHolder="Password" success={errors?.validPassword!} />
                        {errors?.validPassword === false && <span className="absolute bottom-2 left-0 text-sm text-red-700">Must be 6 characters and more</span>}
                    </div>
                </div>

                {props.for === "login" &&
                    <div className="flex mb-2">
                        <Link to={"/forget-password"} className="text-amber-700 font-medium">Forgot password?</Link>
                    </div>
                }
                <button className="bg-amber-700 text-white py-2 rounded font-medium tracking-wide flex justify-center">
                    {mutation.isLoading ?
                        <ImSpinner2 className="animate-spin text-2xl" />
                        :
                        props.for === "login" ? "Sign in" : "Sign up"
                    }
                </button>

            </form>
        </section>
    )
}

export default Form