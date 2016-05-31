
import * as types from '../constant/actiontype';

let initialState = {
	rankPending: false,
	searchPending: false
};

export default function (state = initialState, action) {

	const { payload, meta={}, type, error } = action;
	const { sequence = {}, category } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.FETCH_AUTHORS_BY_RANK:
			return {
				...state,
				rankPending: pendingStatus
			};
		case types.FETCH_AUTHORS_BY_KEY:
			return {
				...state,
				searchPending: pendingStatus
			};
		default:
			return state;
	}
}