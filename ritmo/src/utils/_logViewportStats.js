import { getClientDimensions } from "./_getClientDimensions";

export function logViewportStats() {
  console.log(`DIMENSIONS: window inner: ${window.innerWidth}x${window.innerHeight}`);
  console.log(
    `DIMENSIONS: document.documentElement: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`
  );
  const vv = window.visualViewport;
  console.log(`DIMENSIONS: visualViewport: ${vv != null ? vv.width + 'x' + vv.height : vv}`);

  const {width, height} = getClientDimensions();
  console.log(`DIMENSIONS: used: ${width}x${height}`);
  // TODO FIXME: this is for debugging only
  /*const url = `/viewports?wi=${window.innerWidth}x${window.innerHeight}&de=${document.documentElement.clientWidth}x${document.documentElement.clientHeight}&vv=${vv.width}x${vv.height}`;
  const Http = new XMLHttpRequest();
  Http.open("GET", url);
  Http.send();*/
}