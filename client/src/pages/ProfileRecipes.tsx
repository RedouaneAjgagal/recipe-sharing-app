import UserRecipes from "../components/userRecipes";

export interface UProfileRecipes {
    _id: string;
    title: string;
    images: string[]
}

const ProfileRecipes = () => {
    return (
        <UserRecipes />
    )
}

export default ProfileRecipes;