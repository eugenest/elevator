const initialState = {
  currentFloor: 1,
  isDoorsOpened: false,
  isMoving: false,
  path: [],
  requests: [],
};

const elevator = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FLOOR_TO_PATH':
      var path = copy(state.path);
      path.push(action.floor);
      return Object.assign({}, state, {path});
    case 'FINISH_SEGMENT':
      return Object.assign({}, state, {
        isDoorsOpened: false,
        isMoving: false,
      });
    case 'MOVE_ONE_UP':
      return Object.assign({}, state, {
        currentFloor: state.currentFloor + 1,
        isMoving: true,
      });
    case 'MOVE_ONE_DOWN':
      return Object.assign({}, state, {
        currentFloor:
        state.currentFloor - 1,
        isMoving: true,
      });
    case 'OPEN_DOORS':
      return Object.assign({}, state, {
        isDoorsOpened: true,
        isMoving: true,
      });
    case 'CLOSE_DOORS':
      return Object.assign({}, state, {
        isDoorsOpened: false,
        isMoving: true,
      });
    case 'REQUEST_ELEVATOR':
      var requests = copy(state.requests);
      requests.push({
        floor: action.floor,
        isUp: action.isUp,
        isDown: action.isDown,
      });
      return Object.assign({}, state, {requests});
    case 'CLEAN_REQUEST':
      var requests = copy(state.requests);

      requests.forEach((request, i) => {
        if (request.floor == action.currentFloor) {
          requests.splice(i, 1);
        }
      });

      return Object.assign({}, state, {requests});
    case 'CLEAN_PATH_ITEM':
      var path = copy(state.path);
      path.splice(state.path.indexOf(action.currentFloor), 1);
      return Object.assign({}, state, {path});
    default:
      return state;
  }
};

const copy = chunk => JSON.parse(JSON.stringify(chunk));

export default elevator;
