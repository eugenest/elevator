const initialState = {
  currentFloor: 1,
  isDoorsOpened: false,
  path: [],
  requests: { //TODO rewrite with array
    1: {
      isUp: false,
      isDown: false
    },
    2: {
      isUp: false,
      isDown: false
    },
    3: {
      isUp: false,
      isDown: false
    },
    4: {
      isUp: false,
      isDown: false
    },
    5: {
      isUp: false,
      isDown: false
    }
  }
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
    case 'REQUEST_ELEVATOR':
      // state.requests[action.floor] = {
      //   isUp: action.isUp,
      //   isDown: action.isDown
      // };
      // let requests = state.requests;
      return Object.assign({}, state, {requests: { //TODO temp
        1: {
          isUp: false,
          isDown: false
        },
        2: {
          isUp: false,
          isDown: false
        },
        3: {
          isUp: action.isUp,
          isDown: action.isDown
        },
        4: {
          isUp: false,
          isDown: false
        },
        5: {
          isUp: false,
          isDown: false
        }
      }});
      break;
    case 'CLEAN_REQUEST':
      return Object.assign({}, state, {requests: { //TODO temp
        1: {
          isUp: false,
          isDown: false
        },
        2: {
          isUp: false,
          isDown: false
        },
        3: {
          isUp: action.direction == 'up' ? false : state.requests[3].isUp,
          isDown: action.direction == 'down' ? false : state.requests[3].isDown
        },
        4: {
          isUp: false,
          isDown: false
        },
        5: {
          isUp: false,
          isDown: false
        }
      }});
      break;
    default:
      return state;
  }
};

export default elevator;
