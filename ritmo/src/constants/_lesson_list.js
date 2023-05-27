import * as React from "react";

import { bubbleSort } from '../algorithms'

export const lessonList = {
  bubble_sort: { ...bubbleSort },

  quick_sort: {
    mainPagePaneHeaderTitle: "Быстрая",
    mainPagePaneClassName: "quick-sort",
    playerHeaderTitle: "быструю сортировку",
    mobilePlayerHeaderTitle: "Быстрая сортировка",
    resetToZero: true,
    route: 'quick_sort',
    // getBreakpoints: (numbers) => {
    //   return runQuickSort(numbers.map((n) => n.toNumber())).bp;
    // },
    // inputs: [SORTS_LIST_INPUT],
    // formatBpDesc: formatQuickSort,
    // stateVisualization: QuickSortVisualisation,
    // code: QUICK_SORT_CODE,

    // theory: <QuickSortTheory />,
  },
  linear_search: {
    mainPagePaneHeaderTitle: "Линейный поиск",
    mainPagePaneClassName: "linear-search",
    playerHeaderTitle: "линейный поиск",
    mobilePlayerHeaderTitle: "Линейный поиск",
    resetToZero: true,
    route: 'linear_search',
    // code: SIMPLE_LIST_SEARCH,
    // breakpoints: slsRes.bp,
    // formatBpDesc: formatSimpleListSearchBreakpointDescription,
    // stateVisualization: SimpleListSearchStateVisualization,
  },
  simplified_hash_collisions: {
    mainPagePaneHeaderTitle: "Коллизии",
    mainPagePaneClassName: "simplified-hash-collisions",
    playerHeaderTitle: "коллизии в хеш-таблицах",
    resetToZero: true,
    route: 'simplified_hash_collisions',
    // code: SIMPLIFIED_INSERT_ALL_BROKEN_CODE,
    // getBreakpoints: (original_list) => {
    //   return chapter1.runSimplifiedInsertAllBroken(original_list).bp;
    // },
    // inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
    // formatBpDesc: formatSimplifiedInsertAllDescription,
    // stateVisualization: SimplifiedInsertBrokenStateVisualization,
    //
    // theory: <CollisionsTheory />,
  },
  simplified_hash_create: {
    mainPagePaneHeaderTitle: 'Создание',
    mainPagePaneClassName: 'simplified-hash-create',
    playerHeaderTitle: 'создание простейшей хеш-таблицы',
    resetToZero: true,
    route: 'simplified_hash_create',
    // code: SIMPLIFIED_INSERT_ALL_CODE,
    // getBreakpoints: (original_list) => chapter1.runSimplifiedInsertAll(original_list).bp,
    // inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
    // formatBpDesc: formatSimplifiedInsertAllDescription,
    // stateVisualization: SimplifiedInsertStateVisualization,
    //
    // theory: <SimplifiedHashTheory active="simplified_hash_create" />,
  },
  simplified_hash_search: {
    mainPagePaneHeaderTitle: 'Поиск',
    mainPagePaneClassName: 'simplified-hash-search',
    playerHeaderTitle: 'поиск в простейшей хеш-таблице',
    resetToZero: true,
    route: 'simplified_hash_search',
    // code: SIMPLIFIED_SEARCH_CODE,
    // getBreakpoints: (original_list, number) => {
    //   const keys = chapter1.runSimplifiedInsertAll(original_list).keys;
    //   return chapter1.runSimplifiedSearch(keys, number).bp;
    // },
    // inputs: [
    //   SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT,
    //   {
    //     label: 'number',
    //     type: 'int',
    //     id: 'simplified-hash-search-number',
    //     default: '25',
    //   },
    // ],
    // formatBpDesc: formatSimplifiedSearchDescription,
    // stateVisualization: SimplifiedSearchStateVisualization,
    //
    // theory: <SimplifiedHashTheory active="simplified_hash_search" />,
  },
  hash_create: {
    mainPagePaneHeaderTitle: 'Создание',
    mainPagePaneClassName: 'hash-create',
    playerHeaderTitle: 'создание хеш-таблицы',
    resetToZero: true,
    route: 'hash_create',
    // code: HASH_CREATE_NEW_CODE,
    // getBreakpoints: (from_keys) => {
    //   return chapter2.runCreateNew(from_keys).bp;
    // },
    // inputs: [HASH_FROM_KEYS_INPUT],
    // formatBpDesc: formatHashCreateNewAndInsert,
    // stateVisualization: HashCreateNewStateVisualization,
    //
    // theory: <HashTheory />,
  },
  hash_search: {
    mainPagePaneHeaderTitle: 'Поиск',
    mainPagePaneClassName: 'hash-search',
    playerHeaderTitle: 'поиск в хеш-таблице',
    resetToZero: true,
    route: 'hash_search',
    // code: HASH_SEARCH_CODE,
    // getBreakpoints: (from_keys, key) => {
    //   const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
    //   return chapter2.runSearch(hashCodes, keys, key).bp;
    // },
    // inputs: [
    //   HASH_FROM_KEYS_INPUT,
    //   {
    //     label: 'key',
    //     type: 'int_str_none',
    //     id: 'hash-search-key',
    //     default: "'less'",
    //   },
    // ],
    // formatBpDesc: formatHashRemoveSearch,
    // stateVisualization: HashNormalStateVisualization,
    //
    // theory: <HashTheory />,
  },
  hash_remove: {
    mainPagePaneHeaderTitle: 'Удаление',
    mainPagePaneClassName: 'hash-remove',
    playerHeaderTitle: 'удаление из хеш-таблицы',
    resetToZero: true,
    route: 'hash_remove',
    // code: HASH_REMOVE_CODE,
    // getBreakpoints: (from_keys, key) => {
    //   const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
    //   return chapter2.runRemove(hashCodes, keys, key).bp;
    // },
    // inputs: [
    //   HASH_FROM_KEYS_INPUT,
    //   {
    //     label: 'key',
    //     type: 'int_str_none',
    //     id: 'hash-remove-key',
    //     default: "'ps'",
    //   },
    // ],
    // formatBpDesc: formatHashRemoveSearch,
    // stateVisualization: HashNormalStateVisualization,
    // theory: <HashTheory />,
  },
  hash_resize: {
    mainPagePaneHeaderTitle: 'Расширение',
    mainPagePaneClassName: 'hash-resize',
    playerHeaderTitle: 'расширение хеш-таблицы',
    resetToZero: true,
    route: 'hash_resize',
    // code: HASH_RESIZE_CODE,
    // getBreakpoints: (from_keys) => {
    //   const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
    //   return chapter2.runResize(hashCodes, keys).bp;
    // },
    // inputs: [HASH_FROM_KEYS_INPUT],
    // formatBpDesc: formatHashResize,
    // stateVisualization: HashResizeStateVisualization,
    //
    // theory: <HashTheory />,
  },
};