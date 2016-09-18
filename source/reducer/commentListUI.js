
import * as types from '../constant/actiontype';
import { pageSize } from '../config';

export default function (state = [], action) {

	const { payload = [], meta={}, type, error } = action;
	const { sequence = {}, id } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.FETCH_COMMENTS_BY_POST:
			return {
				...state,
				[id]: {
					...state[id],
					refreshPending: pendingStatus,
					pageIndex: 1,
					pageEnabled: payload.length >= pageSize
				}
			};
		case types.FETCH_COMMENTS_BY_POST_WITHPAGE:
			return {
				...state,
				[id]: {
					...state[id],
					pagePending: pendingStatus,
					pageEnabled: payload.length >= pageSize,
					pageIndex: (!error && !pendingStatus) ? state[id].pageIndex + 1: state[id].pageIndex
				}
			};
		default:
			return state;
	}
}