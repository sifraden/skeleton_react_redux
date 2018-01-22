export function popupManageOpen(){
	return {
		type: "POPUP_MANAGE_OPEN",
		playload: true
	};
}

export function popupManageClose(){
	return {
		type: "POPUP_MANAGE_CLOSE",
		playload: false
	};
}