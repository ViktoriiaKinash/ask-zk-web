import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { FillSurvey } from "../fill-survey/FillSurvey";

const CreateSurvey = React.lazy(() => import("../create-survey"));
const Home = React.lazy(() => import("../home"));
const Results = React.lazy(() => import("../results"));

const RoutesPaths = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-survey",
    element: <CreateSurvey />,
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
