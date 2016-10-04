import _ from 'lodash';
import * as requestService from './request';
import dataApi from '../config/api';

export function searchByKey(category, key, params = {}){
    params.key = key;
    
	let fetchApi = dataApi.search[category];
    
    let strCompiled = _.template(fetchApi);
    fetchApi = strCompiled(params);

    return requestService.get(fetchApi);
}
