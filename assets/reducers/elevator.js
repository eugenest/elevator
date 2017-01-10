const initialState = {
  currentFloor: 1,
  isDoorsOpened: false,
  path: [],
  requests: []
};

const elevator = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case 'ADD_FLOOR_TO_PATH':
      state.path.push(action.floor);
      return Object.assign({}, state);
    case 'FINISH_RIDE':
      return Object.assign({}, state, {
        isDoorsOpened: false,
        path: []
      });
    case 'FINISH_SEGMENT':
      let segmentFloor = state.path[0];
      state.path.splice(0, 1);
      return Object.assign({}, state, {
        currentFloor: segmentFloor,
        isDoorsOpened: false,
      });
    case 'MOVE_ONE_UP':
      return Object.assign({}, state, {currentFloor: state.currentFloor + 1});
    case 'MOVE_ONE_DOWN':
      return Object.assign({}, state, {currentFloor: state.currentFloor - 1});
    case 'OPEN_DOORS':
      return Object.assign({}, state, {isDoorsOpened: true});
    case 'CLOSE_DOORS':
      return Object.assign({}, state, {isDoorsOpened: false});
    case 'REQUEST_ELEVATOR':
      state.requests.push({
        floor: action.floor,
        isUp: action.isUp,
        isDown: action.isDown
      });
      return Object.assign({}, state);
    case 'CLEAN_REQUEST':
      let targetIsUp = action.direction == 'up';
      let targetIsDown = action.direction == 'down';
      /*for (let i = 0; i < state.requests.length; i++) {
        if (state.requests[i].floor == action.floor) {
          if (targetIsUp == state.requests[i].isUp) {
            state.requests.splice(i, 1);
            break;
          }

          if (targetIsDown == state.requests[i].isDown) {
            state.requests.splice(i, 1);
            break;
          }
        }
      }*/
      // let position = state.requests.map(function(e) { return e.hello; }).indexOf('stevie');
      // state.requests.splice(position, 1);
      return Object.assign({}, state, {requests: []});
    case 'CLEAN_PATH_ITEM':
      console.log(123)
      state.path.splice(state.path.indexOf(action), 1);
      return Object.assign({}, state, {requests: []});
    default:
      return state;
  }
};

export default elevator;
