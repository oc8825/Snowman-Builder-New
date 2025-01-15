import Phaser from 'phaser';
import StartScene from './StartScene';
import InstructionScene from './InstructionScene';
import Level1Scene from './Level1Scene';
import Level2Scene from './Level2Scene';
import Level3Scene from './Level3Scene';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene'); 
    }

}

// This function will set up the Phaser game with the provided configuration
const buildPhaserGame = ({ parent }) => {
    const baseConfig = {
        type: Phaser.AUTO,
        width: 1300,  // set to window's width for mobile responsiveness
        height: 660, // set to window's height for mobile responsiveness
        scale: {
            mode: Phaser.Scale.FIT, // dynamically resize the game based on window size
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, // keep the game centered
        },
        scene: [StartScene, InstructionScene, Level1Scene, Level2Scene, Level3Scene, GameScene], // add game scenes here
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: { y: 0 },
            },
        },
        parent, // This ensures Phaser will render the game into the given parent DOM element
    };

    return new Phaser.Game(baseConfig);
};

export { buildPhaserGame };
