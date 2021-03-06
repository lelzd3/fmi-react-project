import React from 'react'
import httpClient from '../httpClient'

class LogIn extends React.Component {
	state = {
		fields: { email: '', password: ''}
	}

	onInputChange = (event) => {
		this.setState({
			fields: {
				...this.state.fields,
				[event.target.name]: event.target.value
			}
		})
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		httpClient.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { email, password } = this.state.fields
		return (
			<div className='LogIn'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Log In</h1>
						<form onChange={this.onInputChange} onSubmit={this.onFormSubmit}>
							<input type="email" placeholder="Email" name="email" value={email} />
							<input type="password" placeholder="Password" name="password" value={password} />
							<button>Log In</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default LogIn