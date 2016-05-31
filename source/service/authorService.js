import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { dataApi  } from '../config';

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

export function getAuthorByID(id){
	let fetchApi = dataApi['author_id'];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled({id});

	return requestService.get(fetchApi).then(filterData);
}
