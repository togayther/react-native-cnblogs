import _ from 'lodash';

import * as types from '../constant/actiontype';

export default function (state = {}, action) {

	const { payload, meta = {}, type, error } = action;
	const { key, value } = meta;
	switch (type) {
		
		case types.GET_CONFIG:
			return {
				...state,
				[key]: payload
			};
		case types.UPDATE_CONFIG:
			return {
				...state,
				[key]: value
			}

		case types.REMOVE_CONFIG:
			delete state[key];
			return state;

		default:
			return state;
	}
}