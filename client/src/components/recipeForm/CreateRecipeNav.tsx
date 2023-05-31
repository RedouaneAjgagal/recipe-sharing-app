import PrimaryBtn from "../../UI/PrimaryBtn"
import { useNavigate } from "react-router-dom"
import { AiFillCaretLeft } from "react-icons/ai";

const CreateRecipeNav = () => {
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(-1);
    }

    return (
        <div className="m-4 w-36">
            <PrimaryBtn style="black" onClick={backHandler}><AiFillCaretLeft /> Go back</PrimaryBtn>
        </div>
    )
}

export default CreateRecipeNav