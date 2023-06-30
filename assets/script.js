var questions = [
	{
		question: "FIll in the blank: Javascript is a ______ language.",
		choices: ["a. Object Oriented", "b. Object Based", "c. Procedural", "d. All of the above"],
		solution: "a. Object Oriented"
	},
	{
		question: "When an operator’s value is NULL, the typeof returned by the unary operator is:?",
		choices: ["a. Boolean", "b. Undefined", "c. Object", "d. Integer"],
		solution: "c. Object"
	},
	{
		question: "Which of the following declarations is used to define a variable in Javascript?",
		choices: ["a. var", "b. cons", "c. let", "d. All of the above"],
		solution: "d. All of the above"
	},
	{
		question: "Which of the following methods is used to access HTML elements using Javascript??",
		choices: ["a. getElementById", "b. queryselector", "c. Both A and B", "d. None of the above"],
		solution: "c. Both A and B"
	},
	{
		question: "Which function is used to serialize an object into a JSON string in Javascript??",
		choices: ["a. stringify()", "b. parse()", "c. convert()", "d. All of the above"],
		solution: "a. stringify()"
	}
];

/*defining all variables used by element ID*/

var flex = document.getElementById("flex");
var viewscores = document.getElementById("viewscores");
var clock = document.getElementById("clock");
var countdown = document.getElementById("countdown");
var timesUp = document.getElementById("timesUp");
var quizstart = document.getElementById("quizstart");
var startbutton = document.getElementById("startbtn");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var lineBreak = document.getElementById("lineBreak");
var answer = document.getElementById("answer");
var quizend = document.getElementById("quizend");
var finalScore = document.getElementById("finalscore");
var initial = document.getElementById("initials");
var InitialBtn = document.getElementById("initialsbutton");
var scoreboard = document.getElementById("scoreboard");
var highscore = document.getElementById("highscore");
var restart = document.getElementById("restart");
var clearscores = document.getElementById("clearscores");
var correctAns = 0;
var questionNum = 0;
var result;
var questionarray = 0;
var counter = 121;

/*Functions*/

function startQuiz() {
	questionarray = 0;
	counter = 120;
	countdown.textContent = counter;
	initial.textContent = "";

	quizstart.style.display = "none";
	quiz.style.display = "block";
	clock.style.display = "block";
	timesUp.style.display = "none";

	var startTimer = setInterval(function () {
		counter--;
		countdown.textContent = counter;
		if (counter <= 0) {
			clearInterval(startTimer);
			if (questionarray < questions.length - 1) {
				endquiz();
			}
		}
	}, 1000);

	startquestions();
};

function startquestions() {
	nextquestion();
}

function nextquestion() {
	question.textContent = questions[questionarray].question;
	choiceA.textContent = questions[questionarray].choices[0];
	choiceB.textContent = questions[questionarray].choices[1];
	choiceC.textContent = questions[questionarray].choices[2];
	choiceD.textContent = questions[questionarray].choices[3];
}


function checkAnswer(solution) {

	lineBreak.style.display = "block";
	answer.style.display = "block";

	if (questions[questionarray].solution === questions[questionarray].choices[solution]) {
		correctAns++;
		answer.textContent = "Wow so smart, keep going!";
	} else {
		counter -= 10;
		countdown.textContent = counter;
		answer.textContent = "EHHH! Try again, the answer is: " + questions[questionarray].solution;
	}

	questionarray++;

	if (questionarray < questions.length) {
		nextquestion();
	} else {
		endquiz();
	}
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }


function endquiz() {
	quizend.style.display = "block";
	quiz.style.display = "none";
	quizstart.style.display = "none";
	clock.style.display = "none";
	timesUp.style.display = "block";


	finalScore.textContent = correctAns;
}


function storeHighScores(event) {
	scores
	event.preventDefault();


	if (initial.value === "") {
		alert("Your claim to fame! Enter your initials");
		return;
	}

	quizstart.style.display = "none";
	clock.style.display = "none";
	timesUp.style.display = "none";
	quizend.style.display = "none";
	scoreboard.style.display = "block";


	var storedscores = localStorage.getItem("high scores");
	var scoresArray;

	if (storedscores === null) {
		scoresArray = [];
	} else {
		scoresArray = JSON.parse(storedscores)
	}

	var yourscore = {
		initials: initial.value,
		score: finalScore.textContent
	};

	console.log(yourscore);
	scoresArray.push(yourscore);


	var scoresArrayString = JSON.stringify(scoresArray);
	window.localStorage.setItem("high scores", scoresArrayString);


	keptscore();
}


var i = 0;
function keptscore() {

	quizstart.style.display = "none";
	clock.style.display = "none";
	quiz.style.display = "none";
	timesUp.style.display = "none";
	quizend.style.display = "none";
	scoreboard.style.display = "block";

	var storedscores = localStorage.getItem("high scores");

	if (storedscores === null) {
		return;
	}
	console.log(storedscores);

	var storedHighScores = JSON.parse(storedscores);

	for (; i < storedHighScores.length; i++) {
		var eachNewHighScore = document.createElement("p");
		eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
		highscore.appendChild(eachNewHighScore);
	}
}

/*Adding Event Listeners*/

startbutton.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

InitialBtn.addEventListener("click", function (event) {
	storeHighScores(event);
});

viewscores.addEventListener("click", function (event) { keptscore(event); });

restart.addEventListener("click", function () {
	quizstart.style.display = "block";
	scoreboard.style.display = "none";
});

clearscores.addEventListener("click", function () {
	window.localStorage.removeItem("high scores");
	highscore.innerHTML = "Scoreboard Cleared";
});





