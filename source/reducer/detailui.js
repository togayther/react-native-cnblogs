import * as types from '../constant/actiontype';


const initialState = {
	loadPending: {}
};

export default function (state = initialState, action) {
	const { type, meta={} } = action;
	const { sequence={} } = meta;
	const { id } = meta;
	const status = sequence.type == 'start';

	switch (type) {
		case types.FETCH_POST_BY_ID:
			return {
				...state,
				loadPending: {
					...state.loadPending,
					[id]: status
				}
			};
		default:
			return state;
	}
}