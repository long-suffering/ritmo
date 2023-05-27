import { ErrorBoundary } from "react-error-boundary";
import * as React from "react";

function MyFallbackComponent({componentStack, error}) {
  function linebreaks(s) {
    return s
      .split('\n')
      .map((l, i) => [l, <br key={`br-${i}`} />])
      .flat();
  }

  return (
    <div style={{backgroundColor: 'pink'}}>
      <h3 className="text-danger">
        An error occured. This should not happen. Please file a bug report{' '}
        <a href="https://github.com/eleweek/inside_python_dict">on github</a>{' '}
      </h3>
      <p>{linebreaks(error.message)}</p>
      <h6 className="text-danger">Component stack</h6>
      <p>{linebreaks(componentStack)}</p>
    </div>
  );
}

export function MyErrorBoundary(props) {
  const onError = (error, componentStack) => {
    console.error('ErrorBoundary caught error\n\n', error, '\n\n\nComponent stack', componentStack);
  };

  return (
    <ErrorBoundary onError={onError} FallbackComponent={<MyFallbackComponent/>}>
      {props.children}
    </ErrorBoundary>
  );
}