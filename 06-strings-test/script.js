//text length section
let ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
document.getElementById("txt").innerHTML = ABC
document.getElementById("txtlnght").innerHTML = ABC.length

//alert section
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) {
    alert( "That's correct!" );
    alert( "You're so smart!" );
  } else {
    alert("That's not correct :(");
}

//if/else color section
function pressed() {
    var text = document.getElementById("inp").value;

    if (text == "red") {
    document.getElementById("header").style.color = "red";
    } else {
        document.getElementById("header").style.color = "rgb(193, 193, 193)";
    }
}