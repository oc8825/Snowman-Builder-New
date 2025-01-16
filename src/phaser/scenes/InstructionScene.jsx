export default class InstructionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionScene' });
    }

    preload() {
        this.load.image('instructionBackground', '/src/assets/images/newinstructionbg.jpeg');
        this.load.image('arrow', '/src/assets/images/arrow.png');
    }

    create() {

        this.hideInventory();

        let background = this.add.image(0, 0, 'instructionBackground').setOrigin(0,0);
        background.setDisplaySize(this.scale.width, this.scale.height);  

        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

        this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Tap the arrow to go to the next instrcutions!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        this.arrow = this.add.image(this.scale.width / 2, this.scale.height / 2 + 200, 'arrow').setInteractive();
        this.arrow.setScale(0.5);

        
        this.arrow.on('pointerdown', () => {
            this.scene.start('Instructiontwo'); 
        });

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 300, 'Instructions', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 250, 'To get started chose a player and enable tilt contorls on mobile devices.', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'To move the snowball, tilt your device in the direction you want to move.', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 150, 'Hitting snowballs gains points, hitting obsticles loses points.', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'To build the body, get 10 points in part one, and then find your players shoes and pants.', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'To build the middle part of the snowman, get 7 points in part one, and then find your players shirt.', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2, 'To build the head of the snowman, get 5 points in part one, and then find your players head-gear.', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);

       
    }
    hideInventory() {
        const inventoryBox = document.getElementById('inventory-box');
        if (inventoryBox) {
            inventoryBox.style.display = 'none'; 
        }
    }
}
