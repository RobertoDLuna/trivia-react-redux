import { combineReducers } from 'redux';
import loginReducer from './user';
import questionsReducer from './questions';
import score from './score';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
  score,
});

export default rootReducer;
