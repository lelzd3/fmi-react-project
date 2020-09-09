import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import httpClient from './httpClient'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import UserHome from './views/UserHome'
import Home from './views/Home'
import About from './views/About'

class App extends React.Component {
	state = { currentUser: httpClient.getCurrentUser() }

	onLoginSuccess = (user) => {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}

	logOut = () => {
		httpClient.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		return (
			<div className='App container'>

				<NavBar currentUser={currentUser} />

				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess} />
					}} />

					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut} />
					}} />

					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess} />
					}} />

					<Route path="/userhome" render={() => {
						return currentUser
							? <UserHome />
							: <Redirect to="/login" />
					}} />

					<Route path="/about" render={(props) => {
						return <About/>
					}} />

					<Route path="/" component={Home} />

				</Switch>
			</div>
		)
	}
}

export default App