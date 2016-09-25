import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { pageSize } from '../config';
import dataApi from '../config/api';

export function getAuthorsByRank(params = {}){
	
	let fetchApi = dataApi['author_rank'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}

export function getAuthorsByKey(key){
	let fetchApi = dataApi['author_search'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled({key});

	return requestService.get(fetchApi);
}

export function getAuthorDetail(blogger){
	let params = { blogger };

	let fetchApi = dataApi['author']['detail'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}

export function getAuthorPosts(blogger, params){
	params.blogger = blogger;

	let fetchApi = dataApi['author']['posts'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi);
}