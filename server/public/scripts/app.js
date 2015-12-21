// Store return data
var returnInfo = {};
// Position counter
var currentPosition = -1;

$(document).ready(function(){
    // Make call to server
    getData();
    // Start timer
    autoForward();
    //Button listeners
    $(".button-holder").on("click", ".back", prevThetan);
    $(".button-holder").on("click", ".forward", nextThetan);
});

    function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            // Save return
            returnInfo = data;
            makeButtons();
            // Push all info to DOM
            writeDom(returnInfo);
            // Set starting position to index 0
            nextThetan();
        }
    });
    }

    function writeDom(objectArray) {
        // Push data for each person to DOM in it's own DIV
        for(var i=0; i < returnInfo.people.length; i++) {
            $(".people-container").append("<div class='thetan' id='" + i + "'></div>");
            var $el = $(".people-container").children().last();
            $el.append("<h1>" + returnInfo.people[i].name + "</h1>").hide();
            $el.append("<h2>" + returnInfo.people[i].location + "</h2>");
            $el.append("<h3>" + returnInfo.people[i].animal + "</h3>");
        }
    }

    function autoForward() {
        // set to 10000 ms after testing for final 10 second delay
        setInterval(nextThetan, 10000);
    }

    function makeButtons(){

        // Create forward and back buttons
        $(".button-holder").append("<button class='back'>prev</button>");
        $(".button-holder").append("<button class='forward'>next</button>");
        // Create small index buttons for bottom equal to number of people
        for(var i=0; i < returnInfo.people.length; i++){
            $(".button-holder").append("<button class='tiny' id='tiny" + i + "'></button>");
        }
    }

    function prevThetan() {
        $(".button-holder").on("click", ".back");
        // Check for start  of list and wrap around to end if reached
        if(currentPosition == 0) {
            $("#19").fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            //Adjust small index button highlight
            $(".button-holder").find('#tiny' + 19).addClass("highlighted");
            $(".button-holder").find('#tiny' + currentPosition).removeClass("highlighted");
            currentPosition = 19;
        // Back one position
        } else {
            $("#" + (currentPosition - 1)).fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            currentPosition --;
            //Adjust small index button highlight
            $(".button-holder").find('#tiny' + currentPosition).addClass("highlighted");
            $(".button-holder").find('#tiny' + (currentPosition + 1)).removeClass("highlighted");

        }
    }

    function nextThetan() {
        $(".button-holder").on("click", ".forward");
        // Check for end of list and wrap around back to start
        if(currentPosition == returnInfo.people.length - 1) {
            $("#0").fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            //Adjust small index button highlight
            $(".button-holder").find('#tiny' + 0).addClass("highlighted");
            $(".button-holder").find('#tiny' + currentPosition).removeClass("highlighted");
            currentPosition = 0;
            // Forward one position
        } else {
            $("#" + (currentPosition + 1)).fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            currentPosition ++;
            //Adjust small index button highlight
            $(".button-holder").find('#tiny' + currentPosition).addClass("highlighted");
            $(".button-holder").find('#tiny' + (currentPosition - 1)).removeClass("highlighted");
        }
        //clearInterval(autoForward); not resetting timer
    }