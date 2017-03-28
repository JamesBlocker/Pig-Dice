var player1 = new Player("player1", true, 0, 1);
var player2 = new Player("player2", false, 0, 1);

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function currentTurn() {
  if (player1.activeTurn === true) {
    return "Player 1";
  } else {
    return "Player 2";
  }
}

function Player(playerName, activeTurn, score, currentRoll) {
  this.playerName = playerName;
  this.activeTurn = activeTurn;
  this.score = score;
  this.currentRoll = currentRoll;
  this.turnScore = 0;
}

Player.prototype.roll = function() {
  if (this.activeTurn === true) {
    var roll = getRandomArbitrary(1, 7);
    if (roll > 1) {
      this.currentRoll = roll;
      this.turnScore += this.currentRoll;
      console.log(this);
      return "success";
    } else if (roll === 1) {
      this.currentRoll = roll;
      this.turnScore = 0;
      endTurn();
      console.log(this);
    }
  }
}

function endTurn() {
  console.log('end');
  player1.score += player1.turnScore;
  player1.turnScore = 0;
  player2.score += player2.turnScore;
  player2.turnScore = 0;
  if (player1.activeTurn === true) {
    player1.activeTurn = false;
  } else {
    player1.activeTurn = true;
  }

  if (player2.activeTurn === true) {
    player2.activeTurn = false;
  } else {
    player2.activeTurn = true;
  }
}

$(function(){
  $('#activePlayer').text("Player 1");
  $('button#roll').click(function(){
    var playerName;
    if (player1.score >= 100) {
      $('#main').hide();
      $('#player1-win').show();
    } else if (player2.score >= 100) {
      $('#main').hide();
      $('#player2-win').show();
    }
    if (player1.activeTurn === true) {
      player1.roll();
      if (player1.turnScore === 0) {
        $('#currentRoll').text('');
      } else {
        $('#currentRoll').text(player1.currentRoll);
      }
      $('#activePlayer').text(currentTurn());
      $('#player1Score').text(player1.score);
    } else {
      player2.roll();
      if (player2.turnScore === 0) {
        $('#currentRoll').text('');
      } else {
        $('#currentRoll').text(player2.currentRoll);
      }
      $('#activePlayer').text(currentTurn());
      $('#player2Score').text(player2.score);
    }
  });
  $('button#end').click(function(){
    endTurn();
    $('#player1Score').text(player1.score);
    $('#player2Score').text(player2.score);
  });
});
