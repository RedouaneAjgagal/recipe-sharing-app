import { BsStarFill, BsStar } from "react-icons/bs";
import StatusResponse from "../StatusResponse";
import rateRecipe from "../../features/rateRecipe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStatusResponse from "../../hooks/useStatusResponse";
import { ImSpinner2 } from "react-icons/im";

interface Props {
    recipeId: string;
    ratedValue: number;
}

const Rate = (props: React.PropsWithoutRef<Props>) => {

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: rateRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries(["recipe", { recipeId: props.recipeId }]);
        }
    });

    const rateHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const rate = e.currentTarget.value;
        mutation.mutate({ recipeId: props.recipeId, rateNum: Number(rate) })
    }

    const stars = Array.from({ length: 5 }, (_, i) => {
        if (props.ratedValue > i) {
            return <button key={i} onClick={rateHandler} value={i + 1}><BsStarFill className="p-1" /></button>
        } else {
            return <button key={i} onClick={rateHandler} value={i + 1}><BsStar className="p-1" /></button>
        }
    });

    const isError = useStatusResponse(mutation.isError);

    return (
        <>
            {isError && <StatusResponse message={(mutation.error as Error)?.message} success={false} />}
            <section className="mt-6" id="rate">
                <h2 className="text-2xl text-slate-700 font-medium tracking-wide pb-2">Rate this recipe?</h2>
                <p>Share with us your opinion and rate it</p>
                <div className="flex items-center text-[2rem] py-3 text-amber-900">
                    {mutation.isLoading ?
                        <ImSpinner2 className="animate-spin text-3xl" />
                        :
                        stars
                    }
                </div>
            </section>
        </>
    )
}

export default Rate