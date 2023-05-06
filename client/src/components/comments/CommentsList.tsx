import Comment from "./Comment"

const CommentsList = () => {
    return (
        <ul className="flex flex-col gap-4">
            <Comment comment={{
                _id: "1",
                content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                createdAt: new Date(Date.now()),
                edited: false,
                likes: 5,
                publisher: false,
                profile: "https://res.cloudinary.com/dqfrgtxde/image/upload/v1682626657/recipe-sharing-app/recipes/17tootired-grilled-cheese-articleLarge_ylryze.jpg",
                user: { name: "amyrobson", role: "user" },
                userLike: [{ user: "Mali", isLike: false }]
            }} />
            <Comment comment={{
                _id: "2",
                content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible.",
                createdAt: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
                edited: true,
                likes: 36,
                publisher: true,
                profile: "https://res.cloudinary.com/dqfrgtxde/image/upload/v1682521049/recipe-sharing-app/profiles/default-profile-picture.jpg",
                user: { name: "maxblagun", role: "admin" },
                userLike: [{ user: "Mali", isLike: true }]
            }} />
        </ul>
    )
}

export default CommentsList