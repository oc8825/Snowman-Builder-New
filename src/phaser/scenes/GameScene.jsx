import Phaser from 'phaser';
import StartScene from './StartScene';
import InstructionScene from './InstructionScene';
import Instructiontwo from './Instructiontwo';
import InstructionThree from './InstructionThree';
import InstructionFour from './Instructionfour';
import ObjectiveScene from './ObjectiveScene';
import LevelOne from './LevelOne';
import LevelTwo from './LevelTwo';
import LevelThree from './LevelThree';
import YouWin from './YouWin';
import LevelOnePartTwo from './LevelOnePartTwo';
import LevelTwoPartTwo from './LevelTwoPartTwo';
import LevelThreePartTwo from './LevelThreePartTwo';


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
        scene: [StartScene, InstructionScene, Instructiontwo, InstructionThree, InstructionFour, ObjectiveScene, LevelOnePartTwo, LevelOne, LevelTwo, LevelTwoPartTwo, LevelThree, LevelThreePartTwo, YouWin, GameScene], // add game scenes here
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
