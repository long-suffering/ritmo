import { createBrowserRouter } from "react-router-dom";

import { LessonPage, MainPage } from "../pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (<MainPage/>),
  },
  {
    path: "/lesson/:id",
    element: <LessonPage/>,
  },
]);