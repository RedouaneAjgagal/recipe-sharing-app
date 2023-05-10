import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as recipes } from "./pages/Home";
import Recipe, { loader as recipeDetails } from "./pages/Recipe";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import ForgetPassword, { action as forgetPasswordAction } from "./pages/ForgetPassword";
import ResetPassword, { action as resetPasswordAction } from "./pages/ResetPassword";
import NewRecipe from "./pages/NewPrecipe";

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
          action: registerAction
        },
        {
          path: "/forget-password",
          element: <ForgetPassword />,
          action: forgetPasswordAction
        },
        {
          path: "/user/reset-password",
          element: <ResetPassword />,
          action: resetPasswordAction
        },
        {
          path: "/recipes/:recipeId",
          element: <Recipe />,
          loader: recipeDetails
        },
        {
          path: "/profile",
          element: null,
          children: [
            {
              path: "new-recipe",
              element: <NewRecipe />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
