import * as types from '../constant/actiontype';
import { pageSize } from '../config';

const initialState = {
	refreshPending: false
};

export default function (state = initialState, action) {
	const { type, meta={}, payload = [], error } = action;
	const { sequence={}, name } = meta;
	const pendingStatus = sequence.type == 'start';

	switch (type) {
		case types.FETCH_AUTHOR_DETAIL:
			return {
				...state,
				[name]:{
					...state[name],
					refreshPending: pendingStatus,
					postPageEnabled: payload.entry && payload.entry.length >= pageSize,
					postPageIndex: 1
				}
			};
		case types.FETCH_AUTHOR_DETAIL_WITHPAGE:
			return {
				...state,
				[name]:{
					...state[name],
					postPageEnabled: payload.entry && payload.entry.length >= pageSize,
					postPagePending: pendingStatus,
					postPageIndex: (!error && !pendingStatus) ? state[name].postPageIndex + 1: state[name].postPageIndex	
				}
			};
		default:
			return state;
	}
}