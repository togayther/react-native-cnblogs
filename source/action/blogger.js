import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as bloggerService from '../service/bloggerService';

export const getBloggerByRank = createAction(
  types.FETCH_BLOGGERS_RANK, 
  async(size)=> {
    return await bloggerService.getAuthorsByRank({
      pageIndex: 1,
      pageSize: size
    });
  }
);

export const getBloggerByKey = createAction(
  types.FETCH_BLOGGERS_BY_KEY, 
  async(searchKey)=> {
    return await bloggerService.get(searchKey);
  }, 
  (searchKey)=> {
    return {
      searchKey
    }
  }
);

export const getBloggerByID = createAction(
  types.FETCH_BLOGGERS_BY_ID, 
  async(id)=> {
    return await bloggerService.get(id);
  }, 
  (id)=> {
    return {
      id
    }
  }
);