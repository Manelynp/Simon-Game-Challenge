//Step 0 - Download the Starting Files
//Step 1 - Add Javascript and jQuery
//Step 2.3 - create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];
//Step 2.5 - At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];
//Step  4.3 - At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];
//Step 7.1_1 - You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//Step 7.2 - Create a new variable called level and start at level 0.
var level = 0;
//Step 7.1 - Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    //Step 7.3 - The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//Step 4.1 -  Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
//Step 4.2 - Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
//Step 4.4 - Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
//Step 5.1 - In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Step 8.2 - Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});
//Step 8.1 - Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
    //Step 8.3 - Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      //Step 8.3 - console.log("success");
      //Step 8.4 - If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //Step 8.5 - Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      //Step 8.3 - console.log("wrong");
      //Step 9.1 -  In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");
      //Step 9.2 -  In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      //Step 9.3 - Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      //Step 10.2 - Call startOver() if the user gets the sequence wrong.
      startOver();
    }
}

//Step 2.1 - create a new function called nextSequence()
function nextSequence() {
  //Step 8.6 - Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //Step 7.4 - Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  //Step 7.5 -  Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  //Step 2.2 - generate a new random number between 0 and 3, and store it in a variable called randomNumber.
  var randomNumber = Math.floor(Math.random() * 4);
  //Step 2.4  - Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];
  //Step 2.6 - Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);
  //Step 3.1 - Use jQuery to select the button with the same id as the randomChosenColour
  //Step 3.2 - Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Step 5.4 - Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}
//Step 6.1 -  Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {
  //Step 6.2 - Take a look inside the styles.css file, you can see there is a class called "pressed", it will add a box shadow and changes the background colour to grey.
  //Step 6.3 - Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");
  //Step 6.4 - use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//Step 5.2 - Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  //Step 5.3 - Take the code we used to play sound in the nextSequence() function and move it to playSound().
  //Step 3.3 - Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//Step 10.1 - Create a new function called startOver().
function startOver() {
  //Step 10.3 - Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
