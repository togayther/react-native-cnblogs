import * as types from '../constant/actiontype';

export default function (state = {}, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, category } = meta;
	if (sequence.type === 'start' || error) {
		return state;
	}
	switch (type) {
		case types.FETCH_USER_INFO:
			return {
				...state,
				...payload
			};
		case types.FETCH_USER_ASSET:
			return {
				...state,
				[category]: payload
			};
		case types.FETCH_USER_ASSET_WITHPAGE:
			return {
				...state,
				[category]: state[category].concat(payload)
			};
		default:
			return state;
	}
}