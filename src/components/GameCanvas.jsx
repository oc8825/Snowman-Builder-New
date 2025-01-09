import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser'; // import phaser
import GameScene from '/src/phaser/scenes/GameScene'; // import phaser scene

const GameCanvas = () => {
    const gameContainerRef = useRef(null); 

    useEffect(() => {
        // phaser config
        const config = {
            type: Phaser.AUTO,
            width: 800, // game width
            height: 600, // game height
            scene: [GameScene], // add scene
            parent: gameContainerRef.current 
        };

        // create new phaser game instance
        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true); // 
        };
    }, []); // 

    return <div ref={gameContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default GameCanvas;

