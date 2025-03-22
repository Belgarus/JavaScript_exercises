function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  
  function getHumanChoice() {
    let humanInput = prompt("Rock, Paper or Scissors?");
    // Prüft ob humanInput einen gültigen Wert enthält.
    let humanChoice = humanInput.at(0).toUpperCase() + humanInput.slice(1).toLowerCase();
    return humanChoice;
  }
  
  let humanScore = 0;
  let computerScore = 0;
  let round = 0;
  let RoundCount = () => ++round

  function playGame() {
    RoundCount;

    // Inkrementfunktionen greifen direkt auf die globalen Variablen zu.
    let incHumanScore = () => ++humanScore;
    let incComputerScore = () => ++computerScore;
  
    // playRound 
    function playRound(humanChoice, computerChoice) {
      console.log("Human Choice: " + humanChoice);
      console.log("Computer Choice: " + computerChoice);
  
      if (humanChoice === "Rock" && computerChoice === "Scissors") {
        incHumanScore();
        return "You won! Rock crushes Scissors.";
      } else if (humanChoice === "Rock" && computerChoice === "Paper") {
        incComputerScore();
        return "You lost! Rocks get wrapped by Papers.";
      } else if (humanChoice === "Rock" && computerChoice === "Rock") {
        return "Patt, Rock and Rock!";
      } else if (humanChoice === "Paper" && computerChoice === "Rock") {
        incHumanScore();
        return "You won! Papers wrap Rocks.";
      } else if (humanChoice === "Paper" && computerChoice === "Paper") {
        return "Patt, Paper and Paper!";
      } else if (humanChoice === "Paper" && computerChoice === "Scissors") {
        incComputerScore();
        return "You lost! Paper gets cut by Scissors.";
      } else if (humanChoice === "Scissors" && computerChoice === "Rock") {
        incComputerScore();
        return "You lost! Scissors get crushed by Rocks.";
      } else if (humanChoice === "Scissors" && computerChoice === "Paper") {
        incHumanScore();
        return "You won! Scissors cut Paper.";
      } else if (humanChoice === "Scissors" && computerChoice === "Scissors") {
        return "Patt, Scissors and Scissors.";
      } else {
        return "invalid input";
      }
    }
  
    // Hole die Eingaben und starte die Runde.
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    console.log(playRound(humanChoice, computerChoice));
  
    // Ausgabe der aktuellen Scores.
    console.warn("Human Score: " + humanScore);
    console.warn("Computer Score: " + computerScore);
  }
  

  function gameLoop() {
    if (round < 5) {
      playGame();    
      round++;             
      setTimeout(gameLoop, 3000); // 3 Sekunden warten, bevor die nächste Runde gestartet wird
    }
  }
  
  gameLoop();