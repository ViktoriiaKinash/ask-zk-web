import RoutesPaths from "./core/RoutesPaths";
import React from "react";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <React.Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={RoutesPaths} />
      </React.Suspense>
    </React.StrictMode>
  );
}

export default App;
