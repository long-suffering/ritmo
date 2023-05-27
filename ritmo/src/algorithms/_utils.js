export class BreakpointFunction {
  constructor() {
    this._breakpoints = [];
    this._extraBpContext = null;
  }

  addBP(point) {
    let bp = {
      point: point,
    };

    for (let key in this) {
      if (key[0] !== '_') {
        const value = this[key];
        if (value !== undefined && typeof value !== 'function') {
          bp[key] = value;
        }
      }
    }

    if (this._extraBpContext) {
      for (let key in this._extraBpContext) {
        bp[key] = this._extraBpContext[key];
      }
    }

    this._breakpoints.push(bp);
  }

  setExtraBpContext(extraBpContext) {
    this._extraBpContext = extraBpContext;
  }

  getBreakpoints() {
    return this._breakpoints;
  }
}