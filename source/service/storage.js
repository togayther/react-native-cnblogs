import React,{
	AsyncStorage
} from 'react-native';

export function setItem(key, value) {
	if (key && value){
		return AsyncStorage.setItem(key, JSON.stringify(value));
	}
}

export function mergeItem(key, value) {
	if (key && value){

		console.info(key);
		console.info(value);

		return AsyncStorage.mergeItem(key, JSON.stringify(value));
	}
}

export function getItem(key) {
	return AsyncStorage.getItem(key)
		.then(function (value) {
			return JSON.parse(value)
		});
}

export function multiGet(keys) {
	return AsyncStorage.multiGet(keys)
		.then(results=> {
			return results.map(item=> {
				return [item[0], JSON.parse(item[1])]
			})
		});
}

export function multiRemove(keys) {
	return AsyncStorage.multiRemove(keys)
}

export const removeItem = AsyncStorage.removeItem;

export const clear = AsyncStorage.clear;