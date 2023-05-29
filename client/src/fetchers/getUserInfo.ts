import url from "../config/url";

const getUserInfo = async (profileId: string) => {
    const response = await fetch(`${url}/user/${profileId}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export default getUserInfo;