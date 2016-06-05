import * as types from '../constant/actiontype';

function mergeAuthorPosts(state, payload){
	if (payload && payload.entry && payload.entry.length) {
		return {
			...state,
			entry: state.entry.concat(payload.entry)
		}
	}
	return state;
}

const initialState = {
	ranks: {},
	searchs: {},
	details: {}
};

export default function (state = initialState, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, name } = meta;

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
		case types.FETCH_AUTHOR_DETAIL:
			return {
				...state,
				details: {
					...state.details,
					[name]: payload
				}
			};
		case types.FETCH_AUTHOR_DETAIL_WITHPAGE:
			return {
				...state,
				details: {
					...state.details,
					[name]: mergeAuthorPosts(state.details[name], payload)
				}
			};
		default:
			return state;
	}
}