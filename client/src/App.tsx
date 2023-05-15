import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as recipes } from "./pages/Home";
import Recipe, { loader as recipeDetails } from "./pages/Recipe";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import ForgetPassword, { action as forgetPasswordAction } from "./pages/ForgetPassword";
import ResetPassword, { action as resetPasswordAction } from "./pages/ResetPassword";
import NewRecipe, { action as createRecipeAction } from "./pages/NewPrecipe";
import UpdateRecipe, {action as updateRecipeAction} from "./pages/UpdateRecipe";


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
          path: "login",
          element: <Login />,
          action: loginAction
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
          action: forgetPasswordAction
        },
        {
          path: "user/reset-password",
          element: <ResetPassword />,
          action: resetPasswordAction
        },
        {
          path: "recipes/:recipeId",
          loader: recipeDetails,
          id: "recipeDetails",
          children: [
            {
              index: true,
              element: <Recipe />
            },
            {
              path: "update",
              element: <UpdateRecipe />,
              action: updateRecipeAction
            }
          ]
        },
        {
          path: "profile",
          element: null,
          children: [
            {
              path: "new-recipe",
              element: <NewRecipe />,
              action: createRecipeAction
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
