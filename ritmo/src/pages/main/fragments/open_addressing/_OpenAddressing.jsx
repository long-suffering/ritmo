import React, { useMemo } from "react";

import { LessonPane } from "../lesson_pane";
import { lessonList } from "./_constants";

export const OpenAddressing = () => {
  const hashCreate = useMemo(() => lessonList.hash_create, [])
  const hashSearch = useMemo(() => lessonList.hash_search, [])
  const hashRemove = useMemo(() => lessonList.hash_remove, [])
  const hashResize = useMemo(() => lessonList.hash_resize, [])

  return (
    <div className="section">
      <h1>Хеш-таблицы с открытой адресацией</h1>
      <div className="lesson-pane-stack">
        <LessonPane lesson={hashCreate} />
        <div className="placeholder" />
      </div>
      <div className="lesson-pane-stack">
        <div className="placeholder" />
        <LessonPane lesson={hashSearch} />
      </div>
      <div className="lesson-pane-stack">
        <LessonPane lesson={hashRemove} />
        <div className="placeholder" />
      </div>
      <div className="lesson-pane-stack">
        <div className="placeholder" />
        <LessonPane lesson={hashResize} />
      </div>
    </div>
  )
};
