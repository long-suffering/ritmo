import * as React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom"
import _ from "lodash"

function getWindowDimensions() {
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  return { width, height }
}

const SIGNIFICANT_HEIGHT_CHANGE = 0
export class App extends React.Component {
  constructor() {
    super()

    this.state = {
      mounted: false,
      windowWidth: null,
      windowHeight: null,
    }
  }

  handleWindowSizeChange = () => {
    const dimensions = getWindowDimensions()
    const windowWidth = dimensions.width
    const windowHeight = dimensions.height
    if (
      this.state.windowWidth !== windowWidth ||
      this.state.windowHeight !== windowHeight
    ) {
      console.log("Processing window size change", windowWidth, windowHeight)
      if (
        this.state.windowWidth != windowWidth ||
        this.state.windowHeight > windowHeight ||
        windowHeight - this.state.windowHeight > SIGNIFICANT_HEIGHT_CHANGE
      ) {
        console.log("App size changed from", this.state)
        this.setState({
          windowWidth,
          windowHeight,
        })
        if (win.width !== windowWidth || win.height !== windowHeight) {
          win.setWH(windowWidth, windowHeight)
        }
      }
    }
  }

  componentDidMount() {
    const dimensions = getWindowDimensions()
    const windowWidth = dimensions.width
    const windowHeight = dimensions.height
    console.log(
      "componentDidMount() window geometry",
      windowWidth,
      windowHeight
    )

    window.addEventListener(
      "resize",
      _.throttle(this.handleWindowSizeChange, 500)
    )
    globalSettings.maxCodePlaySpeed = getUxSettings().MAX_CODE_PLAY_SPEED

    this.setState({
      windowWidth,
      windowHeight,
      mounted: true,
    })
    win.setAll(windowWidth, windowHeight, window.scrollY, true)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange)
  }

  render() {
    console.log("App.render()")
    const { windowWidth, windowHeight } = this.state.mounted ? this.state : {}
    console.log("Window sizes", windowWidth, windowHeight)

    if (!this.state.mounted) {
      return <div>Loading...</div>
    }
    return (
      <Router>
        <Switch>
          <Route path="/lesson/:id">
            <Lesson windowWidth={windowWidth} windowHeight={windowHeight} />
          </Route>
          <Route path="/">
            <MainPage windowWidth={windowWidth} windowHeight={windowHeight} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

function runBubbleSort(a, granular = false) {
  const bs = new BubbleSort()
  bs.run(a, granular)
  const bp = bs.getBreakpoints()
  return { bp }
}

export const BubbleSortVisualisation = TetrisFactory([
  [HashBoxesComponent, [{ labels: [null] }, "a", "j", "jplus1"]],
])

const SORTS_LIST_INPUT = {
  label: "",
  type: "array_int",
  id: "sorts-list",
  default: "42 13 11 92 27 87 14 67 1 12 44 9 20 7",
}

const LESSONS = {
  bubble_sort: {
    mainPagePaneHeaderTitle: "Пузырьком",
    mainPagePaneClassName: "bubble-sort",
    playerHeaderTitle: "сортировку пузырьком",
    mobilePlayerHeaderTitle: "Сортировка пузырьком",
    getBreakpoints: (numbers) => {
      return runBubbleSort(
        numbers.map((n) => n.toNumber()),
        true
      ).bp
    },
    inputs: [SORTS_LIST_INPUT],
    formatBpDesc: formatBubbleSort,
    stateVisualization: BubbleSortVisualisation,
    code: BUBBLE_SORT_CODE,
    resetToZero: true,

    theory: <BubbleSortTheory />,
  },
}

class LessonPane extends React.Component {
  constructor() {
    super()
    this.state = {
      navigatingPlayer: false,
    }
  }

  render() {
    const id = this.props.id
    const lesson = LESSONS[id]
    console.log("Lesson pane", id, LESSONS[id])

    if (this.state.navigatingPlayer) {
      return <Redirect to={`lesson/${id}`} />
    }
    return (
      <a
        href={`/lesson/${id}`}
        className={classnames("pane", lesson.mainPagePaneClassName)}
        onClick={this.navigatePlayer}
      >
        <h2>{lesson.mainPagePaneHeaderTitle}</h2>
      </a>
    )
  }
}

const Lesson = withRouter(
  class extends React.Component {
    render() {
      console.log("withRouter", this.props)
      const id = this.props.match.params.id
      const { windowWidth, windowHeight } = this.props
      console.log("Lesson", id, LESSONS[id])
      return (
        <Player
          {...LESSONS[id]}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          lessonId={id}
        />
      )
    }
  }
)

export class MainPage extends React.Component {
  render() {
    return (
      <div className="frontpage">
        <div className="section">
          <h1>Сортировки</h1>
          <div className="pane-collection sorts-collection">
            <div className="sort-1">
              <LessonPane id="bubble_sort" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }
}

export function initAndRender() {
  window.addEventListener("load", () => {
    const root = document.getElementById("root")
    ReactDOM.render(<App />, root)
  })
}
