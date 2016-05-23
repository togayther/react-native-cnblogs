
import { postCategory } from '../config';
import * as types from '../constant/actiontype';

let initialState = {};

Object.keys(postCategory).map((item)=> {
	initialState[item] = {
		pageIndex: 1,
		pageSize: 10,
		pagePending: false,
		fetchStatus: 0,
		refreshPending: false
	}
});

export default function (state = initialState, action) {

	const { payload, meta={}, type, error } = action;
	const { sequence = {}, category } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.FETCH_POSTS_BY_CATEGORY:
			return {
				...state,
				[category]: {
					...state[category],
					refreshPending: pendingStatus,
					pageIndex: initialState[category].pageIndex,
					fetchStatus: (!error && !pendingStatus) ? state[category].fetchStatus + 1 : state[category].fetchStatus
				}
			};
		case types.FETCH_POSTS_BY_CATEGORY_WITHPAGE:
			return {
				...state,
				[category]: {
					...state[category],
					pagePending: pendingStatus,
					pageIndex: (!error && !pendingStatus) ? state[category].pageIndex + 1: state[category].pageIndex
				}
			};
		default:
			return state;
	}
}