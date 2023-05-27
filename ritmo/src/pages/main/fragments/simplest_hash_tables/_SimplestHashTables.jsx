import React, { useMemo } from "react";

import { LessonPane } from "../lesson_pane";
import { lessonList } from "./_constants";

export const SimplestHashTables = () => {
  const simplifiedHashCollisions = useMemo(() => lessonList.simplified_hash_collisions, [])
  const simplifiedHashCreate = useMemo(() => lessonList.simplified_hash_create, [])
  const simplifiedHashSearch = useMemo(() => lessonList.simplified_hash_search, [])

  return (
    <div className="section">
      <h1>Простейшие хеш-таблицы</h1>
      <div className="lesson-pane-stack">
        <LessonPane lesson={simplifiedHashCollisions} />
        <div className="placeholder" />
      </div>
      <div className="lesson-pane-stack">
        <div className="placeholder" />
        <LessonPane lesson={simplifiedHashCreate} />
      </div>
      <div className="lesson-pane-stack">
        <LessonPane lesson={simplifiedHashSearch} />
        <div className="placeholder" />
      </div>
    </div>
  )
};
