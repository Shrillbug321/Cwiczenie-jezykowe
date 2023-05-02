import React from 'react';
export default class Course extends React.Component
{
	render() {
		var { name, language, level } = this.props;
		return (
			<tr>
				<td> Nazwa</td> <td> {name}</td>
				<td> Język</td> <td> {language} </td>
				<td> Poziom</td> <td>{level} </td>
			</tr>
		);
	}	
}