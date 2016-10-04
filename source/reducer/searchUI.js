import * as types from '../constant/actiontype';

let initialState = {};

["blog", "news", "kb"].map((item)=> {
	initialState[item] = {
		searchPending: false,
		pagePending: false,
		pageEnabled: true,
		pageIndex: 1
	}
});

const pageSize = 15;

export default function (state = initialState, action) {

	const { payload = [], meta={}, type, error } = action;
	const { sequence = {}, category } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.SEARCH_BY_KEY:
			return {
				...state,
				[category]: {
					...state[category],
					searchPending: pendingStatus,
					pagePending: pendingStatus,
					pageEnabled: payload.length >= pageSize,
					pageIndex: initialState[category].pageIndex
				}
			};
		case types.SEARCH_BY_KEY_WITHPAGE:
			return {
				...state,
				[category]: {
					...state[category],
					pagePending: pendingStatus,
					pageEnabled: payload.length >= pageSize,
					pageIndex: (!error && !pendingStatus) ? state[category].pageIndex + 1: state[category].pageIndex
				}
			};
		default:
			return state;
	}
}