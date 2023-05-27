import { action, observable } from "mobx";

// TODO: БЫЛ WIN
export let windowDimensions = observable({
  width: null,
  height: null,
  scrollY: 0,
  jsLoaded: false,
});

windowDimensions.setAll = action(function (width, height, scrollY, jsLoaded) {
  windowDimensions.width = width;
  windowDimensions.height = height;
  windowDimensions.scrollY = scrollY;
  windowDimensions.jsLoaded = jsLoaded;
});

windowDimensions.setScrollY = action(function setScrollY(scrollY) {
  windowDimensions.scrollY = scrollY;
});

windowDimensions.setWH = action(function setWH(w, h) {
  windowDimensions.width = w;
  windowDimensions.height = h;
});
