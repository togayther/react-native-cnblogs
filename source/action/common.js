
import { createAction } from 'redux-actions';
import _ from 'lodash';
import * as types from '../constant/actiontype';

export const message = createAction(types.SHOW_MESSAGE, (text)=> {
	let id = _.uniqueId();
	return {
		id: id,
		text
	}
});

