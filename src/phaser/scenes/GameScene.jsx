import Phaser from 'phaser';
import StartScene from './StartScene';
import InstructionScene from './InstructionScene';
import ObjectiveScene from './ObjectiveScene';
import LevelOne from './LevelOne';
import LevelTwo from './LevelTwo';
import LevelThree from './LevelThree';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene'); 
    }

}

const buildPhaserGame = ({ parent }) => {
    const baseConfig = {
        type: Phaser.AUTO,
        width: 1300,  
        height: 660, 
        scale: {
            mode: Phaser.Scale.FIT, 
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, 
        },
        scene: [StartScene, InstructionScene, ObjectiveScene, LevelOne, LevelTwo, LevelThree, GameScene], // add game scenes here
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: { y: 0 },
            },
        },
        parent, 
    };

    return new Phaser.Game(baseConfig);
};

export { buildPhaserGame };
