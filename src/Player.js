import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { BigNumber } from "bignumber.js";
import axios from "axios";

import "./player.css";

import Slider from "rc-slider/lib/Slider";
import "rc-slider/assets/index.css";

import rightArrow from "./icons/keyboard_arrow_right.svg";
import leftArrow from "./icons/keyboard_arrow_left.svg";
import playArrow from "./icons/play_arrow.svg";
import pauseButton from "./icons/pause.svg";
import infoIcon from "./icons/info_icon.svg";
import closeIcon from "./icons/close_icon.svg";
import grinChatIcon from "./icons/grin-chat-icon.svg";
import questionsIcon from "./icons/questions_icon.svg";
import preloaderIcon from "./icons/preloader.gif";

import { CodeBlockWithActiveLineAndAnnotations } from "./code_blocks";
import { Redirect } from "react-router";
import { isDefinedSmallBoxScreen } from "./util";
import { ParsableInputBase } from "./inputs";
import _ from "lodash";
import {
  dumpPyList,
  dumpSimplePyObj,
  parsePyList,
  parsePyNumber,
  parsePyStringOrNumberOrNone
} from "./py_obj_parsing";
import { ArrowLeft } from "./icons/_ArrowLeft";
import { Link } from "react-router-dom";
import { Fragment } from "react/index";

class PlayerInput extends ParsableInputBase {
  ERROR_COLOR = "rgb(222, 39, 22)";

  getPattern() {
    if (this.props.type === "array_int") {
      return "[0-9 ,]*";
    } else if (this.props.type === "int") {
      return "[0-9]*";
    }
    return null;
  }

  render() {
    // console.log("Input state", this.state);

    let errorMsg;
    if (this.state.error) {
      errorMsg = this.state.error.text && this.state.error.text.ru ? this.state.error.text.ru : this.state.error.message;
    }

    const style = { borderColor: errorMsg ? this.ERROR_COLOR : "#000" };
    if (this.props.type === "int" || this.props.type === "int_str_none") {
      style.width = 50;
    }
    return (<div className="player-input-wrapper">
      {this.props.label &&
        <span className="player-input-label">{this.props.label}</span>}
      <input
        pattern={this.getPattern()}
        type={this.props.type === "int" ? "number" : undefined}
        style={style}
        className={classnames("player-input", errorMsg ? "player-input-error" : null)}
        onChange={this.handleChange}
        value={this.state.valueRaw}
      />
      {errorMsg && (<span className="player-input-comment"
                          style={{ color: this.ERROR_COLOR }}>
                        {errorMsg}
                    </span>)}
    </div>);
  }
}

function intValidator(num) {
  if (!BigNumber.isBigNumber(num) && typeof num !== "number") {
    return { en: "Expected an integer", ru: "Допустимы только числа" };
  }
}

function dumpValue(val, type) {
  if (type === "array_int" || type === "array") {
    return dumpPyList(val);
  } else if (type === "int" || type === "int_str_none") {
    return dumpSimplePyObj(val);
  }
}

function parseValue(s, type) {
  // console.log("parseValue", s, type);
  if (type === "array_int") {
    return parsePyList(s, false, 1, intValidator);
  } else if (type === "array") {
    return parsePyList(s, true, 1);
  } else if (type === "int") {
    return parsePyNumber(s);
  } else if (type === "int_str_none") {
    return parsePyStringOrNumberOrNone(s);
  }
}

const PreChatModal = ({ text, isAi }) => {
  if (!isAi) {
    const delay = 20;
    const elem = useRef(null);

    useEffect(() => {
      if (!elem) return;

      const print_text = function(text, elem, delay) {
        if (text.length > 0) {
          elem.innerHTML += text[0];
          setTimeout(
            function() {
              print_text(text.slice(1), elem, delay);
            }, delay
          );
        }
      };

      print_text(text, elem.current, delay)
    }, [elem])

    return (
      <div className="pre-chat">
        <img src={grinChatIcon} width="40" height="40" />
        <pre ref={elem} style={{ marginTop: "10px" }} />
      </div>
    )
  }

  return (
    <div className="pre-chat" style={{ alignItems: "center" }}>
      <img src={questionsIcon} width="40" height="40" />
      <pre children={text}/>
    </div>
  )
}

