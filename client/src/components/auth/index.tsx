import Form from './Form'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UUser } from '../../pages/Root';

interface Props {
    for: "login" | "register"
}

const Auth = (props: React.PropsWithoutRef<Props>) => {
    const isAuthenticated = useQuery(["authentication"]);
    const userData = isAuthenticated.data as { user: UUser };

    const navigate = useNavigate();

    useEffect(() => {
        if (userData && isAuthenticated.isSuccess) {
            navigate("/profile");
        }
    }, [userData, isAuthenticated.isSuccess]);

    return (
        <>
            {isAuthenticated.isError ?
                <div className="flex flex-col min-h-[75vh] justify-center items-center p-4">
                    <Form for={props.for} />
                    {props.for === "login" ?
                        <p className="mt-4 text-black">You dont have an account yet? <Link to={"/register"} className="text-amber-700 font-medium">Join now</Link></p>
                        :
                        <p className="mt-4 text-black">You already have an account? <Link to={"/login"} className="text-amber-700 font-medium">Login now</Link></p>
                    }
                </div>
                :
                null}
        </>
    )
}

export default Auth