import * as commonAction from '../action/common';

export default function common({dispatch}) {
	return next => action => {

		const { payload, error, meta={} } = action;

		if (error && payload.type === 'http') {

			dispatch(commonAction.toast(...args));
		}
		next(action);
	}
}
