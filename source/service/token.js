import { storageKey } from '../config';
import * as storageService from './storage';

export function getToken() {
  return storageService.getItem(storageKey.USER_TOKEN).then((token)=>{
		return token;
	});
}