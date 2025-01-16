export default class ObjectiveScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectiveScene' });
        this.players = [
            { name: 'Messi', components: ['messi', 'messicleat', 'messicuff', 'messishorts'] },
            { name: 'Morgan', components: ['morgan', 'morgancleat', 'morgancuff', 'morganshorts'] },
            { name: 'Rodman', components: ['rodman', 'rodmancleat', 'rodmancuff', 'rodmanshorts'] },
            { name: 'McLaurin', components: ['mclaurin', 'mclaurincleat', 'mclaurinhelmet', 'mclaurinpants'] },
            { name: 'Curry', components: ['curry', 'curryshoe', 'curryheadband', 'curryshorts'] },
            { name: 'Doncic', components: ['doncic', 'doncicshoe', 'doncicheadband', 'doncicshorts'] },
            { name: 'Ohtani', components: ['ohtani', 'ohtanicleat', 'ohtanihelmet', 'ohtanipants'] },
            { name: 'Zimmerman', components: ['zimmerman', 'zimmermancleat', 'zimmermanhelmet', 'zimmermanpants'] },
            { name: 'Beckham', components: ['beckham', 'beckhamcleat', 'beckhamhelmet', 'beckhampants'] }
        ];
        this.playerIndex = 0;
        this.componentImages = {
            'messi': '/src/assets/images/messi.png',
            'morgan': '/src/assets/images/morgan.png',
            'rodman': '/src/assets/images/rodman.png',
            'mclaurin': '/src/assets/images/mclaurin.png',
            'curry': '/src/assets/images/curry.png',
            'doncic': '/src/assets/images/doncic.png',
            'ohtani': '/src/assets/images/ohtani.png',
            'zimmerman': '/src/assets/images/zimmerman.png',
            'beckham': '/src/assets/images/beckham.png',

            'messicleat': '/src/assets/images/messicleat.png',
            'morgancleat': '/src/assets/images/usacleat.png',
            'rodmancleat': '/src/assets/images/usacleat.png',
            'mclaurincleat': '/src/assets/images/mclaurincleat.png',
            'curryshoe': '/src/assets/images/curryshoe.png',
            'doncicshoe': '/src/assets/images/doncicshoe.png',
            'ohtanicleat': '/src/assets/images/ohtanicleat.png',
            'zimmermancleat': '/src/assets/images/zimmermancleat.png',
            'beckhamcleat': '/src/assets/images/beckhamcleat.png',

            'messicuff': '/src/assets/images/messicuff.png',
            'morgancuff': '/src/assets/images/usacuff.png',
            'rodmancuff': '/src/assets/images/usacuff.png',
            'mclaurinhelmet': '/src/assets/images/mclaurinhelmet.png',
            'curryheadband': '/src/assets/images/curryheadband.png',
            'doncicheadband': '/src/assets/images/doncicheadband.png',
            'ohtanihelmet': '/src/assets/images/ohtanihelmet.png',
            'zimmermanhelmet': '/src/assets/images/zimmermanhelmet.png',
            'beckhamhelmet': '/src/assets/images/beckhamhelmet.png',

            'messishorts': '/src/assets/images/messishorts.png',
            'morganshorts': '/src/assets/images/morganshorts.png',
            'rodmanshorts': '/src/assets/images/rodmanshorts.png',
            'mclaurinpants': '/src/assets/images/mclaurinpants.png',
            'curryshorts': '/src/assets/images/curryshorts.png',
            'doncicshorts': '/src/assets/images/doncicshorts.png',
            'ohtanipants': '/src/assets/images/ohtanipants.png',
            'zimmermanpants': '/src/assets/images/zimmermanpants.png',
            'beckhampants': '/src/assets/images/beckhampants.png',
        };
    }

    preload() {


        this.load.image('mclaurincleat', '/src/assets/images/mclaurincleat.png');
        this.load.image('beckhamcleat', '/src/assets/images/beckhamcleat.png');
        this.load.image('curryshoe', '/src/assets/images/curryshoe.png');
        this.load.image('doncicshoe', '/src/assets/images/doncicshoe.png');
        this.load.image('messicleat', '/src/assets/images/messicleat.png');
        this.load.image('morgancleat', '/src/assets/images/usacleat.png');
        this.load.image('rodmancleat', '/src/assets/images/usacleat.png');
        this.load.image('ohtanicleat', '/src/assets/images/ohtanicleat.png');
        this.load.image('zimmermancleat', '/src/assets/images/zimmermancleat.png');

        this.load.image('mclaurinpants', '/src/assets/images/mclaurinpants.png');
        this.load.image('beckhampants', '/src/assets/images/beckhampants.png');
        this.load.image('curryshorts', '/src/assets/images/curryshorts.png');
        this.load.image('doncicshorts', '/src/assets/images/doncicshorts.png');
        this.load.image('messishorts', '/src/assets/images/messishorts.png');
        this.load.image('morganshorts', '/src/assets/images/morganshorts.png');
        this.load.image('rodmanshorts', '/src/assets/images/rodmanshorts.png');
        this.load.image('ohtanipants', '/src/assets/images/ohtanipants.png');
        this.load.image('zimmermanpants', '/src/assets/images/zimmermanpants.png');

        this.load.image('mclaurin', '/src/assets/images/mclaurin.png');
        this.load.image('beckham', '/src/assets/images/beckham.png');
        this.load.image('curry', '/src/assets/images/curry.png');
        this.load.image('doncic', '/src/assets/images/doncic.png');
        this.load.image('messi', '/src/assets/images/messi.png');
        this.load.image('morgan', '/src/assets/images/morgan.png');
        this.load.image('rodman', '/src/assets/images/rodman.png');
        this.load.image('ohtani', '/src/assets/images/ohtani.png');
        this.load.image('zimmerman', '/src/assets/images/zimmerman.png');

        this.load.image('mclaurinhelmet', '/src/assets/images/mclaurinhelmet.png');
        this.load.image('beckhamhelmet', '/src/assets/images/beckhamhelmet.png');
        this.load.image('curryheadband', '/src/assets/images/curryheadband.png');
        this.load.image('doncicheadband', '/src/assets/images/doncicheadband.png');
        this.load.image('messicuff', '/src/assets/images/messicuff.png');
        this.load.image('morgancuff', '/src/assets/images/usacuff.png');
        this.load.image('rodmancuff', '/src/assets/images/usacuff.png');
        this.load.image('ohtanihelmet', '/src/assets/images/ohtanihelmet.png');
        this.load.image('zimmermanhelmet', '/src/assets/images/zimmermanhelmet.png');

        this.load.image('instructionBackground', '/src/assets/images/instructionBackground.jpg');
        this.load.image('nextPlayerButton', '/src/assets/images/nextPlayerButton.png');
        this.load.image('startGameButton', '/src/assets/images/startGameButton.png');
        this.load.image('selectPlayerButton', '/src/assets/images/selectPlayerButton.png');
 
    }
    

    create() {
        console.log(this.playerIndex)
        // white background
        this.cameras.main.setBackgroundColor('#ffffff');

        // Add a heading text (only once)
        this.add.text(this.scale.width / 2, 100, 'Select Your Player', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        // Add buttons for selecting players, but don't show all player names in the middle
        this.players.forEach((player, index) => {
            const playerButton = this.add.image(this.scale.width / 2, 150 + index * 100, player.name.toLowerCase())
                .setInteractive()
                .setOrigin(0.5);
            playerButton.setScale(0.3); // Adjust size if necessary

            // Player click event
            playerButton.on('pointerdown', () => {
                this.selectPlayer(index);
            });
        });

        // Add the next player button
        const nextPlayerButton = this.add.image(this.scale.width / 2, this.scale.height - 150, 'nextPlayerButton').setOrigin(0.5);
        nextPlayerButton.setInteractive();
        nextPlayerButton.setScale(.5);
        nextPlayerButton.setDepth(1);  // Ensure it's visible above other elements

        nextPlayerButton.on('pointerdown', () => {
            this.children.list.forEach(child => {
                if (child.type === 'Image' && !['nextPlayerButton', 'startGameButton', 'selectPlayerButton'].includes(child.texture.key)) {
                    child.destroy();
                }
                if (child.type === 'Text' && child.text !== 'Select Your Player') {
                    child.destroy();
                }
            });
            this.cyclePlayer();
        });

        // Add the start game button
        const startGameButton = this.add.image(this.scale.width / 2, this.scale.height - 100, 'startGameButton').setOrigin(0.5);
        startGameButton.setInteractive();
        startGameButton.setScale(0.5);
        startGameButton.setDepth(1);  // Ensure it's visible above other elements

        startGameButton.on('pointerdown', () => {
            if (this.playerIndex >= 0) {
                this.scene.start('YouWin');
            } else {
                alert('Please select a player first!');
            }
        });

        const selectPlayerButton = this.add.image(this.scale.width / 2, this.scale.height - 200, 'selectPlayerButton').setOrigin(0.5);
        selectPlayerButton.setInteractive();
        selectPlayerButton.setScale(0.5);
        selectPlayerButton.setDepth(1);

        selectPlayerButton.on('pointerdown', () => {
            if (this.playerIndex >= 0) {
                // Store the selected player index in localStorage (or any other global state)
                localStorage.setItem('selectedPlayerIndex', this.playerIndex);
            } else {
                alert('Please select a player first!');
            }
        });

        this.displayComponents();
    }

    displayComponents() {
        this.children.list.forEach(child => {
            if (child.type === 'Image' && !['nextPlayerButton', 'startGameButton', 'selectPlayerButton'].includes(child.texture.key)) {
                child.destroy();
            }
            if (child.type === 'Text' && child.text !== 'Select Your Player') {
                child.destroy();
            }
        });

        const componentPositions = [
            { x: this.scale.width / 2 - 100, y: this.scale.height / 2 - 50 },  // Top left
            { x: this.scale.width / 2, y: this.scale.height / 2 - 50 },        // Top right
            { x: this.scale.width / 2 - 100, y: this.scale.height / 2 + 50 },  // Bottom left
            { x: this.scale.width / 2, y: this.scale.height / 2 + 50 },        // Bottom right
        ];

        const components = this.players[this.playerIndex].components;

        this.add.text(this.scale.width / 2, 50, `Player: ${this.players[this.playerIndex].name} (${this.playerIndex})`, {
            fontSize: '24px',
            fill: '#000'
        }).setOrigin(0.5);

        components.forEach((component, index) => {
            const position = componentPositions[index];
            this.add.image(position.x, position.y, component).setScale(0.2);
        });
    }

    cyclePlayer() {
        this.children.list.forEach(child => {
            if (child.type === 'Image' && !['nextPlayerButton', 'startGameButton', 'selectPlayerButton'].includes(child.texture.key)) {
                child.destroy();
            }
            if (child.type === 'Text' && child.text !== 'Select Your Player') {
                child.destroy();
            }
        });
        
        // cycle  through players but preserve the buttons and player name
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
        this.displayComponents();
    }

    selectPlayer(index) {
        this.playerIndex = index;
        this.displayComponents();
    }
}