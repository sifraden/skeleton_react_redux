const refreshReducer = (state = {
 	email: "",
 	loginIn: false
 }, action) => {
	switch(action.type){
		case "LOGIN_IN_EMAIL": 
			return {
				...state,
				email: action.playload
			};
			break;
		case "LOGIN_IN": 
			return {
				...state,
				loginIn: action.playload
			};
			break;

	default:
      return state;
	}


}

export default refreshReducer;