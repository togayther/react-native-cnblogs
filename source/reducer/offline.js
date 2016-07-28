import _ from 'lodash';

import { postCategory } from '../config';
import * as types from '../constant/actiontype';

function formatOfflinePosts(posts){
	let results = [];
	if (posts) {
		_.mapValues(posts, (post)=>{
			if (post && post.id) {
				delete post.string;
				results.push(post);
			}
		});
		results = _.orderBy(results, ["offlineDate"], ["desc"]);
	}

	return results;
}

function removePostById(posts, id){
	let results = [];
	if (posts && posts.length && id) {
		posts.map((post)=>{
			if (post.id !== id) {
				results.push(post);
			}
		});
	}
	return results;
}

export default function (state = {}, action) {

	const { payload, meta = {}, type, error } = action;
	const { sequence = {} } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		
		case types.GET_POSTS_FROM_STORAGE:
			return {
				...state,
				posts: formatOfflinePosts(payload)
			};

		case types.GET_POST_FROM_STORAGE:
			return {
				...state,
				postContent: payload
			};
			
		case types.REMOVE_POST_IN_STORAGE:
			return{
				...state, 
				posts: removePostById(state.posts, meta.id)
			};
		
		case types.REMOVE_POSTS_IN_STORAGE:
			return [];

		default:
			return state;
	}
}