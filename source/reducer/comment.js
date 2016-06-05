import { postCategory } from '../config';
import * as types from '../constant/actiontype';

export default function (state = {}, action) {
	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, category, pid } = meta;
	if (sequence.type === 'start' || error) {
		return state;
	}
	switch (type) {
		case types.FETCH_COMMENTS_BY_POST:
			return {
				...state,
				[pid]: payload
			};
		case types.FETCH_COMMENTS_BY_POST_WITHPAGE:
			return {
				...state,
				[pid]:state[pid].concat(payload)
			};
		default:
			return state;
	}
}