import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { postCategory, dataApi, pageSize } from '../config';

function filterData(data) {
	return JSON.parse(data);
}

export function getPostByCategory(category = postCategory.home , params = {}){
	params.pageSize = pageSize;
	
	let fetchApi = dataApi[category];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}

export function getPostById(category, id){
	let params = { id };

	params.id = 5561609;

	let fetchApi = dataApi[`${category}_detail`];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}
