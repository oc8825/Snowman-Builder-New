import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.ground = null;
        this.snowball = null;
        this.speedY = 1; // Vertical speed for both the snowball and the background
    }

    preload() {
        // load game assets
        this.load.image('ground', '/src/assets/images/newbackg.jpg');
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
        //background
        this.ground = this.add.tileSprite(
            this.scale.width/2,
            this.scale.height/2, // Center vertically
            this.scale.width, // Width matches the canvas
            this.scale.height, // Height matches the canvas
            "ground"
        );

        //snowball sprite
        this.snowball = this.physics.add.sprite(this.scale.width / 2, this.scale.height * 3 / 4, 'snowball');
        this.snowball.setScale(0.2);
        this.snowball.setOrigin(.5, .5);

        this.setInventory();

        //group of obstacles
        this.obstacles = this.physics.add.group();

        //group of snow adders
        this.snowAdders = this.physics.add.group();

        // timed event for obstacles spawning
        this.time.addEvent({
            delay: 2000, // Spawn every 2000ms (2 seconds)
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true, // Keep repeating
        });

        // timed event for snowAdders spawning
        this.time.addEvent({
            delay: 3000, // Spawn every 3000ms (3 seconds)
            callback: this.spawnSnowAdder,
            callbackScope: this,
            loop: true, // Keep repeating
        });

        // collider for colision detection for obstacles
        this.physics.add.collider(this.snowball, this.obstacles, this.handleObstacleCollision, null, this);

        // collider for colision detection for snowAdders
        this.physics.add.collider(this.snowball, this.snowAdders, this.handleSnowAdderCollision, null, this);

        //initialize score
        this.score = 0;

        //display score
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });

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

    }


    handleObstacleCollision(snowball, obstacle) {
        console.log('Collision detected!');
        
        // Disable the obstacle from moving
        snowball.body.setVelocity(0, 0);  // Make sure obstacle doesn't move

        snowball.body.setBounce(0);    // Prevent bounce
        snowball.body.setFriction(0);  // Prevent friction from applying

        // decrease score
        this.score -= 1;
        // Update the score display
        this.scoreText.setText('Score: ' + this.score);
        
        obstacle.destroy(); // Remove the obstacle on collision
    }


    handleSnowAdderCollision(snowball, snowAdder) {
        console.log('Snow added!');
        
        // Disable the obstacle from moving
        snowball.body.setVelocity(0, 0);  // Make sure obstacle doesn't move

        snowball.body.setBounce(0);    // Prevent bounce
        snowball.body.setFriction(0);  // Prevent friction from applying

        // decrease score
        this.score += 1;
        // Update the score display
        this.scoreText.setText('Score: ' + this.score);
        
        snowAdder.destroy(); // Remove the obstacle on collision
    }

    spawnObstacle() {
        // Randomly choose one of the three x positions
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);  // Randomly pick one of the x positions
        
        const obstacle = this.obstacles.create(randomX, 0, 'obstacleImage'); // Spawn at the top
        obstacle.setScale(0.1); // Scale the obstacle down
        obstacle.setVelocityY(100); // Make the obstacle move downward
    }

    spawnSnowAdder() {
        // Randomly choose one of the three x positions
        const xPositions = [this.scale.width / 6, this.scale.width / 2, this.scale.width * 5 / 6];
        const randomX = Phaser.Math.RND.pick(xPositions);  // Randomly pick one of the x positions
        
        const snowAdder = this.snowAdders.create(randomX, 0, 'snowAdderImage'); // Spawn at the top
        snowAdder.setScale(0.1); // Scale the snowAdder down
        snowAdder.setVelocityY(100); // Make the obstacle move downward
    }

    setInventory() {
        //slot variables
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

        // cleaning up obstacles 
        this.obstacles.getChildren().forEach(obstacle => {
            if (obstacle && obstacle.y > this.scale.height) {
                obstacle.destroy(); // Clean up obstacles out of bounds
            }
        });
    }

    handleDeviceMotion(event) {
        const { beta, gamma } = event;

        console.log('Device orientation detected: beta=${beta}, gamma=${gamma}');

        if (beta === null || gamma === null) {
            console.warn('Device orientation values are null. Motion may not be supported or enabled.');
            return;
        }

        //Define the maxiumm speed for the sprite
        const maxSpeed = 300;

        //Calculate the velocity based on tilt
        const xVelocity = Phaser.Math.Clamp(gamma * 5, -maxSpeed, maxSpeed);
        const yVelocity = Phaser.Math.Clamp(beta * 5, -maxSpeed, maxSpeed);

        console.log('Calculated velocities: x=${xVelocity}, y=${yVelocity}');

        //Set the velocity for the sprite
        this.sprite.setVelocity(xVelocity, yVelocity);
        }
 }
    


export default GameScene;