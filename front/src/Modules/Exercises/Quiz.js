import React from 'react';
import withRouter from "../withRouter"; import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quizId: 0,
			questions: [],
			current: 0,
			endQuiz: false,
			radioValue: "",
			answerResult: "Wynik poprzedniej odpowiedzi",
			correctAnswered: 0,
			pointsAdded: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleRadioChange = this.handleRadioChange.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.radioValue === this.state.questions[this.state.current].correctAnswer)
		{
			this.setState({ answerResult: "Dobrze" });
			this.setState({ correctAnswered: this.state.correctAnswered + 1 });
		}
		else
			this.setState({ answerResult: "Źle" });
		if (this.state.current < 9)
			this.setState({ current: this.state.current + 1 })
		else
			this.setState({ endQuiz: true })
	}

	handleRadioChange(event) {
		this.setState({ radioValue: event.target.value })
	}

	componentDidMount() {
		let path = window.location.pathname;
		let splitted = path.split('/');
		this.setState({ quizId: splitted[splitted.length - 1] })
	}
	render() {
		if (this.state.questions.length === 0) {
			fetch("http://localhost:3001/quiz/" + this.state.quizId)
				.then(res => res.json())
				.then(resJSON => this.setState({ questions: resJSON }))
				.then(() => console.log(this.state.questions))
				.catch(error => { console.error(error) });
			return null;
		}
		else {
			if (!this.state.endQuiz)
				return (
					<div>
						<form onSubmit={this.handleSubmit}>
							<FormControl>
								<FormLabel> {this.state.questions[this.state.current].question} </FormLabel>
									<RadioGroup onChange={this.handleRadioChange}>
										<FormControlLabel control={<Radio />} value="A" label={this.state.questions[this.state.current].answerA} />
										<FormControlLabel control={<Radio />} value="B" label={this.state.questions[this.state.current].answerB} />
										<FormControlLabel control={<Radio />} value="C" label={this.state.questions[this.state.current].answerC} />
										<FormControlLabel control={<Radio />} value="D" label={this.state.questions[this.state.current].answerD} />
									</RadioGroup>
								<FormHelperText>{this.state.answerResult}</FormHelperText>
								<Button variant="contained" type="submit">Dalej</Button>
							</FormControl>
						</form>
					</div>
				)
			else {
				if (!this.state.pointsAdded)
				{
					this.setState({ pointsAdded: true })
					addPoints(localStorage.getItem("username"), this.state.correctAnswered);
				}
				return (
					<div>
						<p> Twój wynik to {this.state.correctAnswered}/10</p>
					</div>
				)
			}			
		}
		
	 }
}
export default withRouter(Quiz);

function addPoints(username, pointsToAdd)
{
	fetch("http://localhost:3001/addPoints/" + username + "/" + pointsToAdd)
		.then(res=> res.json())
		.catch(error => { console.error(error) });
}