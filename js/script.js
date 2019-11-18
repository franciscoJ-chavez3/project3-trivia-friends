//grab inject elements
let inject = document.getElementById("inject");
let totalScore = 0; //number of questions answered correct
let totalQuestions = 20; //number of questions
let tQuestions = []; //array of questions used in trivia
let triviaQfull = []; //array of ALL questions
let diff = "../data/data.json"; //difficulty setting
let qNum = 0; //index of tQuestion array
let timer = 25; //timer
let incorrect = 0; //number of questions answered incorrect
let interval; //interval

let lightArr = []; //array for q.values in lightning
let lightScore = 0; //score for lightning rnd
let wrongArr = []; //array of wrong answers

//music
let audio = new Audio();
audio.src = "../sound/friendsIntro.mp3";
let sound = false;

//-------------------Start Up-----------------------------//
//load title to index on startup
window.onload = loadHTML("../injections/title.html");

//--------------loadhtml function-------------//
//loadHTML for injections
function loadHTML(url) {
  //XML HTTP-REQUEST
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let myArr = this.responseText;
      console.log(myArr);
      if (url === "../injections/title.html") {
        loadTitle(myArr);
      } else if (url === "../injections/menu.html") {
        loadMenu(myArr);
      } else if (url === "../injections/options.html") {
        loadOptions(myArr);
      } else if (url === "../injections/game.html") {
        loadGame(myArr);
      } else if (url === "../injections/lightning.html") {
        loadLightning(myArr);
      } else if (url === "../injections/win.html") {
        loadWin(myArr);
      } else if (url === "../injections/lose.html") {
        loadLose(myArr);
      } else if (url === "../injections/win2.html") {
        loadWin2(myArr);
      } else if (url === "../injections/lose2.html") {
        loadLose2(myArr);
      }
    }
  };
  //Opening the connection
  xmlhttp.open("GET", url, true);
  //Sending the request
  xmlhttp.send();
}
//-------------------Load Title--------------------//
//this function loads title page
function loadTitle(info) {
  //info is myArr from loadHTML
  inject.innerHTML = info;
  //grab start button from title page
  let titleStartBtn = document.getElementById("titleStartBtn");

  //add event listener to inject html
  titleStartBtn.addEventListener("click", function(e) {
    //call load html function pass url thru
    loadHTML("../injections/menu.html");
  });
}

//--------------------Load Menu--------------------------//
//injects menu.html
function loadMenu(info) {
  //info is myArr from loadHTML
  inject.innerHTML = info;
  //grab optionsBtn, backBtn, playBtn, lightningBtn
  let menuOptionsBtn = document.getElementById("menuOptionsBtn");
  let menuBackBtn = document.getElementById("menuBackBtn");
  let menuPlayBtn = document.getElementById("menuPlayBtn");
  let menuLightningBtn = document.getElementById("menuLightningBtn");

  //add event listeners to inject html
  //back button will take back to title page
  menuBackBtn.addEventListener("click", function(e) {
    //call function to inject html
    loadHTML("../injections/title.html");
  });

  //options button will take you to options page
  menuOptionsBtn.addEventListener("click", function(e) {
    //call function to inject html
    loadHTML("../injections/options.html");
  });

  //play button will take you to game page and start game
  menuPlayBtn.addEventListener("click", function(e) {
    //call function to inject html
    loadHTML("../injections/game.html");
  });

  //lightning round btn will take you to lightning page and start game
  menuLightningBtn.addEventListener("click", function(e) {
    //call function to inject html
    loadHTML("../injections/lightning.html");
  });
}

