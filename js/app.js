// Map of the game
class Map {
  constructor() {
    this.rowImages = [
      'images/water-block.png',   // Top row is water
      'images/stone-block.png',   // Row 1 of 3 of stone
      'images/stone-block.png',   // Row 2 of 3 of stone
      'images/stone-block.png',   // Row 3 of 3 of stone
      'images/grass-block.png',   // Row 1 of 2 of grass
      'images/grass-block.png'    // Row 2 of 2 of grass
    ];
    this.rowsCount = this.rowImages.length;
    this.colsCount = 5;
  }

  render(ctx) {
    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (let row = 0; row < this.rowsCount; row++) {
      for (let col = 0; col < this.colsCount; col++) {
        ctx.drawImage(Resources.get(this.rowImages[row]),
                      col * Map.colWidth, row * Map.rowHeight);
      }
    }
  }

  static get rowHeight() {
    return 83;
  }

  static get colWidth() {
    return 101;
  }
}

// Enemies our player must avoid
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.x = 100;
        this.y = 100;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// The Player class
class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.reset();
    }

    handleInput(key) {
        if (key == "left") {
            if (this.x <= 20) {
                return;
            }
            this.x -= 101;
        } else if (key == "right") {
            if (this.x >= 400) {
                return;
            }
            this.x += 101;
        } else if (key == "up") {
            if (this.y <= 0) {
                return;
            }
            this.y -= 83;
        } else if (key == "down") {
            if (this.y >= 300) {
                return;
            }
            this.y += 83;
        }
    }

    update() {}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {
        this.x = 202;
        this.y = 380;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();

allEnemies.push(new Enemy());


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
