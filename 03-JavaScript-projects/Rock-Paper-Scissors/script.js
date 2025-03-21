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

  console.log(computerScore(1))

  function playRound(humanChoice, computerChoice) {
    let humanChoice = humanChoice()
    let computerChoice = computerChoice()
  }

  
