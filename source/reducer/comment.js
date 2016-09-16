import { postCategory } from '../config';
import * as types from '../constant/actiontype';

export default function (state = {}, action) {
	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, category, id } = meta;
	if (sequence.type === 'start' || error) {
		return state;
	}
	switch (type) {
		case types.FETCH_COMMENTS_BY_POST:
			return {
				...state,
				[id]: payload
			};
		case types.FETCH_COMMENTS_BY_POST_WITHPAGE:
			return {
				...state,
				[id]:state[id].concat(payload)
			};
		default:
			return state;
	}
}