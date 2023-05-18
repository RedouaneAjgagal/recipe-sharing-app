import { BsStarFill, BsStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import url from "../../config/url";
import StatusResponse from "../StatusResponse";
import { useState } from "react";

interface Props {
    recipeId: string;
    ratedValue: number;
}

const Rate = (props: React.PropsWithoutRef<Props>) => {
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const rateHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const rate = Number(e.currentTarget.value);
        const response = await fetch(`${url}/rates`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ recipe: props.recipeId, rate })
        });
        const data = await response.json();
        if (!response.ok) {
            setErrorMsg(data.msg);
        }
        navigate("");
    }
    
    const unRatedStars = Array.from({ length: 5 }, (_, i) => {
        if (props.ratedValue > i) {
            return <button key={i} onClick={rateHandler} value={i + 1}><BsStarFill className="p-1" /></button>
        } else {
            return <button key={i} onClick={rateHandler} value={i + 1}><BsStar className="p-1" /></button>
        }
    });

    return (
        <>
            {errorMsg && <StatusResponse message={errorMsg} success={false} />}
            <section className="mt-6">
                <h2 className="text-2xl text-slate-700 font-medium tracking-wide pb-2">Rate this recipe?</h2>
                <p>Share with us your opinion and rate it</p>
                <div className="flex items-center text-[2rem] py-3 text-amber-900">
                    {unRatedStars}
                </div>
            </section>
        </>
    )
}

export default Rate