import { useLoaderData } from "react-router-dom"
import UserImage from "./UserImage"
import { ProfileData } from "../../pages/Settings";
import InputContainer from "./InputContainer";
import MealsList from "./MealsList";
import PrimaryBtn from "../../UI/PrimaryBtn";
import { useFetcher } from "react-router-dom";

const ProfileSettings = () => {
  const profileData = useLoaderData() as ProfileData;
  const fetcher = useFetcher();


  const updateProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("favouriteMeals", profileData.favouriteMeals.toString());
    fetcher.submit(formData, { method: "PATCH" });
  }

  return (
    <fetcher.Form className="flex flex-col gap-4" onSubmit={updateProfileHandler}>
      <div className="bg-white p-4 rounded border">
        <h1 className="font-medium tracking-wider text-xl mb-3">PERSONAL</h1>
        <div className="flex flex-col gap-4">
          <UserImage profilePicture={profileData.picture} alt={`${profileData.user.name}'s profile picture`} />
          <InputContainer label="Name" value={profileData.user.name} type="text" />
          <InputContainer label="Email" value={profileData.user.email} type="email" readOnly />
          <InputContainer label="Bio" value={profileData.bio} type="texterea" />
          <MealsList meals={profileData.favouriteMeals} submit={fetcher.state} />
        </div>
      </div>
      <div className="flex justify-end">
        <PrimaryBtn disabled={fetcher.state !== "idle"} style="orange">Update Profile</PrimaryBtn>
      </div>
    </fetcher.Form>
  )
}

export default ProfileSettings