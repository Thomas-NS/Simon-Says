  const circle1 = document.getElementById("circle1");
  const circle2 = document.getElementById("circle2");
  const circle3 = document.getElementById("circle3");
  const circle4 = document.getElementById("circle4");
  const start = document.getElementById("start");
  const status = document.getElementById("status")
  let correct = true;
  let gameOn = false;
  let score = 0;
  let hiScore = 0;
  let round = 0;
  let signals = [];
  let sequence = [];
  let n = 0;
  document.getElementById("score").innerHTML = score;
  document.getElementById("bestScore").innerHTML = hiScore;

  //game starts 3 seconds after the start button is clicked
  start.addEventListener("click", startGame);
  function startGame(){
    if(!gameOn){
      gameOn = true;
      start.style.backgroundColor = "#b0b4b8";
      status.style.backgroundColor = "green";
      setTimeout(game,3000);
    }
  }

  function game(){
    if(gameOn){
      //set element values/colours
      round++;
      score = round-1;
      document.getElementById("score").innerHTML = score;
      start.style.backgroundColor = "#b0b4b8";
      status.style.backgroundColor = "green";

      //simons turn
      sequence = generateSequence(round);
      n = 0;
      simonSays();
    }
  }

  //generate simons sequence
  function generateSequence(n){
    signals[round-1] = Math.floor(Math.random()*4)+1;
    return signals;
  }

  //display simons sequence
  function simonSays(){
    let int = setInterval(() =>{
      //if all signals have been displayed, stop and take user input
        if(n === round-1){
          input(round);
          clearInterval(int);
        }
        else if(n === 3){
          speedUp5();
          clearInterval(int);
        }
        flash(sequence[n]);
        n++;
      },1000);
  }
  //speed up after 5th signal
  function speedUp5(){
    let int = setInterval(() =>{
        if(n === round-1){
          input(round);
          clearInterval(int);
        }
        else if(n === 7){
          speedUp9();
          clearInterval(int);
        }
        flash(sequence[n]);
        n++;
      },800);
  }
  //speed up after 9th signal
  function speedUp9(){
    let int = setInterval(() =>{
        if(n === round-1){
          input(round);
          clearInterval(int);
        }
        else if(n === 11){
          speedUp13();
          clearInterval(int);
        }
        flash(sequence[n]);
        n++;
      },700);
  }
  //speed up after 13th signal
  function speedUp13(){
    let int = setInterval(() =>{
        if(n === round-1){
          input(round);
          clearInterval(int);
        }
        flash(sequence[n]);
        n++;
      },600);
  }

  //flash circle which corresponds to given number (1-4)
  function flash(signal){
    if(signal === 1){
      circle1.style.backgroundColor = "#c5d49d";
      setTimeout(() =>{
        circle1.style.backgroundColor = "#97CC04";
      }, 500);
    }
    else if(signal === 2){
      circle2.style.backgroundColor = "#c99397";
      setTimeout(() =>{
        circle2.style.backgroundColor = "#DA2C38";
      }, 500);
    }
    else if(signal === 3){
      circle3.style.backgroundColor = "#cfc091";
      setTimeout(() =>{
        circle3.style.backgroundColor = "#EEB902";
      }, 500);
    }
    else{
      circle4.style.backgroundColor = "#afc4db";
      setTimeout(() =>{
        circle4.style.backgroundColor = "#2D7DD2";
      }, 500);
    }
  }

  //take in user input
  function input(){
    circle1.style.cursor = "pointer";
    circle2.style.cursor = "pointer"
    circle3.style.cursor = "pointer";
    circle4.style.cursor = "pointer";

    circle1.addEventListener("click", inputC1);
    circle2.addEventListener("click", inputC2);
    circle3.addEventListener("click", inputC3);
    circle4.addEventListener("click", inputC4);

    //end game if user takes longer than 5 seconds
    let i = round;
    let timer = setTimeout(() =>{
      //if round is already over, cancel the timer
      if(i < round || gameOn === false){
        clearTimeout(timer);
      }
      else{
        endGame();
      }
    },5000);
  }

  let n1 = 0;
  //functions for each circle which display and check user input
  function inputC1(){
    flash(1);
    correct = isCorrect(1);
    n1++;

    //end game if any input is incorrect
    if(!correct){
      n1 = 0;
      removeInput();
      endGame();
    }
    //proceed to simons next sequence if all input was correct
    else if(correct && n1 === round){
      n1 = 0;
      removeInput();
      game();
    }
    //keep taking input
    else{
      input();
    }
  }
  function inputC2(){
    flash(2);
    correct = isCorrect(2);
    n1++;

    if(!correct){
      n1 = 0;
      removeInput();
      endGame();
    }
    else if(correct && n1 === round){
      n1 = 0;
      removeInput();
      game();
    }
    else{
      input();
    }
  }
  function inputC3(){
    flash(3);
    correct = isCorrect(3);
    n1++;

    if(!correct){
      n1 = 0;
      removeInput();
      endGame();
    }
    else if(correct && n1 === round){
      n1 = 0;
      removeInput();
      game();
    }
    else{
      input();
    }
  }
  function inputC4(){
    flash(4);
    correct = isCorrect(4);
    n1++;

    if(!correct){
      n1 = 0;
      removeInput();
      endGame();
    }
    else if(correct && n1 === round){
      n1 = 0;
      removeInput();
      game();
    }
    else{
      input();
    }
  }

  //check user input against simons sequence
  function isCorrect(signal){
    if(signal != sequence[n1]){
      return false;
    }
    return true;
  }

  //stop taking in user input
  function removeInput(){
    circle1.style.cursor = "default";
    circle2.style.cursor = "default";
    circle3.style.cursor = "default";
    circle4.style.cursor = "default";

    circle1.removeEventListener("click", inputC1);
    circle2.removeEventListener("click", inputC2);
    circle3.removeEventListener("click", inputC3);
    circle4.removeEventListener("click", inputC4);
  }

  //end the game
  function endGame(){
    //flash circles 5 times
    let n = 0;
    let int = setInterval(() =>{
      if(n === 5){
        clearInterval(int);
      }
      circle1.style.backgroundColor = "#c5d49d";
      circle2.style.backgroundColor = "#c99397";
      circle3.style.backgroundColor = "#cfc091";
      circle4.style.backgroundColor = "#afc4db";
      setTimeout(() =>{
        circle1.style.backgroundColor = "#97CC04";
        circle2.style.backgroundColor = "#DA2C38";
        circle3.style.backgroundColor = "#EEB902";
        circle4.style.backgroundColor = "#2D7DD2";
      }, 750);
      n++;
    },600);

    //set variable values
    gameOn = false;
    correct = true;
    round = 0;
    signals = [];
    sequence = [];
    if(score > hiScore){
      hiScore = score;
      }
    score = 0;

    //reset element colours
    document.getElementById("score").innerHTML = score;
    document.getElementById("bestScore").innerHTML = hiScore;
    start.style.backgroundColor = "#909396";
    status.style.backgroundColor = "red";
  }
