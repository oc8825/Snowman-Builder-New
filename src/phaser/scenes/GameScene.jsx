import Phaser from 'phaser';

class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene'); // Give this scene a name
        this.ground = null;
    }

    preload() {
        // Load game assets (images, sounds, etc.)
        this.load.image('ground', '/src/assets/images/tempBackground.jpg'); // Example image
    }

    create() {
        this.ground = this.add.tileSprite(
            this.scale.width/2,
            this.scale.height / 2, // Center vertically
            this.scale.width, // Width matches the canvas
            this.scale.height, // Height matches the canvas
            "ground"
        );
        // Add game objects (e.g., player, obstacles, etc.)
        // this.add.text(100, 100, 'HelloPhaser!', { font: '24px Arial', color: '#fff' }); // Display text
        // this.player = this.physics.add.sprite(400, 300, 'player'); // Create a sprite with physics
    }

    update() {
        // Game logic for updates each frame (e.g., movement, collisions)
        // this.player.x += 1; // Example movement
        this.ground.tilePositionY += 5;
    }
}

export default GameScene;