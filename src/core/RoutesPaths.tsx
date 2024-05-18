import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { FillSurvey } from "../fill-survey/FillSurvey";

const Login = React.lazy(() => import("../login"));
const CreateSurvey = React.lazy(() => import("../create-survey"));
const Preview = React.lazy(() => import("../preview"));
const Submit = React.lazy(() => import("../submit"));
const Home = React.lazy(() => import("../home"));
const Results = React.lazy(() => import("../results"));

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
  {
    path: "/view-results",
    element: <Submit />,
  },
  {
    path: "/results",
    element: <Results />,
  },
  {
    path: "/fill-survey/",
    element: <FillSurvey />,
  },
]);

export default RoutesPaths;
