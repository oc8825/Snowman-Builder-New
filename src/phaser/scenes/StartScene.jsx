export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('startBackground', '/src/assets/images/startBackground.jpg');
        this.load.image('WITSnowman', '/src/assets/images/WITSnowman.png');
        this.load.image('startButton', '/src/assets/images/startButton.png');
        this.load.image('arrow', '/src/assets/images/arrow.png');
    }

    create() {

        this.hideInventory();

        // Create and scale the background to fit the screen (without distorting it)
        let background = this.add.image(0, 0, 'startBackground');
        background.setOrigin(0, 0);  // Ensure the image starts at (0,0)
        background.setDisplaySize(this.scale.width, this.scale.height);  // Set the background size to fit the screen

        // Optionally, use `setScale` if you need to maintain the aspect ratio of the background
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

        // Add the snowman image (position it as needed)
        this.add.image(200, this.scale.height / 2, 'WITSnowman');

        this.startButton = this.add.image(this.scale.width / 2, this.scale.height * 0.75, 'startButton').setInteractive();
        this.startButton.setScale(0.5);

        this.startButton.on('pointerdown', () => {
            this.scene.start('InstructionScene'); // Move to instruction scene
        });
    }

    hideInventory() {
        const inventoryBox = document.getElementById('inventory-box');
        if (inventoryBox) {
            inventoryBox.style.display = 'none'; // Hide inventory
        }
    }
}
