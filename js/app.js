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
    constructor(speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = 100;
        this.row = 2;
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
    }

    get y() {
        return this.row * Map.rowHeight - 35;
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

    update() {}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    get x() {
        return this.col * Map.colWidth;
    }

    get y() {
        return this.row * Map.rowHeight - 35;
    }

    reset() {
        this.row = 5;
        this.col = 2;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();

allEnemies.push(new Enemy(60));
