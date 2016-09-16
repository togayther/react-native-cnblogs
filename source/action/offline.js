
import { createAction } from 'redux-actions';
import _ from 'lodash';
import { storageKey } from '../config';
import * as types from '../constant/actiontype';
import * as storageService from '../service/storage';

export const savePost = createAction(types.OFFLINE_POST_TO_STORAGE, async(postData)=> {
	return storageService.mergeItem(storageKey.OFFLINE_POSTS, postData);
});

export const getPost = createAction(types.GET_POST_FROM_STORAGE, async(id)=> {
	return storageService.getItem(storageKey.OFFLINE_POSTS).then((posts)=>{
		if (posts && posts[id]) {
			return posts[id].postContent;
		}
		return null;
	});
});

export const getPosts = createAction(types.GET_POSTS_FROM_STORAGE, async()=> {
	return storageService.getItem(storageKey.OFFLINE_POSTS);
});

export const removePosts = createAction(types.REMOVE_POSTS_IN_STORAGE, async()=> {
	return storageService.removeItem(storageKey.OFFLINE_POSTS);
});

export const removePost = createAction(types.REMOVE_POST_IN_STORAGE, async(id)=> {
	return storageService.getItem(storageKey.OFFLINE_POSTS).then((posts)=>{
		delete posts[id];
		storageService.setItem(storageKey.OFFLINE_POSTS, posts);
	});
}, (id)=> {
	return {
	  id
	}
});