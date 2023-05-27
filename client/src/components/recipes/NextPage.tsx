import { BsArrowRightShort } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
interface Props {
  numOfPages: number
}

const NextPage = (props: React.PropsWithoutRef<Props>) => {

  const [searchParams, setSearchParamas] = useSearchParams();

  const currentPage = searchParams.get("page") || "1";
  const nextPage = (Number(currentPage) + 1).toString();

  const isMaxPage = props.numOfPages === Number(currentPage);

  const nextPageHandler = () => {
    setSearchParamas((prev) => {
      prev.set("page", nextPage);
      return prev;
    });
  }

  return (
    <button onClick={nextPageHandler} disabled={isMaxPage} className={`flex items-center gap-1 font-medium p-3 w-full text-[0.9rem] justify-end ${isMaxPage && "text-slate-500/60"}`}>Next<BsArrowRightShort className="mt-1" /></button>
  )
}

export default NextPage