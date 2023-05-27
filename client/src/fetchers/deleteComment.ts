import url from "../config/url";

const deleteComment = async (commentId: string) => {
    const response = await fetch(`${url}/comments/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export default deleteComment;