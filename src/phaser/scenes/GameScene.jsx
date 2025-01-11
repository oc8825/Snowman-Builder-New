import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.ground = null;
        this.snowball = null;
        this.speedY = 1;
    }

    preload() {
        // load game assets
        this.load.image('ground', '/src/assets/images/newbackg.png');
        this.load.image('snowball', '/src/assets/images/snowball.png');
        this.load.image('short', '/src/assets/images/short.png');
        this.load.image('jersey', '/src/assets/images/jersey.png');
        this.load.image('shoes', '/src/assets/images/shoes.png');
        this.load.image('cap', '/src/assets/images/accessories.png');
        this.load.image('obstacleImage', '/src/assets/images/football.png');
        this.load.image('snowAdderImage', '/src/assets/images/soccer.png');

      //  this.load.image('', '/src/assets/images/net.png');
       //  this.load.image('', '/src/assets/images/baseball.png');
        // this.load.image('', '/src/assets/images/basketball-hoop.png');
       //  this.load.image('', '/src/assets/images/basketball.png');
        // this.load.image('', '/src/assets/images/beckham.png');
       //  this.load.image('', '/src/assets/images/curry.png');
       //  this.load.image('', '/src/assets/images/doncic.png');
       //  this.load.image('', '/src/assets/images/mclaurin.png');
         //this.load.image('', '/src/assets/images/messi.png');
       //  this.load.image('', '/src/assets/images/morgan.png');
      //   this.load.image('', '/src/assets/images/ohtani.png');
       //  this.load.image('', '/src/assets/images/rodman.png');
       //  this.load.image('', '/src/assets/images/zimmerman.png');

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

        // snowball sprite
        this.snowball = this.physics.add.sprite(this.scale.width / 2, this.scale.height * 3 / 4, 'snowball');
        this.snowball.setScale(0.2);
        this.snowball.setOrigin(0.5, 0.5);

        this.setInventory();

        this.obstacles = this.physics.add.group(); //obstacles
        this.snowAdders = this.physics.add.group(); // snow adders

        this.time.addEvent({
            delay: 2000, // spawn every 2 seconds
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true, //  repeating
        });

        this.time.addEvent({
            delay: 3000,
            callback: this.spawnSnowAdder,
            callbackScope: this,
            loop: true,
        });

        // collision detection for obstacles
        this.physics.add.collider(this.snowball, this.obstacles, this.handleObstacleCollision, null, this);

        // collision detection for snowAdders
        this.physics.add.collider(this.snowball, this.snowAdders, this.handleSnowAdderCollision, null, this);

        this.score = 0;

        // display score
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText.setDepth(10); // score will display above game

        //Check if device orienation is supported 
        if (window.DeviceOrientationEvent) {
            console.log('DeviceOrientationEvent is supported!');

        //For iOS, request permission for device motion
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    if (response === 'granted') {
                        console.log('Motion permission granted!');
                        window.addEventListener('deviceorientation', this.handleDeviceMotion.bind(this));
                    } else {
                        console.log('Motion permission denied!');
                    }
                })
                .catch((error) => {
                    console.error('Request permission error: ', error);
                });
            } else {
                //Non-iOS devices
                window.addEventListener('deviceorientation', this.handleDeviceMotion.bind(this));
            }
        } else {
            console.log('DeviceOrientationEvent is NOT supported!');
        }

        //Log device orientation plugin
        if (this.orientation) {
            console.log('Device orientation plugin is active.');
        } else {
            console.warn('Device orientation plugin not available.');
        }
    
    }


    handleObstacleCollision(snowball, obstacle) {
        snowball.body.setVelocity(0, 0);  // no obstacle movement
        snowball.body.setBounce(0);       // no bounce
        snowball.body.setFriction(0);     // no friction
        this.score -= 1;
        this.scoreText.setText('Score: ' + this.score); // update score
        obstacle.destroy(); // disappear
    }


    handleSnowAdderCollision(snowball, snowAdder) {
        snowball.body.setVelocity(0, 0);
        snowball.body.setBounce(0);
        snowball.body.setFriction(0);

        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);

        snowAdder.destroy();
    }

    spawnObstacle() {
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);

        const obstacle = this.obstacles.create(randomX, 0, 'obstacleImage');
        obstacle.setScale(0.15);
        obstacle.setVelocityY(100);
        obstacle.rotation += 0.01;
    }

    spawnSnowAdder() {
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);  // Randomly pick one of the x positions
        
        const snowAdder = this.snowAdders.create(randomX, 0, 'snowAdderImage'); // Spawn at the top
        snowAdder.setScale(0.1); // Scale the snowAdder down
        snowAdder.setVelocityY(100); // Make the obstacle move downward
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
        if (this.orientation) {
            const { gamma, beta } = this.orientation;
        //Map tilt data to velocity 
        const maxSpeed = 300;
        const xVelocity = Phaser.Math.Clamp(gamma * 5, -maxSpeed, maxSpeed);
        const yVelocity = Phaser.Math.Clamp(beta * 5, -maxSpeed, maxSpeed);

        //Apply velocity to snowball
        this.snowball.setVelocity(xVelocity, yVelocity);
        }

        //tilt
        if (typeof window.DeviceOrientationEvent !== 'undefined') {
            window.addEventListener('deviceorientation', handleOrientation);
        }
        function handleOrientation(event) {
            let tiltX = event.gamma;
            let tiltY = event.beta;

            tiltX = Phaser.Math.Clamp(tiltX, -30, 30);
            tiltY = Phaser.Math.Clamp(tiltY, -30, 30);
        }

        this.ground.tilePositionY -= 1;
        this.snowball.rotation += 0.01;

        this.obstacles.getChildren().forEach(obstacle => {
            if (obstacle && obstacle.y > this.scale.height) {
                obstacle.destroy();
            }
        });
    }

    handleOrientation(event) {
        // Extract tilt data
        const { beta, gamma } = event;
    }
    
}

export default GameScene;
export { buildPhaserGame };
