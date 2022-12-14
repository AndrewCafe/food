//Initializing Global Variable Arrays
const foodArray = [];
const blankArray = [];
let errorCount = 0;

//Select container in main HTML file, where items will be appended.
const container = document.querySelector('#container');
//container.style = "width:800px;"


//Create button, text box elements, images, etc.
let machinePic = document.createElement('img')
machinePic.src = 'public/img/foods.PNG';
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
button3.setAttribute("id", "button3");
button4.setAttribute("id", "button4");
feedbackWindow.setAttribute("id", "feedbackWindow");
//feedbackWindow.setAttribute("cols", "44");

//Set Style
machinePic.style = "width: 250px;"
button1.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #808080;color: white;";
button2.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #808080;color: white;";
button3.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #4CAF50;color: white;";
button4.style = "text-align: center; font-size: larger; margin: 10px;cursor:pointer;background-color: #f44336;color: white;";
//feedbackWindow.style = "resize: none; font-size: large";
feedbackWindow.style = "width: 75%; height: 500px;  font-size: large";



//Set text
button1.innerHTML = 'Add Food';
button2.innerHTML = 'Delete Last Food';
button3.innerHTML = 'Select';
button4.innerHTML = 'Reset';

//Generate Class
container.classList.add('title');
container.classList.add('breaker1');
container.classList.add('breaker2');
container.classList.add('machinePic');
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
//container.appendChild(machinePic);

//Enter key even listener
//Reference: https://www.techiedelight.com/submit-form-with-enter-key-javascript/
document.getElementById('foodEntry').addEventListener('keyup', function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
           add();
        }
    });


//Button event listener, when button clicked, run add function
document.querySelector('#button1').addEventListener("click", function () {
    add();
});

document.querySelector('#button2').addEventListener("click", function () {
    remove();
});

document.querySelector('#button3').addEventListener("click", function () {
    select();

});

document.querySelector('#button4').addEventListener("click", function () {
    reset();
});

/*
Button Functions
*/

//Adding items

function add() {
    let userFood = document.getElementById('foodEntry').value;

    if (userFood == "") {
        document.getElementById('feedbackWindow').value = "Nothing entered!\rPlease enter something!\r\rCurrent List\r\r" + foodArray;
        errorCount++;
    }

    else {
        foodArray.push(userFood)
        document.getElementById('feedbackWindow').value = "Food Added!\r\rCurrent List\r\r" + foodArray;
        document.getElementById('foodEntry').value = "";
    }

    /*
if (errorCount >= 5){
    document.getElementById('feedbackWindow').value ="NOT ADDING FOOD????"
}
*/
}

//Removing last items
function remove() {
    if (foodArray.length == 0) {
        document.getElementById('feedbackWindow').value = "Nothing to remove!\r\rCurrent List\r\r" + "Nothing!";
        document.getElementById('foodEntry').value = "";
        return;
    }

    let removedFood = foodArray.pop();

    if (foodArray.length == 0) {
        document.getElementById('feedbackWindow').value = removedFood + " removed!\r\rCurrent List\r\r" + "Nothing!";
        
    }
    else {
        document.getElementById('feedbackWindow').value = removedFood + " removed!\r\rCurrent List\r\r" + foodArray;
    }
    document.getElementById('foodEntry').value = "";

}

function select() {
    if (foodArray.length == 0) {
        document.getElementById('feedbackWindow').value ="No options to select from!";
    }
    else{
let randMax = foodArray.length
let randomNumber = Math.floor(Math.random() * randMax)
//document.getElementById('feedbackWindow').value = "Random Max: " + randMax +" Random Number: "+ randomNumber;

document.getElementById('feedbackWindow').value = "You're going to eat: " + foodArray[randomNumber]+ "! \rA fine choice!";
}
}

function reset() {
    foodArray.length = 0;
    document.getElementById('feedbackWindow').value = "Reset Complete!\r\rCurrent List\r\rNothing!";
}





function doubleCheck(userFood) {
    let choice = userFood;
    let arrayCounter = foodArray.length;

    if (arrayCounter == zero) {
        choice = "false"
        return choice;
    }
}



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

