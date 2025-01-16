export default class YouWin extends Phaser.Scene {
    constructor() {
        super({ key: 'YouWin' });
    }

    preload() {
        this.load.image('instructionBackground', '/src/assets/images/instructionBackground.jpg');
        this.load.image('arrow', '/src/assets/images/arrow.png');
        this.load.image('mclaurinSnowman', '/src/assets/images/mclaurinSnowman.png');
        this.load.image('beckhamSnowman', '/src/assets/images/beckhamSnowman.png');
        this.load.image('currySnowman', '/src/assets/images/currySnowman.png');
        this.load.image('doncicSnowman', '/src/assets/images/doncicSnowman.png');
        this.load.image('messiSnowman', '/src/assets/images/messiSnowman.png');
        this.load.image('morganSnowman', '/src/assets/images/morganSnowman.png');
        this.load.image('rodmanSnowman', '/src/assets/images/rodmanSnowman.png');
        this.load.image('ohtaniSnowman', '/src/assets/images/ohtaniSnowman.png');
        this.load.image('zimmermanSnowman', '/src/assets/images/zimmermanSnowman.png');
    }

    create() {

        // Create and scale the background to fit the screen (without distorting it)
        let background = this.add.image(0, 0, 'instructionBackground').setOrigin(0, 0);
        background.setDisplaySize(this.scale.width, this.scale.height);  // Set the background size to fit the screen
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

        // Add "You Win!" text
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'You Win!', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        // Retrieve selected player index from localStorage
        const playerIndex = localStorage.getItem('selectedPlayerIndex');
        console.log('Selected player index from localStorage:', playerIndex);

        const players = [
            { name: 'Messi' },
            { name: 'Morgan' },
            { name: 'Rodman' },
            { name: 'McLaurin' },
            { name: 'Curry' },
            { name: 'Doncic' },
            { name: 'Ohtani' },
            { name: 'Zimmerman' },
            { name: 'Beckham' }
        ];

        // Display selected player's name
        const playerName = players[playerIndex]?.name || 'Unknown Player';
        console.log('Displaying player name:', playerName);
        this.add.text(this.scale.width / 2, this.scale.height / 2, `You selected: ${playerName}`, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        // Add an arrow to transition to another scene
        this.arrow = this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, 'arrow').setInteractive();
        this.arrow.setScale(0.25);

        // When the arrow is clicked/tapped, transition to LevelOne
        this.arrow.on('pointerdown', () => {
            this.scene.start('LevelOne'); // Transition to LevelOne or another scene
        });
    }

    
}
