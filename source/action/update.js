import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as updateService from '../service/updateService';

export const getUpdateInfo = createAction(
  types.FETCH_UPDATE_INFO,
  async(version)=> {
    return await updateService.getUpdateInfo(version);
  }
)