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
        this.load.image('obstacleImage', '/src/assets/images/football.png');
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
        this.snowball = this.physics.add.sprite(this.scale.width / 2, this.scale.height * 3 / 4, 'snowball');
        this.snowball.setScale(0.2);
        this.snowball.setOrigin(.5, .5);

        this.setInventory();

        //group of obstacles
        this.obstacles = this.physics.add.group();

        // timed event for obstacles spawning
        this.time.addEvent({
            delay: 2000, // Spawn every 2000ms (2 seconds)
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true, // Keep repeating
        });

        // collider for colision detection
        this.physics.add.collider(this.snowball, this.obstacles, this.handleCollision, null, this);
    }

    handleCollision(snowball, obstacle) {
        console.log('Collision detected!');
        
        // Disable the obstacle from moving
        snowball.body.setVelocity(0, 0);  // Make sure obstacle doesn't move

        snowball.body.setBounce(0);    // Prevent bounce
        snowball.body.setFriction(0);  // Prevent friction from applying
        
        obstacle.destroy(); // Remove the obstacle on collision
    }

    spawnObstacle() {
        const obstacle = this.obstacles.create(this.scale.width/2, 0, 'obstacleImage'); // Spawn at the top
        obstacle.setScale(0.1); // Scale the obstacle down
        obstacle.setVelocityY(100); // Make the obstacle move downward
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

        // cleaning up obstacles 
        this.obstacles.getChildren().forEach(obstacle => {
            if (obstacle && obstacle.y > this.scale.height) {
                obstacle.destroy(); // Clean up obstacles out of bounds
            }
        });
    }
}

export default GameScene;