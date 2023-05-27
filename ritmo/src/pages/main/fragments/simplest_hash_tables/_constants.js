export const lessonList = {
  simplified_hash_collisions: {
    mainPagePaneHeaderTitle: 'Коллизии',
    mainPagePaneClassName: 'simplified-hash-collisions',
    playerHeaderTitle: 'коллизии в хеш-таблицах',
    resetToZero: true,
    route: 'simplified_hash_collisions',
    // code: SIMPLIFIED_INSERT_ALL_BROKEN_CODE,
    // getBreakpoints: (original_list) => {
    //   return chapter1.runSimplifiedInsertAllBroken(original_list).bp;
    // },
    // inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
    // formatBpDesc: formatSimplifiedInsertAllDescription,
    // stateVisualization: SimplifiedInsertBrokenStateVisualization,
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
    //
    // inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
    // formatBpDesc: formatSimplifiedInsertAllDescription,
    // stateVisualization: SimplifiedInsertStateVisualization,
    // theory: <SimplifiedHashTheory active="simplified_hash_create" />,
  },
  simplified_hash_search: {
    mainPagePaneHeaderTitle: 'Поиск',
    mainPagePaneClassName: 'simplified-hash-search',
    playerHeaderTitle: 'поиск в простейшей хеш-таблице',
    resetToZero: true,
    route: 'simplified_hash_search'
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
    // theory: <SimplifiedHashTheory active="simplified_hash_search" />,
  },
}