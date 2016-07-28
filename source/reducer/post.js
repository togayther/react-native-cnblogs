import { postCategory } from '../config';
import * as types from '../constant/actiontype';

let initialState = {
	posts: {}
};

Object.keys(postCategory).map((item)=> {
	initialState[item] = [];
});

function restrictPostsData(posts){
	let postKeys = Object.keys(posts),
		postLength = postKeys.length,
		postLimit = 5;
		
	if(postLength > postLimit){
	   let postResults = {};
	   for(let i = 0; i < postLimit; i++){
	   	  let key = postKeys[i];
		  postResults[key] = posts[key]
	   }
	   return postResults;
	}

	return posts;
}

export default function (state = initialState, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, category, id } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		
		case types.FETCH_POSTS_BY_CATEGORY:
			return {
				...state,
				[category]: payload
			};
		case types.FETCH_POSTS_BY_CATEGORY_WITHPAGE:
			return {
				...state,
				[category]: state[category].concat(payload)
			};
		case types.FETCH_POST_BY_ID:

			let posts = {
				...state.posts,
				[id]: payload
			};

			console.info(posts);

			let postResults = restrictPostsData(posts);

			console.info(postResults);

			return {
				...state,
				posts: postResults
			};
		default:
			return state;
	}
}