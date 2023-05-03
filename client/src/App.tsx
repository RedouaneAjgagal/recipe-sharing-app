import Root from "./pages/Root";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