//--------------------Load Options-----------------------//
//injects options.html
function loadOptions(info) {
  //info is myArr from loadHTML
  inject.innerHTML = info;

  //grab easyBtn, mediumBtn, hardBtn
  let easyBtn = document.getElementById("easyBtn");
  let mediumBtn = document.getElementById("mediumBtn");
  let hardBtn = document.getElementById("hardBtn");

  //grab musicOnBtn, musicOffBtn
  let musicOnBtn = document.getElementById("musicOnBtn");
  let musicOffBtn = document.getElementById("musicOffBtn");

  //grab optionsBackBtn
  let optionsBackBtn = document.getElementById("optionsBackBtn");

  //add event listeners
  optionsBackBtn.addEventListener("click", function(e) {
    loadHTML("../injections/menu.html");
  });

  //musicOn click event
  musicOnBtn.addEventListener("click", function(e) {
    if (!sound) {
      audio.play();
      sound = true;
    } else {
      audio.pause();
      audio.currentTime = 0;
      sound = false;
    }
  });
  //musicOff click event
  musicOffBtn.addEventListener("click", function(e) {
    audio.pause();
    audio.currentTime = 0;
  });
}

//-----------------------Load Game-----------------------//
//injects game.html
function loadGame(info) {
  //info is myArr from loadHTML
  inject.innerHTML = info;

  //grab html elements
  let correct = document.getElementById("correct");
  let counter = document.getElementById("counter");
  let gameQuestion = document.getElementById("gameQuestion");

  //grab btn ids
  let aBtn = document.getElementById("aBtn");
  let bBtn = document.getElementById("bBtn");
  let cBtn = document.getElementById("cBtn");
  let dBtn = document.getElementById("dBtn");

  //comeback and erase playBtns
  let playBtns = document.getElementsByClassName("playBtns");

  //create for loop to cycle thru playBtns[i]
  for (let i = 0; i < playBtns.length; i++) {
    //add eventlisteners
    playBtns[i].addEventListener("click", function(e) {
      //call function
      if (qNum < totalQuestions) {
        console.log(qNum);
        checkAnswer(e.toElement.innerText);
      }
    });
  }
  //----------------------Load Question--------------------//
  //load question on game page
  function loadQuestion() {
    //load next question
    if (qNum < totalQuestions) {
      gameQuestion.innerText = tQuestions[qNum].q;
      aBtn.innerText = tQuestions[qNum].a;
      bBtn.innerText = tQuestions[qNum].b;
      cBtn.innerText = tQuestions[qNum].c;
      dBtn.innerText = tQuestions[qNum].d;
      console.log(tQuestions[qNum]);
      console.log(tQuestions[qNum].z);
    }
  }
  //-------------------------------------------------------//

  //call loadQuestion
  loadQuestion();
  interval = setInterval(updateTime, 1000);

  //------------------Check Answer--------------//
  function checkAnswer(answer) {
    //retrieve answer and check if correct
    if (answer === tQuestions[qNum].z) {
      totalScore++;
    } else {
      incorrect++;
    }

    correct.innerText = totalScore + "/" + totalQuestions;
    if (totalScore === totalQuestions) {
      clearInterval(interval);
      loadHTML("../injections/win.html");
    } else if (qNum === totalQuestions - 1) {
      clearInterval(interval);
      loadHTML("../injections/lose.html");
    } else {
      timer = 25;
      counter.innerText = timer;
      nextQuestion();
    }
  }

  //-----------------------------------//
  function nextQuestion() {
    //prep go to next question
    if (qNum < totalQuestions) {
      qNum++;
      loadQuestion();
    } else {
      //load end screen
      //clear interval
      clearInterval(interval);
      if (totalScore === totalQuestions) {
        loadHTML("../injections/win.html");
      } else {
        loadHTML("../injections/lose.html");
      }
    }
  }

  //SET TIMER
  function updateTime() {
    //make sure time isn't over and showing correct time
    timer--;
    if (timer < 0) {
      timer = 25;
      counter.innerText = timer;
      nextQuestion();
    } else {
      counter.innerText = timer;
    }
  }
}

