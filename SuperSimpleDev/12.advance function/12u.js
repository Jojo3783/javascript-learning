      let score9 = JSON.parse(localStorage.getItem('score9')) || {
        win: 0,
        lost: 0,
        tie: 0
      };//score is a init object or localStorage object transfrom by parse(JSON to javascipt object)
      document.querySelector('.auto-play-button').addEventListener('click', function () {
          autoplay();
      });
      updateScoreElement();
      let isautoPlaying = false;
      let intervalId;
      function autoplay() {
        let buttonElement = document.querySelector('.auto-play-button');
        if(!isautoPlaying) {
          intervalId = setInterval( () => {
          PlayGame(pickComputerMove());
        }, 1000);
        buttonElement.innerText = 'Stop playing';
        isautoPlaying = true;

        }
        else {
          clearInterval(intervalId);
          buttonElement.innerText = 'Auto Play';
          isautoPlaying = false;
        }
      }
      document.querySelector('.js-rock-button').addEventListener('click', () => {
        PlayGame('Rock');
      });
       document.querySelector('.js-paper-button').addEventListener('click', () => {
        PlayGame('Paper');
      });
       document.querySelector('.js-scissor-button').addEventListener('click', () => {
        PlayGame('Scissor');
      });
      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r') {
          PlayGame('Rock');
        }
        else if(event.key === 'p') {
          PlayGame('Paper');
        }
        else if(event.key === 's') {
          PlayGame('Scissor');
        }
        else if(event.key === 'a') {
          autoplay();
        }
      });
      function PlayGame(playerMove) {
        const ComputerMove = pickComputerMove();      
        if(playerMove === 'Scissor') {
          if(ComputerMove === 'Rock') {
            result = 'You lost.';
          }
          else if(ComputerMove === 'Paper') {
            result = 'You win.';
          }
          else if(ComputerMove === 'Scissor') {
            result = 'Tie.';
          }
        }
        else if(playerMove === 'Paper') {
          if(ComputerMove === 'Rock') {
            result = 'You win.';
          }
          else if(ComputerMove === 'Paper') {
            result = 'Tie.';
          }
          else if(ComputerMove === 'Scissor') {
            result = 'You lost.';
          }
        }
        else if(playerMove === 'Rock') {
          if(ComputerMove === 'Rock') {
            result = 'Tie.';
          }
          else if(ComputerMove === 'Paper') {
            result = 'You lost.';
          }
          else if(ComputerMove === 'Scissor') {
            result = 'You win.';
          }
        }
        if (result === 'Tie.') {  
          score9.tie += 1;
        }
        else if (result === 'You lost.') {
          score9.lost += 1;
        } 
        else if (result === 'You win.') {
          score9.win += 1;
        }
        localStorage.setItem('score9', JSON.stringify(score9));//score is a object but JSON.setitem need to be a string so use JSON.stringify to convert a object to string
        updateScoreElement();
        document.querySelector('.js-move').innerHTML = `You 
        <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${ComputerMove}-emoji.png" class="move-icon"> Computer`;
        document.querySelector('.js-result').innerHTML = `${result}`;
        /*
        
        */
      }
      function updateScoreElement() {
        document.querySelector('.js-score9').innerHTML = `Wins: ${score9.win}, Losses: ${score9.lost}, Ties: ${score9.tie}`;
      }
      function pickComputerMove() {
        const computerChoice = Math.random();
        let computerMove = '';
        if(computerChoice >= 0 && computerChoice < 1/3) {
          computerMove = 'Rock';
        }
        else if(computerChoice >= 1/3 && computerChoice < 2/3) {
          computerMove = 'Paper';
        }
        else if(computerChoice >= 2/3 && computerChoice < 1) {
          computerMove = 'Scissor';
        }
        return computerMove;
      }
      pickComputerMove();
      let playerChoice = '';
      let result = '';