import * as React from 'react';
export default class LoginControl extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			details: []
		}
	}

	render()
	{
		if (this.state.details.length === 0) {
			fetch("http://localhost:3001/accountDetails/" + this.props.username)
				.then(res => res.json())
				.then(resJSON => this.setState({ details: resJSON }))
				.then(() => console.log(this.state.details))
				.catch(error => { console.error(error) });
			return null;
		}
		return (
			<div>
				Nazwa: {this.state.details[0].username} <br/>
				Punkty: {this.state.details[0].points}
			</div>
			)
	}
}