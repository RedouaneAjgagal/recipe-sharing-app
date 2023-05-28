import url from "../config/url";

const updateComment = async (updatedContent: string, commentId: string) => {
    const response = await fetch(`${url}/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: updatedContent })
    });
    const data = await response.json();
    if (!response.ok) {
        return { msg: data.msg } as { msg: string}
    }
    return data.updatedComment
}

export default updateComment;