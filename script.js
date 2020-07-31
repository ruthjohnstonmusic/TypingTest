const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const scoreOne = document.querySelector("#one .score");
const scoreTwo = document.querySelector("#two .score");
const scoreThree = document.querySelector("#three .score");
const scoreFour = document.querySelector("#four .score");
const scoreFive = document.querySelector("#five .score");
const scoreSix = document.querySelector("#six .score");
const scoreSeven = document.querySelector("#seven .score");
const scoreEight = document.querySelector("#eight .score");
const scoreNine = document.querySelector("#nine .score");
const scoreTen = document.querySelector("#ten .score");
const nameOne = document.querySelector("#one .name");
const nameTwo = document.querySelector("#two .name");
const nameThree = document.querySelector("#three .name");
const nameFour = document.querySelector("#four .name");
const nameFive = document.querySelector("#five .name");
const nameSix = document.querySelector("#six .name");
const nameSeven = document.querySelector("#seven .name");
const nameEight = document.querySelector("#eight .name");
const nameNine = document.querySelector("#nine .name");
const nameTen = document.querySelector("#ten .name");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var finalTimeMilliseconds;
var scoreBoard = [4560, 5460, 6230, 6780, 7680, 8620, 8870, 9043, 10100, 10250];
var finalScoresArray = scoreBoard.map(msToTime);
var highScoreNames = ["Helios", "Ripley", "Ruthpls", "Tommo", "Billy Wig", "Pockets", "Elvis", "Beyonce", "Gandalf", "Superman"];

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    } else if (time > 99) { 
        time = time/10;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    
    timer[3]++;
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100)- (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}
// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    switch (textEntered) {
        //correct and complete
        case originText:
            testWrapper.style.borderColor = "#429890";
            var finalTime = theTimer.innerHTML.split(":");
            //Convert final time to milliseconds
            finalTimeMilliseconds = finalTime[0]*60000 + finalTime[1]*1000 + finalTime[2]*10;
            checkScoreBoard();
            finalScoresArray = scoreBoard.map(msToTime);
            displayTopScore();
            displayName();
            clearInterval(interval);
            break;
        case originTextMatch:
            //correct and incomplete
            testWrapper.style.borderColor = "#65ccf3";
            break;
        default:
            //incorrect
            testWrapper.style.borderColor = "#E95D0F";
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0,];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00.00.00";
    testWrapper.style.borderColor = "grey";
}

//Check time against top ten scores and add to scoreboard array if true:
function checkScoreBoard() {
    if (finalTimeMilliseconds <= scoreBoard[0]) {
        scoreBoard.splice(0,0, finalTimeMilliseconds);
        highScoreNames.splice(0,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[1]) {
        scoreBoard.splice(1,0, finalTimeMilliseconds);
        highScoreNames.splice(1,0, addName());
        removeExtraArrayItems();    
    } else if (finalTimeMilliseconds <= scoreBoard[2]) {
        scoreBoard.splice(2,0, finalTimeMilliseconds);
        highScoreNames.splice(2,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[3]) {
        scoreBoard.splice(3,0, finalTimeMilliseconds);
        highScoreNames.splice(3,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[4]) {
        scoreBoard.splice(4,0, finalTimeMilliseconds);
        highScoreNames.splice(4,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[5]) {
        scoreBoard.splice(5,0, finalTimeMilliseconds);
        highScoreNames.splice(5,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[6]) {
        scoreBoard.splice(6,0, finalTimeMilliseconds);
        highScoreNames.splice(6,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[7]) {
        scoreBoard.splice(7,0, finalTimeMilliseconds);
        highScoreNames.splice(7,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[8]) {
        scoreBoard.splice(8,0, finalTimeMilliseconds);
        highScoreNames.splice(8,0, addName());
        removeExtraArrayItems();
    } else if (finalTimeMilliseconds <= scoreBoard[9]) {
        scoreBoard.splice(9,0, finalTimeMilliseconds);
        highScoreNames.splice(9,0, addName());
        removeExtraArrayItems();
    }
}

//remove extra scores from scoreboard array
function removeExtraArrayItems() {
    if (scoreBoard.length > 6) {
        scoreBoard.pop();
        highScoreNames.pop();
    }
}

function addName() {
    var txt;
    var person = prompt("Please enter your name (max 9 characters):", "Batman");
    person = person.substr(0, 8);
    if (person == null || person == "") {
      txt = "Anonymous";
    } else {
      txt = person + " ";
    }
    return txt;
}

//Convert high scores to mins, secs, millisecs
function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    var realTimeArray = [mins, secs, ms]
    return realTimeArray;
}

//Convert high score array elements into readable strings
function displayTopScore() {
    let [timeOne, timeTwo, timeThree, timeFour, timeFive, timeSix, timeSeven, timeEight, timeNine, timeTen] = finalScoresArray;
    function convertTopScore(t) {
        let scoreTime = leadingZero(t[0]) + ":" + leadingZero(t[1]) + ":" + leadingZero(t[2]);
        return scoreTime;
    }
    scoreOne.innerHTML = convertTopScore(timeOne);
    scoreTwo.innerHTML = convertTopScore(timeTwo);
    scoreThree.innerHTML = convertTopScore(timeThree);
    scoreFour.innerHTML = convertTopScore(timeFour);
    scoreFive.innerHTML = convertTopScore(timeFive);
    scoreSix.innerHTML = convertTopScore(timeSix);
    scoreSeven.innerHTML = convertTopScore(timeSeven);
    scoreEight.innerHTML = convertTopScore(timeEight);
    scoreNine.innerHTML = convertTopScore(timeNine);
    scoreTen.innerHTML = convertTopScore(timeTen);
}

function displayName() {
    nameOne.innerText = highScoreNames[0]+ " ";
    nameTwo.innerText = highScoreNames[1] + " ";
    nameThree.innerText = highScoreNames[2] + " ";
    nameFour.innerText = highScoreNames[3] + " ";
    nameFive.innerText = highScoreNames[4] + " ";
    nameSix.innerText = highScoreNames[5] + " ";
    nameSeven.innerText = highScoreNames[6] + " ";
    nameEight.innerText = highScoreNames[7] + " ";
    nameNine.innerText = highScoreNames[8] + " ";
    nameTen.innerText = highScoreNames[9] + " ";
}

//Set the initial top scores
document.addEventListener("DOMContentLoaded", function(e) { 
    displayTopScore();
    displayName();
});

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
