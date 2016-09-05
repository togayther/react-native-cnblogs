import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { Base64 } from '../common/base64';

import { authData } from '../config';
import dataApi  from '../config/api';

function filterData(data) {
	try{
        let result = JSON.parse(data)
		return result;
	}catch(e){
		throw new Error('data format error');
	}
}

export function login(username, password){
	
	let fetchApi = dataApi.user.login;
    
    let data =  `grant_type=password&username=${username}&password=${password}`.replace(/\+/g, "%2B");
    let headers = {
        'Authorization': "Basic " + Base64.btoa(`${authData.clientId}:${authData.clientSecret}`),
    };

    return requestService.post(fetchApi, data, headers).then(filterData);
}