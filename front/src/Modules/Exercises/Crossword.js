import React from 'react';
import withRouter from "../withRouter";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
class Crossword extends React.Component
{
	check = {
		width: 40,
		size: "small",
		border: "2px solid #c4c4c4",
		borderRadius: "5px",
		textAlign: "center",
		textTransform: "uppercase"
	}
	checkHighlight = {
		width: 40,
		size: "small",
		border: "2px solid #1976d2",
		borderRadius: "5px",
		textAlign: "center",
		textTransform: "uppercase"
	}
	constructor(props) {
		super(props);
		this.state = {
			exerciseId: 0,
			crossword: [],
			isEnd: false, 
			result: "",
			goodAnswered: false
		}
		this.checkSolve = this.checkSolve.bind(this)
	}
	
	checkSolve() {
		if (!this.state.goodAnswered) {
			let a = document.getElementsByClassName("solve");
			for (let i = 0; i < a.length; i++) {
				if (this.state.crossword[0].solve[i] !== a.item(i).children.item(0).children.item(0).value.toUpperCase()) {
					this.setState({ result: "Źle" });
					return;
				}
			}
			addPoints(localStorage.getItem("username"), this.state.crossword[0].questions.length);
			this.setState({ result: "Rozwiązano poprawnie" });
			this.setState({ goodAnswered: true });
		}
	}

	componentDidMount() {
		let path = window.location.pathname;
		let splitted = path.split('/');
		this.setState({ exerciseId: splitted[splitted.length - 1] })
	}
	render() {
		if (this.state.crossword.length === 0) {
			fetch("http://localhost:3001/crossword/" + this.state.exerciseId)
				.then(res => res.json())
				.then(resJSON => this.setState({ crossword: resJSON }))
				.then(() => console.log(this.state.crossword))
				.catch(error => { console.error(error) });
			return null;
		}
		else {
			if (!this.state.isEnd)
			{
				return (
					<div id="crossword">
						<div>
							<CheckHighlight styl={this.checkHighlight}/> <Check styl={this.check} /> <Check styl={this.check} /> <Check styl={this.check} /> <Check styl={this.check} />
						</div>
						<p> {this.state.crossword[0].questions[0]}</p>
						<div>
							<Check styl={this.check} /> <Check styl={this.check} /> <Check styl={this.check} /> <Check styl={this.check} /> <CheckHighlight styl={this.checkHighlight}/>					
						</div>
						<p> {this.state.crossword[0].questions[1]}</p>
						<div>
							<Check styl={this.check} /> <CheckHighlight styl={this.checkHighlight}/> <Check styl={this.check} /> <Check styl={this.check} /> <Check styl={this.check} />		
						</div>
						<p> {this.state.crossword[0].questions[2]}</p>
						<div>
							<Check styl={this.check} /> <CheckHighlight styl={this.checkHighlight}/> <Check styl={this.check} /> <Check styl={this.check} />				
						</div>
						<p> {this.state.crossword[0].questions[3]}</p>
						<div>
							<CheckHighlight styl={this.checkHighlight} /> <Check styl={this.check} /> <Check styl={this.check} />			
						</div>
						<p> {this.state.crossword[0].questions[4]}</p>
						<div>
							<Check styl={this.check} /> <Check styl={this.check} /> <CheckHighlight styl={this.checkHighlight} /> <Check styl={this.check} /> <Check styl={this.check} /> <Check styl={this.check} /> <Check styl={this.check} /> 						
						</div>
						<p> {this.state.crossword[0].questions[5]}</p>
						<Button variant="contained" onClick={this.checkSolve}>Sprawdź</Button>
						{this.state.result}
					</div>
				)
			}
		}
	 }
}
export default withRouter(Crossword);

function Check(props) {
	return (
		<TextField size="small" style={props.styl} 
				   inputProps={{ maxLength: 1, style: { textTransform: "uppercase", textAlign: "center" } }} />
	);
}

function CheckHighlight(props) {
	return (
		<TextField  className="solve" size="small" style={props.styl} 
					inputProps={{ maxLength: 1, style: { textTransform: "uppercase", textAlign: "center" } }} />
	);
}

async function addPoints(username, pointsToAdd)
{
	fetch("http://localhost:3001/addPoints/" + username + "/" + pointsToAdd)
		.then(res => res.json())
		.catch(error => { console.error(error) });
}