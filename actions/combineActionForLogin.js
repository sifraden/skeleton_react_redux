import { loginInEmail, loginIn } from "./loginAction.js";

export function combineActionsForLogin(email){
	return function(dispatch){
		dispatch(loginInEmail(email));
		dispatch(loginIn());

	};
}