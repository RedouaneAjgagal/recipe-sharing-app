import url from "../config/url";

const likeComment = async (commentId: string) => {
    // like comment request
    const response = await fetch(`${url}/comments/${commentId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg)
    }
    return data.msg;
}

export default likeComment;