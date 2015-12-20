

var returnInfo = {};
var currentPosition = -1;
function autoForward(){
    // set to 10000 ms after testing for final 10 second delay
    setInterval(nextThetan, 10000);
}


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
            $el.append("<p>" + returnInfo.people[i].name + "</p>").hide();
            $el.append("<p>" + returnInfo.people[i].location + "</p>");
            $el.append("<p>" + returnInfo.people[i].animal + "</p>");

        }
}

    function makeButtons(){

        $(".button-holder").append("<button class='back'>prev</button>");
        $(".button-holder").append("<button class='forward'>next</button>");

    }

    function prevThetan() {
        $(".button-holder").on("click", ".back").hide().fadeIn(700);
        if(currentPosition == 0) {
            $("#19").fadeIn(500);
            $("#" + currentPosition).hide();
            currentPosition = 19;
            console.log("ZERO!");
        } else {
            $("#" + (currentPosition - 1)).fadeIn(500);
            $("#" + currentPosition).hide();
            currentPosition --;
        }
        //$("#" + (currentPosition -1)).fadeIn(500);
        //$("#" + currentPosition).hide();
        //currentPosition --;
        //if(currentPosition <= 0) {
        //    currentPosition = (returnInfo.people.length - 1);
        //}
        console.log("prev working");
    }

    function nextThetan() {
        $(".button-holder").on("click", ".forward").hide().fadeIn(700);
        if(currentPosition == 19) {
            $("#0").fadeIn(500);
            $("#" + currentPosition).hide();
            currentPosition = 0;
            console.log("NINETEEN!");
        } else {
            $("#" + (currentPosition + 1)).fadeIn(500);
            $("#" + currentPosition).hide();
            currentPosition ++;
        }
        console.log(currentPosition);
    }