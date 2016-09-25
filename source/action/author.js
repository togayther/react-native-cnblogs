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
  async(blogger)=> {
    return await authorService.getAuthorDetail(blogger);
  },
  (blogger)=> {
    return {
      pending: true,
      blogger
    }
  }
);

export const getAuthorPosts = createAction(
  types.FETCH_AUTHOR_POSTS, 
  async(blogger)=> {
    return await authorService.getAuthorPosts(blogger, {
      pageIndex: 1
    });
  },
  (blogger)=> {
    return {
      pending: true,
      blogger
    }
  }
);

export const getAuthorPostsWithPage = createAction(
  types.FETCH_AUTHOR_POSTS_WITHPAGE, 
  async(blogger, params)=> {
    return await authorService.getAuthorPosts(blogger, params);
  },
  (blogger)=> {
    return {
      pending: true,
      blogger
    }
  }
);

export const clearAuthorSearchResult = createAction(
  types.CLEAR_AUTHOR_SEARCH_RESULT
);