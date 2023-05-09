import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import ManageMovies from "./pages/manage-movies/ManageMovies";
import AddMovie from "./pages/manage-movies/AddMovie";
import UpdateMovie from "./pages/manage-movies/UpdateMovie";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import ManageUserPage from "./pages/ManageUser/ManageUserPage";
import UpdateUser from "./pages/ManageUser/UpdateUser";
import AddApplicant from "./pages/ManageUser/AddAplicant";
import ManageJobs from "./pages/ManageJobs/ManageJobs";
import ManageQualification from "./pages/manageQualifications/manageQualifications";
import AddQualification from "./pages/manageQualifications/addQualification";
import UpdateQualification from "./pages/manageQualifications/updateQualification";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":id",
        element: <MovieDetails />,
      },
      {
        path:"manage-user" , 
        element:<ManageUserPage />
      },
      {
        path:"update/:id", 
        element :<UpdateUser />
      },
      {
        path :"manage-qual" ,
        element : <ManageQualification />
      },
      {
        path :"manage-user/add" ,
        element :<AddApplicant />
      },
      {
        path :"manage-jobs",
        element :<ManageJobs />
      },
      {
        path : "add-qual" ,
        element : <AddQualification />
      },
      {
        path : "update-qual/:id" ,
        element : <UpdateQualification />
      },

      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/manage-movies",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageMovies />,
          },
          {
            path: "add",
            element: <AddMovie />,
          },
          {
            path: ":id",
            element: <UpdateMovie />,
          },
          
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
