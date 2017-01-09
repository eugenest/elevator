const initialState = {
  currentFloor: 1,
  path: null
};

const elevator = (state = initialState, action) => {
  console.log('elevator', state, action);

  switch (action.type) {
    case 'OPEN_FORM':
      return {
        currentFloor: 2,
        clickCount: state.clickCount + 1
      };
    case 'CLOSE_FORM':
      return {
        isFormOpened: false
      };
    default:
      return state;
  }
};

export default elevator;
