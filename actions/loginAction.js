export function loginInEmail(email){
	return {
		type: "LOGIN_IN_EMAIL",
		playload: email
	};
}


export function loginIn(){
	return {
		type: "LOGIN_IN",
		playload: true
	};
}

