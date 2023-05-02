import * as React from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, MenuItem } from '@mui/material';
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
		if (this.state.details.length == 0) {
			fetch("http://localhost:3001/accountDetails/" + this.props.username)
				.then((res) => res.json())
				.then((resJSON) => {
					this.setState({ details: resJSON })
				})
				.then(() => console.log(this.state.details))
				.catch((error) => { console.error(error) });
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