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

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'You Win!', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        // Retrieve selected player index from localStorage
        const playerIndex = localStorage.getItem('selectedPlayerIndex');

        const players = [
            { name: 'Messi', snowmanKey: 'messiSnowman' },
            { name: 'Morgan', snowmanKey: 'morganSnowman' },
            { name: 'Rodman', snowmanKey: 'rodmanSnowman' },
            { name: 'McLaurin', snowmanKey: 'mclaurinSnowman' },
            { name: 'Curry', snowmanKey: 'currySnowman' },
            { name: 'Doncic', snowmanKey: 'doncicSnowman' },
            { name: 'Ohtani', snowmanKey: 'ohtaniSnowman' },
            { name: 'Zimmerman', snowmanKey: 'zimmermanSnowman' },
            { name: 'Beckham', snowmanKey: 'beckhamSnowman' }
        ];

        // Display selected player's name
        const playerName = players[playerIndex]?.name || 'Unknown Player';
        this.add.text(this.scale.width / 2, this.scale.height / 2, `You selected: ${playerName}`, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        const snowmanKey = players[playerIndex]?.snowmanKey;
        if (snowmanKey) {
            this.add.image(300, this.scale.height / 2, snowmanKey).setOrigin(0.5).setScale(0.75);
        } else {
            console.log('No snowman image for selected player');
        }

        // Add an arrow to transition to another scene
        this.arrow = this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, 'arrow').setInteractive();
        this.arrow.setScale(0.25);

        // When the arrow is clicked/tapped, transition to LevelOne
        this.arrow.on('pointerdown', () => {
            this.scene.start('LevelOne'); // Transition to LevelOne or another scene
        });
    }

    
}
