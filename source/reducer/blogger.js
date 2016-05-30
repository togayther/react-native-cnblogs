import * as types from '../constant/actiontype';

let initialState = {
	searchs: {},
	bloggers: {}
};

export default function (state = initialState, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, key, id } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		case types.FETCH_BLOGGERS_BY_RANK:
			return {
				...state,
				[category]: payload
			};
		case types.FETCH_BLOGGERS_BY_KEY:
			return {
				...state,
				searchs: {
					...state.bloggers,
					[key]: payload
				}
			};
		case types.FETCH_BLOGGERS_BY_ID:
			return {
				...state,
				bloggers: {
					...state.bloggers,
					[id]: payload
				}
			};
		default:
			return state;
	}
}