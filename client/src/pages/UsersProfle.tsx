import { LoaderFunction, json } from "react-router-dom"
import url from "../config/url"

const UsersProfle = () => {
    return (
        <div>UsersProfle</div>
    )
}

export default UsersProfle

export const loader: LoaderFunction = async ({ params }) => {
    const { profileId } = params;
    const response = await fetch(`${url}/user/${profileId}`);
    const data = await response.json();
    if (!response.ok) {
        throw json({ msg: data.msg }, { status: response.status, statusText: response.statusText });
    }
    console.log(data);

    return null
}