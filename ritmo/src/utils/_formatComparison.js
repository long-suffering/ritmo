export function formatComparison(num1, num2) {
  if (num1 === num2) {
    return '==';
  } else if (num1 < num2) {
    return '<';
  } else {
    return '>';
  }
}