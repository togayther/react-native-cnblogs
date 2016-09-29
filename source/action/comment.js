import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as commentService from '../service/commentService';

export const getCommentsByPost = createAction(
  types.FETCH_COMMENTS_BY_POST, 
  async(category, id, params)=> {
    return await commentService.getCommentsByPost(category, id, {
      pageIndex: 1,
      ...params
    });
  },
  (category, id)=>{
    return {
      pending: true,
      category,
      id
    }
  }
);

export const getCommentsByPostWithPage = createAction(
  types.FETCH_COMMENTS_BY_POST_WITHPAGE, 
  async(category, id, params)=> {
    return await commentService.getCommentsByPost(category, id, params);
  }, 
  (category, id)=> {
    return {
      pending: true,
      category,
      id
    }
  }
);

export const addComment = createAction(types.ADD_COMMENT, 
  async({category, params, data})=>{
    return await commentService.addComment(category, params, data);
  }, 
  ({category, params, resolved, rejected})=> {
    return {
      pending: true,
      category,
      id: params.id,
      resolved,
      rejected
    }
  }
);