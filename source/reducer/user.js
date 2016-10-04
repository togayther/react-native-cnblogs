import Config, { postCategory } from '../config';
import * as types from '../constant/actiontype';

function removePost(state, category, id, url){
	let results = [],
		posts = state[category];
	if(posts && posts.length){
		for(let i = 0, len = posts.length; i<len; i++){
			let postItem = posts[i];
			if(category === postCategory.favorite){
				if(encodeURIComponent(postItem.LinkUrl) != url){
					let resultItem = { ...postItem };
					results.push(resultItem);
				}
			}else{
				if(postItem.Id != id){
					let resultItem = { ...postItem };
					results.push(resultItem);
				}
			}
		}
	}
	return {
		...state,
		[category]: results
	};
}

let initialState = {
	DisplayName: Config.appInfo.name
};

export default function (state = initialState, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, category, id, url } = meta;
	if (sequence.type === 'start' || error) {
		return state;
	}
	switch (type) {
		case types.FETCH_USER_INFO:
			return {
				...state,
				...payload
			};
		case types.FETCH_USER_ASSET:
			return {
				...state,
				[category]: payload
			};
		case types.FETCH_USER_ASSET_WITHPAGE:
			return {
				...state,
				[category]: state[category].concat(payload)
			};
		case types.REMOVE_POST:
			return removePost(state, category, id, url)
		default:
			return state;
	}
}