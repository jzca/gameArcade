"use strict";

// Updates the level texts.
var h1 = document.querySelector('h1');
var div = document.querySelector('div');
var passTxt = document.getElementById('txt'); // Updates the numbers for the level texts.

var counter = 2;
var counterB = 1;

var Enemy = function Enemy(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-dem-2.png';
};

Enemy.prototype.update = function (dt) {
  var speedRandom = Math.floor(Math.random() * 20 + 5);
  this.x = this.x + (this.speed + speedRandom) * counter * dt; // Enemy enter from Right to Left 

  if (this.x > 505) {
    this.x = -15;
  }

  this.checkCollisions();
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function () {
  // Check the 'corns' based on the image size.
  //If one smaller than the other,then collision happens.
  if (player.x < this.x + 75 && player.y < this.y + 65 && this.x < player.x + 75 && this.y < player.y + 65) {
    player.rePosition(); // Roll back to Difficulty 1

    counter = 1;
    div.innerHTML = "<h1>Difficulty: ".concat(counter, "</h1>\n\t\t<h4>DJT Made America Great ").concat(counterB - 1, " Times</h4>");
    counter = 2;
  }
}; // Create the Player Class.


var Player = function Player(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-djt-4.png';
};

Player.prototype.update = function (dt) {}; // Draw the enemy on the screen, required method for game


Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; // Player moves based on these keys


Player.prototype.handleInput = function (allowedKeys) {
  if (allowedKeys === 'left' || allowedKeys === 'a') {
    this.x = this.x - 100;
  } else if (allowedKeys === 'right' || allowedKeys === 'd') {
    this.x = this.x + 100;
  } else if (allowedKeys === 'up' || allowedKeys === 'w') {
    this.y = this.y - 80;
  } else if (allowedKeys === 'down' || allowedKeys === 's') {
    this.y = this.y + 80;
  } // If the player goes out the canvas, it bounces to the original position.


  if (this.x > 405 || this.y > 450 || this.x < 0 || this.y < -15) {
    this.rePosition();
  } // If the player reaches the river, then update the level texts.


  if (this.y < 0) {
    // counter=2;
    div.innerHTML = "<h1>Difficulty: ".concat(counter++, "</h1>\n\t\t\t\t<h4>DJT Made America Great ").concat(counterB++, " Times</h4>");
    player.sprite = 'images/char-djt-won.png'; // If the player is on the river, it bounces to the original position.

    this.x = 200;
    this.y = 390; // Reminder: You passed the level

    mySweetAlert();
  } // Swap Winner face to the norm.


  if (this.y > 310 && this.sprite.includes('won')) {
    setTimeout(function () {
      player.sprite = 'images/char-djt-4.png';
    }, 2500);
  }
};

Player.prototype.rePosition = function () {
  this.x = 200;
  this.y = 390;
  this.sprite = 'images/char-djt-4.png';
}; // Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var enemy1 = new Enemy(2, 55, 5);
var enemy2 = new Enemy(102, 139, 10);
var enemy3 = new Enemy(200, 225, 6);
var enemy1b = new Enemy(72, 55, 7);
var enemy2b = new Enemy(172, 139, 15);
var enemy3b = new Enemy(270, 225, 9);
var enemy1c = new Enemy(400, 55, 11);
var allEnemies = [enemy1, enemy2, enemy3, enemy1b, enemy2b, enemy3b, enemy1c];
var player = new Player(200, 390); // This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    87: 'w',
    68: 'd',
    83: 's'
  };
  player.handleInput(allowedKeys[e.keyCode]);
}); // Change the level and highest archive.

div.addEventListener('click', function (e) {
  // Reset the rounds. Line 155: Reset the game
  if (e.target.tagName === 'H1') {
    counter = 1;
    div.innerHTML = "<h1>Difficulty: ".concat(counter, "</h1>\n    \t<h4>DJT Made America Great ").concat(counterB - 1, " Times</h4>");
    player.rePosition();
  } else if (e.target.tagName === 'H4') {
    counter = 2;
    counterB = 1;
    div.innerHTML = "<h1>Difficulty: 1</h1>\n\t\t<p id=\"guide-1\">Click 'Difficulty' to reset the rounds.</p>\n    <p id=\"guide-2\">Click the second text to reset the game.</p>\n    <p class=\"control\">You may use 'WASD' and Arrow keys to control Trump.</p>";
    player.rePosition();
  }
}); // Sweet Alert

var mySweetAlert = function mySweetAlert() {
  var timerInterval;
  swal({
    title: 'PASSED!',
    html: 'Auto close in <strong></strong> MilliSec.',
    timer: 1000,
    onOpen: function onOpen() {
      swal.showLoading();
      timerInterval = setInterval(function () {
        swal.getContent().querySelector('strong').textContent = swal.getTimerLeft();
      }, 100);
    },
    onClose: function onClose() {
      clearInterval(timerInterval);
    }
  }).then(function (result) {
    if ( // Read more about handling dismissals
    result.dismiss === swal.DismissReason.timer) {
      console.log('I was closed by the timer (mySweetAlert)');
    }
  });
};