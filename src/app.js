import _ from 'lodash';
import './mainpage.css';
import './styles.css';
import classnames from 'classnames';
import BigLogo from './images/big-logo.svg';

import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {getUxSettings, initUxSettings} from './util';
import {globalSettings, win} from './store';
import {HashBoxesComponent, LineOfBoxesComponent, TetrisFactory} from './code_blocks';
import {
    BUBBLE_SORT_CODE,
    BubbleSort,
    formatBubbleSort,
    formatQuickSort,
    InsertionSort,
    QUICK_SORT_CODE,
    QuickSort,
} from './new_demos';
import {Player} from './player';
import {
    Chapter1_SimplifiedHash,
    formatSimplifiedInsertAllDescription,
    formatSimplifiedSearchDescription,
    SIMPLIFIED_INSERT_ALL_BROKEN_CODE,
    SIMPLIFIED_INSERT_ALL_CODE,
    SIMPLIFIED_SEARCH_CODE,
    SimplifiedInsertBrokenStateVisualization,
    SimplifiedInsertStateVisualization,
    SimplifiedSearchStateVisualization,
} from './chapter1_simplified_hash';
import {
    Chapter2_HashTableFunctions,
    formatHashCreateNewAndInsert,
    formatHashRemoveSearch,
    formatHashResize,
    HASH_CREATE_NEW_CODE,
    HASH_REMOVE_CODE,
    HASH_RESIZE_CODE,
    HASH_SEARCH_CODE,
    HashCreateNewStateVisualization,
    HashNormalStateVisualization,
    HashResizeStateVisualization,
} from './chapter2_hash_table_functions';
import {BubbleSortTheory, CollisionsTheory, HashTheory, QuickSortTheory, SimplifiedHashTheory} from './theory';

function getWindowDimensions() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    return {width, height};
}

function logViewportStats() {
    console.log(`DIMENSIONS: window inner: ${window.innerWidth}x${window.innerHeight}`);
    console.log(
        `DIMENSIONS: document.documentElement: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`
    );
    const vv = window.visualViewport;
    console.log(`DIMENSIONS: visualViewport: ${vv != null ? vv.width + 'x' + vv.height : vv}`);

    const {width, height} = getWindowDimensions();
    console.log(`DIMENSIONS: used: ${width}x${height}`);
    // TODO FIXME: this is for debugging only
    /*const url = `/viewports?wi=${window.innerWidth}x${window.innerHeight}&de=${document.documentElement.clientWidth}x${document.documentElement.clientHeight}&vv=${vv.width}x${vv.height}`;
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();*/
}

