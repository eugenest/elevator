const actionDelay = 1000;

const openDoor = dispatch =>
  new Promise(resolve => {
    dispatch({type: 'OPEN_DOORS'});
    setTimeout(resolve, actionDelay);
  });

const closeDoor = dispatch =>
  new Promise(resolve => {
    dispatch({type: 'CLOSE_DOORS'});
    setTimeout(resolve, actionDelay);
  });

const triggerDoor = dispatch =>
  openDoor(dispatch)
    .then(() => closeDoor(dispatch));

const checkForPendingActions = (state, direction, dispatch) => {
  let isNeedToTriggerDoor = false;

  const currentTarget = state.path[0];

  const isNeedToCleanUpRequest = state.requests.some(item => (item.floor == state.currentFloor && item.isUp));
  const isNeedToCleanDownRequest = state.requests.some(item => (item.floor == state.currentFloor && item.isDown));
  const isFloorExistsInRequests = state.requests.some(item => (item.floor == state.currentFloor));
  const isTargetAboveOrNow = currentTarget >= state.currentFloor;
  const isTargetBelowOrNow = currentTarget <= state.currentFloor;
  const isFloorExistsInPath = state.path.includes(state.currentFloor);

  if (direction == 'up' && isNeedToCleanUpRequest) {
    dispatch({type: 'CLEAN_REQUEST', currentFloor: state.currentFloor});
  } else if (direction == 'down' && isNeedToCleanDownRequest) {
    dispatch({type: 'CLEAN_REQUEST', currentFloor: state.currentFloor});
  }

  if (direction == 'up') {
    if ((isFloorExistsInPath && isTargetAboveOrNow && !isFloorExistsInRequests) ||
      (isFloorExistsInPath && isTargetAboveOrNow && isNeedToCleanUpRequest)) {
      dispatch({type: 'CLEAN_PATH_ITEM', currentFloor: state.currentFloor});
      isNeedToTriggerDoor = true;
    }
  } else if (direction == 'down') {
    if ((isFloorExistsInPath && isTargetBelowOrNow && !isFloorExistsInRequests) ||
      (isFloorExistsInPath && isTargetBelowOrNow && isNeedToCleanDownRequest)) {
      dispatch({type: 'CLEAN_PATH_ITEM', currentFloor: state.currentFloor});
      isNeedToTriggerDoor = true;
    }
  }

  if (isNeedToTriggerDoor) {
    return triggerDoor(dispatch);
  }

  return Promise.resolve();
};

const moveOne = (direction, dispatch, getState) =>
  new Promise(resolve => {
    dispatch({type: direction == 'up' ? 'MOVE_ONE_UP' : 'MOVE_ONE_DOWN'});

    checkForPendingActions(getState().elevator, direction, dispatch)
      .then(() => {
        setTimeout(() => {
          resolve();
        }, actionDelay);
      });
  });

const handleCabinMovement = (initialFloor, nextState, dispatch, getState) => {
  const firstTargetFloor = nextState.elevator.path[0];
  let floorsToRide = Math.abs(firstTargetFloor - initialFloor);

  if (nextState.elevator.isMoving) {
    return;
  }

  const steps = [];

  if (initialFloor == firstTargetFloor) {
    steps.push(() => {
      dispatch({type: 'CLEAN_PATH_ITEM', currentFloor: firstTargetFloor});
      dispatch({type: 'CLEAN_REQUEST', currentFloor: firstTargetFloor});
      return triggerDoor(dispatch);
    });
  } else {
    while (floorsToRide > 0) {
      if (initialFloor < firstTargetFloor) {
        steps.push(() => moveOne('up', dispatch, getState));
      } else {
        steps.push(() => moveOne('down', dispatch, getState));
      }
      floorsToRide--;
    }
  }

  steps.reduce((previous, current) =>
    previous.then(current), Promise.resolve())
    .then(() => {
      dispatch({type: 'FINISH_SEGMENT'});
      const updatedState = getState();
      if (updatedState.elevator.path.length) {
        handleCabinMovement(updatedState.elevator.currentFloor, updatedState, dispatch, getState);
      }
    });
};

export const addFloorToPath = floor =>
  (dispatch, getState) => {
    const prevState = getState();

    dispatch({
      type: 'ADD_FLOOR_TO_PATH',
      floor,
    });

    const nextState = getState();

    handleCabinMovement(prevState.elevator.currentFloor, nextState, dispatch, getState);
  };

export const requestElevator = (floor, direction) =>
  dispatch => {
    if (!['up', 'down'].includes(direction)) {
      throw new Error(`Undefined request direction: ${direction}`);
    }

    dispatch({
      type: 'REQUEST_ELEVATOR',
      floor,
      isUp: direction == 'up',
      isDown: direction == 'down',
    });

    dispatch(addFloorToPath(floor));
  };
