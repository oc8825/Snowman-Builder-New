export default class YouWin extends Phaser.Scene {
    constructor() {
        super({ key: 'YouWin' });
    }

    preload() {
        this.load.image('winBackground', '/src/assets/images/winBackground.jpg');
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

        let background = this.add.image(0, 0, 'winBackground').setOrigin(0, 0);
        background.setDisplaySize(this.scale.width, this.scale.height);  
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'You Win!', { fontSize: '48px', fontWeight: '1500', fill: '#fff' }).setOrigin(0.5);

        // retrieve from localStorage
        const playerIndex = localStorage.getItem('selectedPlayerIndex');

        const players = [
            { name: 'Lionel Messi', snowmanKey: 'messiSnowman' },
            { name: 'Alex Morgan', snowmanKey: 'morganSnowman' },
            { name: 'Trinity Rodman', snowmanKey: 'rodmanSnowman' },
            { name: 'Terry McLaurin', snowmanKey: 'mclaurinSnowman' },
            { name: 'Stephen Curry', snowmanKey: 'currySnowman' },
            { name: 'Luca Doncic', snowmanKey: 'doncicSnowman' },
            { name: 'Shoehei Ohtani', snowmanKey: 'ohtaniSnowman' },
            { name: 'Ralph Zimmerman', snowmanKey: 'zimmermanSnowman' },
            { name: 'Odell Beckham Jr', snowmanKey: 'beckhamSnowman' }
        ];

        const playerName = players[playerIndex]?.name || 'Unknown Player';
        this.add.text(this.scale.width / 2, this.scale.height / 2, `You built: ${playerName}`, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        const snowmanKey = players[playerIndex]?.snowmanKey;
        if (snowmanKey) {
            this.add.image(300, this.scale.height / 2, snowmanKey).setOrigin(0.5).setScale(0.75);
        } else {
            console.log('No snowman image for selected player');
        }
    }

    
}
