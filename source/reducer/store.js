import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import * as reducers from '../reducer';
import middlewares from '../middleware';

const isDebuggingInBrowser = __DEV__ && !!window.navigator.userAgent;

const reducer = combineReducers(reducers);

const store = applyMiddleware(
	...middlewares
)(createStore)(reducer);

if (module.hot) {
	module.hot.accept(() => {
		store.replaceReducer(reducer);
	});
}

if (isDebuggingInBrowser) {
	window.store = store;
}

export const Store = store;
