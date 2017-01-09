export const setFloor = (floor) => {
  return dispatch => {
    dispatch({
      type: 'SET_FLOOR',
      floor
    });
  };
};
