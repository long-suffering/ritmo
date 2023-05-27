import React, { useMemo } from "react";

import { LessonPane } from "../lesson_pane";
import { lessonList } from "../../../../constants";

export const Sorting = () => {
  const bubbleSort = useMemo(() => lessonList.bubble_sort, [])
  const quickSort = useMemo(() => lessonList.quick_sort, [])

  return (
    <div className="section">
      <h1>Сортировки</h1>
      <div className="lesson-pane-stack">
        <LessonPane lesson={bubbleSort} />
        <div className="placeholder" />
      </div>
      <div className="lesson-pane-stack">
        <div className="placeholder" />
        <LessonPane lesson={quickSort} />
      </div>
    </div>
  )
};
