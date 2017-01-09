import {combineReducers} from 'redux';

// import panel from './panel.js';
import elevator from './elevator.js';
// import cabin from './cabin.js';

const elevatorReducers = combineReducers({
  // panel,
  elevator,
  // cabin
});

export default elevatorReducers;