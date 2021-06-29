/* GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question

WHEN I answer a question
THEN I am presented with another question

WHEN I answer a question incorrectly
THEN time is subtracted from the clock

WHEN all questions are answered or the timer reaches 0
THEN the game is over

WHEN the game is over
THEN I can save my initials and my score
 */

var startButton= document.querySelector(".start-button");
var timerElement= document.querySelector(".timer-count");
var questions= document.querySelector(".questions");
var answerChoiceDisplay= document.querySelector(".answer-choices");
var option1= document.querySelector(".option1");
var option2= document.querySelector(".option2");
var option3= document.querySelector(".option3");
var option4= document.querySelector(".option4");
var timer;

var timerCount;
var score=0;

var currentQuestion = 0;
/* var nextButton = document.querySelector(".next-button"); */
var results= document.querySelector(".results");
var highScores= document.querySelector(".high-scores");
var submit= document.querySelector(".submit");
var tryAgain= document.querySelector(".try-again");
var highScores= document.querySelector(".high-scores");
var questionBank= [
    "first question",
    "second question",
    "third question",
    "fourth question",
    "fifth question",
    "sixth question",
    "seventh question",
    "eigth question",
    "ninth question",
    "tenth question"
];
var answerChoices= [
    {
        c: "correct 1",
        w1: "wrong 1-1",
        w2: "wrong 1-2",
        w3: "wrong 1-3"
    },
    {
        c: "correct 2",
        w1: "wrong 2-1",
        w2: "wrong 2-2",
        w3: "wrong 2-3"
    },
    {
        c: "correct 3",
        w1: "wrong 3-1",
        w2: "wrong 3-2",
        w3: "wrong 3-3"
    },
    {
        c: "correct 4",
        w1: "wrong 4-1",
        w2: "wrong 4-2",
        w3: "wrong 4-3"
    },
    {
        c: "correct 5",
        w1: "wrong 5-1",
        w2: "wrong 5-2",
        w3: "wrong 5-3"
    },
    {
        c: "correct 6",
        w1: "wrong 6-1",
        w2: "wrong 6-2",
        w3: "wrong 6-3"
    },
    {
        c: "correct 7",
        w1: "wrong 7-1",
        w2: "wrong 7-2",
        w3: "wrong 7-3"
    },
    {
        c: "correct 8",
        w1: "wrong 8-1",
        w2: "wrong 8-2",
        w3: "wrong 8-3"
    },
    {
        c: "correct 9",
        w1: "wrong 9-1",
        w2: "wrong 9-2",
        w3: "wrong 9-3"
    },
    {
        c: "correct 10",
        w1: "wrong 10-1",
        w2: "wrong 10-2",
        w3: "wrong 10-3"
    },
];
//Get strings for initials, scores, and time-remaining if they exist and are not empty, otherwise they are "null".
var initials= localStorage.getItem("initials");
var scores= localStorage.getItem("correct answers");
var timeRemaining= localStorage.getItem("time remaining");


if(initials || scores || timeRemaining){
    //If initials, scores, and time-remaining strings exist, then parse them as arrays.
    initials= JSON.parse(initials);
    scores= JSON.parse(scores);
    timeRemaining= JSON.parse(timeRemaining);
}
else{
    //If initials, scores, and time-remaining strings are "null", then reassign them as empty arrays.
    initials= [];
    scores= [];
    timeRemaining= [];
}

console.log(initials);
console.log(scores);
console.log(timeRemaining);

/* var displayScores= {
    "initials": initials,
    "scores": scores,
    "time": timeRemaining,
}; */
var table= document.querySelector(".table");

for(var i=0; i<initials.length; i++){

let newRow= table.insertRow(-1);
let newCell1= newRow.insertCell(0);
let newCell2= newRow.insertCell(1);
let newCell3= newRow.insertCell(2);

let node1= document.createTextNode(initials[i]);
let node2= document.createTextNode(scores[i]);
let node3= document.createTextNode(timeRemaining[i]);

newCell1.appendChild(node1);
newCell2.appendChild(node2);
newCell3.appendChild(node3);
};

/*
START BUTTON
- add event listener
- call function to start timer
- display first question and answer choices
*/

results.style.display= "none";
highScores.style.display="none";

function startTimer() {
    timerCount=20;
    timerElement.textContent="60";
    /* nextButton.disabled = false; */
    answerChoiceDisplay.style.display = "block";
    timer= setInterval(function(){
        timerCount--;
        timerElement.textContent= timerCount;
        if(timerCount === 0) {
            endGame();
        }
        if(timerCount <= 0) {
            timerCount = 0;
            endGame();
        }
    }, 1000);
};

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function startGame() {
    startButton.disabled = true;
    startButton.style.display= "none";
    highScores.style.display= "none";
    currentQuestion= 0;
    score= 0;
    document.querySelector(".initials").value= " ";
    startTimer();
    questions.textContent= questionBank[0];
    let answersArray = [
        answerChoices[0].c,
        answerChoices[0].w1,
        answerChoices[0].w2,
        answerChoices[0].w3];
    shuffle(answersArray);
    option1.textContent= answersArray[0];
    option2.textContent= answersArray[1];
    option3.textContent= answersArray[2];
    option4.textContent= answersArray[3];

    option1.addEventListener("click", checkOption1);
    option2.addEventListener("click", checkOption2);
    option3.addEventListener("click", checkOption3);
    option4.addEventListener("click", checkOption4);
    /* nextButton.addEventListener("click", nextQuestion); */
};

