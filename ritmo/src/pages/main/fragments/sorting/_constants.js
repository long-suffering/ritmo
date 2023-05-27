export const lessonList = {
  bubble_sort: {
    mainPagePaneHeaderTitle: 'Сортировка пузырьком',
    mainPagePaneClassName: 'bubble-sort',
    playerHeaderTitle: 'Сортировка пузырьком',
    mobilePlayerHeaderTitle: 'Сортировка пузырьком',
    // getBreakpoints: (numbers) => {
    //   return runBubbleSort(
    //     numbers.map((n) => n.toNumber()),
    //     true
    //   ).bp;
    // },
    // inputs: [SORTS_LIST_INPUT],
    // formatBpDesc: formatBubbleSort,
    // stateVisualization: BubbleSortVisualisation,
    // code: BUBBLE_SORT_CODE,
    resetToZero: true,
    route: 'bubble_sort',

    // theory: <BubbleSortTheory />,
  },

  quick_sort: {
    mainPagePaneHeaderTitle: 'Быстрая',
    mainPagePaneClassName: 'quick-sort',
    playerHeaderTitle: 'быструю сортировку',
    mobilePlayerHeaderTitle: 'Быстрая сортировка',
    // getBreakpoints: (numbers) => {
    //   return runQuickSort(numbers.map((n) => n.toNumber())).bp;
    // },
    // inputs: [SORTS_LIST_INPUT],
    // formatBpDesc: formatQuickSort,
    // stateVisualization: QuickSortVisualisation,
    // code: QUICK_SORT_CODE,
    resetToZero: true,
    route: 'quick_sort',

    // theory: <QuickSortTheory />,
  },
}