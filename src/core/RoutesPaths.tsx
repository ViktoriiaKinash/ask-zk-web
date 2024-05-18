import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = React.lazy(() => import("../login"));
const CreateSurvey = React.lazy(() => import("../create-survey"));
const Preview = React.lazy(() => import("../preview"));
const Submit = React.lazy(() => import("../submit"));
const Home = React.lazy(() => import("../home"));

const RoutesPaths = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-survey",
    element: <CreateSurvey />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
  {
    path: "/submit",
    element: <Submit />,
  },
]);

export default RoutesPaths;
