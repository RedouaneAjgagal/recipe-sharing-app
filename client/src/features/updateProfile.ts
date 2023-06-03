import url from "../config/url";

export const updateProfile = async (formData: FormData) => {
    const getAllMeals = formData.get("favouriteMeals")?.toString();
    const favouriteMeals = getAllMeals ? getAllMeals.split(",") : [];
    const name = formData.get("Name")!.toString();
    const bio = formData.get("Bio")!.toString();
    const picture = formData.get("image")?.toString();

    // initial errors
    let errors: { name: boolean, bio: boolean, favouriteMeals: boolean } = {
        bio: false,
        favouriteMeals: false,
        name: false
    }

    // push added meals to favourite meals
    formData.forEach((value, key) => {
        if (key.startsWith("favouriteMeal_")) {
            if (value.toString().trim() === "") return;
            favouriteMeals?.push(value as string);
        }
    });

    // Additional validation
    if (favouriteMeals && favouriteMeals.length > 15) {
        errors.favouriteMeals = true;
    }
    if (name.trim() === "") {
        errors.name = true
    }
    if (bio.trim() === "" || bio.length > 300) {
        errors.bio = true;
    }

    // if any error return errors
    if (Object.values(errors).some(value => value === true)) {
        return errors;
    }

    // update request
    const response = await fetch(`${url}/user`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, favouriteMeals, picture })
    });

    const data = await response.json();

    // if something get wong
    if (!response.ok) {
        throw new Error(data.msg);
    }

    return null
}

export default updateProfile;