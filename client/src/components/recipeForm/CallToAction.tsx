import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';

interface Props {
  for: "newRecipe" | "updateRecipe"
}

const CallToAction = (props: React.PropsWithoutRef<Props>) => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const cancelHandler = () => {
    navigate({ pathname: `/recipes/${recipeId}` });
  }

  return (
    <div className={`py-4 grid gap-2 ${props.for === "newRecipe" ? "grid-cols-2" : "grid-cols-3 fixed bottom-0 left-0 w-full bg-white px-2"}`}>
      {props.for === "updateRecipe" && <button onClick={cancelHandler} className='w-full text-slate-500 py-2 rounded font-medium tracking-wide' type="button">Cancel</button>}
      <button className='bg-amber-700 col-span-2 w-full text-white py-2 rounded font-medium tracking-wide'>{props.for === "newRecipe" ? "Sumbit" : "Update"}</button>
    </div>
  )
}

export default CallToAction