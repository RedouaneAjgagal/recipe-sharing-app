import { useQuery } from "@tanstack/react-query"
import { useSearchParams, useNavigate } from "react-router-dom"
import verifyEmail from "../fetchers/verifyEmail";
import Loading from "../UI/Loading";
import PrimaryBtn from "../UI/PrimaryBtn";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const verifyEmailQuery = useQuery({
        queryKey: ["verifyEmail"],
        queryFn: () => verifyEmail(token, email),
        refetchOnWindowFocus: false
    });

    const goHomeHandler = () => {
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            {verifyEmailQuery.isLoading ?
                <div className="mb-10">
                    <Loading />
                </div>
                :
                (verifyEmailQuery.isError ?
                    <div className="p-4 rounded text-center bg-red-300">
                        <p>{(verifyEmailQuery.error as Error)?.message}</p>
                    </div>
                    :
                    <div className="flex flex-col gap-4">
                        <div className="p-4 rounded text-center bg-green-300">
                            <p>{verifyEmailQuery.data}</p>
                        </div>
                        <div className="w-24">
                            <PrimaryBtn style="black" onClick={goHomeHandler}>Go Home</PrimaryBtn>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default VerifyEmail