import { BsArrowLeftShort } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

const PreviousPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get("page") || "1";
    const previousPage = Number(currentPage) <= 1 ? "1" : (Number(currentPage) - 1).toString();



    const previousPageHandler = () => {
        setSearchParams((prev) => {
            // check if sorting already in the URL
            const isSorting = prev.has('sort');
            if (isSorting) {
                prev.set("sort", prev.get("sort")!);
            }

            // Switch to the previous page
            prev.set("page", previousPage);
            return prev
        })
    }

    return (
        <button onClick={previousPageHandler} disabled={currentPage === "1"} className={`flex items-center gap-1 font-medium p-3 w-full text-[.9rem] ${currentPage === "1" && "text-slate-500/60"}`}><BsArrowLeftShort className="mt-[.15rem]" />Previous</button>
    )
}

export default PreviousPage