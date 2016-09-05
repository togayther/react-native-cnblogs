import Config, { authData } from '../config';
import { Base64 } from '../common/base64';
import * as UserToken from './token';

const apiDomain = Config.domain;
const timeout = 15000;

function filterJSON(res) {
	try{
		return res.text();	
	}
	catch(e){
		throw new Error('data format error');
	}
}

function filterStatus(res) {
	if (res.ok) {
		return res;
	} else {
		res.text().then(function(data){
			 console.warn(data);
		});
		throw new Error('server handle error');
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

	if(!headers["Authorization"]){

		UserToken.getToken();
		console.info("token");
		console.info(token);

		headers["Authorization"] = 'Bearer kangming';
	}

	uri = Config.domain + uri;
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
}

export function get(uri, headers = {}) {
	return request(uri, "GET", headers);
}

export function post(uri, data = "", headers = {}) {
	headers["Content-type"] = 'application/x-www-form-urlencoded';

	return request(uri, "POST", headers, data);
}