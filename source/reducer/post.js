import * as types from '../constant/actiontype';
import { postCategory } from '../config';

let initialState = {
	posts: {}
};

Object.keys(postCategory).map((item)=> {
	initialState[item] = [];
});

export default function (state = initialState, action) {

	const { payload, error, meta = {}, type } = action;
	const { sequence = {}, category, id = '0' } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		case types.FETCH_POSTS_BY_CATEGORY_WITHPAGE:
			return {
				...state,
				[category]: state[category].concat(payload)
			};
		case types.FETCH_POSTS_BY_CATEGORY:
			return {
				...state,
				[category]: payload
			};
		case types.FETCH_POST_BY_ID:
			return {
				...state,
				posts: {
					...state.posts,
					[id]: payload
				}
			};
		default:
			return state;
	}
}