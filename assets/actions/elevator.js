/**
 * 1. Предполагается, что люди, которые вызывали лифт, не дождались его и ушли.
 * 2. Лифт ходит в порядке FIFO
 */

const actionDelay = 1000;

export const addFloorToPath = (floor) => {
  return (dispatch, getState)  => {
    let prevState = getState();

    dispatch({
      type: 'ADD_FLOOR_TO_PATH',
      floor
    });

    let nextState = getState();

    handleCabinMovement(prevState.elevator.currentFloor, nextState, dispatch, getState);
  };
};

export const requestElevator = (floor, direction) => {
  return (dispatch, getState)  => {
    if (!['up', 'down'].includes(direction)) {
      throw new Error(`Undefined request direction: ${direction}`);
    }

    dispatch({
      type: 'REQUEST_ELEVATOR',
      floor,
      isUp: direction == 'up',
      isDown: direction == 'down'
    });

    dispatch(addFloorToPath(floor));
  };
};

const handleCabinMovement = (initialFloor, nextState, dispatch, getState) => {
  console.log(initialFloor, nextState.elevator.path[0], nextState.elevator.path[0] - initialFloor);

  let firstTargetFloor = nextState.elevator.path[0];
  let floorsToRide = Math.abs(firstTargetFloor - initialFloor);

  if (!nextState.elevator.isMoving) {
    let steps = [];
    while (floorsToRide > 0) {
      if (initialFloor == firstTargetFloor) {
        steps.push(() => {
          return new Promise((resolve) => {
            dispatch({type: 'CLEAN_PATH_ITEM', currentFloor: firstTargetFloor});
            resolve();
          })
        });
      } else if (initialFloor < firstTargetFloor) {
        steps.push(() => moveOne('up', dispatch, getState));
      } else {
        steps.push(() => moveOne('down', dispatch, getState));
      }
      floorsToRide--;
    }

    steps.reduce(function (prev, curr) {
      return prev.then(curr);
    }, Promise.resolve())
    .then(function () {
      // triggerDoor(dispatch).then(() => {
        dispatch({type: 'FINISH_SEGMENT'});
        let updatedState = getState();
        console.log('next segment', updatedState.elevator.currentFloor, updatedState)
        if (updatedState.elevator.path.length) {
          handleCabinMovement(updatedState.elevator.currentFloor, updatedState, dispatch, getState);
          //TODO check requests
        }
      // });
    });
  }
};

const moveOne = (direction, dispatch, getState) => {
  return new Promise(resolve => {
    dispatch({type: direction == 'up' ? 'MOVE_ONE_UP' : 'MOVE_ONE_DOWN'});

    let currentState = getState();
    checkForPathIntersections(currentState.elevator.currentFloor, direction, currentState.elevator.path, dispatch)
      .then(() => {
        return checkForRequests(currentState.elevator.currentFloor, direction, currentState.elevator.requests, dispatch)
      })
      .then(() => {
        setTimeout(() => {
          resolve();
        }, actionDelay);
      });
  });
};

const checkForPathIntersections = (currentFloor, direction, path, dispatch) => {
  // console.log(currentFloor, path, direction, path.includes(currentFloor) && path[0] >= currentFloor)
  if (path.length >= 1) {
    if (direction == 'up') {
      if (path.includes(currentFloor) && path[0] >= currentFloor) {
        dispatch({type: 'CLEAN_PATH_ITEM', currentFloor});
        return triggerDoor(dispatch);
      }
    } else if (direction == 'down') {
      if (path.includes(currentFloor) && path[0] <= currentFloor) {
        dispatch({type: 'CLEAN_PATH_ITEM', currentFloor});
        return triggerDoor(dispatch);
      }
    }
  }

  return Promise.resolve();
};

const checkForRequests = (currentFloor, direction, requests, dispatch) => {
  if (direction == 'up') {
    if (requests.some(item => (item.floor == currentFloor && item.isUp))) {
      dispatch({type: 'CLEAN_REQUEST', currentFloor, direction});
      return triggerDoor(dispatch);
    }
  } else if (direction == 'down') {
    if (requests.some(item => (item.floor == currentFloor && item.isDown))) {
      dispatch({type: 'CLEAN_REQUEST', currentFloor, direction});
      return triggerDoor(dispatch);
    }
  }

  return Promise.resolve();
};

const openDoor =(dispatch) => {
  return new Promise(resolve => {
    dispatch({type: 'OPEN_DOORS'});
    setTimeout(() => {
      resolve();
    }, actionDelay);
  });
};

const closeDoor =(dispatch) => {
  return new Promise(resolve => {
    dispatch({type: 'CLOSE_DOORS'});
    setTimeout(() => {
      resolve();
    }, actionDelay);
  });
};

const triggerDoor =(dispatch) => {
  return openDoor(dispatch).then(() => {
    return closeDoor(dispatch);
  });
};
