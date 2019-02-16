// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    //border with randomized speed
    this.speed = 100 + Math.floor(Math.random() * 220);
    this.sprite = "images/enemy-bug.png";
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    this.x += dt * this.speed;
    if (this.x >=  505) {
        this.x = -30;
    }
    this.checkCollisions()
};

Enemy.prototype.checkCollisions = function() {
    if (Math.abs(player.y-this.y) < 60) {
        if (Math.abs(player.x-this.x) < 80) {
            player.x = 200;
            player.y = 400;
            alert("Game Over");
        }
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png"
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
      if (this.y < 20) {
          this.x = 200;
          this.y = 400;
          alert("You Made It!");
      }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//how player move
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
      case "left" :
          if (this.x >= 0) {
              this.x -= 101;
          } break;
      case "right" :
          if (this.x <= 354) {
              this.x += 101;
          } break;
      case "up" :
          if (this.y >= 55) {
              this.y -= 83;
          } break;
      case "down" :
          if (this.y <= 321) {
              this.y += 83;
          } break;
    }

};

Player.prototype.checkCollisions = function() {
    for (var i = 0; i  < allEnemies.length; i++) {
         if (Math.abs(this.y-allEnemies[i].y) < 60) {
              if (Math.abs(this.x-allEnemies[i].x) < 80) {
                  this.x = 200;
                  this.y = 400;
                  alert("Game Over");
              }
          }
    };
};

Player.prototype.reset = function() {
    this.x = x;
    this.y = y;
}

// bug speeds, 3 random numbers and fixed value
var allEnemies = [];
for (var i = 0; i < 5 ; i++) {
  var enemy = new Enemy (100, Math.floor(Math.random() * 3) * 83 + 65);
  allEnemies.push(enemy);
}

// player original starting point
var player = new Player (200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
