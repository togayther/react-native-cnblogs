import * as types from '../constant/actiontype';

const initialState = {
	loadPending: false,

	postPageIndex: 1,
	postPageSize: 10,
	postFetchStatus: 0,
	postPagePending: false
};

export default function (state = initialState, action) {
	const { type, meta={} } = action;
	const { sequence={} } = meta;
	const { id } = meta;
	const pendingStatus = sequence.type == 'start';

	switch (type) {
		case types.FETCH_AUTHOR_BY_ID:
			return {
				...state,
				[id]:{
					...state[id],
					loadPending: pendingStatus
				}
			};

		case types.FETCH_POSTS_BY_AUTHOR:
			return {
				...state,
				[id]:{
					...state[id],
					postPageIndex: initialState.postPageIndex,
					postFetchStatus: (!error && !pendingStatus) ? state.postFetchStatus + 1 : state.postFetchStatus
				}
			};
		case types.FETCH_POSTS_BY_AUTHOR_WITHPAGE:
			return {
				...state,
				[id]:{
					...state[id],
					postPagePending: pendingStatus,
					postPageIndex: (!error && !pendingStatus) ? state.postPageIndex + 1: state.postPageIndex	
				}
			};
		default:
			return state;
	}
}