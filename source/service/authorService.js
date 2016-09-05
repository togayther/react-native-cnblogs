import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { pageSize } from '../config';
import dataApi from '../config/api';

function filterData(data) {
	return JSON.parse(data);
}

export function getAuthorsByRank(params = {}){
	
	let fetchApi = dataApi['author_rank'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}

export function getAuthorsByKey(key){
	let fetchApi = dataApi['author_search'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled({key});

	return requestService.get(fetchApi).then(filterData);
}

export function getAuthorDetail(name, params){
	
	params.pageSize = pageSize;
	params.name = name;

	let fetchApi = dataApi['author_detail'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.get(fetchApi).then(filterData);
}
