import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as searchService from '../service/searchService';

export const searchByKey = createAction(
  types.SEARCH_BY_KEY, 
  async(category, key)=> {
    return await searchService.searchByKey(category, key);
  }, 
  (category, key)=> {
    return {
      pending: true,
      category,
      key
    }
  }
);

export const clearSearchResult = createAction(
  types.CLEAR_SEARCH_RESULT
);