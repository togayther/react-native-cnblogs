
import * as types from '../constant/actiontype';
import { pageSize } from '../config';

export default function (state = [], action) {

	const { payload = [], meta={}, type, error } = action;
	const { sequence = {}, pid } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.FETCH_COMMENTS_BY_POST:
			return {
				...state,
				[pid]: {
					...state[pid],
					refreshPending: pendingStatus,
					pageIndex: 1,
					pageEnabled: payload.length >= pageSize
				}
			};
		case types.FETCH_COMMENTS_BY_POST_WITHPAGE:
			return {
				...state,
				[pid]: {
					...state[pid],
					pagePending: pendingStatus,
					pageEnabled: payload.length >= pageSize,
					pageIndex: (!error && !pendingStatus) ? state[pid].pageIndex + 1: state[pid].pageIndex
				}
			};
		default:
			return state;
	}
}