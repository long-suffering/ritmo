import * as React from "react";

import { windowDimensions } from "../store";

// @observer
export default class DebounceWhenOutOfView extends React.Component {
  render() {
    return <DebounceWhenOutOfViewImpl {...this.props} scrollY={windowDimensions.scrollY} />;
  }
}

const LEEWAY_Y = 100;
class DebounceWhenOutOfViewImpl extends React.Component {
  DEBOUNCE_TIMEOUT = 500;

  constructor() {
    super();

    this.ref = React.createRef();
    this.timeoutId = null;

    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    let isVisible;
    if (state.height != null && state.top != null) {
      const top = state.top;
      const bottom = state.top + state.height;
      const {windowHeight, scrollY} = props;
      isVisible =
        (scrollY - LEEWAY_Y <= top && top <= scrollY + windowHeight + LEEWAY_Y) ||
        (scrollY - LEEWAY_Y <= bottom && bottom <= scrollY + windowHeight + LEEWAY_Y);
    }

    if (isVisible == null || state.isVisible == null || isVisible || state.isVisible) {
      return {
        isVisible,
        childProps: props.childProps,
      };
    } else {
      return null;
    }
  }

  render() {
    const childProps = this.state.childProps;
    return this.props.childFunc(childProps, this.ref);
  }

  componentDidUpdate() {
    this.updateGeometry();
    this.checkDebounceProps();
  }

  componentDidMount() {
    this.updateGeometry();
    this.checkDebounceProps();
  }

  updateGeometry() {
    const node = this.ref.current;
    const rect = node.getBoundingClientRect();
    const {height} = rect;
    const top = window.scrollY + rect.top;
    console.log('DebounceWhenOutOfView updateGeometry top', top);
    this.setState((state) => {
      if (state.height !== height || state.top !== top) {
        return {height, top};
      } else {
        return null;
      }
    });
  }

  updateChildProps = () => {
    const childProps = this.props.childProps;
    this.setState((state) => {
      if (childProps !== state.childProps) {
        return {
          childProps,
        };
      } else {
        return null;
      }
    });
  };

  checkDebounceProps() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.props.childProps !== this.state.childProps) {
      this.timeoutId = setTimeout(this.updateChildProps, this.DEBOUNCE_TIMEOUT);
    }
  }
}