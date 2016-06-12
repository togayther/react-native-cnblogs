import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { postCategory, dataApi, pageSize } from '../config';

function filterData(data) {
	try{
		return JSON.parse(data);
	}catch(e){
		throw '数据格式错误';
	}
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

	let fetchApi = dataApi[`${category}_detail`];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}
