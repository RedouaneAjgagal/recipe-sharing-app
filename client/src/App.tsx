import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as authLoader } from "./pages/Root";
import Home, { loader as recipes } from "./pages/Home";
import Recipe, { loader as recipeDetails } from "./pages/Recipe";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import ForgetPassword, { action as forgetPasswordAction } from "./pages/ForgetPassword";
import ResetPassword, { action as resetPasswordAction } from "./pages/ResetPassword";
import NewRecipe, { action as createRecipeAction } from "./pages/NewPrecipe";
import UpdateRecipe, { action as updateRecipeAction, loader as recipeDetailsLoader } from "./pages/UpdateRecipe";
import { action as postCommentAction } from "./components/comments";
import logoutAction from "./utils/logout";
import Profile, { loader as profileLoader } from "./pages/Profile";
import Settings, { action as updateProfileAction } from "./pages/Settings";
import UserRecipes, { action as userRecipesAction, loader as userRecipesLoader } from "./pages/ProfileRecipes";
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
          element: <Recipe />,
          loader: recipeDetails,
          action: postCommentAction
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
                  action: userRecipesAction,
                  loader: userRecipesLoader
                },
                {
                  path: "new-recipe",
                  element: <NewRecipe />,
                  action: createRecipeAction
                },
                {
                  path: "edit",
                  element: <UpdateRecipe />,
                  action: updateRecipeAction,
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
