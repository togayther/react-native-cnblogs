import _ from 'lodash';

import * as requestService from './request';
import * as Util from '../common';
import { Base64 } from '../common/base64';
import * as storageService from './storage';
import { authData, storageKey, pageSize } from '../config';
import dataApi from '../config/api';

export function searchByKey(category, key){
    let params = { key };
	let fetchApi = dataApi.search[category];
    
    let strCompiled = _.template(fetchApi);
    fetchApi = strCompiled(params);

    return requestService.get(fetchApi);
}
