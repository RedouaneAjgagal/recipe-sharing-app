import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as authLoader } from "./pages/Root";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import NewRecipe from "./pages/NewPrecipe";
import UpdateRecipe from "./pages/UpdateRecipe";
import logoutAction from "./utils/logout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import UserRecipes from "./pages/ProfileRecipes";
import UsersProfile from "./pages/UsersProfile";


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
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "user/reset-password",
          element: <ResetPassword />
        },
        {
          path: "recipes/:recipeId",
          element: <Recipe />
        },
        {
          path: "profile",
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
                  element: <UserRecipes />
                },
                {
                  path: "new-recipe",
                  element: <NewRecipe />
                },
                {
                  path: "edit",
                  element: <UpdateRecipe />
                }
              ]
            },
            {
              path: "settings",
              element: <Settings />
            },
            {
              path: "logout",
              action: logoutAction
            }
          ]
        },
        {
          path: "users/:profileId",
          element: <UsersProfile />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
