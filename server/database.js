const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/school";
mongoClient.connect(url, function(err, db){
	if (err) throw err;
	const dbo = db.db("school");
	dbo.createCollection("exercises", (err, res) => {
		if (err) throw err;
	}); 
	dbo.createCollection("quizes", (err, res) => {
		if (err) throw err;
	});
	dbo.createCollection("matchings", (err, res) => {
		if (err) throw err;
	});
	dbo.createCollection("users", (err, res) => {
		if (err) throw err;
	});
	dbo.createCollection("crosswords", (err, res) => {
		if (err) throw err;
	});
	
	const exercises = [
	{
		id: "1",
		language: "Angielski",
		category: "Warzywa i owoce",
		type: "Quiz"
	},
	{
		id: "2",
		language: "Angielski",
		category: "Desery",
		type: "Dopasowanie"
	},
	{
		id: "3",
		language: "Angielski",
		category: "Napoje",
		type: "Krzyżówka"
	}
	]
	
	dbo.collection("exercises").insertMany(exercises, (err, res) => {
		if (err) throw err;
	});
	
	const users = [
	{
		id: "1",
		username: "admin",
		password: "admin",
		points: "0"
	}
	]
	
	dbo.collection("users").insertMany(users, (err, res) => {
		if (err) throw err;
	});
	
	const vocabulary = [
	{
		id: "1",
		language: "Angielski",
		words: ["Pie", "Carrot", "Plum", "Apple", "Pear", "Banan", "Orange", "Grapefruit", "Grape", "Coconut", "Watermelon", "Lemon", "Peach", "Berry"],
		translations: ["Ciasto", "Marchewka", "Śliwka", "Jabłko", "Gruszka", "Banan", "Pomarańcza", "Grapefruit", "Winogrono", "Kokos", "Arbuz", "Cytryna", "Brzoskwinia", "Jagody"]
	}
	]
	
	dbo.collection("vocabulary").insertMany(vocabulary, (err, res) => {
		if (err) throw err;
	});
	
	const quizes = [
	{
		quizId: "1",
		question: "Apple",
		answerA: "Banan",
		answerB: "Jabłko",
		answerC: "Pomarańcza",
		answerD: "Grapefruit",
		correctAnswer: "B"
	},
	{
		quizId: "1",
		question: "Grape",
		answerA: "Winogrono",
		answerB: "Jabłko",
		answerC: "Gruszka",
		answerD: "Kokos",
		correctAnswer: "A"
	},
	{
		quizId: "1",
		question: "Śliwka",
		answerA: "Coconut",
		answerB: "Watermelon",
		answerC: "Fruit",
		answerD: "Plum",
		correctAnswer: "D"
	},
	{
		quizId: "1",
		question: "Lemon",
		answerA: "Pomarańcza",
		answerB: "Jabłko",
		answerC: "Cytryna",
		answerD: "Grape",
		correctAnswer: "C"
	},
	{
		quizId: "1",
		question: "Brzoskwinia",
		answerA: "Orange",
		answerB: "Peach",
		answerC: "Berry",
		answerD: "Grape",
		correctAnswer: "B"
	},
	{
		quizId: "1",
		question: "Carrot",
		answerA: "Fasola",
		answerB: "Pomidor",
		answerC: "Marchewka",
		answerD: "Ziemniak",
		correctAnswer: "C"
	},
	{
		quizId: "1",
		question: "Fasola",
		answerA: "Bean",
		answerB: "Chilli",
		answerC: "Brocolli",
		answerD: "Vegetable",
		correctAnswer: "A"
	},
	{
		quizId: "1",
		question: "Czosnek",
		answerA: "Cabbage",
		answerB: "Onion",
		answerC: "Garlic",
		answerD: "Pepper",
		correctAnswer: "C"
	},
	{
		quizId: "1",
		question: "Cucumber",
		answerA: "Ogórek",
		answerB: "Pumpkin",
		answerC: "Leek",
		answerD: "Pea",
		correctAnswer: "A"
	},
	{
		quizId: "1",
		question: "Aubergine",
		answerA: "Burak",
		answerB: "Kalafior",
		answerC: "Bakłażan",
		answerD: "Szpinak",
		correctAnswer: "C"
	}
	]
	
	dbo.collection("quizes").insertMany(quizes, (err, res) => {
		if (err) throw err;
	});
	
	const matchings = [
	{
		exerciseId: "2",
		label1: "Cheesecake",
		label2: "Apple pie",
		label3: "Lollipop",
		label4: "Ice cream"
	}
	]
	
	dbo.collection("matchings").insertMany(matchings, (err, res) => {
		if (err) throw err;
	});
	
	const crosswords = [
	{
		exerciseId: "3",
		questions: [
			"...drink - napój gazowany", "Woda", "Sok", "Mleko", "Herbata", "...cofee - kawa rozpuszczalna"
		],
		words: [
			"Fizzy", "Water", "Juice", "Milk", "Tea", "Instant"
		], 
		solve: ["F","R","U","I","T","S"]
	}
	]
	
	dbo.collection("crosswords").insertMany(crosswords, (err, res) => {
		if (err) throw err;
	});
});