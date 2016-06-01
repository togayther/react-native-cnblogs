import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { dataApi, pageSize } from '../config';

function filterData(data) {
	return JSON.parse(data);
}

export function getCommentsByPost(category, pid, params = {}){
	params.pageSize = pageSize;
	params.pid = pid;

	let fetchApi = dataApi[`${category}_comments`];
	
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}
