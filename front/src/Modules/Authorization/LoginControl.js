import * as React from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import {Link} from "react-router-dom";
export default class LoginControl extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			state: "",
			isLogged: false,
			username: "",
			password: "",
			menuOpened: false
		}

		this.hGoToFormClick = this.hGoToFormClick.bind(this);
		this.hLoginClick = this.hLoginClick.bind(this);
		this.hLogoutClick = this.hLogoutClick.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.goToAccountDetails = this.goToAccountDetails.bind(this);
		if (localStorage.getItem("username") !== null) {
			this.state.state = "logged";
		}
	}
	
	setUsername(event) {
		this.setState({ username: event.target.value})
	}

	setPassword(event) {
		this.setState({ password: event.target.value})
	}

	hGoToFormClick() {
		this.setState({ state: "form" });
	}

	hLoginClick(event) {
		event.preventDefault();
		fetch("http://localhost:3001/login/" + this.state.username + "/" + this.state.password)
			.then(res => res.json())
			.then(resJSON => {
				if (resJSON.isValid === "userValid")
				{
					this.setState({ isLogged: true })
					this.setState({ state: "logged" })
					localStorage.setItem("username",  this.state.username);
				}
			})
			.then(() => console.log(this.state.isLogged))
			.catch(error => { console.error(error) });
	}

	hLogoutClick() {
		this.setState({ menuOpened: false })
		this.setState({ state: "logout" })
		localStorage.removeItem("username");
	}

	openMenu() {
		this.setState({ menuOpened: !this.state.menuOpened })
	}

	goToAccountDetails() {

	}

	render()
	{
		switch (this.state.state) {
			case "form":
				return (
					<div>
						<br/>
						<form onSubmit={this.hLoginClick}>
							<TextField label="Nazwa użytkownika" variant="outlined" value={this.state.username} onChange={this.setUsername} />
							<TextField type="password" label="Hasło" variant="outlined" name={this.state.password} onChange={this.setPassword} />
							<Button variant="contained" type="submit">Zaloguj się</Button>
						</form>
					</div>
				)
			case "logged":
				if (this.state.menuOpened)
					return (
						<span>
							<Button variant="contained" color="success" onClick={this.openMenu}> Konto </Button>
							<List>
								<Link to={"accountDetails/"+localStorage.getItem('username')}><ListItemButton> Szczegóły konta </ListItemButton></Link>
								<ListItemButton onClick={this.hLogoutClick}> Wyloguj się </ListItemButton>
							</List>
						</span>
					)
				else
					return (
						<span>
							<Button variant="contained" color="success" onClick={this.openMenu}> Konto </Button>
						</span>
						)
			default:
				return <LoginButton onClick={this.hGoToFormClick} />
		}
	}
}

function LoginButton(props) {
	return	(
		<Link to="/login_form">
			<Button variant="contained" color="success" onClick={props.onClick}>Zaloguj się</Button>
		</Link>
	);
}