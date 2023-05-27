import React from "react";
import { Link } from "react-router-dom";

export const LessonPane = ({ lesson }) => {
  return (
    <Link
      to={`/lesson/${lesson.route}`}
      className={`pane ${lesson.mainPagePaneClassName}`}
    >
      <span children={lesson.mainPagePaneHeaderTitle}/>
    </Link>
  )
}