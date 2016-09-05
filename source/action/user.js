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
      pending: true,
      username,
      resolved,
      rejected
    }
  }
);