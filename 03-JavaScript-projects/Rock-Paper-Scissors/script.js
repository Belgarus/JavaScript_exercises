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

