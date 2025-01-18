let ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
document.getElementById("txt").innerHTML = ABC
document.getElementById("txtlnght").innerHTML = ABC.length

let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) {
    alert( "That's correct!" );
    alert( "You're so smart!" );
  } else {
    alert("That's not correct :(");
}