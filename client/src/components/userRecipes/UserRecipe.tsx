import { BiDotsVerticalRounded, BiX } from "react-icons/bi";
import { useState } from "react";
import DeleteComment from "../comments/DeleteComment";
import UpdateComment from "../comments/UpdateComment";
import { Link, useSubmit } from "react-router-dom";

interface Props {
    id: string;
    image: string
    title: string;
}

const UserRecipe = (props: React.PropsWithoutRef<Props>) => {
    const [isOpen, setIsOpen] = useState(false);
    const submit = useSubmit();
    const openSettingHandler = () => {
        setIsOpen(prev => !prev);
    }

    const updateHandler = () => {
        const formData = new FormData();
        formData.append("recipeId", props.id);
        submit(formData, { method: "GET", action: "/profile/recipes/edit", replace: false });
    }

    return (
        <div className="bg-white grid grid-cols-3 rounded shadow-sm relative">
            <Link to={`/recipes/${props.id}`} className="min-h-full h-20 w-full col-span-1">
                <img className="w-full h-full object-cover rounded-l" src={props.image} alt={props.title} />
            </Link>
            <div className="col-span-2 flex items-center justify-between p-2">
                {isOpen ?
                    <div className="flex items-center gap-2">
                        <DeleteComment recipeId={props.id} />
                        <UpdateComment onClick={updateHandler} />
                    </div>
                    :
                    <h2 className="font-medium text-lg">{props.title}</h2>
                }
                <button onClick={openSettingHandler} className="text-2xl text-amber-600 h-full">
                    {isOpen ? <BiX /> : <BiDotsVerticalRounded />}
                </button>
            </div>
        </div>
    )
}

export default UserRecipe