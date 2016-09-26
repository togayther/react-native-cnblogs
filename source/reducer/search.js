import * as types from '../constant/actiontype';

export default function (state = {}, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, category, key } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		
		case types.SEARCH_BY_KEY:
			return {
				...state,
				[category]: payload
			};
        case types.CLEAR_AUTHOR_SEARCH_RESULT:
			return {
				...state,
                [category]: []
			};
		default:
			return state;
	}
}