//Select container in main HTML file, where items will be appended.
const container = document.querySelector('#container');
//container.style = "width:800px;"


//Create button, text box elements, images, etc.
let foodPic = document.createElement('img')
foodPic.src ='public/img/foods.PNG';
let startDiv = document.createElement('div');
let feedbackWindow = document.createElement("textarea");

const button1 = document.createElement('button');
const button2 = document.createElement('button');
const button3 = document.createElement('button');
const button4 = document.createElement('button');
const breaker1 = document.createElement('br');
const breaker2 = document.createElement('br');

//Set Attributes
button1.setAttribute("id", "button1");
button2.setAttribute("id", "button2");
feedbackWindow.setAttribute("id", "feedbackWindow");
feedbackWindow.setAttribute("cols", "44");

//Set Style
foodPic.style = "width: 250px;"
button1.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #808080;color: white;";
button2.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #808080;color: white;";
button3.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #4CAF50;color: white;";
button4.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #f44336;color: white;";
//feedbackWindow.style = "resize: none; font-size: large";
feedbackWindow.style = "width: 75%; font-size: large";


//Set text
button1.innerHTML = 'Add Food';
button2.innerHTML = 'Delete Food';
button3.innerHTML = 'Make Selection';
button4.innerHTML = 'Reset';

//Generate Class
container.classList.add('title');
container.classList.add('breaker1');
container.classList.add('breaker2');
container.classList.add('foodPic');
container.classList.add('feedbackWindow');
container.classList.add('img');
container.classList.add('button1');
container.classList.add('button2');
container.classList.add('button3');
container.classList.add('button4');

//Append to container
container.appendChild(button1);
container.appendChild(button2);
container.appendChild(button3);
container.appendChild(button4);
container.appendChild(breaker2);
container.appendChild(feedbackWindow);
container.appendChild(breaker1);
container.appendChild(foodPic);

//Button event listener, when button clicked, run add function
document.querySelector('#button1').addEventListener("click", function () {
    add();
});

document.querySelector('#button2').addEventListener("click", function () {
    document.getElementById('foodEntry').value = "";
    document.getElementById('eTime').value = "";
    document.getElementById('feedbackWindow').value = "Reset Complete!";
});

document.querySelector('#button3').addEventListener("click", function () {
    //document.getElementById('foodEntry').value = "";
    //document.getElementById('eTime').value = "";
    //document.getElementById('feedbackWindow').value = "Reset Complete!";
});

document.querySelector('#button4').addEventListener("click", function () {
    //document.getElementById('foodEntry').value = "";
    //document.getElementById('eTime').value = "";
    //document.getElementById('feedbackWindow').value = "Reset Complete!";
});


document.getElementById('feedbackWindow').value = "Minimum Requirement: Select Stop Time";

/*
Bread Logic
-Takes user input of start and end time. 
-Uses the difference between start and end time to determine timer length
*/


