import _ from 'lodash';
import * as requestService from './request';
import { Base64 } from '../common/base64';
import * as storageService from './storage';
import { authData, storageKey, pageSize } from '../config';
import dataApi from '../config/api';

export function login(username, password){
	let fetchApi = dataApi.user.auth;
    let data =  `grant_type=password&username=${username}&password=${password}`.replace(/\+/g, "%2B");
    let headers = {
        'Authorization': "Basic " + Base64.btoa(`${authData.clientId}:${authData.clientSecret}`)
    };
    return requestService.post(fetchApi, data, headers);
}

export function refreshToken(token){
    let fetchApi = dataApi.user.auth;
    let data =  `grant_type=refresh_token&refresh_token=${token}`;
    let headers = {
        'Authorization': "Basic " + Base64.btoa(`${authData.clientId}:${authData.clientSecret}`)
    };
    return requestService.post(fetchApi, data, headers);
}

export function getToken(){
    return storageService.getItem(storageKey.USER_TOKEN);
}

export function getUserInfo(){
    let fetchApi = dataApi.user.info;
    return requestService.get(fetchApi);
}

export function getUserAsset(category, params = {}){
    params.pageSize = pageSize;
    let fetchApi = dataApi.user[category];
    let strCompiled = _.template(fetchApi);
    fetchApi = strCompiled(params);
    return requestService.get(fetchApi);
}