import { postCategory } from '../config';
import * as types from '../constant/actiontype';

let initialState = {
	posts: {}
};

Object.keys(postCategory).map((item)=> {
	initialState[item] = [];
});

function removePost(state, category, id){
	let results = [],
		posts = state[category];
	if(posts && posts.length){
		for(let i = 0, len = posts.length; i<len; i++){
			let postItem = posts[i];
			if(postItem.Id != id){
				let resultItem = { ...postItem };
				results.push(resultItem);
			}
		}
	}
	return {
		...state,
		[category]: results
	};
}

function updatePostCommentCount(state, category, id){
	let results = [],
		posts = state[category];
	if(posts && posts.length){
		for(let i = 0, len = posts.length; i<len; i++){
			let postItem = posts[i];
			let resultItem = { ...postItem };
			if(postItem.Id === id){
				resultItem.CommentCount++;
			}
			if(postItem.Qid === id){
				resultItem.AnswerCount++ 
			}
			results.push(resultItem);
		}
	}
	return {
		...state,
		[category]: results
	};
}

export default function (state = initialState, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {}, category, id, url } = meta;

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
			return {
				...state,
				posts: posts
			};
		case types.ADD_POST:
			return {
				...state
			};
		case types.REMOVE_POST:
			return removePost(state, category, id);
		case types.ADD_COMMENT:
			return updatePostCommentCount(state, category, id);
		default:
			return state;
	}
}