function add() {
    //Get current date/time from system, ie: default start time
    let start = new Date();
    start.setSeconds(0); //set seconds to 0 for simplicity sake
    let end = new Date(start.getTime());  //"end" copies time format 

    console.log("startTime: " + start);

    //Collects user start and/or end time info
    let startInfo = document.getElementById('foodEntry').value
    let endInfo = document.getElementById('eTime').value

    //Initializing arrays to hold user data
    let startArray = [];
    let endArray = [];

    //If no start date, use current system time for time adjustment and display
    if (startInfo === "") {
        let defaultHour = start.getHours().toString();
        let defaultMinute = start.getMinutes().toString();


        //Adds leading zero for formatting
        if (defaultHour.length == 1) {
            defaultHour = '0' + defaultHour;
        }

        if (defaultMinute.length == 1) {
            defaultMinute = '0' + defaultMinute;
        }

        let defaultTime = defaultHour + ":" + defaultMinute;
        document.getElementById('foodEntry').value = defaultTime;
        startArray.push(start.getHours());
        startArray.push(start.getMinutes());
    }

    //With given times, send string info to timeSplitterStart/End for processing
    else {
        startArray = timeSplitters(startInfo);
        start.setHours(startArray[0]);
        start.setMinutes(startArray[1]);
        console.log("updated start: " + start);
    }
    endArray = timeSplitters(endInfo);

    //Hours of start/end time, processed in timeAdjustment function
    let timeAdjust = timeAdjustment(startArray[0], endArray[0]);

    //Calculate Timer
    let workTimeM = 30; //Time left on timer when dough is complete

    //Sets end time into date object for "end"
    end.setHours(endArray[0]);
    end.setMinutes(endArray[1]);

    //Applies date adjustment of 0 or 1 (ie: 11PM to 1AM);
    end.setDate(end.getDate() + timeAdjust);

    //Finds difference of start/end in milliseconds
    let msTime = end - start;
    console.log('Time difference between date: ' + msTime);

    //Converts time difference into seconds
    let actualSeconds = msTime / 1000;

    //Finding actual time difference in minutes and hours
    let actualMinutes = (actualSeconds / 60);
    let actualHours = (actualMinutes / 60); //Used when printing results

    //Generates modified time that factors in 30 minutes of Timer (workTimeM)
    let modMinutes = actualMinutes + workTimeM;

    //Uses modified time to find timerHours and timerMinutes
    let timerHours = parseInt(modMinutes / 60); //Parse int to eliminate decimals
    let timerMinutes = modMinutes % 60; //Get minutes instead of decimals

    //Testing
    console.log('actual hours: ' + actualHours);

    //Series of if, else if to determine result
    let result = " ";
    //If actual hours is < 1 and > 0, not enough time
    if ((actualHours < 1 && (actualHours > 0))) {
        result = 'Not enough time to make dough!'
    }

    //If actual hours is negative, not possible
    else if (actualHours < 1 && actualHours != 0) {
        result = 'Cannot go back in time!'
    }

    else if (actualHours == 0) {
        result = 'Cannot be the same time!'
    }

    //Return message if time exceeds timer setting
    else if ((timerHours >= 13 && timerMinutes >=1)) {
        result = 'Exceeds max timer setting!'
    }

    //Return if no end time is entered
    else if (isNaN(actualHours)) {
        result = 'Must enter a stop time!'
    }

    //If timer is less than 1.5 hours but more than 1 hour, set timer for 1 hour 30 (the minimum clock)
    else if (timerHours == 1 && timerMinutes < 30) {
        result = 'Set Timer For: ' + timerHours + ' Hour' + ' and 30 Minutes'
        console.log(result);
    }

    //Otherwise, show modified timer that factors in the 30 minutes of the minimum clock
    else {
        result = 'Set Timer For: ' + timerHours + ' Hours' + ' and ' + timerMinutes + ' Minutes'
        console.log(result);
    }

    //Display result in text box
    document.getElementById('feedbackWindow').value = result;

}
//Helper Functions

//Function that determines if date of end time must be advanced one day
function timeAdjustment(startHour, endHour) {
    let adjustment = 0;
    let foodEntry = startHour;
    let eTime = endHour;

    if (foodEntry <= eTime) {
        return adjustment;
    }
    else {
        adjustment += 1;
    }
    return adjustment;
}

//Splits the time string into numbers that are returned in the array
function timeSplitters(timeString) {
    let string = timeString;
    let returnArray = [];
    let startLength = timeString.length;
    let hourString = "";
    let minuteString = "";
    for (i = 0; i < startLength; i++) {
        if (string.charAt(i) !== ":") {
            hourString += string.charAt(i)
        }
        else {
            i++;
            break;
        }
    }
    for (i; i < startLength; i++) {
        minuteString += string.charAt(i);
    }
    let h = parseInt(hourString);
    let m = parseInt(minuteString);
    returnArray.push(h, m);
    return returnArray;
}

