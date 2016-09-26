import * as types from '../constant/actiontype';

let initialState = {};

["blog", "news", "kb"].map((item)=> {
	initialState[item] = {
		searchPending: false
	}
});

export default function (state = initialState, action) {

	const { payload = [], meta={}, type, error } = action;
	const { sequence = {}, category, authorId } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.SEARCH_BY_KEY:
			return {
				...state,
				[category]: {
					...state[category],
					searchPending: pendingStatus
				}
			};
		default:
			return state;
	}
}