import thunk from 'redux-thunk';
import logger from './logger';
import promise from './promise';
import pending from './pending';
import callback from './callback';
import common from './common';

export default [
  logger,
  thunk,
  promise,
  pending,
  common
];