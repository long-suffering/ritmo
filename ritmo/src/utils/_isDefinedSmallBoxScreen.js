export function isDefinedSmallBoxScreen(windowWidth, windowHeight) {
  return windowWidth && windowHeight && (windowWidth < 950 || windowHeight < 520);
}