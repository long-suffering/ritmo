export const lessonList = {
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
    //
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
}