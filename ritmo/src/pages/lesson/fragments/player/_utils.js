import * as React from 'react';

export class ParsableInputBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueRaw: this.props.valueRaw || this.props.dumpValue(this.props.value),
      value: this.props.value,
      error: null,
      lastError: null,
    };
    this.inputComponentRef = React.createRef();
    this.lastScrollLeft = null;
  }

  forceSetValue(value) {
    this.setState({
      valueRaw: this.props.dumpValue(value),
      value: value,
      valueId: this.props.valueId != null ? this.props.valueId + 1 : null,
    });
  }

  handleChange = (event) => {
    try {
      let newState = {
        valueRaw: event.target.value,
        lastError: this.state.error || this.state.lastError,
        error: null,
        value: this.props.parseValue(event.target.value),
        valueId: this.props.valueId != null ? this.props.valueId + 1 : null,
      };

      this.setState(newState);
      this.props.onChange(newState.value, newState.valueRaw);
    } catch (e) {
      this.setState({
        valueRaw: event.target.value,
        lastError: e,
        error: e,
      });
    }
  };
}