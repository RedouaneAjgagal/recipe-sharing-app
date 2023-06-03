import url from "../config/url";

const postComment = async (recipeId: string, comment: string) => {
    const response = await fetch(`${url}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            recipe: recipeId,
            content: comment
        })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export default postComment;