var order = [];
var seconds = 750;
var strict = false;

var sound1 = document.getElementById("sound1");
var sound2 = document.getElementById("sound2");
var sound3 = document.getElementById("sound3");
var sound4 = document.getElementById("sound4");
var wrongSound = document.getElementById("wrong");

var button = $("#red");
var change = false;

//array, first regular color 2nd brighten
var blueC = ["#00d", "#88f"];
var greenC = ["#3a3", "#9f9"];
var yellowC = ["#fd0", "#ffa"];
var redC = ["#d22", "#f99"];

function mouse(color, sound, name) {

  $('#' + name).mousedown(function() {
    if (change === true) {
      if (order[j] === name) {
        sound.currentTime = 0;
        sound.play();
        $(this).css({
          'background': color[1]
        })
        j++;

        if (j === order.length) {
          if (order.length === 20) {
            alert("You Beat The Game!!");
            begin();
          } else {
            turnAdd();
            turnPlay();
          }
        }
      } else {
        wrongSound.play();
        if (strict === false) {
          turnPlay();
        } else {
          begin();
        }
        //wrong. account for strict mode too
      }
    }
  }).mouseup(function() {
    $(this).css({
      'background': color[0]
    });
  }).mouseout(function() {
    $(this).css({
      'background': color[0]
    });
  });

}

mouse(blueC, sound1, "blue");
mouse(redC, sound2, "red");
mouse(yellowC, sound3, "yellow");
mouse(greenC, sound4, "green");

var curColor = redC;
var j = 0;

function touchMode() {
  pause = 0;
  change = true;
  $("#blue").css("cursor", "pointer");
  $("#red").css("cursor", "pointer");
  $("#yellow").css("cursor", "pointer");
  $("#green").css("cursor", "pointer");

  //need to delete click functions when done

}

i = 0;
var pause = 0;

function turnPlay() {

  var scoreText = order.length;

  if (order.length < 10) {
    //add 0
    scoreText = "0" + order.length;
  }

  $("#score").text(scoreText);

  change = false;

  $("#blue").css("cursor", "auto");
  $("#red").css("cursor", "auto");
  $("#yellow").css("cursor", "auto");
  $("#green").css("cursor", "auto");

  setTimeout(function() {
    pause = pause + 1;

    console.log(pause);
    if (pause > 1) {
      var sound;
      button.css("background", curColor[0]);
      //make a pause here

      if (i === Math.round(i)) {
        if (order[i] === "blue") {
          button = $("#blue");
          sound = sound1;
          curColor = blueC;
        } else if (order[i] === "red") {
          button = $("#red");
          sound = sound2;
          curColor = redC;
        } else if (order[i] === "yellow") {
          button = $("#yellow");
          sound = sound3;
          curColor = yellowC;
        } else {
          //green
          button = $("#green");
          sound = sound4;
          curColor = greenC;
        }
        button.css("background", curColor[1]);
        sound.play();
      }
      i = i + .5;
      if (i < order.length) {
        turnPlay();

      } else {
        i = 0;
        button.css("background", curColor[0]);
        j = 0;
        touchMode();

      }
    } else {
      turnPlay();
    }

  }, seconds)
}

function turnAdd() {
  seconds = seconds - 30;
  if (seconds < 350) {
    seconds = 350;
  }
  var num = Math.floor((Math.random() * 4) + 1);
  if (num == 1) {
    order.push("blue");
  } else if (num == 2) {
    order.push("red");
  } else if (num == 3) {
    order.push("yellow");
  } else {
    order.push("green");
  }

}

function begin() {
  order = [];
  seconds = 750;
  pause = 0;
  i = 0;
  j = 0;
  turnAdd();
  turnPlay();
}

function strictToggle() {
  if (strict === false) {
    strict = true;
    $("#strict").css({
      "background": "#fff",
      "box-shadow": "0px 0px 1px 2px #aaa"
    });
  } else {
    strict = false;
    $("#strict").css({
      "background": "#444",
      "box-shadow": "0px 0px 1px 2px #000"
    });
  }
}