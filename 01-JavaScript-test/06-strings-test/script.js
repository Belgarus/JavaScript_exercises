//text length section
let ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
document.getElementById("txt").innerHTML = ABC
document.getElementById("txtlnght").innerHTML = ABC.length

//alert section
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');
let numericYear = Number(year);

if (isNaN(numericYear)) {
  alert('Please enter a valid number.');
} else if (numericYear < 2015) {
  alert('Too early...');
} else if (numericYear > 2015) {
  alert('Too late');
} else if (numericYear === 2015) {
  alert('Exactly!');
}

//if/else color section
function pressed() {
    var text = document.getElementById("inp").value;

    if (text === "red") {
        document.getElementById("header").style.color = "red";
    } else if (text === "yellow"){
        document.getElementById("header").style.color = "yellow";
    }  else if (text === "blue"){
        document.getElementById("header").style.color = "blue";
    }else if (text === "green"){
        document.getElementById("header").style.color = "green";
    }else if (text === "orange"){
        document.getElementById("header").style.color = "orange";
    }else if (text === "brown"){
        document.getElementById("header").style.color = "brown";
    }else if (text === "pink"){
        document.getElementById("header").style.color = "pink";
    }else if (text === "purple"){
        document.getElementById("header").style.color = "purple";
    }else if (text === "black"){
        document.getElementById("header").style.color = "black";
    }else if (text === "white"){
        document.getElementById("header").style.color = "white";
    }else{
        document.getElementById("header").style.color = "rgb(193, 193, 193)";
    }
}

//acces controll
let accessAllowed = age > 18;

if (age < 3) {
    message = 'Hi, baby!';
  } else if (age < 18) {
    message = 'Hello!';
  } else if (age < 100) {
    message = 'Greetings!';
  } else {
    message = 'What an unusual age!';
  }