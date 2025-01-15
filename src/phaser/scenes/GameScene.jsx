import Phaser, { Game } from 'phaser';
import StartScene from './StartScene';
import InstructionScene from './InstructionScene';
import Level1Scene from './Level1Scene';
import Level2Scene from './Level2Scene';
import Level3Scene from './Level3Scene';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.ground = null;
        this.snowball = null;
        this.speedY = 1;

        this.orientation = null;

        this.snowballTarget = 10;
        this.levelCompleted = false;
        this.score = 0;
        this.level = 1;
        this.overlay = null;
        this.nextLevelButton = null;

        this.spawnObstacleEvent = null;
        this.spawnSnowAdderEvent = null;
        this.spawnCollectibleEvent = null;
        this.spawnShoeEvent = null;
        this.spawnThingEvent = null;
        this.spawnPantEvent = null;
        this.tiltControlsActive = false;
    }

    preload() {
        // load game assets
        this.load.image('ground', '/src/assets/images/newbackg.png');
        this.load.image('snowball', '/src/assets/images/snowball.png');
        this.load.image('nextLevelButton', '/src/assets/images/nextLevelButton.png');
        this.load.image('startButton', '/src/assets/images/startButton.png');


        this.load.image('snowAdderImage', '/src/assets/images/snowballCollect.png');

        this.load.image('football', '/src/assets/images/football.png')
        this.load.image('baseballbat', '/src/assets/images/baseballbat.png');
        this.load.image('net', '/src/assets/images/net.png');
        this.load.image('basketball', '/src/assets/images/basketball.png');

        //jerseys
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

        // snowball poof animation
        for (let i = 1; i <= 12; i++) {
            this.load.image(`poof${i}`, `/src/assets/images/poof/poof${i}.png`);
        }

        // confetti animation
        for (let i = 0; i <= 49; i++) {
            this.load.image(`confetti${i}`, `/src/assets/images/confetti/confetti${i}.png`);
        }

    }

    create() {
        this.setInventory();

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

        this.obstacles = this.physics.add.group(); // obstacles
        this.snowAdders = this.physics.add.group();
        this.collectibles = this.physics.add.group();
        this.shoes = this.physics.add.group();
        this.things = this.physics.add.group();
        this.pants = this.physics.add.group();

        this.spawnObstacleEvent = this.time.addEvent({ delay: 2000, callback: this.spawnObstacle, callbackScope: this, loop: true });
        this.spawnSnowAdderEvent = this.time.addEvent({ delay: 3000, callback: this.spawnSnowAdder, callbackScope: this, loop: true });
        
        
        this.spawnPantEvent = this.time.addEvent({ delay: 4750, callback: this.spawnPant, callbackScope: this, loop: true });
        this.spawnShoeEvent = this.time.addEvent({ delay: 4250, callback: this.spawnShoe, callbackScope: this, loop: true });
        
        this.spawnCollectibleEvent = this.time.addEvent({ delay: 4000, callback: this.spawnCollectible, callbackScope: this, loop: true });
        
        this.spawnThingEvent = this.time.addEvent({ delay: 4500, callback: this.spawnThing, callbackScope: this, loop: true });

        // collision detection for obstacles
        this.physics.add.collider(this.snowball, this.obstacles, this.handleObstacleCollision, null, this);
        this.physics.add.collider(this.snowball, this.snowAdders, this.handleSnowAdderCollision, null, this);
        this.physics.add.collider(this.snowball, this.collectibles, this.handleCollectibleCollision, null, this);
        this.physics.add.collider(this.snowball, this.shoes, this.handleShoeCollision, null, this);
        this.physics.add.collider(this.snowball, this.things, this.handleThingCollision, null, this);
        this.physics.add.collider(this.snowball, this.pants, this.handlePantCollision, null, this);

        this.score = 0;

        // display score
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText.setDepth(10); // score will display above game

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

        // check if DeviceMotionEvent is supported 
        const isTiltSupported =
            typeof DeviceMotionEvent !== 'undefined' &&
            (navigator.userAgent.toLowerCase().includes('android') || navigator.userAgent.toLowerCase().includes('iphone'));

        if (isTiltSupported) {
            // Enable Tilt Control button
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
                                document.body.removeChild(enableTiltButton); // remove button
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

        this.updateLevel();

        // create snowball poof animation
        this.anims.create({
            key: 'poof',
            frames: [
              { key: 'poof1' },
              { key: 'poof2' },
              { key: 'poof3' },
              { key: 'poof4' },
              { key: 'poof5' },
              { key: 'poof6' },
              { key: 'poof7' },
              { key: 'poof8' },
              { key: 'poof9' },
              { key: 'poof10' },
              { key: 'poof11' },
              { key: 'poof12' },
            ],
            frameRate: 10,
            hideOnComplete: true, // Automatically hide the sprite after the animation completes
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
    }

    updateLevel() {

        if(this.score <0){
            this.youLose();
            return;
        }
        if (this.level === 1) {
            this.snowballTarget = 10;
        } else if (this.level === 2) {
            this.snowballTarget = 7;
        } else if (this.level === 3) {
            this.snowballTarget = 5;
        } 

        }

    youLose() {

    this.overlay = this.add.graphics();
    this.overlay.fillStyle(0x000000, 0.7); // Semi-transparent black
    this.overlay.fillRect(0, 0, this.scale.width, this.scale.height);

    // Show "You Lose!" text
    this.removeOverlayAndButton();
    this.add.text(this.scale.width / 2, this.scale.height / 2, 'You Lose!', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
  
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

    handleObstacleCollision(snowball, obstacle) {
        snowball.body.setVelocity(0, 0);  // no obstacle movement
        snowball.body.setBounce(0);       // no bounce
        snowball.body.setFriction(0);     // no friction
        
        // update score
        this.score -= 1;
        this.scoreText.setText('Score: ' + this.score);

        // decrease size of snowball
        snowball.setScale(snowball.scaleX - 0.03);
        
        // play poof animation
        const poofSprite = this.add.sprite(snowball.x, snowball.y, 'poof1');
        poofSprite.setScale(2);
        poofSprite.play('poof');
        
        obstacle.destroy(); // disappear
    }

    handleSnowAdderCollision(snowball, snowAdder) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);

        this.score += 3;
        this.scoreText.setText('Score: ' + this.score);

        // glow effect
        snowball.setTint(0xB0E0FF); // Light blue tint
        this.time.delayedCall(300, () => {
            snowball.clearTint(); // Remove the tint after 200ms
        });

        // smooth expansion
        this.tweens.add({
            targets: snowball,
            scale: snowball.scaleX + 0.03,
            duration: 300,
            ease: 'Sine.easeInOut',
        });

        snowAdder.destroy();

        if (this.score >= this.snowballTarget && !this.levelCompleted) {
            this.levelCompleted = true;
            this.handleLevelComplete();
        }
    }

    handleLevelComplete() {
        this.physics.world.pause();

        if (this.spawnObstacleEvent) {
            this.spawnObstacleEvent.paused = true;
        }
        if (this.spawnSnowAdderEvent) {
            this.spawnSnowAdderEvent.paused = true;
        }
        if (this.spawnCollectibleEvent) {
            this.spawnCollectibleEvent.paused = true;
        }
        if (this.spawnShoeEvent) {
            this.spawnShoeEvent.paused = true;
        }
        if (this.spawnThingEvent) {
            this.spawnThingEvent.paused = true;
        }
        if (this.spawnPantEvent) {
            this.spawnPantEvent.paused = true;
        }

        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 1); // Semi-transparent black
        this.overlay.fillRect(0, 0, this.scale.width, this.scale.height);

        this.nextLevelButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'nextLevelButton').setInteractive();
        this.nextLevelButton.setDepth(2);

        this.nextLevelButton.on('pointerdown', () => {
            this.nextLevel();
        });
        this.level++;
        this.updateLevel();
    }

    nextLevel() {
        
        this.snowball.body.setVelocity(0, 0);
        this.snowball.body.setBounce(0, 0);
        this.snowball.body.setFriction(0, 0);
        this.snowball.setPosition(this.scale.width / 2, this.scale.height * 3 / 4);
        this.snowball.setScale(0.2);
        this.clearSpawnedItems();


        if (this.level <= 3) {
            this.levelCompleted = false;
            this.score = 0;
            this.scoreText.setText('Score: ' + this.score);

            this.updateLevel();
            this.physics.world.resume();
            this.startSpawns();
            this.setInventory();

            this.removeOverlayAndButton();
        } else {
            this.handleWin();
        }

        this.event.stopPropagation();
    }

    removeOverlayAndButton() {
        if (this.overlay) {
            this.overlay.destroy();
            this.overlay = null;
        }
        if (this.nextLevelButton) {
            this.nextLevelButton.destroy();
            this.nextLevelButton = null;
        }
    }

    clearSpawnedItems() {
        this.obstacles.children.each(obstacle => obstacle.destroy());
        this.snowAdders.children.each(snowAdder => snowAdder.destroy());
        this.collectibles.children.each(collectible => collectible.destroy());
        this.shoes.children.each(shoe => shoe.destroy());
        this.things.children.each(thing => thing.destroy());
        this.pants.children.each(pant => pant.destroy());

    }

    startSpawns() {
        if (this.spawnObstacleEvent) {
            this.spawnObstacleEvent.paused = false;
        }
        if (this.spawnSnowAdderEvent) {
            this.spawnSnowAdderEvent.paused = false;
        }
        if (this.spawnCollectibleEvent) {
            this.spawnCollectibleEvent.paused = false;
        }
        if (this.spawnShoeEvent) {
            this.spawnShoeEvent.paused = false;
        }
        if (this.spawnThingEvent) {
            this.spawnThingEvent.paused = false;
        }
        if (this.spawnPantEvent) {
            this.spawnPantEvent.paused = false;
        }

    }

    handleWin() {
        this.removeOverlayAndButton();
        this.overlay.fillStyle(0x000000, 0.7); // Semi-transparent black
        this.add.text(this.scale.width / 2, this.scale.height / 2, 'You Win!', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.time.delayedCall(2000, this.resetGame, this);
    }

    resetGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.scoreText.setText('Score: ' + this.score);
        this.scene.restart();
    }

    handlePantCollision(snowball, pant) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);
        const pantKey = pant.texture.key;

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

        pant.destroy();
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

    handleShoeCollision(snowball, shoe) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);
        const shoeKey = shoe.texture.key;

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

        shoe.destroy();
    }

    handleCollectibleCollision(snowball, collectible) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);
        const collectibleKey = collectible.texture.key;

        if (collectibleKey === 'mclaurinJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/mclaurin.png)`;
        } else if (collectibleKey === 'beckhamJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/beckham.png)`;
        } else if (collectibleKey === 'curryJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/curry.png)`;
        } else if (collectibleKey === 'doncicJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/doncic.png)`;
        } else if (collectibleKey === 'ohtaniJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/ohtani.png)`;
        } else if (collectibleKey === 'zimmermanJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/zimmerman.png)`;
        } else if (collectibleKey === 'morganJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/morgan.png)`;
        } else if (collectibleKey === 'rodmanJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/rodman.png)`;
        } else if (collectibleKey === 'messiJerseyCollect') {
            this.slot1.style.backgroundImage = `url(/src/assets/images/messi.png)`;
        }

        // play confetti animation
        const confettiSprite = this.add.sprite(collectible.x, collectible.y, 'confetti0');
        confettiSprite.setScale(1.5);
        confettiSprite.play('confetti');
        
        collectible.destroy();
    }
    spawnObstacle() {
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const obstacleTypes = ['football', 'baseballbat', 'net', 'basketball'];
        const randomObstacleType = Phaser.Math.RND.pick(obstacleTypes);

        const obstacle = this.obstacles.create(randomX, 0, randomObstacleType);

        if (randomObstacleType === 'baseballbat') {
            obstacle.setScale(0.15);
            obstacle.setVelocityY(100);
            obstacle.rotationSpeed = 0.02;
        } else if (randomObstacleType === 'basketball') {
            obstacle.rotationSpeed = 0.01;
            obstacle.setScale(0.15);
            obstacle.setVelocityY(200);
        } else if (randomObstacleType === 'net') {
            obstacle.setScale(0.3);
            obstacle.setVelocityY(300);
        } else if (randomObstacleType === 'football') {
            obstacle.setScale(0.1);
            obstacle.setVelocityY(250);
            obstacle.rotationSpeed = 0.02;
        }
    }

    spawnSnowAdder() {
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);  // randomly pick one of the x positions

        const snowAdder = this.snowAdders.create(randomX, 0, 'snowAdderImage'); // spawn at top
        snowAdder.setScale(0.1); // scale the snowAdder down
        snowAdder.setVelocityY(100); // make the obstacle move downward
    }

    spawnPant() {
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const PantTypes = ['mclaurinPantsCollect', 'beckhamPantsCollect',
            'curryShortsCollect', 'doncicShortsCollect',
            'messiShortsCollect', 'morganShortsCollect',
            'rodmanShortsCollect', 'ohtaniPantsCollect', 'zimmermanPantsCollect']
        const ChoosePant = Phaser.Math.RND.pick(PantTypes);

        const pant = this.pants.create(randomX, 0, ChoosePant);
        pant.setScale(.25);
        pant.setVelocityY(50);
    }

    spawnThing() {
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

    spawnCollectible() {
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const collectibleJerseyType = ['mclaurinJerseyCollect', 'beckhamJerseyCollect',
            'curryJerseyCollect', 'doncicJerseyCollect',
            'ohtaniJerseyCollect', 'zimmermanJerseyCollect',
            'morganJerseyCollect', 'rodmanJerseyCollect', 'messiJerseyCollect']
        const JerseyType = Phaser.Math.RND.pick(collectibleJerseyType);

        const collectible = this.collectibles.create(randomX, 0, JerseyType);
        collectible.setScale(.35);
        collectible.setVelocityY(50);
    }

    spawnShoe() {
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const shoeType = ['mclaurinCleatsCollect', 'beckhamCleatsCollect',
            'curryShoeCollect', 'doncicShoeCollect',
            'messiCleatsCollect', 'morganCleatsCollect',
            'rodmanCleatsCollect', 'ohtaniCleatsCollect', 'zimmermanCleatsCollect']
        const RandomShoeType = Phaser.Math.RND.pick(shoeType);

        const shoe = this.shoes.create(randomX, 0, RandomShoeType);
        shoe.setScale(.25);
        shoe.setVelocityY(50);
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

        this.obstacles.getChildren().forEach(obstacle => {
            if (obstacle && obstacle.y > this.scale.height) {
                obstacle.destroy();
            } else if (obstacle.rotationSpeed) {
                obstacle.rotation += obstacle.rotationSpeed;
            }
        });

        this.snowAdders.getChildren().forEach(snowAdder => {
            if (snowAdder && snowAdder.y > this.scale.height) {
                snowAdder.destroy();
            }
        });

        this.collectibles.getChildren().forEach(collectible => {
            if (collectible && collectible.y > this.scale.height) {
                collectible.destroy();
            }
        });

        this.shoes.getChildren().forEach(shoe => {
            if (shoe && shoe.y > this.scale.height) {
                shoe.destroy();
            }
        });

        this.things.getChildren().forEach(thing => {
            if (thing && thing.y > this.scale.height) {
                thing.destroy();
            }
        });

        if (this.score >= this.snowballTarget && !this.levelCompleted) {
            this.levelCompleted = true;
            this.handleLevelComplete();
        }

    }

}

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
        parent,
    };

    return new Phaser.Game(baseConfig);
};

export { buildPhaserGame };
