import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { postCategory, dataApi } from '../config';

function filterData(data) {
	return JSON.parse(data);
}

export function getBloggerByRank(params = {}){
	
	let fetchApi = dataApi[category];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}

export function getBloggerByKey(category, id){
	let params = { id };
	
	let fetchApi = dataApi[`${category}_detail`];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}

export function getBloggerByID(category, id){
	let params = { id };
	
	let fetchApi = dataApi[`${category}_detail`];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}
