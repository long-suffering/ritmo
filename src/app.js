import _ from "lodash";
import "./mainpage.css";
import "./styles.css";
import bgLinkSterjest from "./images/sort_img/bg-link-sterjest.png";
import bgCode1 from "./images/bg-code1.png";
import bgCode2 from "./images/bg-code2.png";

import * as React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router, Link,
    Redirect,
    Route,
    Switch,
    withRouter
} from "react-router-dom";
import { getUxSettings, initUxSettings } from "./util";
import { globalSettings, win } from "./store";
import { Player } from "./player";
import { LESSONS } from "./constants";

function getWindowDimensions() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    return {width, height};
}

function logViewportStats() {
    // console.log(`DIMENSIONS: window inner: ${window.innerWidth}x${window.innerHeight}`);
    // console.log(
    //     `DIMENSIONS: document.documentElement: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`
    // );
    const vv = window.visualViewport;
    // console.log(`DIMENSIONS: visualViewport: ${vv != null ? vv.width + 'x' + vv.height : vv}`);

    const {width, height} = getWindowDimensions();
    // console.log(`DIMENSIONS: used: ${width}x${height}`);
    // TODO FIXME: this is for debugging only
    /*const url = `/viewports?wi=${window.innerWidth}x${window.innerHeight}&de=${document.documentElement.clientWidth}x${document.documentElement.clientHeight}&vv=${vv.width}x${vv.height}`;
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();*/
}

// mainly to prevent addressbar stuff on mobile changing things excessively
const SIGNIFICANT_HEIGHT_CHANGE = 0;
export class App extends React.Component {
    constructor() {
        super();

        this.state = {
            mounted: false,
            windowWidth: null,
            windowHeight: null,
        };
    }

    handleWindowSizeChange = () => {
        logViewportStats();
        const dimensions = getWindowDimensions();
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;
        if (this.state.windowWidth !== windowWidth || this.state.windowHeight !== windowHeight) {
            // console.log('Processing window size change', windowWidth, windowHeight);
            if (
                this.state.windowWidth != windowWidth ||
                this.state.windowHeight > windowHeight ||
                windowHeight - this.state.windowHeight > SIGNIFICANT_HEIGHT_CHANGE
            ) {
                // console.log('App size changed from', this.state);
                this.setState({
                    windowWidth,
                    windowHeight,
                });
                if (win.width !== windowWidth || win.height !== windowHeight) {
                    win.setWH(windowWidth, windowHeight);
                }
            }
        }
    };

