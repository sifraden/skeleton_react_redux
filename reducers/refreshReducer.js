const refreshReducer = (state = {
 	refresh: false
 }, action) => {
	switch(action.type){
		case "REFRESH": 
			return {
				...state,
				refresh: action.playload
			};
			break;

	default:
      return state;
	}


}

export default refreshReducer;