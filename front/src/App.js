import React from "react";
import Plans from "./Modules/Plans/Plans.js";
import About from "./Modules/About/About.js";
import LoginControl from "./Modules/Authorization/LoginControl.js";
import AccountDetails from "./Modules/Authorization/AccountDetails.js";
import Exercises from "./Modules/Exercises/Exercises.js";
import Quiz from "./Modules/Exercises/Quiz.js";
import Matching from "./Modules/Exercises/Matching.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import './App.css';
import Crossword from "./Modules/Exercises/Crossword.js";
function App() {
	const [ data, setData ] = React.useState(null);

	return (
	  <div>
		<Router>
			<Link to="/exercises"><Button className="nm" variant="contained">Ćwiczenia</Button></Link>
			<Link to="/vocabulary"><Button variant="contained">Słownik</Button></Link>
			<Link to="/about"><Button variant="contained">O szkole</Button></Link>
			<LoginControl/>

			<Routes>
				<Route path="/exercises" element={<Exercises />} />
				<Route path="quiz/:quizId" element={<Quiz/>} />
				<Route path="matching/:matchingId" element={<Matching />} />
				<Route path="crossword/:matchingId" element={<Crossword />} />
				<Route path="/vocabulary" element={<Plans />} />
				<Route path="/about" element={<About />} />
				<Route path="/accountDetails/*" element={<AccountDetails username={localStorage.getItem("username")} />} />
			</Routes>
		</Router>
	</div>
			
  );
}

export default App;