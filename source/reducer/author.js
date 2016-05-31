import * as types from '../constant/actiontype';

let initialState = {
	searchs: {},
	authors: {}
};

export default function (state = initialState, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, key, id } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		case types.FETCH_AUTHORS_BY_RANK:
			return {
				...state,
				ranks: payload
			};
		case types.FETCH_AUTHORS_BY_KEY:
			return {
				...state,
				searchs: payload
			};
		case types.FETCH_AUTHORS_BY_ID:
			return {
				...state,
				authors: {
					...state.authors,
					[id]: payload
				}
			};
		default:
			return state;
	}
}