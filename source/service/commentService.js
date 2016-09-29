import _ from 'lodash';
import * as requestService from './request';
import { convertJSONToFormData } from '../common';
import { pageSize } from '../config';
import dataApi from '../config/api';

export function getCommentsByPost(category, id, params = {}){
	params.pageSize = pageSize;
	params.id = id;
	let fetchApi = dataApi[category]["comments"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}

export function addComment(category, params, data){
	let fetchApi = dataApi[category]["comment_add"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);
	data = convertJSONToFormData(data);

	return requestService.post(fetchApi, data);
}

