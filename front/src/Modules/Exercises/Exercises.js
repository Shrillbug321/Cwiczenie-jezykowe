import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export default class Exercises extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			exercises: []
		}
	}

	componentDidMount()
	{
		fetch("http://localhost:3001/exercises")
			.then(res => res.json())
			.then(resJSON => this.setState({ exercises: resJSON}))
			.then(() => console.log(this.state.exercises))
			.catch(error => { console.error(error) });
	}

	render()
	{
		return (
			<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Język</TableCell>
							<TableCell>Kategoria</TableCell>
							<TableCell>Rodzaj</TableCell>
						</TableRow>
					</TableHead>
						<TableBody>
							{this.state.exercises.map((row) => (
								<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									component="a" href={`${translateType(row.type)}/${row.id}`}>
							<TableCell>{row.language}</TableCell>
							<TableCell>{row.category}</TableCell>
							<TableCell>{row.type}</TableCell>
						</TableRow>
					  ))}
					</TableBody>
				</Table>
			</TableContainer>
			</div>
		);
	}
}
function translateType(type) {
	switch (type) {
		case "Quiz":
			return "quiz";
		case "Dopasowanie":
			return "matching";
		case "Krzyżówka":
			return "crossword";

	}
}