import _ from 'lodash';
import * as requestService from './request';
import dataApi from '../config/api';


export function getUpdateInfo(version){
    let fetchApi = dataApi.update.info;
	let strCompiled = _.template(fetchApi);
	fetchApi = strCompiled({ version });
    return requestService.get(fetchApi);
}
