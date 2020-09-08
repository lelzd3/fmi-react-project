import React from 'react'
import httpClient from '../httpClient'

class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: ''}
	}

	onInputChange(event) {
		this.setState({
			fields: {
				...this.state.fields,
				[event.target.name]: event.target.value
			}
		})
	}

	onFormSubmit(event) {
		event.preventDefault()
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { name, email, password } = this.state.fields
		return (
			<div className='SignUp'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Sign Up</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<input type="text" placeholder="Name" name="name" value={name} />
							<input type="text" placeholder="Email" name="email" value={email} />
							<input type="password" placeholder="Password" name="password" value={password} />
							<button>Sign Up</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default SignUp