export default class InstructionThree extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionThree' });
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

        this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Tap the arrow to go to start level two!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        this.arrow = this.add.image(this.scale.width / 2, this.scale.height / 2 + 200, 'arrow').setInteractive();
        this.arrow.setScale(0.5);

        
        this.arrow.on('pointerdown', () => {
            this.scene.start('LevelTwo'); 
        });

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 250, 'Instructions', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        const boxWidth = 700;

        const verticalPosition = this.cameras.main.centerY - 100;

        const bulletPoints = [
            'In level 2, you will build the middle of the snowman',
            'You will first have to avoid obsacles and collect snowballs to reach 7 points',
            'You will then have to collect the correct gear for the player that you built (jersies)'
        ];

        const formattedText = bulletPoints.map(point => `• ${point}`).join('\n');
      
        const text = this.add.text(
            this.cameras.main.centerX,
            verticalPosition,
            formattedText,
            { 
                fontSize: '25px', 
                color: '#000',
                wordWrap: { width: boxWidth, useAdvancedWrap: true },
                align: 'center',   
             }
       ).setOrigin(0.5);

       const textBounds = text.getBounds();
    

       const box = this.add.graphics();
       box.fillStyle(0x7EC8E3, 0.5);
       

       const borderRadius = 20;
       box.fillRoundedRect(textBounds.x - 20, textBounds.y - 20, textBounds.width + 40, textBounds.height + 40, borderRadius);

       box.lineStyle(2, 0x000000, 1);
       box.strokeRoundedRect(
              textBounds.x - 20,
              textBounds.y - 20,
              textBounds.width + 40,
              textBounds.height + 40,
              borderRadius
       );

       this.children.bringToTop(text);
       
    }
    hideInventory() {
        const inventoryBox = document.getElementById('inventory-box');
        if (inventoryBox) {
            inventoryBox.style.display = 'none'; 
        }
    }
}
