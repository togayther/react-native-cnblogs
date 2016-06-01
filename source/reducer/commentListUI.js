
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
	const { sequence = {}, pid } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.FETCH_COMMENTS_BY_CATEGORY:
			return {
				...state,
				[pid]: {
					...state[pid],
					refreshPending: pendingStatus,
					pageIndex: initialState[pid].pageIndex,
					fetchStatus: (!error && !pendingStatus) ? state[pid].fetchStatus + 1 : state[pid].fetchStatus
				}
			};
		case types.FETCH_COMMENTS_BY_CATEGORY_WITHPAGE:
			return {
				...state,
				[pid]: {
					...state[pid],
					pagePending: pendingStatus,
					pageIndex: (!error && !pendingStatus) ? state[pid].pageIndex + 1: state[pid].pageIndex
				}
			};
		default:
			return state;
	}
}