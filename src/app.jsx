 /**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import App from './components/App';
// // Import the pages
import IndexPage from './components/pages/index/Index';
import LoginPage from './components/pages/login/Login';
import MyPage from './components/pages/mypage/MyPage';
import PwResetPage from './components/pages/login/PwReset';
import MessagePage from './components/pages/message/Message';
import StationDetailPage from './components/pages/mypage/StationDetailPage';
import SetUserPage from './components/pages/mypage/SetUserPage';
// TODO 这块其实本不用这么写，后续优化一下，估计还是webpack路径配置问题
import 'normalize.css/normalize.css';

// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
import rootReducer from './reducers/rootReducer';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
        const nextRootReducer = require('./reducers/rootReducer').default;
        store.replaceReducer(nextRootReducer);
    });
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/index" component={IndexPage} />
                <Route path="/" component={LoginPage} />
                <Route path="/mypage" component={MyPage} />
                <Route path="/pwreset" component={PwResetPage} />
                <Route path="/message" component={MessagePage} />
                <Route path="/detail" component={StationDetailPage} />
                <Route path="/setuser" component={SetUserPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
