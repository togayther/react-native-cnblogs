import * as types from '../constant/actiontype';
import { postCategory } from '../config';

let initialState = {};

Object.keys(postCategory).map((item)=> {
	initialState[item] = {
		pullRefreshPending: false,
		reachedEndPending: false,
		page: 1,
		limit: 10,
		flag: 0
	}
});

export default function (state = initialState, action) {

	const { payload, error, meta={}, type } = action;
	const { sequence={}, category } = meta;
	const pending = sequence.type === 'start';

	switch (type) {
		case types.FETCH_POSTS_BY_CATEGORY:
			return {
				...state,
				[category]: {
					...state[category],
					pullRefreshPending: pending,
					page: initialState[category].page,
					flag: (!error && !pending) ? state[category].flag + 1 : state[category].flag
				}
			};
		case types.FETCH_POSTS_BY_CATEGORY_WITHPAGE:
			return {
				...state,
				[category]: {
					...state[category],
					reachedEndPending: pending,
					page: (!error && !pending) ? state[category].page + 1: state[category].page
				}
			};
		default:
			return state;
	}
}