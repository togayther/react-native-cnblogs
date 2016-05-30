import Config from '../config';

const apiDomain = Config.domain;

function filterJSON(res) {
	return res.text();
}

function filterStatus(res) {
	if (res.ok) {
		return res;
	} else {
		throw 'fetch error';
	}
}

export function get(url, params) {
	url = apiDomain + url;

	return fetch(url)
		.then(filterStatus)
		.then(filterJSON);
}

export function post(url, body) {
	url = apiDomain + url;

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