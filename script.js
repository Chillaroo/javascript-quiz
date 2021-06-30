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
var correct= document.getElementById("correct");
var incorrect= document.getElementById("incorrect");
/* var nextButton = document.querySelector(".next-button"); */
var results= document.querySelector(".results");
var highScores= document.querySelector(".high-scores");
var submit= document.querySelector(".submit");
var tryAgain= document.querySelector(".try-again");
var highScores= document.querySelector(".high-scores");
var tableBody= document.querySelector(".table-body");
var clearScores= document.querySelector(".clear-scores");
var table= document.querySelector(".table");
var questionBank= [
    "How do you initialize an empty array?",
    "How do you create an event listener?",
    "How do you access the number 2 in the array [1,2,3,4]?",
    "Which HTML element is used to interpret JavaScript?",
    "How do you start a for loop?",
    "Which of the following is NOT a valid keyword to create a variable?",
    "How do you initialize an object with one key and one value?",
    "How do you pick a random element in an array?",
    "Which of the following is NOT a valid way to create a function?",
    "Which of the following does NOT get an element from HTML?"
];
var answerChoices= [
    {
        c: "var nameOfArray = [];",
        w1: "[];",
        w2: "var nameOfArray = ();",
        w3: "();"
    },
    {
        c: "nameOfElement.addEventListener(\"event\", nameOfFunction)",
        w1: "nameOfElement.addEventListener(nameOfFunction, \"event\")",
        w2: "addEventListener.nameOfElement(\"event\", nameOfFunction)",
        w3: "addEventListener.nameOfElement(nameOfFunction, \"event\")"
    },
    {
        c: "nameOfArray[1]",
        w1: "nameOfArray[2]",
        w2: "nameOfArray[3]",
        w3: "nameOfArray[4]"
    },
    {
        c: "<script>",
        w1: "<scripting>",
        w2: "<javascript>",
        w3: "<js>"
    },
    {
        c: "for (var i=0; i<=3; i++)",
        w1: "for i=1 to 3",
        w2: "for (i=0; i<=3)",
        w3: "for(i<=3;i++)"
    },
    {
        c: "int",
        w1: "var",
        w2: "let",
        w3: "const"
    },
    {
        c: "nameOfObject = {key:value}",
        w1: "nameOfObject = {value:key}",
        w2: "nameOfObject = [key:value]",
        w3: "nameOfObject = [value:key]"
    },
    {
        c: "nameOfArray[Math.floor(Math.random()*(nameOfArray.length))]",
        w1: "nameOfArray[Math.round(Math.random()*(nameOfArray.length))]",
        w2: "nameOfArray[Math.round(Math.random()*(nameOfArray.length + 1))]",
        w3: "nameOfArray[Math.floor(Math.random()*(nameOfArray.length())]"
    },
    {
        c: "var fucntion nameOfFunction(){};",
        w1: "function nameOfFunction(){};",
        w2: "var nameOfFunction = function(){};",
        w3: "var nameOfFunction = () => {};"
    },
    {
        c: "getItem",
        w1: "querySelector",
        w2: "getElementById",
        w3: "getElementsByClass"
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

correct.style.display= "none";
incorrect.style.display= "none";
answerChoiceDisplay.style.display= "none";
results.style.display= "none";
highScores.style.display="none";
for(var i=0; i<initials.length; i++){

    let newRow= tableBody.insertRow(-1);
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

function startTimer() {
    timerCount=120;
    /* nextButton.disabled = false; */
    answerChoiceDisplay.style.display = "block";
    timer= setInterval(function(){
        timerCount--;
        timerElement.textContent= timerCount + " seconds remaining!";
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
    answerChoiceDisplay.style.display= "block";
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
};

startButton.addEventListener("click", startGame);

function endGame() {
    clearInterval(timer);
    timerElement.textContent= "Your time is up! You answered " + score + " questions correctly.";
    answerChoiceDisplay.style.display= "none";
    questions.style.display= "none";
    results.style.display= "block";
}

function nextQuestion(){
    currentQuestion++;
    if (currentQuestion>9){
        option1.removeEventListener("click", checkOption1);
        option2.removeEventListener("click", checkOption2);
        option3.removeEventListener("click", checkOption3);
        option4.removeEventListener("click", checkOption4);
        if(timerCount <= 0) {
            timerCount = 0;
            endGame();
        }
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
        answerChoices[currentQuestion].w3
    ];
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
        showCorrect();
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        showIncorrect();
        nextQuestion();
    }
}

function checkOption2(){
    if(option2.textContent===answerChoices[currentQuestion].c){
        score++;
        console.log(score);
        showCorrect();
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        showIncorrect();
        nextQuestion();
    }
}

function checkOption3(){
    if(option3.textContent===answerChoices[currentQuestion].c){
        score++;
        console.log(score);
        showCorrect();
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        showIncorrect();
        nextQuestion();
    }
};

function checkOption4(){
    if(option4.textContent===answerChoices[currentQuestion].c){
        score++;
        console.log(score);
        showCorrect();
        nextQuestion();
    }
    else{
        timerCount = timerCount-3;
        showIncorrect();
        nextQuestion();
    }
}

submit.addEventListener("click", function() {
    //Store user's initials
    var input= document.querySelector(".initials").value;

    //Add the most recent initials, score, and time remaining to their respective arrays.
    scores.push(score);
    initials.push(input);
    timeRemaining.push(timerCount);
    
    //Convert the arrays containing the initials, scores, and times remaining into strings and save them to local storage.
    localStorage.setItem("initials", JSON.stringify(initials));
    localStorage.setItem("correct answers", JSON.stringify(scores));
    localStorage.setItem("time remaining", JSON.stringify(timeRemaining));
    
    //Create a row in the table
    let newRow= tableBody.insertRow(-1);
    let newCell1= newRow.insertCell(0);
    let newCell2= newRow.insertCell(1);
    let newCell3= newRow.insertCell(2);
    //Create nodes containing the most recent initials, score, and time remaining
    let node1= document.createTextNode(initials[initials.length-1]);
    let node2= document.createTextNode(scores[scores.length-1]);
    let node3= document.createTextNode(timeRemaining[timeRemaining.length-1]);
    //Fill the last row of the table with the nodes
    newCell1.appendChild(node1);
    newCell2.appendChild(node2);
    newCell3.appendChild(node3);

    highScores.style.display="block";
    results.style.display="none";
    table.style.display= "table";
});

tryAgain.addEventListener("click", function() {
    incorrect.style.display= "none";
    correct.style.display= "none";
    answerChoiceDisplay.style.display= "block";
    questions.style.display= "block";
    results.style.display= "none";
    startGame();
});

clearScores.addEventListener("click", function(){
    localStorage.clear();
    tableBody.innerHTML = "";
    table.style.display= "none";
    
});

function showCorrect () {
    correct.style.display= "block";
    incorrect.style.display= "none";
};

function showIncorrect () {
    incorrect.style.display= "block";
    correct.style.display= "none";
};