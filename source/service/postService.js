import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { postCategory, pageSize } from '../config';
import dataApi from '../config/api';

function filterData(data) {
	try{
		return JSON.parse(data);
	}catch(e){
		throw new Error('data format error');
	}
}

export function getPostByCategory(category = postCategory.home , params = {}){
	params.pageSize = pageSize;
	
	let fetchApi = dataApi[category]["list"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}

export function getPostById(category, id){
	let params = { id };
	let fetchApi = dataApi[category]["detail"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}
