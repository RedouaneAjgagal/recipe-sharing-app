import PrimaryBtn from "../../UI/PrimaryBtn";
import { useNavigate, useLocation } from "react-router-dom";

const RecipeNav = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const popularHandler = () => {
        navigate("/");
    }

    const newestHandler = () => {
        navigate("/?sort=newest");
    }

    const addRecipeHandler = () => {
        console.log("addRecipe");
    }

    const isNewest = new URLSearchParams(location.search).get("sort") === "newest";

    return (
        <div className="flex justify-between mt-8 mb-5">
            <div className="flex items-center gap-2">
                <PrimaryBtn onClick={popularHandler} style={`${isNewest ? "white" : "black"}`}>Popular</PrimaryBtn>
                <PrimaryBtn onClick={newestHandler} style={`${isNewest ? "black" : "white"}`}>Newest</PrimaryBtn>
            </div>
            <PrimaryBtn onClick={addRecipeHandler} style="orange">ADD RECIPE</PrimaryBtn>
        </div>
    )
}

export default RecipeNav