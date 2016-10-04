import Config, { authData } from '../config';
import { Base64 } from '../common/base64';
import * as UserService from './userService';

const apiDomain = Config.apiDomain;
const timeout = 15000;

function filterJSON(res) {
	try{
		if(res.headers.get("content-length") > 0){
			return res.json();
		}
	}
	catch(e){
		throw new Error('data format error');
	}
}

function filterStatus(res) {
	if (res.ok) {
		return res;
	} else {
		console.info("filterStatus");
		console.info(res);
		res.text().then((data)=>{
			console.info(data);
		});
		//throw new Error('server handle error');
	}
}

function timeoutFetch(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("fetch time out"));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  })
}

export function request(uri, type = "GET", headers = {}, data = ""){
		return UserService.getToken().then((token)=>{
				if(!headers["Authorization"]){
					headers["Authorization"] = `Bearer ${token && token.access_token}`;
				}
				uri = Config.apiDomain + uri;
				let fetchOption = {
					method: type,
					headers: headers
				};

				if(type === "POST"){
					fetchOption.body = data;
				}

				if(__DEV__){
					console.log("fetch data from uri:");
					console.log(uri)
					console.log("headers:");
					console.log(headers);
					console.log("data:");
					console.log(data);
				}

				return timeoutFetch(timeout, fetch(uri, fetchOption))
				.then(filterStatus)
				.then(filterJSON)
				.catch(function(error) {
						throw error;
				});
		});
}

export function get(uri, headers = {}) {
	return request(uri, "GET", headers);
}

export function post(uri, data = "", headers = {}) {
	if(!headers["Content-type"]){
		headers["Content-type"] = 'application/x-www-form-urlencoded';
	}
	return request(uri, "POST", headers, data);
}

export function remove(uri, headers = {}) {
	return request(uri, "DELETE", headers);
}