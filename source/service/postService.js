import _ from 'lodash';
import * as requestService from './request';
import { convertJSONToFormData } from '../common';
import { postCategory, pageSize } from '../config';
import dataApi from '../config/api';


function formatPostData(category, data){
	let postData;
	if( category === postCategory.question ){
		let questionData = [];
		questionData.push('<Question xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/CNBlogs.OpenAPI.Dto">');
		questionData.push('<Content>' + data.Content +'</Content>');
		questionData.push('<Flags>' + data.Flags+ '</Flags>');
		questionData.push('<Tags>' + data.Tags + '</Tags>');
		questionData.push('<Title>' + data.Title + '</Title>');
		questionData.push('</Question>');
		postData = questionData.join("");
	}else{
		postData = convertJSONToFormData(data);
	}
	return postData;
}

function formatPostHeader(category){
	let headers;
	if(category === postCategory.question){
		headers = {
			"Content-type":'application/xml'
		}
	}
	return headers;
}

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

	let data = formatPostData(category, params);
	let headers = formatPostHeader(category);
	return requestService.post(fetchApi, data, headers);
}

export function removePost(category, params){
	let fetchApi = dataApi[category]["remove"];
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled(params);

	return requestService.remove(fetchApi);
}

