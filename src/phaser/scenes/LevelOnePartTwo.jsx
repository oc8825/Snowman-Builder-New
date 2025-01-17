export default class LevelOnePartTwo extends Phaser.Scene {

    constructor() {
        super({ key: 'LevelOnePartTwo' });
        this.ground = null;
        this.snowball = null;
        this.speedY = 1;

        this.orientation = null;

        this.levelCompleted = false;
        this.overlay = null;
        this.nextLevelButton = null;
        this.spawnShoeEvent = null;
        this.spawnPantEvent = null;
        this.tiltControlsActive = false;

        this.collectedPants = [];
        this.collectedShoes = [];

        this.timerText = null;
        this.timerEvent = null;
        this.timeLeft = 30;
        this.isRestarting = false;

        this.playerPants = {
            0: ['messiShortCollect'],     // Messi
            1: ['morganShortsCollect'],    // Morgan
            2: ['rodmanShortsCollect'],          // Rodman
            3: ['mclaurinPantsCollect'],            // McLaurin
            4: ['curryShortsCollect'],  // Curry
            5: ['doncicShortsCollect'],    // Doncic
            6: ['ohtaniPantsCollect'],          // Ohtani
            7: ['zimmermanPantsCollect'],    // Zimmerman
            8: ['beckhamPantsCollect'],    // Beckham
        };

        this.playerShoes = {
            0: ['messiCleatsCollect'],     // Messi
            1: ['morganCleatsCollect'],    // Morgan
            2: ['rodmanCleatsCollect'],          // Rodman
            3: ['mclaurinCleatsCollect'],            // McLaurin
            4: ['curryShoeCollect'],  // Curry
            5: ['doncicShoeCollect'],    // Doncic
            6: ['ohtaniCleatsCollect'],          // Ohtani
            7: ['zimmermanCleatsCollect'],    // Zimmerman
            8: ['beckhamCleatsCollect'],    // Beckham
        };

    }

    preload() {
        // load game assets
        this.load.image('ground', '/src/assets/images/newbackg.png');
        this.load.image('snowball', '/src/assets/images/snowball.png');
        this.load.image('nextLevelButton', '/src/assets/images/nextLevelButton.png');
        this.load.image('startButton', '/src/assets/images/startButton.png');

        //feet
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

        // confetti animation
        for (let i = 0; i <= 49; i++) {
            this.load.image(`confetti${i}`, `/src/assets/images/confetti/confetti${i}.png`);
        }

    }

    create() {

        const selectedPlayerIndex = localStorage.getItem('selectedPlayerIndex')
        if (selectedPlayerIndex !== null) {
            this.selectedPlayerIndex = parseInt(selectedPlayerIndex, 10);
        } else {
            this.selectedPlayerIndex = 0; // default to player 0 (Messi)
        }

        this.requiredPant = this.playerPants[this.selectedPlayerIndex][0];
        this.requiredShoe = this.playerShoes[this.selectedPlayerIndex][0];


        this.setInventory();
        this.showInventory();

        this.ground = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            "ground"
        );

        // create lanes and start snowball in middle lane
        this.lanes = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        this.currentLaneIndex = 1;
        this.targetX = this.lanes[this.currentLaneIndex];

        this.snowball = this.physics.add.sprite(this.lanes[this.currentLaneIndex], this.scale.height * 3 / 4, 'snowball');
        this.snowball.setScale(0.2);
        this.snowball.setOrigin(0.5, 0.5);

        this.shoes = this.physics.add.group();
        this.pants = this.physics.add.group();

        this.spawnPantEvent = this.time.addEvent({ delay: 2500, callback: this.spawnPant, callbackScope: this, loop: true });
        this.spawnShoeEvent = this.time.addEvent({ delay: 2000, callback: this.spawnShoe, callbackScope: this, loop: true });

        // collision detection for obstacles
        this.physics.add.collider(this.snowball, this.shoes, this.handleShoeCollision, null, this);
        this.physics.add.collider(this.snowball, this.pants, this.handlePantCollision, null, this);


        // display time
        this.timerText = this.add.text(10, 10, `Time: ${this.timeLeft}`, { fontSize: '32px', fill: '#000' });
        this.timerText.setDepth(10);

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // set up controls for lane switching
        this.targetX = this.lanes[this.currentLaneIndex];

        this.input.keyboard.on('keydown-LEFT', () => {
            this.changeLane(-1);
        });

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.changeLane(1);
        });

        this.input.on('pointerdown', (pointer) => {
            if (pointer.x < this.scale.width / 2) {
                this.changeLane(-1);
            } else {
                this.changeLane(1);
            }
        });

        const isTiltSupported =
            typeof DeviceMotionEvent !== 'undefined' &&
            (navigator.userAgent.toLowerCase().includes('android') || navigator.userAgent.toLowerCase().includes('iphone'));

        if (isTiltSupported) {
            this.scene.pause();
            // Tilt Control button
            const enableTiltButton = document.createElement('button');
            enableTiltButton.innerText = 'Enable Tilt Controls';
            enableTiltButton.style.position = 'absolute';
            enableTiltButton.style.top = '50%';
            enableTiltButton.style.left = '50%';
            enableTiltButton.style.transform = 'translate(-50%, -50%)';
            enableTiltButton.style.fontSize = '20px';
            enableTiltButton.style.padding = '10px 20px';
            enableTiltButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            enableTiltButton.style.color = '#fff';
            enableTiltButton.style.border = 'none';
            enableTiltButton.style.cursor = 'pointer';
            document.body.appendChild(enableTiltButton);

            // create cooldown for lane changes so cna only change one lane per tilt
            this.laneChangeCooldown = false;

            enableTiltButton.addEventListener('click', () => {
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    // request permission for accelerometer access on iOS
                    DeviceMotionEvent.requestPermission()
                        .then(response => {
                            if (response === 'granted') {
                                console.log('Permission granted for tilt controls!');
                                window.addEventListener('devicemotion', this.handleMotion.bind(this));
                                document.body.removeChild(enableTiltButton);
                                this.scene.resume(); // remove button
                            } else {
                                console.error('Permission denied for tilt controls.');
                                alert('Permission denied. Tilt controls are unavailable.');
                            }
                        })
                        .catch(error => {
                            console.error('Error requesting permission:', error);
                            alert('Unable to enable tilt controls. ' + error);
                        });
                } else {
                    // non-iOS devices 
                    console.log('Tilt controls enabled (no permission required).');
                    window.addEventListener('devicemotion', this.handleMotion.bind(this));
                    document.body.removeChild(enableTiltButton);
                }
            });
        } else {
            console.log('Tilt controls are not supported on this device.');
        }

        // create confetti animation
        this.anims.create({
            key: 'confetti',
            frames: [
                { key: 'confetti0' },
                { key: 'confetti1' },
                { key: 'confetti2' },
                { key: 'confetti3' },
                { key: 'confetti4' },
                { key: 'confetti5' },
                { key: 'confetti6' },
                { key: 'confetti7' },
                { key: 'confetti8' },
                { key: 'confetti9' },
                { key: 'confetti10' },
                { key: 'confetti11' },
                { key: 'confetti12' },
                { key: 'confetti13' },
                { key: 'confetti14' },
                { key: 'confetti15' },
                { key: 'confetti16' },
                { key: 'confetti17' },
                { key: 'confetti18' },
                { key: 'confetti19' },
                { key: 'confetti20' },
                { key: 'confetti21' },
                { key: 'confetti22' },
                { key: 'confetti23' },
                { key: 'confetti24' },
                { key: 'confetti25' },
                { key: 'confetti26' },
                { key: 'confetti27' },
                { key: 'confetti28' },
                { key: 'confetti29' },
                { key: 'confetti30' },
                { key: 'confetti31' },
                { key: 'confetti32' },
                { key: 'confetti33' },
                { key: 'confetti34' },
                { key: 'confetti35' },
                { key: 'confetti36' },
                { key: 'confetti37' },
                { key: 'confetti38' },
                { key: 'confetti39' },
                { key: 'confetti40' },
                { key: 'confetti41' },
                { key: 'confetti42' },
                { key: 'confetti43' },
                { key: 'confetti44' },
                { key: 'confetti45' },
                { key: 'confetti46' },
                { key: 'confetti47' },
                { key: 'confetti48' },
                { key: 'confetti49' },
            ],
            frameRate: 40,
            hideOnComplete: true,
        });
        this.isRestarting = false;
    }

    setInventory() {
        this.slot1 = document.getElementById('slot-1');
        this.slot2 = document.getElementById('slot-2');
        this.slot3 = document.getElementById('slot-3');
        this.slot4 = document.getElementById('slot-4');

        this.slot1.style.backgroundImage = 'url(/src/assets/images/jersey.png)';
        this.slot2.style.backgroundImage = 'url(/src/assets/images/accessories.png)';
        this.slot3.style.backgroundImage = 'url(/src/assets/images/shoes.png)';
        this.slot4.style.backgroundImage = 'url(/src/assets/images/short.png)';
    }

    updateTimer() {
        this.timeLeft -= 1;
        this.timerText.setText(`Time: ${this.timeLeft}`);

        // When time runs out, trigger game over or transition
        if (this.timeLeft <= 0) {
            this.timerEvent.remove(); // stop the timer
            this.checkIfPlayerLost();
        }
    }

    handleMotion(event) {
        let tilt;
        const tiltThreshold = 1; // sensitivity

        // get screen orientation angle
        const angle = screen.orientation.angle;

        if (angle === 90) {
            // landscape (rotated right)
            tilt = -event.accelerationIncludingGravity.y; // invert y-axis
        } else if (angle === -90 || angle === 270) {
            // landscape (rotated left)
            tilt = event.accelerationIncludingGravity.y; // keep y-axis
        } else {
            // portrait mode
            tilt = event.accelerationIncludingGravity.x; // invert x-axis
        }

        if (!this.laneChangeCooldown) {
            if (tilt > tiltThreshold) {
                this.changeLane(1); // move right
                this.startCooldown();
            } else if (tilt < -tiltThreshold) {
                this.changeLane(-1); // move left
                this.startCooldown();
            }
        }
    }

    startCooldown() {
        this.laneChangeCooldown = true;

        // reset cooldown after 300ms 
        this.time.delayedCall(300, () => {
            this.laneChangeCooldown = false;
        });
    }

    changeLane(direction) {
        // update lane index and ensure it stays within bounds
        this.currentLaneIndex = Phaser.Math.Clamp(
            this.currentLaneIndex + direction,
            0,
            this.lanes.length - 1
        );

        // move snowball to new lane
        this.targetX = this.lanes[this.currentLaneIndex];
    }

    handlePantCollision(snowball, pant) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);
        const pantKey = pant.texture.key;

        this.collectedPants.push(pantKey);  
        
        if (pantKey === 'mclaurinPantsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/mclaurinpants.png)`;
        } else if (pantKey == 'beckhamPantsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/beckhampants.png)`;
        } else if (pantKey == 'curryShortsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/curryshorts.png)`;
        } else if (pantKey == 'doncicShortsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/doncicshorts.png)`;
        } else if (pantKey == 'messiShortsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/messishorts.png)`;
        } else if (pantKey == 'morganShortsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/morganshorts.png)`;
        } else if (pantKey == 'rodmanShortsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/rodmanshorts.png)`;
        } else if (pantKey == 'ohtaniPantsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/ohtanipants.png)`;
        } else if (pantKey == 'zimmermanPantsCollect') {
            this.slot4.style.backgroundImage = `url(/src/assets/images/zimmermanpants.png)`;
        }

        // play confetti animation
        const confettiSprite = this.add.sprite(pant.x, pant.y, 'confetti0');
        confettiSprite.setScale(1.5);
        confettiSprite.play('confetti');

        console.log("Updating Collected Pants:", this.collectedPants);

        pant.destroy();

    }


    handleShoeCollision(snowball, shoe) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);
        const shoeKey = shoe.texture.key;
        
        this.collectedShoes.push(shoeKey);

        if (shoeKey === 'mclaurinCleatsCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/mclaurincleat.png)`;
        } else if (shoeKey === 'beckhamCleatsCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/beckhamcleat.png)`;
        } else if (shoeKey === 'curryShoeCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/curryshoe.png)`;
        } else if (shoeKey === 'doncicShoeCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/doncicshoe.png)`;
        } else if (shoeKey === 'messiCleatsCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/messicleat.png)`;
        } else if (shoeKey === 'morganCleatsCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/usacleat.png)`;
        } else if (shoeKey === 'rodmanCleatsCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/usacleat.png)`;
        } else if (shoeKey === 'ohtaniCleatsCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/ohtanicleat.png)`;
        } else if (shoeKey === 'zimmermanCleatsCollect') {
            this.slot3.style.backgroundImage = `url(/src/assets/images/zimmermancleat.png)`;
        }

        const confettiSprite = this.add.sprite(shoe.x, shoe.y, 'confetti0');
        confettiSprite.setScale(1.5);
        confettiSprite.play('confetti');

        console.log("Updating Collected Shoes:", this.collectedShoes);

        shoe.destroy();
    }

    spawnPant() {
        if (this.levelCompleted) return;

        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const PantTypes = ['mclaurinPantsCollect', 'beckhamPantsCollect',
            'curryShortsCollect', 'doncicShortsCollect',
            'messiShortsCollect', 'morganShortsCollect',
            'rodmanShortsCollect', 'ohtaniPantsCollect', 'zimmermanPantsCollect'];

        let chosenPant;
        const spawnRequiredItemChance = 2; // Set the frequency, higher value = more rare spawn
        if (Phaser.Math.RND.integerInRange(1, spawnRequiredItemChance) === 1) {
            chosenPant = this.requiredPant;  // Set the required item to spawn
        } else {
            chosenPant = Phaser.Math.RND.pick(PantTypes);  // Pick a random item from the available items
        }

        const pant = this.pants.create(randomX, 0, chosenPant);
        pant.setScale(.25);
        pant.setVelocityY(125);
    }

    spawnShoe() {
        if (this.levelCompleted) return;

        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const shoeType = ['mclaurinCleatsCollect', 'beckhamCleatsCollect',
            'curryShoeCollect', 'doncicShoeCollect',
            'messiCleatsCollect', 'morganCleatsCollect',
            'rodmanCleatsCollect', 'ohtaniCleatsCollect', 'zimmermanCleatsCollect'];

        let chosenShoe;
        const spawnRequiredItemChance = 2; // Set the frequency, higher value = more rare spawn
        if (Phaser.Math.RND.integerInRange(1, spawnRequiredItemChance) === 1) {
            chosenShoe = this.requiredShoe;  // Set the required item to spawn
        } else {
            chosenShoe = Phaser.Math.RND.pick(shoeType);  // Pick a random item from the available items
        }

        const shoe = this.shoes.create(randomX, 0, chosenShoe);
        shoe.setScale(.25);
        shoe.setVelocityY(125);
    }


    showInventory() {
        const inventoryBox = document.getElementById('inventory-box');
        if (inventoryBox) {
            inventoryBox.style.display = 'flex';
        }
    }

    update() {

        // update snowball position if needed
        const speed = 1000; // pixels per second
        const threshold = 1; // snap threshold for close distances
        const distance = Math.abs(this.snowball.x - this.targetX); //  distance to the target
        // only move if the snowball isn't already at the target position
        if (distance > threshold) {
            // interpolate towards the target position
            const moveAmount = speed * this.game.loop.delta / 1000;
            // ensure we don't overshoot the target position
            if (distance <= moveAmount) {
                this.snowball.x = this.targetX; // snap to target
            } else {
                this.snowball.x += Math.sign(this.targetX - this.snowball.x) * moveAmount;
            }
        } else {
            this.snowball.x = this.targetX; // snap to target 
        }

        this.ground.tilePositionY -= 1; // move the ground
        this.snowball.rotation += 0.01;

        // cleanup for off-screen

        this.shoes.getChildren().forEach(shoe => {
            if (shoe && shoe.y > this.scale.height) {
                shoe.destroy();
            }
        });

        this.pants.getChildren().forEach(pant => {
            if (pant && pant.y > this.scale.height) {
                pant.destroy();
            }
        });

    }

    showLevelUpScene() {
        this.physics.pause();

        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.7);
        this.overlay.fillRect(0, 0, this.scale.width, this.scale.height);

        this.nextLevelButton = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'nextLevelButton')
            .setInteractive();
        this.nextLevelButton.on('pointerdown', () => {
            this.scene.start('LevelTwo');
        });

        const levelUpText = this.add.text(this.scale.width / 2, this.scale.height / 3, 'Level Complete!', {
            fontSize: '48px',
            fill: '#fff',
            align: 'center'
        });
        levelUpText.setOrigin(0.5);

    }

    checkIfPlayerLost() {
        // define required items (example: shoes and pants)
        const lastCollectedPant = this.collectedPants[0];
        const lastCollectedShoe = this.collectedShoes[0];

        if (lastCollectedPant !== this.requiredPant || lastCollectedShoe !== this.requiredShoe) {
            this.restartLevel();
        } else if (lastCollectedPant == this.requiredPant &&
            lastCollectedShoe == this.requiredShoe) {
            this.levelCompleted = true;
            this.showLevelUpScene();
        }

    }

    restartLevel() {
        if (this.isRestarting) return; // If already restarting, exit early

        this.isRestarting = true; // Prevent further calls until reset

        // Pause gameplay
        this.physics.pause();

        // Create a semi-transparent overlay
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.7); // Semi-transparent black
        overlay.fillRect(0, 0, this.scale.width, this.scale.height); // Draw the rectangle to cover the screen
        overlay.setDepth(10); // Ensure overlay is above other objects

        // Display the initial message
        const loseText = this.add.text(this.scale.width / 2, this.scale.height / 3, 'Level Failed!', {
            fontSize: '48px',
            fill: '#fff',
            align: 'center'
        });
        loseText.setOrigin(0.5);
        loseText.setDepth(11); // Ensure text is above the overlay

        // Countdown logic
        const countdownText = this.add.text(this.scale.width / 2, this.scale.height / 2, '3', {
            fontSize: '64px',
            fill: '#fff',
            align: 'center'
        });
        countdownText.setOrigin(0.5);
        countdownText.setDepth(11); // Ensure countdown text is above the overlay

        let countdownValue = 3;
        const countdownTimer = this.time.addEvent({
            delay: 1000, // 1 second per countdown step
            repeat: 2,   // Repeat 2 more times (for 2 and 1)
            callback: () => {
                countdownValue--;
                countdownText.setText(countdownValue.toString()); // Update the countdown text
            }
        });

        // Schedule the restart after the countdown finishes
        this.time.delayedCall(3000, () => {
            // Clear the countdown text and update the message
            countdownText.destroy();
            loseText.setText('Restarting...');

            // Restart the scene after a small delay
            this.time.delayedCall(500, () => {
                this.isRestarting = false; // Reset the flag
                this.scene.restart(); // Restart the scene
                this.timeLeft = 30;
                let playerLost = false;
            });
        });
    }
}


