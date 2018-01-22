const popupReducer = (state = {
 	popupHold: false,
 	popupHoldEdit: false
 }, action) => {
	switch(action.type){
		case "POPUP_MANAGE_OPEN": 
			return {
				...state,
				popupHold: action.playload,
				popupHoldEdit: action.playload
			};
			break;
		case "POPUP_MANAGE_CLOSE": 
			return {
				...state,
				popupHold: action.playload,
				popupHoldEdit: action.playload

			};
			break;

	default:
      return state;
	}


}

export default popupReducer;