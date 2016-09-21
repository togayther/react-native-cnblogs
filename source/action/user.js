import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as userService from '../service/userService';

export const login = createAction(
  types.LOGIN, 
  async({username, password})=> {
    return await userService.login(username, password);
  }, 
  ({username, resolved, rejected})=> {
    return {
      username,
      resolved,
      rejected
    }
  }
);

export const refreshToken = createAction(
  types.REFRESH_TOKEN, 
  async({token})=> {
    return await userService.refreshToken(token);
  }, 
  ({token, resolved, rejected})=> {
    return {
      token,
      resolved,
      rejected
    }
  }
);

export const getUserInfo = createAction(
  types.FETCH_USER_INFO,
  async()=> {
    return await userService.getUserInfo();
  }, 
  ({resolved, rejected} = {})=> {
    return {
      resolved,
      rejected
    }
  }
)

export const getUserAssetByCategory = createAction(
  types.FETCH_USER_ASSET,
  async(category, params)=> {
    params.pageIndex = 0;
    return await userService.getUserAsset(category, params);
  }, 
  (category)=> {
    return {
      pending: true,
      category
    }
  }
)

export const getUserAssetByCategoryWithPage = createAction(
  types.FETCH_USER_ASSET_WITHPAGE, 
  async(category, params)=> {
    return await userService.getUserAsset(category, params);
  }, 
  (category)=> {
    return {
      pending: true,
      category
    }
  }
);