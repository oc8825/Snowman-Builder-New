export default class InstructionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionScene' });
    }

    preload() {
        this.load.image('instructionBackground', '/src/assets/images/instructionBackground.jpg');
        this.load.image('arrow', '/src/assets/images/arrow.png');
    }

    create() {

        this.hideInventory();

        // Create and scale the background to fit the screen (without distorting it)
        let background = this.add.image(0, 0, 'instructionBackground').setOrigin(0,0);
        background.setDisplaySize(this.scale.width, this.scale.height);  // Set the background size to fit the screen

        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'Tap the arrow to start!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.arrow = this.add.image(this.scale.width / 2, this.scale.height / 2 + 50, 'arrow').setInteractive();
        this.arrow.setScale(0.5);

        // When the arrow is clicked/tapped, start the game
        this.arrow.on('pointerdown', () => {
            this.scene.start('ObjectiveScene'); // Transition to the game scene
        });
    }
    hideInventory() {
        const inventoryBox = document.getElementById('inventory-box');
        if (inventoryBox) {
            inventoryBox.style.display = 'none'; // Hide inventory
        }
    }
}
