import * as commonAction from '../action/common';

export default function common({dispatch}) {
	return next => action => {

		const { payload, error, meta={} } = action;

		if (error === true && payload && payload.message) {
			dispatch(commonAction.message(payload.message));
		}

		next(action);
	}
}
