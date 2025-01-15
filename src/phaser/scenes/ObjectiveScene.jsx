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

        this.load.image('mclaurinCleatsCollect', '/src/assets/images/mclaurinCleatsCollect.png')
        this.load.image('beckhamCleatsCollect', '/src/assets/images/beckhamCleatsCollect.png')
        this.load.image('curryShoeCollect', '/src/assets/images/curryShoeCollect.png')
        this.load.image('doncicShoeCollect', '/src/assets/images/doncicShoeCollect.png')
        this.load.image('messiCleatsCollect', '/src/assets/images/messiCleatsCollect.png')
        this.load.image('morganCleatsCollect', '/src/assets/images/usaCleatsCollect.png')
        this.load.image('rodmanCleatsCollect', '/src/assets/images/usaCleatsCollect.png')
        this.load.image('ohtaniCleatsCollect', '/src/assets/images/ohtaniCleatsCollect.png')
        this.load.image('zimmermanCleatsCollect', '/src/assets/images/zimmermanCleatsCollect.png')

        this.load.image('mclaurincleat', '/src/assets/images/mclaurincleat.png');
        this.load.image('beckhamcleat', '/src/assets/images/beckhamcleat.png');
        this.load.image('curryshoe', '/src/assets/images/curryshoe.png');
        this.load.image('doncicshoe', '/src/assets/images/doncicshoe.png');
        this.load.image('messicleat', '/src/assets/images/messicleat.png');
        this.load.image('morgancleat', '/src/assets/images/usacleat.png');
        this.load.image('rodmancleat', '/src/assets/images/usacleat.png');
        this.load.image('ohtanicleat', '/src/assets/images/ohtanicleat.png');
        this.load.image('zimmermancleat', '/src/assets/images/zimmermancleat.png');

        //pants
        this.load.image('mclaurinPantsCollect', '/src/assets/images/mclaurinPantsCollect.png')
        this.load.image('beckhamPantsCollect', '/src/assets/images/beckhamPantsCollect.png')
        this.load.image('curryShortsCollect', '/src/assets/images/curryShortsCollect.png')
        this.load.image('doncicShortsCollect', '/src/assets/images/doncicShortsCollect.png')
        this.load.image('messiShortsCollect', '/src/assets/images/messiShortsCollect.png')
        this.load.image('morganShortsCollect', '/src/assets/images/morganShortsCollect.png')
        this.load.image('rodmanShortsCollect', '/src/assets/images/rodmanShortsCollect.png')
        this.load.image('ohtaniPantsCollect', '/src/assets/images/ohtaniPantsCollect.png')
        this.load.image('zimmermanPantsCollect', '/src/assets/images/zimmermanPantsCollect.png')

        this.load.image('mclaurinpants', '/src/assets/images/mclaurinpants.png');
        this.load.image('beckhampants', '/src/assets/images/beckhampants.png');
        this.load.image('curryshorts', '/src/assets/images/curryshorts.png');
        this.load.image('doncicshorts', '/src/assets/images/doncicshorts.png');
        this.load.image('messishorts', '/src/assets/images/messishorts.png');
        this.load.image('morganshorts', '/src/assets/images/morganshorts.png');
        this.load.image('rodmanshorts', '/src/assets/images/rodmanshorts.png');
        this.load.image('ohtanipants', '/src/assets/images/ohtanipants.png');
        this.load.image('zimmermanpants', '/src/assets/images/zimmermanpants.png');

        this.load.image('mclaurinJerseyCollect', '/src/assets/images/mclaurinJerseyCollect.png')
        this.load.image('beckhamJerseyCollect', '/src/assets/images/beckhamJerseyCollect.png')
        this.load.image('curryJerseyCollect', '/src/assets/images/curryJerseyCollect.png')
        this.load.image('doncicJerseyCollect', '/src/assets/images/doncicJerseyCollect.png')
        this.load.image('messiJerseyCollect', '/src/assets/images/messiJerseyCollect.png')
        this.load.image('morganJerseyCollect', '/src/assets/images/morganJerseyCollect.png')
        this.load.image('rodmanJerseyCollect', '/src/assets/images/rodmanJerseyCollect.png')
        this.load.image('ohtaniJerseyCollect', '/src/assets/images/ohtaniJerseyCollect.png')
        this.load.image('zimmermanJerseyCollect', '/src/assets/images/zimmermanJerseyCollect.png')

        this.load.image('mclaurin', '/src/assets/images/mclaurin.png');
        this.load.image('beckham', '/src/assets/images/beckham.png');
        this.load.image('curry', '/src/assets/images/curry.png');
        this.load.image('doncic', '/src/assets/images/doncic.png');
        this.load.image('messi', '/src/assets/images/messi.png');
        this.load.image('morgan', '/src/assets/images/morgan.png');
        this.load.image('rodman', '/src/assets/images/rodman.png');
        this.load.image('ohtani', '/src/assets/images/ohtani.png');
        this.load.image('zimmerman', '/src/assets/images/zimmerman.png');

        this.load.image('mclaurinHelmetCollect', '/src/assets/images/mclaurinHelmetCollect.png')
        this.load.image('beckhamHelmetCollect', '/src/assets/images/beckhamHelmetCollect.png')
        this.load.image('curryHeadbandCollect', '/src/assets/images/curryHeadbandCollect.png')
        this.load.image('doncicHeadbandCollect', '/src/assets/images/doncicHeadbandCollect.png')
        this.load.image('messiCuffCollect', '/src/assets/images/messiCuffCollect.png')
        this.load.image('morganCuffCollect', '/src/assets/images/usaCuffCollect.png')
        this.load.image('rodmanCuffCollect', '/src/assets/images/usaCuffCollect.png')
        this.load.image('ohtaniHelmetCollect', '/src/assets/images/ohtaniHelmetCollect.png')
        this.load.image('zimmermanHelmetCollect', '/src/assets/images/zimmermanHelmetCollect.png')

        this.load.image('mclaurinhelmet', '/src/assets/images/mclaurinhelmet.png');
        this.load.image('beckhamhelmet', '/src/assets/images/beckhamhelmet.png');
        this.load.image('curryheadband', '/src/assets/images/curryheadband.png');
        this.load.image('doncicheadband', '/src/assets/images/doncicheadband.png');
        this.load.image('messicuff', '/src/assets/images/messicuff.png');
        this.load.image('morgancuff', '/src/assets/images/usacuff.png');
        this.load.image('rodmancuff', '/src/assets/images/usacuff.png');
        this.load.image('ohtanihelmet', '/src/assets/images/ohtanihelmet.png');
        this.load.image('zimmermanhelmet', '/src/assets/images/zimmermanhelmet.png');

        this.load.image('nextPlayerButton', '/src/assets/images/nextPlayerButton.png');
        this.load.image('startGameButton', '/src/assets/images/startGameButton.png');
    }
    create() {
        // white background
        this.cameras.main.setBackgroundColor('#ffffff');

        const nextPlayerButton = this.add.image(this.scale.width/2, this.scale.height/2, 'nextPlayerButton').setOrigin(0.5);
        nextPlayerButton.setInteractive();
        nextPlayerButton.setScale(1);
        nextPlayerButton.setDepth(1);
        

        nextPlayerButton.on('pointerdown', () => {
            this.children.list.forEach(child => {
                if (child.type === 'Image') {
                    child.destroy();
                }
            });
             this.cyclePlayer();
        });

        const startGameButton = this.add.image(this.scale.width / 2, this.scale.height - 100, 'startGameButton').setOrigin(0.5);
        startGameButton.setInteractive();
        startGameButton.setScale(0.5)
        nextPlayerButton.setDepth(1)


        startGameButton.on('pointerdown', () => {
            this.scene.start('LevelOne');
        });

        this.displayComponents();
    }

    displayComponents() {

        this.children.list.forEach(child => {
            if (child.type === 'Image') {
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

        components.forEach((component, index) => {
            const position = componentPositions[index];

            this.add.image(position.x, position.y, component).setScale(0.2);
        });
    }

    cyclePlayer() {
        this.children.list.forEach(child => {
            if (child.type === 'Image') {
                child.destroy();
            }
        });
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
        this.displayComponents();
    }
}