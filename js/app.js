// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed + (Math.floor(Math.random()));
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    console.log('The enemy Y position is: ' + this.y);
    console.log('The enemy X position is: ' + this.x);
};

// Can be used to update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.move = function(dt) {

};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas width.
    if (this.x >= 505) {
        this.x = 0;
    }
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(speed) {
    this.x = 200;
    this.y = 380;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
// This Player class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {

};

Player.prototype.render = function() {
    // Using the window.Resources object defined in resources.js
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    player.x = 200;
    player.y = 380;
};


Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'left' && player.x > 0) {
        player.x -= player.speed;
    }
    if (keyPressed == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPressed == 'right' && player.x < 400) {
        player.x += player.speed;
    }
    if (keyPressed == 'down' && player.y < 380) {
        player.y += player.speed - 20;
    }
    //Used for position and key pressed diognostics
    console.log('keyPress is: ' + keyPressed);
    console.log('The player X position is: ' + player.x);
    console.log('The player Y position is:' + player.y);
};

var checkCollision = function(enemy) {

    if (player.x < enemy.x + 75 &&
        player.x + 65 > enemy.x &&
        player.y < enemy.y + 50 &&
        60 + player.y > enemy.y) {
        alert('You Lose :(');
        console.log('Bug Hit - Start Over');
        player.reset();
    }

    if (player.y === -20) {
        alert('YOU WIN!!!!');
        console.log('YOU WIN!!!');
        player.reset();
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(200, 120, 90),
    new Enemy(400, 40, 120),
    new Enemy(0, 200, 150)
];
var player = new Player(100);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //Used for event listener diognostics
    player.handleInput(allowedKeys[e.keyCode]);
    console.log('keyPressed sent by event listener: ' + allowedKeys[e.keyCode]);
    console.log("The event listener is running");
});
