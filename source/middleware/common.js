import * as commonAction from '../action/common';

export default function common({dispatch}) {
	return next => action => {

		const { payload, error, meta={} } = action;
		if (error === true && payload) {
			dispatch(commonAction.message(payload));
		}
		
		next(action);
	}
}
