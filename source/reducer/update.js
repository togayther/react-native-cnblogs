import * as types from '../constant/actiontype';

export default function (state = {}, action) {

	const { payload, meta = {}, type } = action;
	switch (type) {
		
		case types.FETCH_UPDATE_INFO:
			return {
				...state,
				...payload
			};

		default:
			return state;
	}
}