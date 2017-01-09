const initialState = {
  currentFloor: 1,
  isDoorsOpened: false,
  path: [],
};

const elevator = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'ADD_FLOOR_TO_PATH':
      state.path.push(action.floor);
      return Object.assign({}, state);
    case 'FINISH_RIDE':
      return Object.assign({}, state, {
        isDoorsOpened: false,
        path: []
      });
      break;
    case 'FINISH_SEGMENT':
      let segmentFloor = state.path[0];
      state.path.splice(0, 1);
      return Object.assign({}, state, {
        currentFloor: segmentFloor,
        isDoorsOpened: false,
      });
      break;
    case 'MOVE_ONE_UP':
      return Object.assign({}, state, {currentFloor: state.currentFloor + 1});
      break;
    case 'MOVE_ONE_DOWN':
      return Object.assign({}, state, {currentFloor: state.currentFloor - 1});
      break;
    case 'OPEN_DOORS':
      return Object.assign({}, state, {isDoorsOpened: true});
      break;
    case 'CLOSE_DOORS':
      return Object.assign({}, state, {isDoorsOpened: false});
      break;
    default:
      return state;
  }
};

export default elevator;
