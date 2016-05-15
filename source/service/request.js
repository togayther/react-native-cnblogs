import qs from 'query-string';
import config from '../config';

const apiDomain = config.domain;

function filterJSON(res) {
	console.info("filterJSON");
	console.info(res);
	return res.json();
}

function filterStatus(res) {

	console.info("filterStatus");
	console.info(res);
	console.info(res.ok);

	if (res.ok) {
		return res;
	}
	else {
		let error = new Error(res.statusText);
		error.res = res;
		error.type = 'http';
		throw error;
	}
}

export function get(url, params) {
	url = apiDomain + url;
	if (params) {
		//url += `?${qs.stringify(params)}`;
	}

	if (process.env.NODE_ENV !== 'production') {
		console.info(`GET: `, url);
		console.info(`Params: `, params)
	}
	return fetch(url)
		.then(filterStatus)
		.then(filterJSON).catch((error) => {
		  console.warn(error);
		});;
}

export function post(url, body) {
	url = apiDomain + url;

	if (process.env.NODE_ENV !== 'production') {
		console.info(`POST: `, url);
		console.info(`Body: `, body)
	}

	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(filterStatus)
		.then(filterJSON);
}