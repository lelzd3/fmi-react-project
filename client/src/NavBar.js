import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			<Link to="/">Home</Link>
			{props.currentUser
				? (
					<span>
						<Link to="/userhome">UserHome</Link>
						<Link to="/categories">CreateCategory</Link>
						<Link to="/logout">Log Out</Link>
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
			<Link to="/about">About</Link>
		</div>
	)
}

export default NavBar