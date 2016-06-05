import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as commentService from '../service/commentService';

export const getCommentsByPost = createAction(
  types.FETCH_COMMENTS_BY_POST, 
  async(category, pid, params)=> {
    return await commentService.getCommentsByPost(category, pid, {
      pageIndex: 1,
      ...params
    });
  },
  (category, pid)=>{
    return {
      pending: true,
      category,
      pid
    }
  }
);

export const getCommentsByPostWithPage = createAction(
  types.FETCH_COMMENTS_BY_POST_WITHPAGE, 
  async(category, pid, params)=> {
    return await commentService.getCommentsByPost(category, pid, params);
  }, 
  (category, pid)=> {
    return {
      pending: true,
      category,
      pid
    }
  }
);
