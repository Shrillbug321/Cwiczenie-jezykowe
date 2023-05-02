import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(language, level, teacher) {
	return { language, level, teacher};
}


const rows = [
  createData('Angielski', "A1", "Wojtek Naparzalski")
];

export default class Courses extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			courses: []
		}
	}

	componentDidMount()
	{
		fetch("/courses").then((res) => console.log(res.json())).then((res) => console.log(res))
			.then((data) => this.setState({ courses: data }))
			.then(console.log(this.state.courses));
	}

	render()
	{
		return(
			<TableContainer component={Paper}>
			  <Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<TableCell>Język</TableCell>
					<TableCell>Poziom</TableCell>
					<TableCell>Nauczyciel</TableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {rows.map((row) => (
					<TableRow
					  key={row.name}
					  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
					  <TableCell component="th" scope="row">
							  {row.language}
					  </TableCell>
						  <TableCell>{row.level}</TableCell>
						  <TableCell>{row.teacher}</TableCell>
					</TableRow>
				  ))}
					  </TableBody>
				  </Table>
			  </TableContainer>
		);
	}
  
}