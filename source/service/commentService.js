import _ from 'lodash';
import * as requestService from './request';
import { convertJSONToFormData } from '../common';
import { pageSize, postCategory } from '../config';
import dataApi from '../config/api';

function formatCommentData(category, data){
	//经过多次测试，官方的博文评论添加接口，仅支持xml
	//其它支持常规的表单提交，所以这里兼容处理一下
	let commentData;
	if(category === postCategory.home || category === postCategory.rank){
		commentData = '<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/">' + data.Content + '</string>';
	}else{
		commentData = convertJSONToFormData(data);
	}
	return commentData;
}

function formatCommentHeader(category){
	let headers;
	if(category === postCategory.home || category === postCategory.rank){
		headers = {
			"Content-type":'application/xml'
		}
	}
	return headers;
}

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

	let commentHeaders = formatCommentHeader(category);
	let commentData = formatCommentData(category, data);
	return requestService.post(fetchApi, commentData, commentHeaders);
}

