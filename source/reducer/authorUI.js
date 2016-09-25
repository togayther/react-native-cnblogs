import * as types from '../constant/actiontype';
import { pageSize } from '../config';



export default function (state = {}, action) {
	const { type, meta={}, payload = [], error } = action;
	const { sequence={}, blogger } = meta;
	const pendingStatus = sequence.type == 'start';

	switch (type) {
		case types.FETCH_AUTHOR_DETAIL:
			return {
				...state,
				[blogger]:{
					...state[blogger],
					refreshPending: pendingStatus
				}
			};
		case types.FETCH_AUTHOR_POSTS:
			return {
				...state,
				[blogger]:{
					...state[blogger],
					refreshPending: pendingStatus,
					postPageEnabled: payload.length >= pageSize,
					postPageIndex: 1
				}
			};
		case types.FETCH_AUTHOR_POSTS_WITHPAGE:
			return {
				...state,
				[blogger]:{
					...state[blogger],
					postPageEnabled: payload.length >= pageSize,
					postPagePending: pendingStatus,
					postPageIndex: (!error && !pendingStatus) ? state[blogger].postPageIndex + 1: state[blogger].postPageIndex	
				}
			};
		default:
			return state;
	}
}