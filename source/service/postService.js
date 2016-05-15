import * as requestService from './request';
import * as Util from '../common/util';
import { postCategory, dataApi, pageSize } from '../config';

function filterData(data) {
	return data;
}


export function getPostByCategory(category = postCategory.home , params = {}){
	let pageIndex = params.page || 1;
	let fetchApi = String.format(dataApi[category], pageIndex, pageSize);

	return requestService.get(fetchApi).then(filterData);
}

export function getPostById(category, id){
	let fetchApi = dataApi[`${category}_detail`];
	fetchApi = String.format(fetchApi, id);

	return requestService.get(fetchApi).then(filterData);
}