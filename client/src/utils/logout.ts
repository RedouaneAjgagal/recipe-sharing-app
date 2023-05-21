import { ActionFunction, redirect } from "react-router-dom";
import url from "../config/url";

const logoutAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const prevPath = formData.get("prevPath") as string || "/";

    // logout request
    await fetch(`${url}/auth/logout`, {
        method: "GET",
        credentials: "include"
    });
    return redirect(prevPath);
}

export default logoutAction;