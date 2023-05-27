import { List as ImmutableList } from "immutable";

import { formatComparison } from "../utils";
import { BreakpointFunction } from "./_utils";
import { HashBoxesComponent, TetrisFactory } from "../pages/lesson/fragments/player/fragments";

const SORTS_LIST_INPUT = {
  label: "",
  type: "array_int",
  id: "sorts-list",
  default: "42 13 11 92 27 87 14 67 1 12 44 9 20 7"
};

const BubbleSortVisualisation = TetrisFactory([[HashBoxesComponent, [{labels: [null]}, 'a', 'j', 'jplus1']]]);

const BUBBLE_SORT_CODE = [
  ['def bubble_sort(a):', '', 0],
  ['    for i in range(len(a)):', 'for-i', 1],
  ['        swapped = False', 'swapped-false', 1],
  ['        for j in range(len(a) - i - 1):', 'for-j', 2],
  ['            if a[j] > a[j + 1]:', 'compare', 2],
  ['                a[j], a[j + 1] = a[j + 1], a[j]', 'swap', 2],
  ['                swapped = True', 'swapped-true', 2],
  ['        if not swapped:', 'check-swapped', 1],
  ['            break', 'break-swapped', 1],
  ['', 'end', -1],
];

class BubbleSort extends BreakpointFunction {
  constructor() {
    super();
  }

  run(_a, granular = false) {
    this.a = new ImmutableList(_a);
    const n = _a.length;

    for (this.i = 0; this.i < n; ++this.i) {
      this.addBP("for-i");
      this.swapped = false;
      this.addBP("swapped-false");
      for (this.j = 0; this.j < n - 1 - this.i; ++this.j) {
        this.jplus1 = this.j + 1;
        if (granular) {
          this.addBP("for-j");
        }
        const aj = this.a.get(this.j);
        const ajplus1 = this.a.get(this.j + 1);
        if (granular) {
          this.addBP("compare");
        }
        if (aj > ajplus1) {
          this.a = this.a.set(this.j, ajplus1);
          this.a = this.a.set(this.j + 1, aj);
          if (granular) {
            this.addBP("swap");
          }
          this.swapped = true;
          if (granular) {
            this.addBP("swapped-true");
          }
        }
      }
      this.j = undefined;
      this.jplus1 = undefined;
      this.addBP("check-swapped");
      if (!this.swapped) {
        this.addBP("break-swapped");
        return;
      }
      this.swapped = undefined;
    }
    this.addBP("end");

    return this.a;
  }
}

function runBubbleSort(a, granular = false) {
  const bs = new BubbleSort();
  bs.run(a, granular);
  const bp = bs.getBreakpoints();
  return { bp };
}

function formatBubbleSort(bp) {
  switch (bp.point) {
    case "for-i":
      return `Делаем <code>${bp.i + 1}</code>-ю итерацию сортировки`;
    case "swapped-false":
      return `На этой итерации элементы еще не меняли местами`;
    case "for-j":
      return `Посмотрим на <code>${bp.j}</code>-й элемент, <code>${bp.a.get(bp.j)}</code>`;
    case "compare": {
      const aj = bp.a.get(bp.j);
      const aj1 = bp.a.get(bp.j + 1);
      return `<code>${aj} ${formatComparison(aj, aj1)} ${aj1}</code>, сравниваем его с соседним`;
    }
    case "swap": {
      return `Поменяем соседей местами`;
    }
    case "swapped-true": {
      return `Запомним, что поменяли местами`;
    }
    case "check-swapped": {
      return bp.swapped ? `На этой итерации мы делали обмены, поэтому продолжаем` : `На этой итерации мы не сделали обменов, поэтому массив отсортирован`;
    }
    case "break-swapped":
      return "Выходим";
    case "end":
      return "Массив отсортирован";
  }
}

export const bubbleSort = {
  mainPagePaneHeaderTitle: "Сортировка пузырьком",
  mainPagePaneClassName: "bubble-sort",
  playerHeaderTitle: "Сортировка пузырьком",
  mobilePlayerHeaderTitle: "Сортировка пузырьком",
  resetToZero: true,
  route: "bubble_sort",
  getBreakpoints: (numbers) => {
    console.log("numbers", numbers);

    return runBubbleSort(numbers.map((n) => n.toNumber()), true).bp;
  },
  inputs: [SORTS_LIST_INPUT],
  formatBpDesc: formatBubbleSort,
  stateVisualization: BubbleSortVisualisation,
  code: BUBBLE_SORT_CODE,
  theory: <div/>,
};
