import PrimaryBtn from "../../UI/PrimaryBtn";
import { useNavigate, useSearchParams } from "react-router-dom";

const RecipeNav = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const isNewest = searchParams.get("sort") === "newest";

    const popularHandler = () => {
        setSearchParams((prev) => {
            prev.delete("sort");
            return prev;
        })
    }

    const newestHandler = () => {
        setSearchParams((prev) => {
            prev.set("sort", "newest");
            return prev;
        });
    }

    const addRecipeHandler = () => {
        navigate("/profile/recipes/new-recipe");
    }

    return (
        <div className="flex justify-between mt-8 mb-5">
            <div className="flex items-center gap-2">
                <PrimaryBtn onClick={popularHandler} style={`${isNewest ? "white" : "black"}`}>Popular</PrimaryBtn>
                <PrimaryBtn onClick={newestHandler} style={`${isNewest ? "black" : "white"}`}>Newest</PrimaryBtn>
            </div>
            <div>
                <PrimaryBtn onClick={addRecipeHandler} style="orange">ADD RECIPE</PrimaryBtn>
            </div>
        </div>
    )
}

export default RecipeNav