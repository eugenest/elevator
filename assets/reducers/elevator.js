const initialState = {
  currentFloor: 1,
  path: null,
};

const elevator = (state = initialState, action) => {
  console.log('elevator', state, action);

  switch (action.type) {
    case 'SET_FLOOR':
      return {
        currentFloor: action.floor,
        path: null
      };
    default:
      return state;
  }
};

export default elevator;