function endGame() {
    clearInterval(timer);
    timerElement.textContent= "Your time is up! You answered " + score + " questions correctly.";
    /* startButton.disabled = false;
    startButton.textContent = "Try Again"; */
    /* nextButton.disabled = true; */
    answerChoiceDisplay.style.display= "none";
    questions.style.display= "none";
    results.style.display= "block";
}

startButton.addEventListener("click", startGame);

function nextQuestion(){
    currentQuestion++;
    if (currentQuestion>9){
        /* nextButton.disabled= true; */
        option1.removeEventListener("click", checkOption1);
        option2.removeEventListener("click", checkOption2);
        option3.removeEventListener("click", checkOption3);
        option4.removeEventListener("click", checkOption4);
        if(timerCount <= 0) {
            timerCount = 0;
            endGame();}
        clearInterval(timer);
        answerChoiceDisplay.style.display= "none";
        questions.style.display= "none";
        timerElement.textContent= "You have answered " + score + " questions correctly with " + timerCount + " seconds remaining!";
        results.style.display= "block";
        return;
    }
    questions.textContent= questionBank[currentQuestion];
    answersArray = [
        answerChoices[currentQuestion].c,
        answerChoices[currentQuestion].w1,
        answerChoices[currentQuestion].w2,
        answerChoices[currentQuestion].w3];
    shuffle(answersArray);
    option1.textContent= answersArray[0];
    option2.textContent= answersArray[1];
    option3.textContent= answersArray[2];
    option4.textContent= answersArray[3];
}

function checkOption1(){
    if(option1.textContent===answerChoices[currentQuestion].c){
        score++;
        console.log(score);
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        nextQuestion();
    }
}

function checkOption2(){
    if(option2.textContent===answerChoices[currentQuestion].c){
        score++;
        console.log(score);
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        nextQuestion();
    }
}

function checkOption3(){
    if(option3.textContent===answerChoices[currentQuestion].c){
        score++;
        console.log(score);
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        nextQuestion();
    }
};

function checkOption4(){
    if(option4.textContent===answerChoices[currentQuestion].c){
        score++;
        console.log(score);
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        nextQuestion();
    }
}

submit.addEventListener("click", function() {
    var input= document.querySelector(".initials").value;

    scores.push(score);
    initials.push(input);
    timeRemaining.push(timerCount);
    
    localStorage.setItem("initials", JSON.stringify(initials));
    localStorage.setItem("correct answers", JSON.stringify(scores));
    localStorage.setItem("time remaining", JSON.stringify(timeRemaining));
    
    /* let initials= document.createElement("p");        
    let correctAnswers= document.createElement("p");        
    let timeRemaining = document.createElement("p");        

    initials.textContent= localStorage.getItem("initials");
    correctAnswers.textContent= localStorage.getItem("correct answers");
    timeRemaining.textContent= localStorage.getItem("time remaining");

    highScores.append(initials, correctAnswers, timeRemaining);
    initials.style.display="inline";
    correctAnswers.style.display="inline";
    timeRemaining.style.display="inline"; */


    
    let newRow= table.insertRow(-1);
    let newCell1= newRow.insertCell(0);
    let newCell2= newRow.insertCell(1);
    let newCell3= newRow.insertCell(2);

    let node1= document.createTextNode(initials[initials.length-1]);
    let node2= document.createTextNode(scores[scores.length-1]);
    let node3= document.createTextNode(timeRemaining[timeRemaining.length-1]);

    newCell1.appendChild(node1);
    newCell2.appendChild(node2);
    newCell3.appendChild(node3);

    highScores.style.display="block";
    results.style.display="none";
});

tryAgain.addEventListener("click", function() {
    answerChoiceDisplay.style.display= "block";
    questions.style.display= "block";
    results.style.display= "none";
    startGame();
});

/* for (const [key, value] of Object.entries(questionBank)) {
    console.log(`${key} ${value}`);
}
 */




/* console.log(questionBank.q3);
console.log(answerChoices.q1[0]) */
/*var correctAnswers= {
    a1: 'answer 1',
    a2: 'answer 2',
    a3: 'answer 3',
    a4: 'answer 4',
    a5: 'answer 5',
    a6: 'answer 6',
    a7: 'answer 7',
    a8: 'answer 8',
    a9: 'answer 9',
    a10: 'answer 10',
};

var distractors= {
    d1_1: 'distractor 1-1',
    d1_2: 'distractor 1-2',
    d1_3: 'distractor 1-3',
    d2_1: 'distractor 2-1',
    d2_2: 'distractor 2-2',
    d2_3: 'distractor 2-3',
    d3_1: 'distractor 3-1',
    d3_2: 'distractor 3-2',
    d3_3: 'distractor 3-3',
    d4_1: 'distractor 4-1',
    d4_2: 'distractor 4-2',
    d4_3: 'distractor 4-3',
    d5_1: 'distractor 5-1',
    d5_2: 'distractor 5-2',
    d5_3: 'distractor 5-3',
    d6_1: 'distractor 6-1',
    d6_2: 'distractor 6-2',
    d6_3: 'distractor 6-3',
    d7_1: 'distractor 7-1',
    d7_2: 'distractor 7-2',
    d7_3: 'distractor 7-3',
    d8_1: 'distractor 8-1',
    d8_2: 'distractor 8-2',
    d8_3: 'distractor 8-3',
    d9_1: 'distractor 9-1',
    d9_2: 'distractor 9-2',
    d9_3: 'distractor 9-3',
    d10_1: 'distractor 10-1',
    d10_2: 'distractor 10-2',
    d10_3: 'distractor 10-3',
}; */




