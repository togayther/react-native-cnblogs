import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';

import { dataApi, authData } from '../config';

function filterData(data) {
	try{
        console.warn(data);
        let result = JSON.parse(data)
        console.warn("userService filterData:");
        console.warn(result) 
		return result;
	}catch(e){
		throw new Error('data format error');
	}
}

export function login(username, password){
	
	let fetchApi = "http://api.cnblogs.com/token";
    let postData =  `grant_type=password&username=${username}&password=${password}`;

    return requestService.post(fetchApi, postData).then(filterData);
}