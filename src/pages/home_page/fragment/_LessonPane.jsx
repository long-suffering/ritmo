import { Link } from "react-router-dom";
import { useMemo } from "react";

import { LESSONS } from '../../../constants'

export const LessonPane = ({lessonId }) => {
  const lesson = useMemo(() => LESSONS[lessonId], []);

  if (!lesson) return null

  return (
    <Link
      to={`/lesson/${lessonId}`}
      className={`pane ${lesson.mainPagePaneClassName}`}
    >
      <h2 children={lesson.mainPagePaneHeaderTitle}/>
    </Link>
  )
}
