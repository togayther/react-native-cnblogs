import {createAction} from 'redux-actions';
import * as types from '../constant/actiontype';

export const toast = createAction(types.SHOW_TOAST, (text, timeout)=> {
	return {
		text,
		timeout,
		id: new Date().getTime()
	}
});

