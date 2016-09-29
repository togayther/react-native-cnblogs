import _ from 'lodash';
import * as requestService from './request';
import { convertJSONToFormData } from '../common';
import { postCategory, pageSize } from '../config';
import dataApi from '../config/api';

export function getPostByCategory(category = postCategory.home , params = {}){
	params.pageSize = pageSize;
	
	let fetchApi = dataApi[category]["list"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}

export function getPostById(category, id){
	let params = { id };
	let fetchApi = dataApi[category]["detail"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}

export function addPost(category, params){
	let fetchApi = dataApi[category]["add"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);
	let data = convertJSONToFormData(params);

	return requestService.post(fetchApi, data);
}
