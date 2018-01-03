// Map of the game
class Map {
  constructor() {
    this.rowImages = [
      'images/grass-block.png',
      'images/stone-block.png',
      'images/stone-block.png',
      'images/stone-block.png',
      'images/grass-block.png',
    ];
    this.rowsCount = this.rowImages.length;
    this.colsCount = 7;
  }

  render() {
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

// Base class for Enemy and player
class Character {
  constructor(sprite, initRow = 0) {
    this.sprite = sprite;
    this.row = initRow;
  }

  // Draw the Player or Enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  get y() {
    return this.row * Map.rowHeight - 35;
  }
}

// Enemies our player must avoid
class Enemy extends Character {
  constructor(startRow, startX, speed) {
    super('images/enemy-bug.png', startRow);
    this.x = startX;
    this.speed = speed;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > map.colsCount * Map.colWidth) this.x = -Map.colWidth; // Reuse enemy
  }
}

// The Player class
class Player extends Character {
  constructor(map) {
    super("images/char-boy.png");
    this.score = 0;
    this.reset();
  }

  render() {
    super.render();

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score:", 10, 480);

    if (this.score < 0) {
       ctx.fillStyle = "red";
    }

    ctx.fillText(this.score,110,480);
  }

  handleInput(keycode, map) {
    switch (keycode) {
    case 37: // left
      if (this.col <= 0) {
        return;
      }
      this.col--;
      break;
    case 38: // up
      if (this.row <= 0) {
        return;
      }
      this.row--;
      break;
    case 39: // right
      if (this.col >= map.colsCount - 1) {
        return;
      }
      this.col++;
      break;
    case 40: // down
      if (this.row >= map.rowsCount - 1) {
        return;
      }
      this.row++;
      break;
    }
  }

  update() {
    if (this.row == 0) {
      this.win();
      return;
    }

    for (const enemy of allEnemies) {
      if (collide(this, enemy)) {
        this.die();
        return;
      }
    }
  }

  die() {
    this.score -= 1;
    this.reset();
  }

  win() {
    this.score += 1;
    this.reset();
  }

  get x() {
    return this.col * Map.colWidth;
  }

  reset() {
    this.row = map.rowsCount - 1;
    this.col = Math.floor(map.colsCount / 2);
  }
}

function collide(character1, character2) {
  if (Math.abs(character1.x - character2.x) < Map.colWidth / 2
      && Math.abs(character1.y - character2.y) < Map.rowHeight) {
    return true;
  } else {
    return false;
  }
}

const map = new Map();
const player = new Player(map);
const allEnemies = [
  new Enemy(1, 0, 200),
  new Enemy(1, 100, 200),
  new Enemy(1, 400, 200),
  new Enemy(1, 500, 200),

  new Enemy(2, 100, 300),
  new Enemy(2, 500, 300),

  new Enemy(3, 100, 200),
  new Enemy(3, 200, 200),
  new Enemy(3, 500, 200),
  new Enemy(3, 600, 200),
];
