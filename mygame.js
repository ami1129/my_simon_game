
var buttonColours = ["red","blue","green","yellow"];    //At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var gamePattern =[];                                   // create a new empty array called gamePattern.
var userClickedPattern =[];


var started =false;                                  //need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var level =0;                                        //starting with level 0

$(document).keypress(function(){                       // Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
    if(!started){
        $("#level-title").text("Level "+level);        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){     //using jquery detect if any button is clicked and trigger a handler function
    var userChosenColours = $(this).attr("id");  //userChosenColours to store id of clicked button
    userClickedPattern.push(userChosenColours);  //adding user chosen colors to user clicked pattern array
    //console.log(userClickedPattern);
    playSound(userChosenColours);                // when a user clicks on a button, the corresponding sound should be played.
    animatePress(userChosenColours);
    checkAnswer(userClickedPattern.length-1);    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});


function checkAnswer(currentLevel){               //new function to check current levels of user and game pattern
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){  //if user and game pattern same --success
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){  //if most recent answer is correct  ,checking if they have finished their sequence
            setTimeout (function(){
                nextSequence();
            },1000);                                   //call nextsequence after 1000ms
        }
    }else{
        console.log("wrong");
        playSound("wrong");                               //patterns doesnt match play wrong sound
        $("body").addClass("game-over");                 //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
       
        $("#level-title").text("Game Over, Press Any Key to Restart");  //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong
       
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

      
       // $("#level-title").text("Refresh the page");
       //setTimeout(200);
          startOver();
    }

}



function nextSequence(){  
     userClickedPattern =[];
 
    level++;                                           //increase the level by 1 every time nextSequence() is called.
    $("#level-title").text("Level "+level);             //Inside nextSequence(), update the h1 with this change in the value of leve               
    var randomNumber = Math.floor(Math.random()*4);     ////generate random numbers for random indexex to choose random colors from buttonColours
    var randomChoosenColours = buttonColours[randomNumber]; // use the randomNumber from step 2 to select a random colour from the buttonColours array.
    gamePattern.push(randomChoosenColours);                 //add in the end of gamePAttern random colors
    $("#"+randomChoosenColours).fadeIn(100).fadeOut(100).fadeIn(100); //using jQuery selected the button with same id as randomChoosenColurs and animate flash to buttons
    playSound(randomChoosenColours);                     //Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
}

function animatePress(currentColour){             // new function called animatePress(), it should take a single input parameter called currentColour.
    $("#" + currentColour).addClass("pressed");   //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");  ///use Javascript to remove the pressed class after a 100 milliseconds.
    },100);

}



function playSound(name){                                //Create a new function called playSound() that takes a single input parameter called name.
    var audio = new Audio ("sounds/"+name+".mp3");  //adding  sounds to any colours whn flashes
    audio.play();
}



function startOver(){
    level =0;
    gamePattern = [];
    started =false;

}


setInterval(nextSequence,2000);