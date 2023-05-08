import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as recipes } from "./pages/Home";
import Recipe, { loader as recipeDetails } from "./pages/Recipe";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action } from "./pages/Register";

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
          path: "/login",
          element: <Login />,
          action: loginAction
        },
        {
          path: "/register",
          element: <Register />,
          action: action
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
