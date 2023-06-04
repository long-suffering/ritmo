import {
  BUBBLE_SORT_CODE,
  BubbleSort,
  formatBubbleSort,
  formatQuickSort,
  InsertionSort,
  QUICK_SORT_CODE,
  QuickSort
} from "../new_demos";
import {
  BubbleSortTheory,
  CollisionsTheory,
  HashTheory,
  QuickSortTheory,
  SimplifiedHashTheory
} from "../theory";
import {
  Chapter1_SimplifiedHash,
  formatSimplifiedInsertAllDescription,
  formatSimplifiedSearchDescription,
  SIMPLIFIED_INSERT_ALL_BROKEN_CODE,
  SIMPLIFIED_INSERT_ALL_CODE,
  SIMPLIFIED_SEARCH_CODE,
  SimplifiedInsertBrokenStateVisualization,
  SimplifiedInsertStateVisualization,
  SimplifiedSearchStateVisualization
} from "../chapter1_simplified_hash";
import {
  Chapter2_HashTableFunctions,
  formatHashCreateNewAndInsert,
  formatHashRemoveSearch,
  formatHashResize,
  HASH_CREATE_NEW_CODE,
  HASH_REMOVE_CODE,
  HASH_RESIZE_CODE,
  HASH_SEARCH_CODE,
  HashCreateNewStateVisualization,
  HashNormalStateVisualization,
  HashResizeStateVisualization
} from "../chapter2_hash_table_functions";
import * as React from "react";
import { HashBoxesComponent, TetrisFactory } from "../code_blocks";
import bubleSort from "../images/sort_img/buble_sort.png";
import colizion from "../images/sort_img/colizion_img.png";
import search from "../images/sort_img/search.png";

const QuickSortVisualisation = TetrisFactory([
  [HashBoxesComponent, [{labels: [null]}, 'array', 'left', 'right']],
]);

const BubbleSortVisualisation = TetrisFactory([[HashBoxesComponent, [{labels: [null]}, 'a', 'j', 'jplus1']]]);

const SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT = {
  label: 'original_list',
  type: 'array_int',
  id: 'simplified-hash-original-list',
  default: '1 56 50 2 44 25 17 4',
};

const SORTS_LIST_INPUT = {
  label: '',
  type: 'array_int',
  id: 'sorts-list',
  default: '42 13 11 92 27 87 14 67 1 12 44 9 20 7',
};

const HASH_FROM_KEYS_INPUT = {
  label: 'from_keys',
  type: 'array',
  id: 'hash-from-keys',
  default: "'uname' 'mv' 1 'time' -6 'ps' 'mkdir' 'less'",
};

const chapter1 = new Chapter1_SimplifiedHash();
const chapter2 = new Chapter2_HashTableFunctions();

function runBubbleSort(a, granular = false) {
  const bs = new BubbleSort();
  bs.run(a, granular);
  const bp = bs.getBreakpoints();
  return {bp};
}

function runInsertionSort(a, granular = false) {
  const is = new InsertionSort();
  is.run(a, granular);
  const bp = is.getBreakpoints();
  return {bp};
}

function runQuickSort(a) {
  const qs = new QuickSort();
  qs.run(a);
  const bp = qs.getBreakpoints();
  console.log('quicksort bp', bp);
  return {bp};
}

