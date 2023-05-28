import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as authLoader } from "./pages/Root";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import ForgetPassword, { action as forgetPasswordAction } from "./pages/ForgetPassword";
import ResetPassword, { action as resetPasswordAction } from "./pages/ResetPassword";
import NewRecipe from "./pages/NewPrecipe";
import UpdateRecipe, { loader as recipeDetailsLoader } from "./pages/UpdateRecipe";
import logoutAction from "./utils/logout";
import Profile, { loader as profileLoader } from "./pages/Profile";
import Settings, { action as updateProfileAction } from "./pages/Settings";
import UserRecipes, { loader as userRecipesLoader } from "./pages/ProfileRecipes";
import UsersProfile, { loader as userProfileLoader } from "./pages/UsersProfile";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: authLoader,
      id: "user",
      children: [
        {
          index: true,
          element: <Home />
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
          element: <Recipe />
        },
        {
          path: "profile",
          loader: profileLoader,
          id: "profileInfo",
          children: [
            {
              index: true,
              element: <Profile />
            },
            {
              path: "recipes",
              children: [
                {
                  index: true,
                  element: <UserRecipes />,
                  loader: userRecipesLoader
                },
                {
                  path: "new-recipe",
                  element: <NewRecipe />
                },
                {
                  path: "edit",
                  element: <UpdateRecipe />,
                  loader: recipeDetailsLoader
                }
              ]
            },
            {
              path: "settings",
              element: <Settings />,
              action: updateProfileAction
            },
            {
              path: "logout",
              action: logoutAction
            }
          ]
        },
        {
          path: "users/:profileId",
          element: <UsersProfile />,
          loader: userProfileLoader
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
