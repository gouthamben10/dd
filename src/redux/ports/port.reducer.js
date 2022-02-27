import PortActionTypes from './port.types';

const INITIAL_STATE = {
  toggle: false
};

const portReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PortActionTypes.TOGGLE_BUTTON_A1:
      return {
        ...state,
        toggle: !state.toggle
      };
    default:
      return state;
  }
};

export default portReducer;
