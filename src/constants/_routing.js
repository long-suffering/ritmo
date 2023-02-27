import { createBrowserRouter } from "react-router-dom";
import * as React from "react";

import {HomePage, Lesson} from '../pages'

export const routing = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  }, {
    path: "/lesson/:id",
    element: <Lesson/>
  },
]);