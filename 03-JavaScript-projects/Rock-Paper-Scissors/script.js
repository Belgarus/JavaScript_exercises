function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function getHumanChoice() {
    let HumanChoice = prompt("Rock, Paper or Scissor?")
    return HumanChoice
  }

  //console.log("Human Choice:" + " " + getHumanChoice())

  function humanScore(Int) {
        let hS = 0 + Int
  }

  function computerScore(Int) {
        let cS = 0 + Int
        return cS
  }

function playRound(humanChoice, computerChoice) {

    console.log("Human Choice:" + " " + humanChoice)
    console.log("Computer Choice:" + " " + computerChoice)
    
    if (humanChoice === "Rock" && computerChoice === "Scissors"){
        return "You won! Rock defeats Scissors."
    } else {
        return "invalid input"
    }
  }

  console.log(playRound(getHumanChoice(), getComputerChoice()))
  


  
