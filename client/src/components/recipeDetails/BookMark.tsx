import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import url from "../../config/url";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    recipeId: string;
    isFavourited: boolean;
}

const BookMark = (props: React.PropsWithoutRef<Props>) => {
    const [isFavourite, setIsFavourite] = useState(props.isFavourited);
    const navigate = useNavigate();

    const bookmarkHandler = async () => {
        const response = await fetch(`${url}/favourite`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ recipe: props.recipeId })
        });

        // redirect unauthenticated users
        if (response.status === 401) {
            navigate("/login");
        }

        const data = await response.json() as { msg: string, added: boolean, removed: null } | { msg: string, removed: boolean, added: null };
        
        setIsFavourite(data.added ? true : false)
    }

    return (
        <button onClick={bookmarkHandler} className="flex justify-center items-center w-full max-w-[3rem] h-full min-h-[3rem] bg-white rounded-full shadow-xl text-amber-900 text-[1.55rem]">
            {isFavourite ? 
                <BsBookmarkFill />
                :
                <BsBookmark />    
        }
        </button>
    )
}

export default BookMark