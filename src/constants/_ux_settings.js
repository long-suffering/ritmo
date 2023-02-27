import { getParser } from "bowser";

const defaultUxSettings = {
  TIME_SLIDER_THROTTLE_TIME: 50,
  CODE_SCROLL_DEBOUNCE_TIME: 200,
  THROTTLE_SELECTION_TRANSITIONS: true,
  THROTTLE_SELECTION_TIMEOUT: 150,
  MAX_CODE_PLAY_SPEED: 8,
};

let insidePythonDictUxSettings;

export function getUxSettings() {
  if (typeof window === 'undefined' || !insidePythonDictUxSettings) {
    return defaultUxSettings;
  }
  return insidePythonDictUxSettings;
}

export function initUxSettings() {
  const browser = getParser(window.navigator.userAgent).parse().parsedResult;
  console.log('Detected browser', browser);

  const engine = browser.engine.name;
  const osName = browser.os.name;
  const platformType = browser.platform.type;
  console.log('Detected engine', engine, 'on', osName);
  let settings = {...defaultUxSettings};

  // 'Throttling' transitions for selection is important because they can be buggy as heck
  // The problem is jumpiness (if transform: translate(...) is changed while transition is running, it resets)
  // This works fine in Chrome/Blink-based browsers
  // (I think there is a similar problem for boxes, but it is less acute, because boxes transitions are longer)
  switch (engine) {
    case 'Blink':
      settings.THROTTLE_SELECTION_TRANSITIONS = false;
      settings.THROTTLE_SELECTION_TIMEOUT = 0;
      break;
    case 'Gecko': {
      settings.THROTTLE_SELECTION_TRANSITIONS = true;
      switch (osName) {
        // Somehow Firefox doesn't do this stuff nearly as bad on Linux
        case 'Linux':
          settings.THROTTLE_SELECTION_TIMEOUT = 125;
          break;
        // It seems to be as bad on macOS as on Windows (maybe somewhat worse on macOS)
        // It's pretty bad on mobile too
        case 'macOS':
          settings.THROTTLE_SELECTION_TIMEOUT = 'transitionend';
          break;
        default:
          settings.THROTTLE_SELECTION_TIMEOUT = 275; // almost 'transitionend'
          break;
      }
      break;
    }
    case 'EdgeHTML':
      settings.THROTTLE_SELECTION_TRANSITIONS = true;
      // 150 is kind of ok, but 225-275 seems better
      settings.THROTTLE_SELECTION_TIMEOUT = 250;
      break;
    case 'WebKit': {
      settings.THROTTLE_SELECTION_TRANSITIONS = true;
      switch (osName) {
        case 'Linux':
          settings.THROTTLE_SELECTION_TIMEOUT = 150;
          break;
        case 'macOS':
          settings.THROTTLE_SELECTION_TIMEOUT = 'transitionend';
          break;
        default:
          settings.THROTTLE_SELECTION_TIMEOUT = 275;
          break;
      }
      break;
    }
  }

  switch (engine) {
    case 'Blink':
    case 'WebKit':
      // kind of ended up optimizing for chrome
      settings.TIME_SLIDER_THROTTLE_TIME = null;
      settings.CODE_SCROLL_DEBOUNCE_TIME = 150;
      settings.MAX_CODE_PLAY_SPEED = 16;
      break;
    case 'Gecko':
      settings.TIME_SLIDER_THROTTLE_TIME = null;
      // Firefox doesn't seems to tolerate auto-scrolling
      settings.CODE_SCROLL_DEBOUNCE_TIME = 200;
      break;
  }

  if (platformType === 'mobile') {
    settings.MAX_CODE_PLAY_SPEED = Math.min(settings.MAX_CODE_PLAY_SPEED, 8);
  }

  insidePythonDictUxSettings = settings;
  window.insidePythonDictBrowser = browser;
  console.log('UX settings', getUxSettings());
}