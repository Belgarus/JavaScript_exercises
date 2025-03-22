function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

function getHumanChoice() {
    let HumanInput = prompt("Rock, Paper or Scissors?");
    let HumanChoice = HumanInput.at(0).toUpperCase() + HumanInput.slice(1).toLowerCase();
    return HumanChoice;
  }

  let humanScore = 0;
  let computerScore = 0;

  function playGame() {

let incHumanScore = (humanScore) => humanScore + 1;
console.log(incHumanScore(humanScore))
function playRound(humanChoice, computerChoice) {

    console.log("Human Choice:" + " " + humanChoice);
    console.log("Computer Choice:" + " " + computerChoice);

    if (humanChoice === "Rock" && computerChoice === "Scissors"){
        return "You won! Rock crushes Scissors."; 
    } else if (humanChoice === "Rock" && computerChoice === "Paper") {
        return "You lost! Rocks get wrapped by Papers."
    } else if (humanChoice === "Rock" && computerChoice === "Rock") {
        return "Patt, Rock and Rock!" //HumanChoice = Rock
    } else if (humanChoice === "Paper" && computerChoice === "Rock") {
        return "You won! Papers wrap Rocks." 
    } else if (humanChoice === "Paper" && computerChoice === "Paper") {
        return "Patt, Paper and Paper!"
    } else if (humanChoice === "Paper" && computerChoice === "Scissors") {
        return "You lost! Paper gets cut by Scissors." //HumanChoice = Paper
    } else if (humanChoice === "Scissors" && computerChoice === "Rock") {
        return "You lost! Scissors get crushed by Rocks."
    } else if (humanChoice === "Scissors" && computerChoice === "Paper") {
        return "You won! Scissorss cut Paper." 
    } else if (humanChoice === "Scissors" && computerChoice === "Scissors") {
        return "Patt, Scissors and Scissors." //HumanChoice = Scissors
    } else {
        return "invalid input"
    }
    
  }
  }

  
  console.log(playRound(getHumanChoice(), getComputerChoice()))
  


  
