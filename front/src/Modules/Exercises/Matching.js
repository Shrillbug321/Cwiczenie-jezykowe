import React from 'react';
import withRouter from "../withRouter";
import FormControl from '@mui/material/FormControl';
class Matching extends React.Component {

	paperStyle = {
		border: "1px solid #c4c4c4",
		borderRadius: "5px",
		width: 120,
		height: 100,
		transition: "border 0.1s linear 0s"
	}
	imageStyle = {
		width: 120,
		height: 100,
		cursor: "grab"
	}
	resultStyle = {
		opacity: "0",
		transition: "opacity 0.1s linear 0.2s"
	}
	tableStyle = {
		textAlign: "center"
	}
	constructor(props) {
		super(props);

		this.state = {
			exerciseId: 0,
			labels: [],
			matched: 0,
			checked: 0,
			all: 3
		}
		this.drag = this.drag.bind(this)
		this.drop = this.drop.bind(this)
		this.dragOver = this.dragOver.bind(this)
	}
	
	 drag(event) {
		 event.dataTransfer.setData("id", event.target.id);
		 event.dataTransfer.setData("name", event.target.name);
		 event.target.style.cursor = "grabbing";
	}

	 drop(event) {
		event.preventDefault();
		 var data = event.dataTransfer.getData("id");
		 event.target.style.border = "1px solid #c4c4c4";
		 event.target.appendChild(document.getElementById(data));
		 console.log(event.target);
		 this.setState({ checked: this.state.checked + 1 })
		 if (event.dataTransfer.getData("name") == event.target.id) {
			 this.setState({ matched: this.state.matched+1 })
		 }
		 if (this.state.checked == this.state.all)
		 {
			 document.getElementById("result").style.opacity = "1";
			 addPoints(localStorage.getItem("username"), this.state.matched);
		 }
	}

	 dragOver(event) {
		 event.preventDefault();
		 event.target.style.border="1px solid #1976d2"
	}

	 dragLeave(event) {
		 event.preventDefault();
		 event.target.style.border="1px solid #c4c4c4"
	}

	componentDidMount() {
		var path = window.location.pathname;
		var splitted = path.split('/');
		this.setState({ exerciseId: splitted[splitted.length - 1] })
	}
	render() {
		if (this.state.labels.length == 0) {
			fetch("http://localhost:3001/matching/" + this.state.exerciseId)
				.then((res) => res.json())
				.then((resJSON) => {
					this.setState({ labels: resJSON })
				})
				.then(() => console.log(this.state.labels))
				.catch((error) => { console.error(error) });
			return null;
		}
		else {
			if (!this.state.isEnd)
			{
				return (
					<div>
						<form>
							<FormControl>
								<table style={this.tableStyle}>
									<tr>
										<td onDrop={this.drop} onDragOver={this.dragOver} onDragLeave={this.dragLeave} style={ this.paperStyle} id={this.state.labels[0].label2}>{this.state.labels[0].label2} </td>						
										<td onDrop={this.drop} onDragOver={this.dragOver} onDragLeave={this.dragLeave} style={ this.paperStyle} id={this.state.labels[0].label4}>{this.state.labels[0].label4} </td>						
										<td onDrop={this.drop} onDragOver={this.dragOver} onDragLeave={this.dragLeave} style={ this.paperStyle} id={this.state.labels[0].label3}>{this.state.labels[0].label3} </td>						
										<td onDrop={this.drop} onDragOver={this.dragOver} onDragLeave={this.dragLeave} style={ this.paperStyle} id={this.state.labels[0].label1}>{this.state.labels[0].label1} </td>						
									</tr>
									<tr>
										<td><img id="img1" src={"http://localhost:3001/images/exercises/" + this.state.exerciseId + "/img1.png"} onDragStart={this.drag} name={this.state.labels[0].label1} style={this.imageStyle}/></td>
										<td><img id="img2" src={"http://localhost:3001/images/exercises/" + this.state.exerciseId + "/img2.png"} onDragStart={this.drag} name={this.state.labels[0].label2} style={this.imageStyle}/></td>
										<td><img id="img3" src={"http://localhost:3001/images/exercises/" + this.state.exerciseId + "/img3.png"} onDragStart={this.drag} name={this.state.labels[0].label3} style={this.imageStyle}/></td>
										<td><img id="img4" src={"http://localhost:3001/images/exercises/" + this.state.exerciseId + "/img4.png"} onDragStart={this.drag} name={this.state.labels[0].label4} style={this.imageStyle}/></td>
									</tr>
									<tr id="result" style={this.resultStyle}><td colSpan="4">Poprawnie dopasowano {this.state.matched} <br/> Zdobyłeś {this.state.matched} punktów</td></tr>
								</table>
							</FormControl>
						</form>
					</div>
				)
			}		
		}
	 }
}
export default withRouter(Matching);

async function addPoints(username, pointsToAdd)
{
	fetch("http://localhost:3001/addPoints/" + username + "/" + pointsToAdd)
		.then((res) => res.json())
		.catch((error) => { console.error(error) });
}