import * as types from '../constant/actiontype';

const initialState = {
	loadPending: {}
};

export default function (state = initialState, action) {
	const { type, meta={} } = action;
	const { sequence={} } = meta;
	const { id } = meta;
	const pendingStatus = sequence.type == 'start';

	switch (type) {
		case types.FETCH_BLOGGERS_BY_KEY:
			return {
				...state,
				loadPending: {
					...state.loadPending,
					[id]: pendingStatus
				}
			};
		case types.FETCH_BLOGGERS_BY_ID:
			return {
				...state,
				loadPending: {
					...state.loadPending,
					[id]: pendingStatus
				}
			};
		default:
			return state;
	}
}