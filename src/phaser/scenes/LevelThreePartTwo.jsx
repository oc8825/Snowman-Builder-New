export default class LevelThreePartTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelThreePartTwo'});
        this.ground = null;
        this.snowball = null;
        this.speedY = 1;

        this.orientation = null;

        this.levelCompleted = false;
        this.overlay = null;
        this.nextLevelButton = null;

        this.spawnThingEvent = null;
        this.tiltControlsActive = false;

        this.collectedThings = [];

        this.timerText = null;
        this.timerEvent = null;
        this.timeLeft = 30;

        this.isRestarting = false;
    
    }

    preload() {
        // load game assets
        this.load.image('ground', '/src/assets/images/newbackg.png');
        this.load.image('snowball', '/src/assets/images/snowball.png');
        this.load.image('arrow', '/src/assets/images/arrow.png');
        this.load.image('startButton', '/src/assets/images/startButton.png');

        //accessories
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

        // confetti animation
        for (let i = 0; i <= 49; i++) {
            this.load.image(`confetti${i}`, `/src/assets/images/confetti/confetti${i}.png`);
        }

    }

    create() {

        // background
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
        this.targetX = this.lanes[this.currentLaneIndex]; // Target x position for the snowball

        // snowball sprite
        this.snowball = this.physics.add.sprite(this.lanes[this.currentLaneIndex], this.scale.height * 3 / 4, 'snowball');
        this.snowball.setScale(0.2);
        this.snowball.setOrigin(0.5, 0.5);

        this.things = this.physics.add.group();

        this.spawnThingEvent = this.time.addEvent({ delay: 4500, callback: this.spawnThing, callbackScope: this, loop: true });

        // collision detection for obstacles
        this.physics.add.collider(this.snowball, this.things, this.handleThingCollision, null, this);

        this.timerText = this.add.text(this.scale.width - 200, 10, `Time: ${this.timeLeft}`, { fontSize: '32px', fill: '#000' });
        this.timerText.setDepth(10);

        this.timerEvent = this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
       
        // set up controls for lane switching
        this.targetX = this.lanes[this.currentLaneIndex]; // Target x position for the snowball

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
            hideOnComplete: true, // Automatically hide the sprite after the animation completes
          });

          // create flag so don't restart multiple times in a row
    }

    updateTimer(){
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


    handleThingCollision(snowball, thing) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);
        const thingKey = thing.texture.key;

        if (thingKey === 'mclaurinHelmetCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/mclaurinhelmet.png)`;
        } else if (thingKey === 'beckhamHelmetCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/beckhamhelmet.png)`;
        } else if (thingKey === 'curryHeadbandCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/curryheadband.png)`;
        } else if (thingKey === 'doncicHeadbandCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/doncicheadband.png)`;
        } else if (thingKey === 'messiCuffCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/messicuff.png)`;
        } else if (thingKey === 'morganCuffCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/usacuff.png)`;
        } else if (thingKey === 'rodmanCuffCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/usacuff.png)`;
        } else if (thingKey === 'ohtaniHelmetCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/ohtanihelmet.png)`;
        } else if (thingKey === 'zimmermanHelmetCollect') {
            this.slot2.style.backgroundImage = `url(/src/assets/images/zimmermanhelmet.png)`;
        }

        const confettiSprite = this.add.sprite(thing.x, thing.y, 'confetti0');
        confettiSprite.setScale(1.5);
        confettiSprite.play('confetti');

        thing.destroy();
    }

    

    spawnThing() {
        if(this.levelCompleted) return;

        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const ThingTypes = ['mclaurinHelmetCollect', 'beckhamHelmetCollect',
            'curryHeadbandCollect', 'doncicHeadbandCollect',
            'messiCuffCollect', 'morganCuffCollect',
            'rodmanCuffCollect', 'ohtaniHelmetCollect', 'zimmermanHelmetCollect']
        const ChooseThing = Phaser.Math.RND.pick(ThingTypes);

        const thing = this.things.create(randomX, 0, ChooseThing);
        thing.setScale(.25);
        thing.setVelocityY(50);
    }


    update() {

        // update snowball position if needed
        const speed = 1000; // pixels per second
        const threshold = 1; // snap threshold for close distances
        const distance = Math.abs(this.snowball.x - this.targetX); // Calculate the distance to the target
        // only move if the snowball isn't already at the target position
        if (distance > threshold) {
            // interpolate towards the target position
            const moveAmount = speed * this.game.loop.delta / 1000;
            // esnure we don't overshoot the target position
            if (distance <= moveAmount) {
                this.snowball.x = this.targetX; // snap to target
            } else {
                this.snowball.x += Math.sign(this.targetX - this.snowball.x) * moveAmount; // Move closer
            }
        } else {
            this.snowball.x = this.targetX; // Snap to target if close enough
        }

        this.ground.tilePositionY -= 1; // move the ground
        this.snowball.rotation += 0.01;

        // cleanup for off-screen

        this.things.getChildren().forEach(thing => {
            if (thing && thing.y > this.scale.height) {
                thing.destroy();
            }
        });

    }

    showLevelUpScene(){
        this.physics.pause();

        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.7);
        this.overlay.fillRect(0, 0, this.scale.width, this.scale.height);

        this.arrowButton = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'arrow')
        .setInteractive();
        this.arrowButton.on('pointerdown', () => {
            this.scene.start('YouWin');
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
        const requiredThings = ['mclaurinPantsCollect', 'beckhamPantsCollect', 'curryShortsCollect'];
    
        const lastCollectedThing= this.lastCollectedThings[this.lastCollectedThing.length - 1];

        let playerLost = false;

        if (!requiredThings.includes(lastCollectedThing) ){
            playerLost = true;  // player loses if the last item does not match
        }
    
        if (playerLost) {
            this.restartLevel(); 
        } else {
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
            });
        });
    }
}
