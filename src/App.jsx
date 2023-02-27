import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { initUxSettings, routing } from "./constants";

export const App = () => {
  useEffect(() => {
    initUxSettings()
  }, [])

  return (
    <RouterProvider router={routing} />
  )
}
