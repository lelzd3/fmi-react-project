import axios from 'axios'
import jwtDecode from 'jwt-decode'

// instantiate axios
const httpClient = axios.create()

httpClient.getToken = function() {
	return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
	localStorage.setItem('token', token)
	return token
}

httpClient.getCurrentUser = function() {
	const token = this.getToken()
	if(token) return jwtDecode(token)
	return null
}

httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: '/api/users/authenticate', data: credentials })
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.signUp = function(userInfo) {
	return this({ method: 'post', url: '/api/users/create', data: userInfo})
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
}

httpClient.createPayment = function(paymentInfo) {
	return this({ method: 'post', url: '/api/payments/create', data: paymentInfo})
		.then((serverResponse) => {
			return serverResponse.data;
		})
}

httpClient.getAllPaymentsForAUser = function() {
	return this({ method: 'get', url: '/api/payments/'})
		.then((serverResponse) => {
			return serverResponse.data.data;
		})
}

httpClient.deletePayment = function(paymentId) {
	return this({ method: 'delete', url: `/api/payments/${paymentId}`})
		.then((serverResponse) => {
			return serverResponse.data.success;
		})
}

// During initial app load attempt to set a localStorage stored token
// as a default header for all api requests.
httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient