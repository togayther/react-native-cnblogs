import Config from '../config';

const apiDomain = Config.domain;
const timeout = 5000;

function filterJSON(res) {
	return res.text();
}

function filterStatus(res) {
	if (res.ok) {
		return res;
	} else {
		throw res.statusText;
	}
}

function timeoutFetch(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("请求数据超时"));
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

export function get(url, params) {
	url = apiDomain + url;

	return timeoutFetch(timeout, fetch(url))
	.then(filterStatus)
	.then(filterJSON)
	.catch(function(error) {
	  	throw "请求数据失败";
	});
}

export function post(url, body) {
	url = apiDomain + url;

	return timeoutFetch(timeout, fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}))
	.then(filterStatus)
	.then(filterJSON)
	.catch(function(error) {
	  	throw "提交数据失败";
	});	
}