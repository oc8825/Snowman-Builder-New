import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.ground = null;
        this.snowball = null;
        this.speedY = 1; // Vertical speed for both the snowball and the background
    }

    preload() {
        // load game assets
        this.load.image('ground', '/src/assets/images/backg2.jpg');
        this.load.image('snowball', '/src/assets/images/snowball.png');
        this.load.image('short', '/src/assets/images/short.png');
        this.load.image('jersey', '/src/assets/images/jersey.png');
        this.load.image('shoes', '/src/assets/images/shoes.png');
        this.load.image('cap', '/src/assets/images/cap.png');
    }

    create() {
        //background
        this.ground = this.add.tileSprite(
            this.scale.width/2,
            this.scale.height/2, // Center vertically
            this.scale.width, // Width matches the canvas
            this.scale.height, // Height matches the canvas
            "ground"
        );

        //snowball sprite
        this.snowball = this.add.sprite(this.scale.width / 2, this.scale.height * 3 / 4, 'snowball');
        this.snowball.setScale(0.2);
        this.snowball.setOrigin(.5, .5);

        this.setInventory();

        //initialize score
        this.score = 10;

        //Display score
        this.scoreText = this.add.text(10, 10, 'Score: 10', { fontSize: '32px', fill: '#000' });
    }

    handleCollision(player,object) {
        this.score += 1;
        this.scoreText.setText('Score: ' - this.score);
        object.destroy();
    }

    setInventory() {
        //slot variables
        this.slot1 = document.getElementById('slot-1');
        this.slot2 = document.getElementById('slot-2');
        this.slot3 = document.getElementById('slot-3');
        this.slot4 = document.getElementById('slot-4');

        this.slot1.style.backgroundImage = 'url(/src/assets/images/jersey.png)';
        this.slot2.style.backgroundImage = 'url(/src/assets/images/cap.png)';
        this.slot3.style.backgroundImage = 'url(/src/assets/images/shoes.png)';
        this.slot4.style.backgroundImage = 'url(/src/assets/images/short.png)';
    }

    update() {
        this.ground.tilePositionY -= 1;

        this.snowball.rotation += 0.01;
    }
}

export default GameScene;