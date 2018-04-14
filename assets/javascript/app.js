var questions = ["When Steve Zissou gives a tour of his boat in Life Aquatic, what song is playing?", "Where is the one place the actors in Fantastic Mr. Fox did NOT record any of their dialogue?", "What type of fish was cut out of The Life Aquatic for being 'too ridiculous?'", "The name of Bill Murray's character M. Ivan in The Grand Budapest Hotel can be read as what?", "What book is Ms. Cross reading when she first meets Max in Rushmore", "Under what name does Margot Tenenbaum keep a secret studio?"];
var choices = [["The theme for the Royal Tenenbaums played backwards", "Seu Jorge's cover of Ziggy Stardust", "Instrumental version of Hey Jude", "The original film score"], ["A treehouse", "A forest", "An attic", "A farm"], ["An eel patterned off a Hermes scarf called the Hermes Eel", "The Crayon Pony Fish", "The Hydronicus Inverticus -  a fish that could turn itself inside out", "The Rhinestone Bluefin"], ["It's just M. Ivan", "M. Ivan or mi van is Hungarian for whats up?", "A reference to the Hungarian writer Mandy Ivan, who Anderson is a fan of"], ["James and the Giant Peach", "Diving for Sunken Treasure", "Kidnapped", "Twenty Thousand Leagues under the Sea"], ["A friend of François Truffaut, Helen Scott", "Richie St. Clair", "Her lover, Eli Cash", "Royals mothers name, Helen Tenenbaum"]];
var answers = ["The theme for the Royal Tenenbaums played backwards", "A treehouse", "The Hydronicus Inverticus -  a fish that could turn itself inside out", "M. Ivan or mi van is Hungarian for whats up?", "Twenty Thousand Leagues under the Sea", "A friend of François Truffaut, Helen Scott"];
var clockRunning = false;
var countRunning = false;
var intervalId;
var questionNum = 0;
var right = 0;
var wrong = 0;
var choice;

window.onload = function () {
    $("#timer").html("Time Left: " + clock.time);
    clock.start();
};

var clock = {

    time: 100,

    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(clock.count, 1000);
            clockRunning = true;
        }
    },

    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function () {
        clock.time--;
        $("#timer").html("Time Left: " + clock.time);
    },

    timeUp: function () {
        gameOver();
    },

};

function setSlide() {
    $("#question").html(questions[questionNum]);
    $("#choices").empty();
    for (var i = 0; i < choices[questionNum].length; i++) {
        $("#choices").append("<input type='radio' name='choice' class='choice' id='" + choices[questionNum][i] + "' />" + choices[questionNum][i] + "<br>");
    }
}
setSlide();

$(document).on('click', '.choice', checkAnswer);

function checkAnswer() {

    var choice = $(this).attr("id");
    if (questionNum <= questions.length){
        if (choice === answers[questionNum]) {
            right++;
            $("#question").html("Correct!");
            $("#choices").html("<img src='assets/images/wes-win.gif' alt='win gif' />");
        }
        else {
            wrong++;
            $("#question").html("WRONG!");
            $("#choices").html("<img src='assets/images/wes-wrong.gif' alt='wrong gif' /> <br> <h4>The correct answer is: " + answers[questionNum]);
        }
        questionNum++;
        setTimeout(setSlide, 3000);
        checkTime();
    }
}

function gameOver() {
    clock.stop();
    $("#choices").empty();
    if (right >= wrong) {
        $("#question").html("Great Job! <br> <img src='assets/images/wes-a.gif' />");
        $("#choices").html("Right: " + right + "<br>Wrong: " + wrong);
        $("#choices").append("<br> <button> Play again?");
    }
    else {
        $("#question").html("Really?<br> <img src='assets/images/wes-nope.gif' />");
        $("#choices").html("Right: " + right + "<br>Wrong: " + wrong);
        $("#choices").append("<br> <button> Play again?");
    }
}

function checkTime() {
    if (clock.time === 0) {
        clock.stop();
        clock.timeUp();
        gameOver();
    }
}

function reset() {
    questionNum = 0;
}