    componentDidMount() {
        const dimensions = getWindowDimensions();
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;
        // console.log('componentDidMount() window geometry', windowWidth, windowHeight);

        window.addEventListener('resize', _.throttle(this.handleWindowSizeChange, 500));
        globalSettings.maxCodePlaySpeed = getUxSettings().MAX_CODE_PLAY_SPEED;

        this.setState({
            windowWidth,
            windowHeight,
            mounted: true,
        });
        win.setAll(windowWidth, windowHeight, window.scrollY, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    render() {
        // console.log('App.render()');
        const {windowWidth, windowHeight} = this.state.mounted ? this.state : {};
        // console.log('Window sizes', windowWidth, windowHeight);

        if (!this.state.mounted) {
            return <div>Loading...</div>;
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
        );
    }
}

class LessonPane extends React.Component {
    constructor() {
        super();
        this.state = {
            navigatingPlayer: false,
        };
    }

    render() {
        const id = this.props.id;
        const lesson = LESSONS[id];

        if (this.state.navigatingPlayer) {
            return <Redirect to={`lesson/${id}`} />;
        }

        return (
          <Link to={`/lesson/${id}`} className="card" style={{ backgroundColor: lesson.bg }}>
              <div className="title">{lesson.mainPagePaneHeaderTitle}</div>
              <div className="description">{lesson.description}</div>
              <img src={lesson.img} style={{objectPosition: lesson.objectFit || ""}} />
          </Link>
        );
    }
}

const Lesson = withRouter(
    class extends React.Component {
        render() {
            // console.log('withRouter', this.props);
            const id = this.props.match.params.id;
            const {windowWidth, windowHeight} = this.props;
            // console.log('Lesson', id, LESSONS[id]);
            return (
              <Player {...LESSONS[id]} windowWidth={windowWidth} windowHeight={windowHeight} lessonId={id} />
            )
        }
    }
);

export class MainPage extends React.Component {
    render() {
        return (
            <div className="fluid-body">
                <div className="frontpage">
                    <div className="header">
                        <h1>Изучай сложные алгоритмы просто и понятно</h1>
                        <p>Интерактивный учебник <br/> с искусственным интеллектом</p>
                    </div>

                    <div className="cards">
                        <LessonPane id="bubble_sort" />
                        <LessonPane id="quick_sort" />
                        <LessonPane id="simplified_hash_search" />
                    </div>

                    <div className="call-to-action">
                        <p>Что это</p>
                        <h1>Визуализация алгоритмов по шагам с готовым кодом и AI коучем</h1>
                    </div>

                    <div className="link-sterjest">
                        <img src={bgLinkSterjest} alt="" />
                        <Link
                          to="/lesson/bubble_sort"
                          className="link-sterjest-link"
                          children="Начать"
                        />
                    </div>

                    <div className="call-to-action">
                        <p>Как работает</p>
                        <h1>Всё что нужно <br/> для обучения алгоритмам – <br/> в одном месте</h1>
                    </div>

                    <div className="parent">
                        <div className="div1 parent-card">
                            <img src={bgCode1} />
                        </div>
                        <div className="div2 parent-card" style={{ backgroundColor: "#F9FFB2" }}>
                            <div className="title">Псевдо-код</div>
                            <div className="description">Каждый алгоритм при демонстрации работы подсвечивает конкретный участок, чтобы быстро понимать логику</div>
                        </div>
                        <div className="div3 parent-card" style={{ backgroundColor: "#D4B3FF" }}>
                            <div className="title">Код</div>
                            <div className="description">Готовый и правильно написанный код можно скопировать, чтобы запустить и проверить работу</div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="parent2">
                        <div className="div1 parent-card" style={{ backgroundColor: "#B3E3FF" }}>
                            <div className="title">Решение</div>
                            <div className="description">Понятная и простая визуализация алгоритма для запоминания и лучшего понимания логики работы</div>
                        </div>
                        <div className="div2 parent-card" style={{ backgroundColor: "#FFC5B3" }}>
                            <div className="title">AI-помощник</div>
                            <div className="description">Чат-бот всегда подскажет дополнительную информацию по теме и даже сгенерирует примеры с готовым кодом</div>
                        </div>
                        <div className="div3 parent-card">
                            <img src={bgCode2} />
                        </div>
                    </div>

                    <div className="call-to-action2">
                        <h1>Проект развивается <br/> как open-source решение и вы можете ему помочь!</h1>
                        <p>Присоединяйтесь, как разработчик к репозиторию на GitHub и вносите свой вклад в развитие проекта</p>
                    </div>

                    <a
                      href="https://github.com/long-suffering/ritmo"
                      className="link-sterjest-link"
                      children="GitHub"
                      style={{ marginBottom: '400px' }}
                    />

                    <div className="footer" children="Горыныч & Ко"/>

                    {/*<div className="section">*/}
                    {/*    <h1>Сортировки</h1>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <LessonPane id="bubble_sort" />*/}
                    {/*        <div className="placeholder" />*/}
                    {/*    </div>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <div className="placeholder" />*/}
                    {/*        <LessonPane id="quick_sort" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="section">*/}
                    {/*    <h1>Простейшие хеш-таблицы</h1>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <LessonPane id="simplified_hash_collisions" />*/}
                    {/*        <div className="placeholder" />*/}
                    {/*    </div>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <div className="placeholder" />*/}
                    {/*        <LessonPane id="simplified_hash_create" />*/}
                    {/*    </div>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <LessonPane id="simplified_hash_search" />*/}
                    {/*        <div className="placeholder" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="section">*/}
                    {/*    <h1>Хеш-таблицы с открытой адресацией</h1>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <LessonPane id="hash_create" />*/}
                    {/*        <div className="placeholder" />*/}
                    {/*    </div>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <div className="placeholder" />*/}
                    {/*        <LessonPane id="hash_search" />*/}
                    {/*    </div>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <LessonPane id="hash_remove" />*/}
                    {/*        <div className="placeholder" />*/}
                    {/*    </div>*/}
                    {/*    <div className="lesson-pane-stack">*/}
                    {/*        <div className="placeholder" />*/}
                    {/*        <LessonPane id="hash_resize" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export function initAndRender() {
    if (typeof window !== 'undefined') {
        initUxSettings();

        window.addEventListener('load', () => {
            logViewportStats();
            const root = document.getElementById('root');
            ReactDOM.render(<App />, root);
        });
    }
}
