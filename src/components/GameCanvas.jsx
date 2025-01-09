import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser'; // Import Phaser
import GameScene from '/src/phaser/scenes/GameScene'; // Import the Phaser scene

const GameCanvas = () => {
    const gameContainerRef = useRef(null); // Reference to the DOM element for Phaser

    useEffect(() => {
        // Phaser configuration
        const config = {
            type: Phaser.AUTO, // Use WebGL or Canvas automatically
            width: 1200, // Game width
            height: 660, // Game height
            scene: [GameScene], // Add the scene
            physics: {
                default: 'arcade', // Use arcade physics
                arcade: {
                    debug: false, // Disable debug mode
                    gravity: { y: 0 }, // Set gravity to zero for the y-axis
                }
            },
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