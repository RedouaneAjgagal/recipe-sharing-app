import { ActionFunction } from "react-router-dom"
import UserRecipes from "../components/userRecipes"

const ProfileRecipes = () => {
    return (
        <UserRecipes />
    )
}

export default ProfileRecipes

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("commentId")
    console.log(id);
    
    return null
}