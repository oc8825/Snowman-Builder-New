const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: [GameScene],
    plugins: {
        scene: [
            {
                key: 'DeviceOrientationPlugin',
                plugin: Phaser.DeviceOrientationPlugin,
                mapping: 'orientation', // Adds this to `this.orientation` in the scene
            },
        ],
    },
};

const game = new Phaser.Game(config);
