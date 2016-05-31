import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as authorService from '../service/authorService';

export const getAuthorByRank = createAction(
  types.FETCH_AUTHORS_BY_RANK, 
  async(params)=> {
    return await authorService.getAuthorsByRank({
      pageIndex: 1,
      ...params
    });
  }
);

export const getAuthorByID = createAction(
  types.FETCH_AUTHOR_BY_ID, 
  async(id)=> {
    return await authorService.getAuthorByID(id);
  }, 
  (id)=> {
    return {
      id
    }
  }
);

export const getAuthorsByKey = createAction(
  types.FETCH_AUTHORS_BY_KEY, 
  async(key)=> {
    return await authorService.getAuthorsByKey(key);
  }, 
  (key)=> {
    return {
      key
    }
  }
);