function Footer() {
    return <footer></footer>;
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
            console.log('Processing window size change', windowWidth, windowHeight);
            if (
                this.state.windowWidth != windowWidth ||
                this.state.windowHeight > windowHeight ||
                windowHeight - this.state.windowHeight > SIGNIFICANT_HEIGHT_CHANGE
            ) {
                console.log('App size changed from', this.state);
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
        console.log('componentDidMount() window geometry', windowWidth, windowHeight);

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
        console.log('App.render()');
        const {windowWidth, windowHeight} = this.state.mounted ? this.state : {};
        console.log('Window sizes', windowWidth, windowHeight);

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

function runBubbleSort(a, granular = false) {
    const bs = new BubbleSort();
    bs.run(a, granular);
    const bp = bs.getBreakpoints();
    return {bp};
}

function runInsertionSort(a, granular = false) {
    const is = new InsertionSort();
    is.run(a, granular);
    const bp = is.getBreakpoints();
    return {bp};
}

function runQuickSort(a) {
    const qs = new QuickSort();
    qs.run(a);
    const bp = qs.getBreakpoints();
    console.log('quicksort bp', bp);
    return {bp};
}

const InsertionSortVisualisation = TetrisFactory([[LineOfBoxesComponent, [{labels: [null]}, 'a', 'i', undefined]]]);
export const MinimalSortVisualisation = TetrisFactory([[HashBoxesComponent, [{labels: [null]}, 'a']]]);
export const QuickSortVisualisation = TetrisFactory([
    [HashBoxesComponent, [{labels: [null]}, 'array', 'left', 'right']],
]);
export const BubbleSortVisualisation = TetrisFactory([[HashBoxesComponent, [{labels: [null]}, 'a', 'j', 'jplus1']]]);

const chapter1 = new Chapter1_SimplifiedHash();
const chapter2 = new Chapter2_HashTableFunctions();

// const GLOBAL_STATE = {
//     simplifiedHash: /*...*/,
//     simplifiedKeyToSearch: /* ... */,
// };

// const inputsToPass = {
//     inputs:
// }

const SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT = {
    label: 'original_list',
    type: 'array_int',
    id: 'simplified-hash-original-list',
    default: '1 56 50 2 44 25 17 4',
};

const SORTS_LIST_INPUT = {
    label: '',
    type: 'array_int',
    id: 'sorts-list',
    default: '42 13 11 92 27 87 14 67 1 12 44 9 20 7',
};

const HASH_FROM_KEYS_INPUT = {
    label: 'from_keys',
    type: 'array',
    id: 'hash-from-keys',
    default: "'uname' 'mv' 1 'time' -6 'ps' 'mkdir' 'less'",
};

const LESSONS = {
    bubble_sort: {
        mainPagePaneHeaderTitle: 'Сортировка пузырьком',
        mainPagePaneClassName: 'bubble-sort',
        playerHeaderTitle: 'Сортировка пузырьком',
        mobilePlayerHeaderTitle: 'Сортировка пузырьком',
        getBreakpoints: (numbers) => {
            return runBubbleSort(
                numbers.map((n) => n.toNumber()),
                true
            ).bp;
        },
        inputs: [SORTS_LIST_INPUT],
        formatBpDesc: formatBubbleSort,
        stateVisualization: BubbleSortVisualisation,
        code: BUBBLE_SORT_CODE,
        resetToZero: true,

        theory: <BubbleSortTheory />,
    },

    quick_sort: {
        mainPagePaneHeaderTitle: 'Быстрая',
        mainPagePaneClassName: 'quick-sort',
        playerHeaderTitle: 'быструю сортировку',
        mobilePlayerHeaderTitle: 'Быстрая сортировка',
        getBreakpoints: (numbers) => {
            return runQuickSort(numbers.map((n) => n.toNumber())).bp;
        },
        inputs: [SORTS_LIST_INPUT],
        formatBpDesc: formatQuickSort,
        stateVisualization: QuickSortVisualisation,
        code: QUICK_SORT_CODE,
        resetToZero: true,

        theory: <QuickSortTheory />,
    },

    // linear_search: {
    //     mainPagePaneHeaderTitle: 'Линейный поиск',
    //     mainPagePaneClassName: 'linear-search',
    //     playerHeaderTitle: 'линейный поиск',
    //     mobilePlayerHeaderTitle: 'Линейный поиск',
    //     code: SIMPLE_LIST_SEARCH,
    //     breakpoints: slsRes.bp,
    //     formatBpDesc: formatSimpleListSearchBreakpointDescription,
    //     stateVisualization: SimpleListSearchStateVisualization,
    // },

    simplified_hash_collisions: {
        mainPagePaneHeaderTitle: 'Коллизии',
        mainPagePaneClassName: 'simplified-hash-collisions',
        playerHeaderTitle: 'коллизии в хеш-таблицах',
        code: SIMPLIFIED_INSERT_ALL_BROKEN_CODE,
        getBreakpoints: (original_list) => {
            return chapter1.runSimplifiedInsertAllBroken(original_list).bp;
        },
        inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
        formatBpDesc: formatSimplifiedInsertAllDescription,
        stateVisualization: SimplifiedInsertBrokenStateVisualization,

        theory: <CollisionsTheory />,
    },

    simplified_hash_create: {
        mainPagePaneHeaderTitle: 'Создание',
        mainPagePaneClassName: 'simplified-hash-create',
        playerHeaderTitle: 'создание простейшей хеш-таблицы',
        code: SIMPLIFIED_INSERT_ALL_CODE,
        getBreakpoints: (original_list) => chapter1.runSimplifiedInsertAll(original_list).bp,

        inputs: [SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT],
        formatBpDesc: formatSimplifiedInsertAllDescription,
        stateVisualization: SimplifiedInsertStateVisualization,

        theory: <SimplifiedHashTheory active="simplified_hash_create" />,
    },

    simplified_hash_search: {
        mainPagePaneHeaderTitle: 'Поиск',
        mainPagePaneClassName: 'simplified-hash-search',
        playerHeaderTitle: 'поиск в простейшей хеш-таблице',
        code: SIMPLIFIED_SEARCH_CODE,
        getBreakpoints: (original_list, number) => {
            const keys = chapter1.runSimplifiedInsertAll(original_list).keys;
            return chapter1.runSimplifiedSearch(keys, number).bp;
        },
        inputs: [
            SIMPLIFIED_HASH_ORIGINAL_LIST_INPUT,
            {
                label: 'number',
                type: 'int',
                id: 'simplified-hash-search-number',
                default: '25',
            },
        ],
        formatBpDesc: formatSimplifiedSearchDescription,
        stateVisualization: SimplifiedSearchStateVisualization,

        theory: <SimplifiedHashTheory active="simplified_hash_search" />,
    },

    hash_create: {
        mainPagePaneHeaderTitle: 'Создание',
        mainPagePaneClassName: 'hash-create',
        playerHeaderTitle: 'создание хеш-таблицы',

        code: HASH_CREATE_NEW_CODE,
        getBreakpoints: (from_keys) => {
            return chapter2.runCreateNew(from_keys).bp;
        },
        inputs: [HASH_FROM_KEYS_INPUT],
        formatBpDesc: formatHashCreateNewAndInsert,
        stateVisualization: HashCreateNewStateVisualization,

        theory: <HashTheory />,
    },

    hash_search: {
        mainPagePaneHeaderTitle: 'Поиск',
        mainPagePaneClassName: 'hash-search',
        playerHeaderTitle: 'поиск в хеш-таблице',
        code: HASH_SEARCH_CODE,
        getBreakpoints: (from_keys, key) => {
            const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
            return chapter2.runSearch(hashCodes, keys, key).bp;
        },
        inputs: [
            HASH_FROM_KEYS_INPUT,
            {
                label: 'key',
                type: 'int_str_none',
                id: 'hash-search-key',
                default: "'less'",
            },
        ],
        formatBpDesc: formatHashRemoveSearch,
        stateVisualization: HashNormalStateVisualization,

        theory: <HashTheory />,
    },

    hash_remove: {
        mainPagePaneHeaderTitle: 'Удаление',
        mainPagePaneClassName: 'hash-remove',
        playerHeaderTitle: 'удаление из хеш-таблицы',
        code: HASH_REMOVE_CODE,
        getBreakpoints: (from_keys, key) => {
            const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
            return chapter2.runRemove(hashCodes, keys, key).bp;
        },
        inputs: [
            HASH_FROM_KEYS_INPUT,
            {
                label: 'key',
                type: 'int_str_none',
                id: 'hash-remove-key',
                default: "'ps'",
            },
        ],
        formatBpDesc: formatHashRemoveSearch,
        stateVisualization: HashNormalStateVisualization,

        theory: <HashTheory />,
    },

    hash_resize: {
        mainPagePaneHeaderTitle: 'Расширение',
        mainPagePaneClassName: 'hash-resize',
        playerHeaderTitle: 'расширение хеш-таблицы',
        code: HASH_RESIZE_CODE,
        getBreakpoints: (from_keys) => {
            const {hashCodes, keys} = chapter2.runCreateNew(from_keys);
            return chapter2.runResize(hashCodes, keys).bp;
        },
        inputs: [HASH_FROM_KEYS_INPUT],
        formatBpDesc: formatHashResize,
        stateVisualization: HashResizeStateVisualization,

        theory: <HashTheory />,
    },
};

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
        console.log('Lesson pane', id, LESSONS[id]);

        if (this.state.navigatingPlayer) {
            return <Redirect to={`lesson/${id}`} />;
        }
        return (
            <a
                href={`/lesson/${id}`}
                className={classnames('pane', lesson.mainPagePaneClassName)}
                onClick={this.navigatePlayer}
            >
                <h2>{lesson.mainPagePaneHeaderTitle}</h2>
            </a>
        );
    }
}

