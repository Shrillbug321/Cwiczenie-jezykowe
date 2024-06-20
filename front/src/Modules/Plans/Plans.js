import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export default class Plans extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			vocabulary: [],
			flatten: [],
			index: 0,
			readyToFlatten: false,
			isFlatten: false
		}
	}

	componentDidMount() {
		fetch("http://localhost:3001/vocabulary/Angielski")
			.then(res=> res.json())
			.then(resJSON => this.setState({ vocabulary: resJSON }))
			.then(() => console.log(this.state.vocabulary))
			.then(() => this.setState({readyToFlatten: true}))
			.catch(error => { console.error(error) });
	}

	render() {
		if (this.state.readyToFlatten) {
			let locFlatten = [];
			for (let i = 0; i < this.state.vocabulary[0].words.length; i++)
				locFlatten.push({
					word: this.state.vocabulary[0].words[i],
					translation: this.state.vocabulary[0].translations[i]
				})
			this.setState({ flatten: locFlatten })
			this.setState({ isFlatten: true })
			this.setState({ readyToFlatten: false })
			return null;
		}
		if (this.state.flatten)
			return (
				<div>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Słowo</TableCell>
									<TableCell>Tłumaczenie</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.flatten.map((row) => (
									<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell>{row.word}</TableCell>
										<TableCell>{row.translation}</TableCell>
									</TableRow>
								)
								)}
							</TableBody>
						</Table>
						</TableContainer>
				</div>
			);
		else return null
	}
}