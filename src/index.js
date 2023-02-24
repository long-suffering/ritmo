import "../src/stylesheets/index.scss"
import { initAndRender } from "./app"
;(function () {
  if (typeof window !== "undefined") {
    initAndRender()
  }
})()
