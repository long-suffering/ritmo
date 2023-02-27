import React from "react";

import {LessonPane} from './fragment'
import "./_home_page.css"

export const HomePage = () => {
  return (
    <div className="frontpage">
      <div className="section">
        <h1>Сортировки</h1>
        <div className="pane-collection sorts-collection">
          <div className="sort-1">
            <LessonPane lessonId="bubble_sort" />
          </div>
          <div className="sort-2">
            <LessonPane lessonId="quick_sort" />
          </div>
        </div>
      </div>

      {/*<div className="section">*/}
      {/*  <h1>Простейшие хеш-таблицы</h1>*/}
      {/*  <div className="pane-collection simplified-hash-collection">*/}
      {/*    <div className="simplified-hash-collection-left">*/}
      {/*      <LessonPane lessonId="simplified_hash_collisions" />*/}
      {/*    </div>*/}
      {/*    <div className="simplified-hash-collection-right">*/}
      {/*      <LessonPane lessonId="simplified_hash_create" />*/}
      {/*      <LessonPane lessonId="simplified_hash_search" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="section">*/}
      {/*  <h1>Хеш-таблицы с открытой адресацией</h1>*/}
      {/*  <div className="pane-collection hash-collection">*/}
      {/*    <div className="hash-collection-top">*/}
      {/*      <LessonPane lessonId="hash_create" />*/}
      {/*      <LessonPane lessonId="hash_search" />*/}
      {/*    </div>*/}
      {/*    <div className="hash-collection-bottom">*/}
      {/*      <LessonPane lessonId="hash_remove" />*/}
      {/*      <LessonPane lessonId="hash_resize" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<Footer />*/}
    </div>
  )
}
