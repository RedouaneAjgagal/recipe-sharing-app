import { BiDotsVerticalRounded, BiX } from "react-icons/bi";
import { useState } from "react";
import DeleteComment from "../comments/DeleteComment";
import UpdateComment from "../comments/UpdateComment";

interface Props {
    image: string
    title: string;
}

const UserRecipe = (props: React.PropsWithoutRef<Props>) => {
    const [isOpen, setIsOpen] = useState(false);
    const openSettingHandler = () => {
        setIsOpen(prev => !prev);
    }

    const updateHandler = () => {

    }

    return (
        <div className="bg-white grid grid-cols-3 rounded shadow-sm relative">
            <div className="min-h-full h-20 w-full col-span-1">
                <img className="w-full h-full object-cover rounded-l" src={props.image} alt={props.title} />
            </div>
            <div className="col-span-2 flex items-center justify-between p-2">
                {isOpen ?
                    <div className="flex items-center gap-4">
                        <DeleteComment commentId="fdsj" />
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