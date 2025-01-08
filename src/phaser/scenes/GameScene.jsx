import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene'); // Give this scene a name
    }

    preload() {
        // Load game assets (images, sounds, etc.)
        this.load.image('player', 'path/to/player.png'); // Example image
    }

    create() {
        // Add game objects (e.g., player, obstacles, etc.)
        this.add.text(100, 100, 'Hello Phaser!', { font: '24px Arial', color: '#fff' }); // Display text
        this.player = this.physics.add.sprite(400, 300, 'player'); // Create a sprite with physics
    }

    update() {
        // Game logic for updates each frame (e.g., movement, collisions)
        this.player.x += 1; // Example movement
    }
}

export default GameScene;