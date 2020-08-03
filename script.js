const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const scoreArr = document.querySelectorAll(".score");
const nameArr = document.querySelectorAll(".name");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var finalTimeMilliseconds;
var scoreBoard = [4560, 5460, 6230, 6780, 7680, 8620, 8870, 9040, 10100, 10250];
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

// Add leading zero to millisecs 99 or below (purely for aesthetics):
function leadingZeroMilliSecs(time) {
    if (time <= 99) {
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
    if (finalTimeMilliseconds <= scoreBoard[9]) {
        //add new score time to scoreboard array
        scoreBoard.push(finalTimeMilliseconds);
        //sort array in ascending order
        scoreBoard.sort(function(a, b){return a-b});
        //get index of new score
        var i = scoreBoard.indexOf(finalTimeMilliseconds);
        //add new score name to highscore names array in correct position
        highScoreNames.splice(i,0, addName());
        console.log(highScoreNames);
        removeExtraArrayItems();
    }
}

//remove extra scores from scoreboard array
function removeExtraArrayItems() {
    if (scoreBoard.length > 10) {
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
    function convertTopScore(t) {
        let scoreTime = leadingZero(t[0]) + ":" + leadingZero(t[1]) + ":" + leadingZeroMilliSecs(t[2]);
        return scoreTime;
    }

    for (let i = 0; i < scoreArr.length; i++) {
        scoreArr[i].innerHTML = convertTopScore(finalScoresArray[i]);
        nameArr[i].innerHTML = highScoreNames[i]+ " ";
      }
}



function setInitScoreboard() {
    var loadTimer = setInterval(checkScoreBoard, 500);
    function checkScoreBoard() {
        var myEle = document.getElementById("ten");
        if (myEle) {
            displayTopScore();
            clearInterval(loadTimer);
        }
        else {
            checkScoreBoard();
        }
    } 
}

//Set the initial top scores
document.addEventListener("DOMContentLoaded", function(e) {
    setInitScoreboard();
});

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
