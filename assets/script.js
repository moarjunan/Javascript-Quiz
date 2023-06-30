const questions = [
    {
        question: "Question 1?",
        choices: ["a. a", "b. b", "c. c", "d. d"],
        solution: "d. d"
    },
    {
		question: "Question 2?",
        choices: ["a. a", "b. b", "c. c", "d. d"],
        solution: "d. d"
    },
    {
		question: "Question 3?",
        choices: ["a. a", "b. b", "c. c", "d. d"],
        solution: "d. d"
    },
    {
		question: "Question 4?",
        choices: ["a. a", "b. b", "c. c", "d. d"],
        solution: "d. d"
    },
    {
		question: "Question 5?",
        choices: ["a. a", "b. b", "c. c", "d. d"],
        solution: "d. d"
    }
];


var flex = document.getElementById("flex");
var history = document.getElementById("history");
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
var scoreResult;
var questionIndex = 0;
var counter = 121;


function startQuiz() {
    questionIndex = 0;
    counter = 120;
    countdown.textContent = counter;

    var startTimer = setInterval(function() {
        counter--;
        countdown.textContent = counter;
        if(counter <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    question.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}


function checkAnswer(solution) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answer.style.display = "block";

    if (questions[questionIndex].solution === questions[questionIndex].choices[solution]) {
        correctAns++;
        answer.textContent = "Correct!";
    } else {
        counter -= 10;
        countdown.textContent = counter;
        answer.textContent = "Wrong! The correct answer is: " + questions[questionIndex].solution;
    }
    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }


function gameOver() {
    finalScore.textContent = correctAns;
}


function storeHighScores(event) {
    event.preventDefault();


    if (initial.value === "") {
        alert("Please enter your initials!");
        return;
    } 
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initial.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

   
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    

    showHighScores();
}


var i = 0;
function showHighScores() {

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        highscore.appendChild(eachNewHighScore);
    }
}


startbutton.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

InitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

history.addEventListener("click", function(event) { 
    showHighScores(event);
});

restart.addEventListener("click", function() {
    quizstart.style.display = "block";
    scoreboard.style.display = "none";
});

clearscores.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    highscore.innerHTML = "High Scores Cleared!";
    highscore.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});
