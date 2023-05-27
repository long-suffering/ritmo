import { useCallback, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import _ from "lodash";

import { getClientDimensions, getUxSettings } from "./utils";
import { globalSettings, windowDimensions } from "./store";
import { routes } from "./constants";

const SIGNIFICANT_HEIGHT_CHANGE = 0;

function App() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  const [isMounted, setIsMounted] = useState(false);

  const onWindowSizeChange = useCallback(() => {
    // logViewportStats();

    const clientDimensions = getClientDimensions();
    const windowWidth = clientDimensions.width;
    const windowHeight = clientDimensions.height;

    if (windowSize.width !== windowWidth || windowSize.height !== windowHeight) {
      // console.log('Processing window size change', windowWidth, windowHeight);

      if (
        windowSize.width !== windowWidth ||
        windowSize.height > windowHeight ||
        windowHeight - this.state.windowHeight > SIGNIFICANT_HEIGHT_CHANGE
      ) {
        // console.log('App size changed from', windowSize);

        setWindowSize((prevState) => ({
          ...prevState,
          width: windowWidth,
          height: windowHeight
        }))

        if (windowDimensions.width !== windowWidth || windowDimensions.height !== windowHeight) {
          windowDimensions.setWH(windowWidth, windowHeight);
        }
      }
    }
  }, [windowSize])

  useEffect(() => {
    const dimensions = getClientDimensions();
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;
    // console.log('componentDidMount() window geometry', windowWidth, windowHeight);

    window.addEventListener('resize', _.throttle(onWindowSizeChange, 500));
    globalSettings.maxCodePlaySpeed = getUxSettings().MAX_CODE_PLAY_SPEED;

    setWindowSize({
      width: windowWidth,
      height: windowHeight,
    })

    setIsMounted(true)

    windowDimensions.setAll(windowWidth, windowHeight, window.scrollY, true);

    return () => {
      window.removeEventListener('resize', onWindowSizeChange);
    }
  }, [])

  if (!isMounted) return <div>Loading...</div>

  return <RouterProvider router={routes} />;
}

export default App;
