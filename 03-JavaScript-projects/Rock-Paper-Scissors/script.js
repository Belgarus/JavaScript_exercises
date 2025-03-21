function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function getHumanChoice() {
    let HumanChoice = prompt("Rock, Paper or Scissor?")
    return HumanChoice
  }

  console.log(getHumanChoice())

  function humanScore(Int) {
        let hS = 0 + Int
  }

  function computerScore(Int) {
        let cS = 0 + Int
        return cS
  }

const humanChoice = getHumanChoice()
const computerChoice = getComputerChoice()

  function playRound(humanChoice, computerChoice) {

    const rock = "rock".ignoreCase;
    const paper = "paper".ignoreCase;
    const scissors = "scissors".ignoreCase;

    if (humanChoice === rock && computerChoice === scissors){
        console.log("You won! Rock defeats Scissors.")
    }
  }



  
