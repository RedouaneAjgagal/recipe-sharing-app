import Ratings from "./Ratings"
import BookMark from "./BookMark"
import Publisher from "./Publisher"

interface Props {
  avgRating: number;
  publisher: {
    name: string;
    picture: string;
  },
  updatedAt: Date
}

const RecipeDetailsNav = (props: React.PropsWithoutRef<Props>) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Publisher publisher={props.publisher} updatedAt={props.updatedAt} />
        <Ratings avgRating={props.avgRating} />
      </div>
      <BookMark />
    </div>
  )
}

export default RecipeDetailsNav