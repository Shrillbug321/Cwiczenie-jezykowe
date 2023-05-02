const express = require("express");
const PORT = 3001;
const app = express();
const {MongoClient} = require('mongodb');
const mongoUrl = "mongodb://localhost:27017/school";
const client = new MongoClient(mongoUrl);

app.listen(PORT, () => {
	console.log("Serwer działa na " + PORT);
})
client.connect(function(err, db){
	if (err) throw err;
	const dbo = client.db("school");
	const exercises = dbo.collection("exercises");
	const quizes = dbo.collection("quizes");
	const users = dbo.collection("users");
	const matchings = dbo.collection("matchings");
	const crosswords = dbo.collection("crosswords");
	const vocabulary = dbo.collection("vocabulary");
	const imagesLocation = "D:/Semestr V/TPSI/projekt/server/images";
	app.get("/api", (req, res) => {
		res.json({ message: "Hello from server" });
	})

	app.get("/exercises", (req, res) => {
		findExercises(res, exercises);
	})

	app.get("/quiz/:quizId", (req, res) => {
		const quizId = req.params.quizId;
		findQuiz(res, quizes, quizId);
	})

	app.get("/login/:username/:password", (req, res) => {
		const username = req.params.username;
		const password = req.params.password;
		checkUser(res, users, username, password);
	})

	app.get("/addPoints/:username/:points", (req, res) => {
		const username = req.params.username;
		const points = req.params.points;
		addPoints(res, users, username, points);
	})

	app.get("/matching/:matchingId", (req, res) => {
		const matchingId = req.params.matchingId;
		console.log(matchingId)
		findMatching(res, matchings, matchingId);
	})

	app.get("/crossword/:exerciseId", (req, res) => {
		const exerciseId = req.params.exerciseId;
		console.log(exerciseId)
		findCrossword(res, crosswords, exerciseId);
	})

	app.get("/accountDetails/:username", (req, res) => {
		const username = req.params.username;
		console.log(username)
		findAccountDetails(res, users, username);
	})

	app.get("/vocabulary/:language", (req, res) => {
		const language = req.params.language;
		console.log(language)
		findVocabulary(res, vocabulary, language);
	})

	app.get("/images/exercises/:exerciseId/:file(*)", (req, res) => {
		const exerciseId = req.params.exerciseId;
		const file = req.params.file;
		const location = imagesLocation + "/exercises/" + exerciseId + "/" + file;
		//res.json({location: `${location}`});
		res.sendFile(`${location}`);
	})
})

async function findExercises(res, exercises)
{
	const options = {
		projection: {id: 1, language: 1, category: 1, type: 1}
	}
	var response = exercises.find({}, options);
	var resArray = await response.toArray();
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(resArray);
}

async function findQuiz(res, quizes, quizId)
{
	const options = {
		projection: { quizId: 1, question: 1, answerA: 1, answerB: 1, answerC: 1, answerD: 1, correctAnswer: 1}
	}
	var response = quizes.find({ quizId: `${quizId}` }, options);
	var resArray = await response.toArray();
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(resArray);
}

async function findMatching(res, matchings, exerciseId)
{
	const options = {
		projection: { label1: 1, label2: 1, label3: 1, label4: 1}
	}
	var response = matchings.find({ exerciseId: `${exerciseId}` }, options);
	var resArray = await response.toArray();
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(resArray);
}

async function checkUser(res, users, username, password)
{
	const options = {
		projection: { username: 1, password: 1}
	}
	var response = users.find({ username: `${username}` }, options);
	var resArray = await response.toArray();
	var result;
	if (resArray.length > 0)
		result = password == resArray[0].password ? "userValid" : "userInvalid";
	else
		result = "userInvalid";
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({isValid: result});
}

async function addPoints(res, users, username, pointsToAdd)
{
	const options = {
		projection: { username: 1, points: 1}
	}
	var response = users.find({ username: `${username}` }, options);
	var resArray = await response.toArray();
	console.log(resArray);
	if (resArray.length < 1) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json({ result: "userNotFound" });
		return;
    }
	const points = Number(resArray[0].points) + Number(pointsToAdd);
	const updateOptions = {
		projection: { upsert: false }
	}
	const doc = {
		$set: {points: `${points}`}
	}
	var response = users.updateOne({ username: `${username}` }, doc, updateOptions);
	//var resArray = await response.toArray();
	/*var result;
	if (resArray.length > 0)
		result = password == resArray[0].password ? "userValid" : "userInvalid";
	else
		result = "userInvalid";*/
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({result: "succesfullyAdd"});
}

async function findAccountDetails(res, users, username)
{
	const options = {
		projection: { username:1, points: 1}
	}
	var response = users.find({ username: `${username}` }, options);
	var resArray = await response.toArray();
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(resArray);
}

async function findCrossword(res, crosswords, exerciseId)
{
	const options = {
		projection: { questions: 1, words: 1, solve: 1}
	}
	var response = crosswords.find({ exerciseId: `${exerciseId}` }, options);
	var resArray = await response.toArray();
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(resArray);
}

async function findVocabulary(res, vocabulary, language) {
	const options = {
		projection: { words: 1, translations: 1 }
	}
	var response = vocabulary.find({}, options);
	var resArray = await response.toArray();
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(resArray);
}