import PrimaryBtn from "../../UI/PrimaryBtn"
import { useNavigate } from "react-router-dom"
import { AiFillCaretLeft } from "react-icons/ai";

const CreateRecipeNav = () => {
    const navigate = useNavigate();

    const backHandler = () => {
        navigate('..');
    }

    return (
        <div className="my-4">
            <PrimaryBtn style="black" onClick={backHandler}><AiFillCaretLeft className="-mb-[.1rem]" /> Go back</PrimaryBtn>
        </div>
    )
}

export default CreateRecipeNav