import * as types from '../constant/actiontype';

export default function (state = {}, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, blogger } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		case types.FETCH_AUTHOR_DETAIL:
			return {
				...state,
				[blogger]: payload
			};
		case types.FETCH_AUTHOR_POSTS:
			return {
				...state,
				[blogger]: {
					...state[blogger],
					posts: payload
				}
			};
		case types.FETCH_AUTHOR_POSTS_WITHPAGE:
			return {
				...state,
				[blogger]: {
					...state[blogger],
					posts: state[blogger].posts.concat(payload)
				}
			};
		case types.CLEAR_AUTHOR_SEARCH_RESULT:
			return {
				...state,
				searchs: []
			};
		default:
			return state;
	}
}