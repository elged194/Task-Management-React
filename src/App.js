import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/Sign-in/signIn";
import SignUp from "./pages/signUp";
import ErrorPage from './pages/Error/ErrorPage';
// ---------------------------------------------------------------------
import { useContext } from "react";
import ThemeContext from "./comp/darkMode";
import EditTask from "./pages/EditTask/EditTask";
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>,
  },

  {
    path: "/About",
    element: <About />,
  },

  {
    path: "/signIn",
    element: <SignIn />,
  },

  {
    path: "/signUp",
    element: <SignUp />,
  },

  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/EditTask/:stringId",
    element: <EditTask />,
  },
]);
// ---------------------------------------------------------------------

function App() {
  const { mode } = useContext(ThemeContext)
  return (
    <div className={mode}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