//---------------------Load Lightning------------------------//
//injects lightning.html
function loadLightning(info) {
  //info is myArr from loadHTML
  inject.innerHTML = info;

  //grab the elements in lightning
  //q1-q10, light-form
  let lightForm = document.getElementById("lightForm");
  /*
  function lightningEnd() {
    clearTimeout(tictock);
    loadHTML("../injections/lose2.html");
  }*/
  let tictock = 10;
  let myTimer = document.getElementById("myTimer");
  myTimer.innerHTML = tictock;

  timeterval = setInterval(minusTicTock, 1000);

  function minusTicTock() {
    tictock--;
    myTimer.innerHTML = tictock;
    console.log(tictock);
    if (tictock <= 0) {
      clearInterval(timeterval);
      loadHTML("../injections/lose2.html");
    }
  }

  //sent to top for outside use
  //let lightArr = [];
  //let lightScore = 0;
  //let wrongArr = [];

  lightForm.addEventListener("submit", function(e) {
    e.preventDefault();
    //add q.values to array
    lightArr.push(lightForm.q1.value);
    lightArr.push(lightForm.q2.value);
    lightArr.push(lightForm.q3.value);
    lightArr.push(lightForm.q4.value);
    lightArr.push(lightForm.q5.value);
    lightArr.push(lightForm.q6.value);
    lightArr.push(lightForm.q7.value);
    lightArr.push(lightForm.q8.value);
    lightArr.push(lightForm.q9.value);
    lightArr.push(lightForm.q10.value);
    console.log(lightArr);
    //call compare function
    compareToArr();
    //call determine function
    determine();
  });

  function compareToArr() {
    let arr = [
      "big fat goalie",
      "dangerous liaisons",
      "weekend at bernie's",
      "ear",
      "eleven",
      "sandwiches",
      "nineteen",
      "maurice",
      "space cowboy",
      "statistical analysis and data reconfiguration"
    ];

    //cycle thru arr and light arr, compare, put wrong answers in wrong arr
    for (let i = 0; i < arr.length; i++) {
      if (lightArr[i] === arr[i]) {
        lightScore = lightScore + 1;
      } else {
        wrongArr.push(lightArr[i]);
      }
    }
    console.log(wrongArr);
  }

  function determine() {
    if (lightScore >= 9) {
      loadHTML("../injections/win2.html");
    } else {
      loadHTML("../injections/lose2.html");
    }
  }
}

//---------------------Load Win-----------------------------//

function loadWin(info) {
  //info is myArr from loadHTML
  inject.innerHTML = info;

  //grab winBtn and score
  //let winBtn = document.getElementById("winBtn");
  let score = document.getElementById("score");

  //display score
  score.innerHTML = totalScore + "/" + totalQuestions;

  //add event listener for winBtn
  /*winBtn.addEventListener("click", function(e) {
    //load html to inject menu.html
    loadHTML("../injections/menu.html");
  });
  */
}

//---------------------Load Lose----------------------------//

function loadLose(info) {
  //info is myArr from loadHTML
  inject.innerHTML = info;

  //grab loseBtn and score
  //let loseBtn = document.getElementById("loseBtn");
  let score = document.getElementById("score");

  //display score
  score.innerHTML = totalScore + "/" + totalQuestions;

  //add event listener for loseBtn
  /*loseBtn.addEventListener("click", function(e) {
    //load html to inject menu.html
    loadHTML("../injections/menu.html");
  });
  */
}

//--------------------Load Win/Lose for Lightning Round------//
function loadWin2(info) {
  inject.innerHTML = info;
  let score = document.getElementById("score");
  score.innerHTML = lightScore;
}

function loadLose2(info) {
  inject.innerHTML = info;
  let score = document.getElementById("score");
  let wrong = document.getElementById("wrong");
  wrong.innerHTML = wrongArr;
  score.innerHTML = lightScore + "/10";
}

//---------------------Load JSON----------------------------//
// loadsJSON
function loadJSON(url) {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      triviaQfull = JSON.parse(this.responseText).questions;
      shuffleQuestions();
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

//Call loadJSON
loadJSON(diff);

//-------------------Shuffle Questions---------------------//
function shuffleQuestions() {
  //q is triviaQfull from loadJSON
  let randNum = 0;
  //look at triviaQfull
  console.log(triviaQfull);

  for (let i = 0; i < totalQuestions; i++) {
    //create a variable to store random number in
    randNum = Math.floor(Math.random() * triviaQfull.length);

    //add from q.questions JSON array to tQuestions
    tQuestions.push(triviaQfull[randNum]);

    //remove item from q.questions
    triviaQfull.splice(randNum, 1);
  }
  //look at tQuestions
  console.log(tQuestions);
}
//gitHub
//reset game
//add difficulty