const Lesson = withRouter(
    class extends React.Component {
        render() {
            console.log('withRouter', this.props);
            const id = this.props.match.params.id;
            const {windowWidth, windowHeight} = this.props;
            console.log('Lesson', id, LESSONS[id]);
            return <Player {...LESSONS[id]} windowWidth={windowWidth} windowHeight={windowHeight} lessonId={id} />;
        }
    }
);

export class MainPage extends React.Component {
    render() {
        return (
            <div className="fluid-body">
                <div className="frontpage">
                    <div className="header">
                        <img src={BigLogo} alt="logo" />
                    </div>

                    <div className="section">
                        <h1>Сортировки</h1>
                        <div className="lesson-pane-stack">
                            <LessonPane id="bubble_sort" />
                            <div className="placeholder" />
                        </div>
                        <div className="lesson-pane-stack">
                            <div className="placeholder" />
                            <LessonPane id="quick_sort" />
                        </div>
                    </div>

                    <div className="section">
                        <h1>Простейшие хеш-таблицы</h1>
                        <div className="lesson-pane-stack">
                            <LessonPane id="simplified_hash_collisions" />
                            <div className="placeholder" />
                        </div>
                        <div className="lesson-pane-stack">
                            <div className="placeholder" />
                            <LessonPane id="simplified_hash_create" />
                        </div>
                        <div className="lesson-pane-stack">
                            <LessonPane id="simplified_hash_search" />
                            <div className="placeholder" />
                        </div>
                    </div>

                    <div className="section">
                        <h1>Хеш-таблицы с открытой адресацией</h1>
                        <div className="lesson-pane-stack">
                            <LessonPane id="hash_create" />
                            <div className="placeholder" />
                        </div>
                        <div className="lesson-pane-stack">
                            <div className="placeholder" />
                            <LessonPane id="hash_search" />
                        </div>
                        <div className="lesson-pane-stack">
                            <LessonPane id="hash_remove" />
                            <div className="placeholder" />
                        </div>
                        <div className="lesson-pane-stack">
                            <div className="placeholder" />
                            <LessonPane id="hash_resize" />
                        </div>
                    </div>
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