var returnInfo = {};
var currentPosition = -1;

$(document).ready(function(){

    getData();
    makeButtons();

    autoForward();
    $(".button-holder").on("click", ".back", prevThetan);
    $(".button-holder").on("click", ".forward", nextThetan);
});

    function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            returnInfo = data;
            writeDom(returnInfo);
            nextThetan();
        }
    });
    }

    function writeDom(objectArray) {
        for(i=0; i < returnInfo.people.length; i++) {
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

        $(".button-holder").append("<button class='back'>prev</button>");
        $(".button-holder").append("<button class='forward'>next</button>");
    }

    function prevThetan() {
        $(".button-holder").on("click", ".back");
        if(currentPosition == 0) {
            $("#19").fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            currentPosition = 19;
        } else {
            $("#" + (currentPosition - 1)).fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            currentPosition --;
        }
    }

    function nextThetan() {
        $(".button-holder").on("click", ".forward");
        if(currentPosition == 19) {
            $("#0").fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            currentPosition = 0;
        } else {
            $("#" + (currentPosition + 1)).fadeIn(800);
            $("#" + currentPosition).fadeOut(400);
            currentPosition ++;
        }
        //clearInterval(nextThetan);
    }