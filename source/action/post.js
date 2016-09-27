import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as postService from '../service/postService';

export const getPostByCategory = createAction(
  types.FETCH_POSTS_BY_CATEGORY, 
  async(category)=> {
    return await postService.getPostByCategory(category, {
      pageIndex: 1
    });
  }, 
  (category)=> {
    return {
      pending: true,
      category
    }
  }
);

export const getPostByCategoryWithPage = createAction(
  types.FETCH_POSTS_BY_CATEGORY_WITHPAGE, 
  async(category, params)=> {
    return await postService.getPostByCategory(category, params);
  }, 
  (category)=> {
    return {
      pending: true,
      category
    }
  }
);

export const getPostById = createAction(types.FETCH_POST_BY_ID, 
  async(category, id)=>{
    return await postService.getPostById(category, id);
  }, 
  (category, id)=> {
    return {
      pending: true,
      category,
      id
    }
  }
);

export const addPost = createAction(types.ADD_POST, 
  async(category, params)=>{
    return await postService.addPost(category, params);
  }, 
  (category)=> {
    return {
      pending: true,
      category
    }
  }
);