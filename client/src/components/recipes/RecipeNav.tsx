import PrimaryBtn from "../../UI/PrimaryBtn";

const RecipeNav = () => {

    const popularHandler = () => {
        console.log("popular");
    }
    const newestHandler = () => {
        console.log("newest");
    }
    const addRecipeHandler = () => {
        console.log("addRecipe");
    }

    return (
        <div className="flex justify-between mt-8 mb-5">
            <div className="flex items-center gap-2">
                <PrimaryBtn onClick={popularHandler} style="black">Popular</PrimaryBtn>
                <PrimaryBtn onClick={newestHandler} style="white">Newest</PrimaryBtn>
            </div>
            <PrimaryBtn onClick={addRecipeHandler} style="orange">ADD RECIPE</PrimaryBtn>
        </div>
    )
}

export default RecipeNav