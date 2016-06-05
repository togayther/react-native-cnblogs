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

export const getAuthorsByKey = createAction(
  types.FETCH_AUTHORS_BY_KEY, 
  async(key)=> {
    return await authorService.getAuthorsByKey(key);
  }, 
  (key)=> {
    return {
      pending: true,
      key
    }
  }
);

export const getAuthorDetail = createAction(
  types.FETCH_AUTHOR_DETAIL, 
  async(name, params)=> {
    return await authorService.getAuthorDetail(name, {
      pageIndex: 1
    });
  },
  (name)=> {
    return {
      pending: true,
      name
    }
  }
);

export const getAuthorDetailWithPage = createAction(
  types.FETCH_AUTHOR_DETAIL_WITHPAGE, 
  async(name, params)=> {
    return await authorService.getAuthorDetail(name, params);
  },
  (name)=> {
    return {
      pending: true,
      name
    }
  }
);