export const LESSONS = {
  bubble_sort: {
    mainPagePaneHeaderTitle: 'Пузырьком',
    mainPagePaneClassName: 'bubble-sort',
    playerHeaderTitle: 'Сортировка пузырьком',
    mobilePlayerHeaderTitle: 'Пузырьком',
    getBreakpoints: (numbers) => {
      return runBubbleSort(
        numbers.map((n) => n.toNumber()),
        true
      ).bp;
    },
    inputs: [SORTS_LIST_INPUT],
    formatBpDesc: formatBubbleSort,
    stateVisualization: BubbleSortVisualisation,
    code: BUBBLE_SORT_CODE,
    resetToZero: true,
    description: "Простой алгоритм сравнения и перестановки элементов до достижения правильного порядка.",
    img: bubleSort,
    bg: "#D4B2FF",
    objectFit: "0 -22px",

    theory: <BubbleSortTheory />,
  },

  quick_sort: {
    mainPagePaneHeaderTitle: 'Быстрая сортировка',
    mainPagePaneClassName: 'quick-sort',
    playerHeaderTitle: 'быструю сортировку',
    mobilePlayerHeaderTitle: 'Быстрая',
    getBreakpoints: (numbers) => {
      return runQuickSort(numbers.map((n) => n.toNumber())).bp;
    },
    inputs: [SORTS_LIST_INPUT],
    formatBpDesc: formatQuickSort,
    stateVisualization: QuickSortVisualisation,
    code: QUICK_SORT_CODE,
    resetToZero: true,
    description: "Эффективный алгоритм сортировки, который использует стратегию \"разделяй и властвуй\". ",
    img: colizion,
    bg: "rgb(255 197 179)",
    objectFit: "0 -23px",

    theory: <QuickSortTheory />,
  },

  // linear_search: {
  //     mainPagePaneHeaderTitle: 'Линейный поиск',
  //     mainPagePaneClassName: 'linear-search',
  //     playerHeaderTitle: 'линейный поиск',
  //     mobilePlayerHeaderTitle: 'Линейный поиск',
  //     code: SIMPLE_LIST_SEARCH,
  //     breakpoints: slsRes.bp,
  //     formatBpDesc: formatSimpleListSearchBreakpointDescription,
  //     stateVisualization: SimpleListSearchStateVisualization,
  // },

  simplified_hash_collisions: {
    mainPagePaneHeaderTitle: 'Коллизии',
    mainPagePaneClassName: 'simplified-hash-collisions',
    playerHeaderTitle: 'коллизии в хеш-таблицах',
    code: SIMPLIFIED_INSERT_ALL_BROKEN_CODE,
    getBreakpoints: (original_list) => {
      return chapter1.runSimplifiedInsertAllBroken(original_list).bp;
    },
    inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
    formatBpDesc: formatSimplifiedInsertAllDescription,
    stateVisualization: SimplifiedInsertBrokenStateVisualization,

    theory: <CollisionsTheory />,
  },

  simplified_hash_create: {
    mainPagePaneHeaderTitle: 'Создание',
    mainPagePaneClassName: 'simplified-hash-create',
    playerHeaderTitle: 'создание простейшей хеш-таблицы',
    code: SIMPLIFIED_INSERT_ALL_CODE,
    getBreakpoints: (original_list) => chapter1.runSimplifiedInsertAll(original_list).bp,

    inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
    formatBpDesc: formatSimplifiedInsertAllDescription,
    stateVisualization: SimplifiedInsertStateVisualization,

    theory: <SimplifiedHashTheory active="simplified_hash_create" />,
  },

  simplified_hash_search: {
    mainPagePaneHeaderTitle: 'Поиск',
    mainPagePaneClassName: 'simplified-hash-search',
    playerHeaderTitle: 'поиск в простейшей хеш-таблице',
    code: SIMPLIFIED_SEARCH_CODE,
    getBreakpoints: (original_list, number) => {
      const keys = chapter1.runSimplifiedInsertAll(original_list).keys;
      return chapter1.runSimplifiedSearch(keys, number).bp;
    },
    inputs: [
      SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT,
      {
        label: 'number',
        type: 'int',
        id: 'simplified-hash-search-number',
        default: '25',
      },
    ],
    formatBpDesc: formatSimplifiedSearchDescription,
    stateVisualization: SimplifiedSearchStateVisualization,
    description: "Основан на использовании хеш-функции для быстрого и эффективного доступа.",
    img: search,
    bg: 'rgb(249 255 179)',
    objectFit: "3px -47px",

    theory: <SimplifiedHashTheory active="simplified_hash_search" />,
  },

  hash_create: {
    mainPagePaneHeaderTitle: 'Создание',
    mainPagePaneClassName: 'hash-create',
    playerHeaderTitle: 'создание хеш-таблицы',

    code: HASH_CREATE_NEW_CODE,
    getBreakpoints: (from_keys) => {
      return chapter2.runCreateNew(from_keys).bp;
    },
    inputs: [HASH_FROM_KEYS_INPUT],
    formatBpDesc: formatHashCreateNewAndInsert,
    stateVisualization: HashCreateNewStateVisualization,

    theory: <HashTheory />,
  },

  hash_search: {
    mainPagePaneHeaderTitle: 'Поиск',
    mainPagePaneClassName: 'hash-search',
    playerHeaderTitle: 'поиск в хеш-таблице',
    code: HASH_SEARCH_CODE,
    getBreakpoints: (from_keys, key) => {
      const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
      return chapter2.runSearch(hashCodes, keys, key).bp;
    },
    inputs: [
      HASH_FROM_KEYS_INPUT,
      {
        label: 'key',
        type: 'int_str_none',
        id: 'hash-search-key',
        default: "'less'",
      },
    ],
    formatBpDesc: formatHashRemoveSearch,
    stateVisualization: HashNormalStateVisualization,

    theory: <HashTheory />,
  },

  hash_remove: {
    mainPagePaneHeaderTitle: 'Удаление',
    mainPagePaneClassName: 'hash-remove',
    playerHeaderTitle: 'удаление из хеш-таблицы',
    code: HASH_REMOVE_CODE,
    getBreakpoints: (from_keys, key) => {
      const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
      return chapter2.runRemove(hashCodes, keys, key).bp;
    },
    inputs: [
      HASH_FROM_KEYS_INPUT,
      {
        label: 'key',
        type: 'int_str_none',
        id: 'hash-remove-key',
        default: "'ps'",
      },
    ],
    formatBpDesc: formatHashRemoveSearch,
    stateVisualization: HashNormalStateVisualization,

    theory: <HashTheory />,
  },

  hash_resize: {
    mainPagePaneHeaderTitle: 'Расширение',
    mainPagePaneClassName: 'hash-resize',
    playerHeaderTitle: 'расширение хеш-таблицы',
    code: HASH_RESIZE_CODE,
    getBreakpoints: (from_keys) => {
      const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
      return chapter2.runResize(hashCodes, keys).bp;
    },
    inputs: [HASH_FROM_KEYS_INPUT],
    formatBpDesc: formatHashResize,
    stateVisualization: HashResizeStateVisualization,

    theory: <HashTheory />,
  },
};