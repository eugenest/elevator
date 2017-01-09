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

const handleCabinMovement = (initialFloor, nextState, dispatch, getState) => {
  console.log(nextState.elevator.path[0], initialFloor, nextState.elevator.path[0] - initialFloor);
  let firstTargetFloor = nextState.elevator.path[0];
  let floorsToRide = Math.abs(firstTargetFloor - initialFloor);

  if (nextState.elevator.path.length == 1) {
    if (firstTargetFloor == initialFloor) {
      triggerDoor(dispatch).then(() => {
        dispatch({type: 'FINISH_RIDE'});
      });
    } else if (floorsToRide >= 1) {
      let steps = [];
      while (floorsToRide > 0) {
        if (initialFloor < firstTargetFloor) {
          steps.push(() => moveOneUp(dispatch));
        } else {
          steps.push(() => moveOneDown(dispatch));
        }
        floorsToRide--;
      }

      steps.reduce(function (prev, curr) {
        return prev.then(curr);
      }, Promise.resolve())
      .then(function () {
        triggerDoor(dispatch).then(() => {
          dispatch({type: 'FINISH_SEGMENT'});
          let updatedState = getState();
          if (updatedState.elevator.path.length) {
            handleCabinMovement(updatedState.elevator.currentFloor, updatedState, dispatch, getState);
          }
        });
      });
    }
  }
};

const moveOneUp =(dispatch) => {
  return new Promise(resolve => {
    dispatch({type: 'MOVE_ONE_UP'});
    setTimeout(() => {
      resolve();
    }, actionDelay);
  });
};

const moveOneDown =(dispatch) => {
  return new Promise(resolve => {
    dispatch({type: 'MOVE_ONE_DOWN'});
    setTimeout(() => {
      resolve();
    }, actionDelay);
  });
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
