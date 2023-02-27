export const LESSONS = {
  bubble_sort: {
    mainPagePaneHeaderTitle: 'Пузырьком',
    mainPagePaneClassName: 'bubble-sort',
    playerHeaderTitle: 'сортировку пузырьком',
    mobilePlayerHeaderTitle: 'Сортировка пузырьком',
    // getBreakpoints: numbers => {
    //   return runBubbleSort(numbers.map(n => n.toNumber()), true).bp;
    // },
    // inputs: [SORTS_LIST_INPUT],
    // formatBpDesc: formatBubbleSort,
    // stateVisualization: BubbleSortVisualisation,
    // code: BUBBLE_SORT_CODE,
    resetToZero: true,

    // theory: <BubbleSortTheory />,
  },

  quick_sort: {
    mainPagePaneHeaderTitle: 'Быстрая',
    mainPagePaneClassName: 'quick-sort',
    playerHeaderTitle: 'быструю сортировку',
    mobilePlayerHeaderTitle: 'Быстрая сортировка',
    // getBreakpoints: numbers => {
    //   return runQuickSort(numbers.map(n => n.toNumber())).bp;
    // },
    // inputs: [SORTS_LIST_INPUT],
    // formatBpDesc: formatQuickSort,
    // stateVisualization: QuickSortVisualisation,
    // code: QUICK_SORT_CODE,
    resetToZero: true,

    // theory: <QuickSortTheory />,
  },
};