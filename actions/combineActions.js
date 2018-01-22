import { popupManageOpen, popupManageClose } from "./popupAction.js";
// import { refreshAdd, refreshEdit, refreshDelete, noRefresh } from "./refreshActions.js";
import { refresh } from "./refreshActions.js";

export function combineActions(){
	return function(dispatch){
		dispatch(popupManageOpen());
		dispatch(popupManageClose());
		dispatch(refresh());
/*		dispatch(refreshEdit());
		dispatch(refreshDelete());
		dispatch(noRefresh());*/

	};
}