function ChatModal() {
  const urlApi = "https://api.openai.com/v1/chat/completions"
  const dialogRef = useRef(null);
  const [chatMessage, setChatMessage] = useState([]);
  const [textarea, setTextarea] = useState("")
  const [isPendingChat, setIsPendingChat] = useState(false)

  const onSendMessage = useCallback((event) => {
    event.preventDefault()

    if (textarea.length > 10) {

      setChatMessage(prevState => {
        return [...prevState, textarea]
      })

      setIsPendingChat(true)

      setTextarea('')

      axios({
        url: urlApi,
        method: "post",
        headers: { Authorization: `Bearer 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` },
        data: {
          "model": "gpt-3.5-turbo",
          "messages": [{
            "role": "user",
            "content": textarea
          }]
        }
      }).then(function (response) {
        const dataResponse = response.data.choices[0].message.content;

        setIsPendingChat(false)
        setChatMessage(prevState => {
          return [...prevState, dataResponse]
        })
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, [setChatMessage, textarea])

  const onToggleModal = useCallback(() => {
    if (!dialogRef.current) return;

    if (!dialogRef.current.open) {
      dialogRef.current.showModal();

      return;
    }

    dialogRef.current.close();
  }, [dialogRef]);

  return (
    <Fragment>
      <div className="player-button player-next" onClick={onToggleModal}
           children={<img src={infoIcon} />} />

      <dialog ref={dialogRef} className="chat-overlay">
        <form onSubmit={onSendMessage} className="modal-span">
          <div className="modal-header">
            <button onClick={onToggleModal}
                    children={<img src={closeIcon} alt="X" />} />
          </div>
          <div className="modal-body">
            {chatMessage.map(( data, index) => (<PreChatModal text={data} key={data} isAi={!(index % 2)} />))}
            {isPendingChat && (
              <img src={preloaderIcon} alt="Загрузка" className="preloader" />
            )}
            {!(chatMessage.length > 0) ? (<div className="message" children="Спросите ИИ как работает алгоритм"/>) : ""}
          </div>
          <div className="modal-footer">
            <textarea placeholder="Введите ваше сообщение" value={textarea} onChange={(event) => setTextarea(event.target.value)} />
            <button type="submit" className="chat-message-send" disabled={!(textarea.length > 10)}>
              <img src={playArrow} />
            </button>
          </div>
        </form>
      </dialog>
    </Fragment>
  );
}

export class Player extends React.Component {
  SLIDER_MULTIPLIER = 1000;
  SLIDER_AUTOPLAY_UPDATE_MS = 5;
  SLIDER_AUTOPLAY_BASE_MS = 750;

  MAX_WIDTH = 1300;

  INPUTS_LS_PREFIX = "player-v1-1-";
  removeHackTransition = _.debounce(() => {
    const track = document.getElementsByClassName("rc-slider-track")[0];
    const handle = document.getElementsByClassName("rc-slider-handle")[0];
    if (track && handle && performance.now() - this._transitionHackStarted > 150) {
      track.classList.remove("slider-transition");
      handle.classList.remove("slider-transition");
    }
  }, 250);

  constructor(props) {
    super(props);

    const timeStr = localStorage.getItem(props.lessonId + "_time");

    const inputs = this.props.inputs || [];
    const resetToZero = props.resetToZero;

    const programInputs = [];
    const originalRawInputs = [];
    const onInputChangeHandlers = [];
    for (let i = 0; i < inputs.length; ++i) {
      const input = inputs[i];

      const ls = localStorage.getItem(this.INPUTS_LS_PREFIX + input.id);

      const rawValue = ls ? ls : input.default;
      programInputs.push(parseValue(rawValue, input.type));
      originalRawInputs.push(rawValue);
      onInputChangeHandlers.push((value, valueRaw) => {
        // console.log("equal compare", dumpValue(programInputs[i], input.type), dumpValue(value, input.type));

        if (dumpValue(programInputs[i], input.type) !== dumpValue(value, input.type)) {
          const programInputs = [...this.state.programInputs];
          programInputs[i] = value;
          const breakpoints = this.props.getBreakpoints(...programInputs);

          const time = !resetToZero && this.state.time > 0 ? breakpoints.length - 1 : 0;
          this.setState({ programInputs, breakpoints, time, sliderTime: time });
          this.saveSliderTimeToLS(time);

          localStorage.setItem(this.INPUTS_LS_PREFIX + input.id, valueRaw);

          // console.log("onInputChangeHandlers", value, programInputs, breakpoints);
        }
      });
    }
    this.onInputChangeHandlers = onInputChangeHandlers;

    // console.log("Inputs", programInputs);
    const breakpoints = this.props.getBreakpoints(...programInputs);
    // console.log("breakpoints", breakpoints);

    const sliderTime = Math.min(+timeStr || 0, breakpoints.length - 1);
    this.state = {
      time: Math.round(sliderTime),
      sliderTime,
      autoPlaying: false,
      showingTheory: false,

      // react router stuff
      navigatingHome: false,
      breakpoints,
      programInputs,
      originalRawInputs
    };

    // console.log("Player constructor state", this.state);

    this.componentRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, state) {
    return { time: nextProps.time };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.autoPlaying && props.time === state.breakpoints.length - 1) {
      return { ...state, autoPlaying: false };
    } else {
      return null;
    }
  }

  navigateHome = () => {
    this.setState({ navigatingHome: true });
  };

  maxTime = () => {
    return this.state.breakpoints.length - 1;
  };

  unixtimestamp() {
    return new Date().getTime();
  }

  handleSliderValueChange = (value) => {
    this.stop();
    const sliderTime = value / this.SLIDER_MULTIPLIER;
    this.handleTimeChange(sliderTime);
  };

  saveSliderTimeToLS = (sliderTime) => {
    localStorage.setItem(this.props.lessonId + "_time", sliderTime.toString());
  };

  handleTimeChange = (sliderTime, autoPlaying = false, onStateChange) => {
    // console.log("handleTimeChange", sliderTime, autoPlaying);
    const time = Math.round(sliderTime);
    this.setState(() => ({ time, sliderTime, autoPlaying }), onStateChange);
    setTimeout(_.throttle(() => this.saveSliderTimeToLS(sliderTime), 500), 0);
    // this.props.handleTimeChange(value);
  };

  prevStep = () => {
    this.stop();
    if (this.state.time > 0) {
      const newTime = this.state.time - 1;
      this.handleTimeChange(newTime);
    }
  };

  nextStep = () => {
    this.stop();
    if (this.state.time < this.maxTime()) {
      const newTime = this.state.time + 1;
      this.handleTimeChange(newTime);
    }
  };

  singleAutoPlayIteration = () => {
    // console.log("autoplay iteration", this.state);
    if (!this.state.autoPlaying) {
      return;
    }
    this.timeoutId = setTimeout(this.autoPlay, this.SLIDER_AUTOPLAY_UPDATE_MS);
  };

  autoPlay = () => {
    if (this.state.sliderTime < this.maxTime()) {
      const delta = (1.0 / this.SLIDER_AUTOPLAY_BASE_MS) * (performance.now() - (this.lastTimeChange ? this.lastTimeChange : performance.now()));
      // console.log("autoPlay", this.state.time, delta);
      let newSliderTime = Math.min(this.maxTime(), this.state.sliderTime + delta);
      if (newSliderTime < this.maxTime()) {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        this.lastTimeChange = performance.now();
        this.handleTimeChange(newSliderTime, true, this.singleAutoPlayIteration);
      } else {
        this.resetTimer();
        this.handleTimeChange(newSliderTime, false);
      }
    }
  };

  repeatPlay = () => {
    this.handleTimeChange(0, true);
    this.timeoutId = setTimeout(this.autoPlay, this.SLIDER_AUTOPLAY_UPDATE_MS);
  };

  forceAutoPlay = () => {
    // console.log("autoplay");
    if (this.state.time < this.maxTime()) {
      this.autoPlay();
    } else {
      this.repeatPlay();
    }
  };

  toggleAutoPlay = () => {
    // console.log("toggleAutoPlay", this.state.autoPlaying);
    if (!this.state.autoPlaying) {
      this.forceAutoPlay();
    } else {
      this.stop();
    }
  };

  resetTimer = () => {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
    this.lastTimeChange = null;
  };

  stop = () => {
    if (this.timeoutId != null) {
      this.resetTimer();
    }
    if (this.state.autoPlaying) {
      this.setState({ autoPlaying: false });
    }
  };

  componentDidUpdate() {
    setTimeout(() => this.removeHackTransition(), 200);
    if (!this.state.autoPlaying && this.timeoutId) {
      this.stop();
    }
  }

  // componentDidMount() {
  //   document.addEventListener("keydown", this.handleKeyboard);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.handleKeyboard);
  // }

  hackTransition = () => {
    const track = document.getElementsByClassName("rc-slider-track")[0];
    const handle = document.getElementsByClassName("rc-slider-handle")[0];
    if (track && handle) {
      track.classList.add("slider-transition");
      handle.classList.add("slider-transition");
    }
    this._transitionHackStarted = performance.now();
  };

  handleKeyboard = (event) => {
    // console.log("keyboard", event);
    if (event.target.nodeName === "INPUT") {
      return; // Don't mess with inputs
    }

    const keyCode = event.keyCode;
    const isNext = keyCode === 40 || keyCode === 39;
    const isPrev = keyCode === 38 || keyCode === 37;
    const isSpace = keyCode === 32;

    if (isNext || isPrev || isSpace) {
      event.preventDefault();
      this.hackTransition();
      if (isNext) {
        this.nextStep();
      } else if (isPrev) {
        this.prevStep();
      } else if (isSpace) {
        this.toggleAutoPlay();
      }
    }
  };

  toggleTheory = () => {
    if (!this.state.showingTheory) {
      this.stop();
    }

    this.setState({ showingTheory: !this.state.showingTheory });
  };

  isMobile = () => {
    return this.props.windowWidth <= 480;
  };

  render() {
    // console.log("Player", this.props, this.state);
    if (this.state.navigatingHome) {
      return <Redirect push to="/" />;
    }
    const breakpoints = this.state.breakpoints;
    const maxTime = breakpoints.length;

    const StateVisualization = this.props.stateVisualization;
    const { windowHeight, windowWidth } = this.props;
    // console.log("Player window size", windowHeight, windowWidth);
    const totalWidth = Math.min(this.MAX_WIDTH, windowWidth);

    const time = this.state.time;

    const bp = breakpoints[time];

    let codeHeight, innerTheoryHeight, theoryWidth, codeVisWidth,
      desktopTheoryTop;
    const controlsHeight = isMobile ? 45 : 35;
    const approximateSliderAndControlsHeight = controlsHeight + 16;
    const adjustTheoryTop = 5;
    const approximateHorizontalPaddings = 24;
    const MIN_THEORY_WIDTH = 300;
    let inputsHeight;

    let isMobile = false;
    if (windowHeight) {
      const expectedVisHeight = 1.1 * StateVisualization.getExpectedHeight(totalWidth, windowHeight);

      // console.log("Expected vis height", expectedVisHeight);
      codeVisWidth = totalWidth - approximateHorizontalPaddings;

      if (this.isMobile()) {
        isMobile = true;
        theoryWidth = windowWidth - 1;
      } else {
        theoryWidth = Math.max(0.3 * totalWidth, MIN_THEORY_WIDTH);
      }
      innerTheoryHeight = windowHeight - approximateSliderAndControlsHeight - 15 /* IDK why 15 */;
      desktopTheoryTop = approximateSliderAndControlsHeight - 4;

      inputsHeight = this.props.inputs && !isMobile ? 7 + this.props.inputs.length * 38 : 0;
      codeHeight = this.props.windowHeight - expectedVisHeight - approximateSliderAndControlsHeight - inputsHeight;
    }

    // const theoryPosition = approximateSliderAndControlsHeight - adjustTheoryTop;

    let playerHeaderStyle, mobileVisWrapperStyle, mobileHeaderTitle,
      mobileSliderStyle;
    if (isMobile) {
      playerHeaderStyle = { position: "absolute", bottom: 0 };
      mobileVisWrapperStyle = {
        position: "absolute",
        bottom: 80,
        width: "100%"
      };
      mobileHeaderTitle = this.props.mobileHeaderTitle || this.props.playerHeaderTitle;
      mobileHeaderTitle = mobileHeaderTitle.charAt(0).toUpperCase() + mobileHeaderTitle.slice(1);
      mobileSliderStyle = { paddingBottom: 15, paddingTop: 20 };
    }

    // console.log("mobile header title", mobileHeaderTitle);

    const biggerFont = !isDefinedSmallBoxScreen(windowWidth, windowHeight) || isMobile;
    // const inputs = this.props.inputs;
    const inputs = this.props.inputs;

    return (<div className="fluid-body">
      <div className="player">
        <div
          className={classnames("player-header", !isMobile && "player-header-desktop")}
          style={playerHeaderStyle}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {(!this.state.showingTheory || !isMobile) && (
              <Link to="/" className="player-title"
                    children={<ArrowLeft />} />)}
            {!isMobile && (<div className="player-lesson-name">
              {"\u00A0"}
              {this.props.playerHeaderTitle}
            </div>)}
          </div>
          {(!this.state.showingTheory || !isMobile) && (<div
            className={classnames("player-buttons", isMobile ? "player-buttons-mobile" : "")}>
            <div className="player-button player-prev"
                 onClick={this.prevStep}>
              <img src={leftArrow} />
            </div>
            <div className="player-counters">
              <span children={`Шаг ${time + 1} из ${maxTime}`} />
            </div>
            <div className="player-button player-next"
                 onClick={this.nextStep}>
              <img src={rightArrow} />
            </div>
            <div className="player-button player-play-button"
                 onClick={this.toggleAutoPlay}>
              <img src={this.state.autoPlaying ? pauseButton : playArrow} />
            </div>
            <ChatModal />
          </div>)}

          {/*{this.props.theory && (*/}
          {/*    <div*/}
          {/*        className={classnames(*/}
          {/*            'player-theory-button',*/}
          {/*            this.state.showingTheory && 'player-button-active'*/}
          {/*        )}*/}
          {/*        onClick={this.toggleTheory}*/}
          {/*    >*/}
          {/*        Теория*/}
          {/*    </div>*/}
          {/*)}*/}
        </div>
        {!isMobile && inputs && inputs.length && (
          <div className="player-inputs-outer">
            <div className="player-inputs-inner">
              {inputs.map((input, idx) => {
                return (<PlayerInput
                  value={this.state.programInputs[idx]}
                  valueRaw={this.state.originalRawInputs[idx]}
                  key={input.id}
                  label={input.label}
                  type={input.type}
                  onChange={this.onInputChangeHandlers[idx]}
                  dumpValue={(val) => dumpValue(val, input.type)}
                  parseValue={(val) => parseValue(val, input.type)}
                />);
              })}
            </div>
          </div>)}
        <div className="player-main">
          <div className="player-code-and-visualisation"
               style={{ width: codeVisWidth }}>
            <div className="player-slider-wrapper">
              <Slider
                // marks={marks}
                onChange={this.handleSliderValueChange}
                min={0}
                max={this.maxTime() * this.SLIDER_MULTIPLIER}
                value={this.state.sliderTime * this.SLIDER_MULTIPLIER}
                style={mobileSliderStyle}
                dotStyle={{
                  top: 0,
                  height: 3,
                  width: 3,
                  borderRadius: 0,
                  backgroundColor: "white",
                  border: "none"
                }}
                handleStyle={{
                  height: 12,
                  width: 12,
                  marginTop: -4.5,
                  backgroundColor: "rgb(255 0 0)",
                  border: "none"
                }}
                railStyle={{
                  height: 2, cursor: "pointer", backgroundColor: "#ad9d95"
                }}
                trackStyle={{
                  height: 2,
                  cursor: "pointer",
                  backgroundColor: "rgb(255 0 0)"
                }}
                className={classnames(isMobile && "slider-mobile-extra")}
              />
            </div>
            <CodeBlockWithActiveLineAndAnnotations
              height={codeHeight}
              time={time}
              code={this.props.code}
              overflow={false}
              fontSize={15}
              lineVerticalPadding={2}
              breakpoints={breakpoints}
              formatBpDesc={this.props.formatBpDesc}
              withShortExplanation={isMobile}
              mobileHeaderTitle={mobileHeaderTitle}
            />
            <div className="player-state-vis-wrapper"
                 style={mobileVisWrapperStyle}>
              <div className="player-state-vis-wrapper-overlay">
                <StateVisualization
                  bp={bp}
                  epoch={this.state.breakpointsUpdatedCounter}
                  innerRef={this.componentRef}
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                  overflow={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}
