import _ from 'lodash';
import * as requestService from './request';
import { pageSize } from '../config';
import dataApi from '../config/api';

export function getAuthorDetail(blogger){
	let params = { blogger };

	let fetchApi = dataApi['author']['detail'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}

export function getAuthorPosts(blogger, params){
	params.blogger = blogger;
	params.pageSize = pageSize;

	let fetchApi = dataApi['author']['posts'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}