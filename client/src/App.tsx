import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as recipes } from "./pages/Home";
import Recipe, {loader as recipeDetails} from "./pages/Recipe";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: recipes
        },
        {
          path: "/recipes/:recipeId",
          element: <Recipe />,
          loader: recipeDetails
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
