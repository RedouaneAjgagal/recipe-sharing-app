import PrimaryBtn from "../../UI/PrimaryBtn"
import { useNavigate } from "react-router-dom"
import { AiFillCaretLeft } from "react-icons/ai";

const CreateRecipeNav = () => {
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(-1);
    }

    return (
        <div className="px-4 mt-6 w-36">
            <PrimaryBtn style="black" onClick={backHandler}><AiFillCaretLeft />Go back</PrimaryBtn>
        </div>
    )
}

export default CreateRecipeNav