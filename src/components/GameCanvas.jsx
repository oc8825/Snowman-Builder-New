import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser'; // Import Phaser
<<<<<<< HEAD
import GameScene from '/src/phaser/scenes/GameScene'; // Import the Phaser scene
=======
import GameScene from '/src/phaser/scenes/GameScene'; // Import the Phaser scene // old: import GameScene from 'C:/Users/opcla/SnowmanBuilder/src/phaser/scenes/GameScene'; // Import the Phaser scene
>>>>>>> fee500361c4dbadc651502b020dd2357ed991bdf

const GameCanvas = () => {
    const gameContainerRef = useRef(null); // Reference to the DOM element for Phaser

    useEffect(() => {
        // Phaser configuration
        const config = {
            type: Phaser.AUTO, // Use WebGL or Canvas automatically
            width: 800, // Game width
            height: 600, // Game height
            scene: [GameScene], // Add the scene
            parent: gameContainerRef.current // Attach Phaser to the div
        };

        // Create a new Phaser game instance
        const game = new Phaser.Game(config);

        // Cleanup on unmount
        return () => {
            game.destroy(true); // Destroy the Phaser game when the component unmounts
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return <div ref={gameContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default GameCanvas;