class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        //this.load.image('starfield', './assets/starfield.png');
        this.load.image('ufo', './assets/ufo.png');
        this.load.image('explode', './assets/explode.png');
        this.load.image('space', './assets/space.png');
        this.load.atlas('flares', './assets/flares.png', './assets/flares.json');   // load particle emmiter

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight:
        32, startFrame: 9, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.space = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2,
            0x5A73D6).setOrigin(0, 0);
        // cream borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFAEAA7).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,
            0xFAEAA7).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFAEAA7).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFAEAA7).setOrigin(0, 0);
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - 
            borderPadding, 'rocket').setOrigin(0.5, 0);
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 7, borderUISize * 5,
            'spaceship', 0, 3).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 4, borderUISize * 6 +
            borderPadding * 3, 'spaceship', 0, 2).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 7 + borderPadding * 5,
            'spaceship', 0, 1).setOrigin(0, 0);

        // add smaller ufo/spaceship object
        this.ufo = new Ufo(this, game.config.width + borderUISize * 10, borderUISize * 4,
            'ufo', 0, 4).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
     

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#6FEDD2',
            color: '#E269FA',
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + 
            borderPadding * 2, this.p1score, scoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        // play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER',
                scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu',
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
        
        // display time
        this.showTime = this.add.text(borderUISize + 500, borderUISize + 
            borderPadding * 2, this.clock.getElapsedSeconds(), scoreConfig);
        
        // display "Fire and Computer UI"
        this.fire = this.add.text(borderUISize + 200, borderUISize + 
            borderPadding * 2, "FIRE", scoreConfig);
        this.fire = this.add.text(borderUISize + 300, borderUISize + 
            borderPadding * 2, "COMPUTER", scoreConfig);
    
        // move rocket using mouse
        this.input.on('pointermove', function(pointer){

            if(!this.p1Rocket.isFiring || this.p1Rocket.isFiring && !this.gameOver){
                        this.p1Rocket.x += pointer.movementX;
            }
        }, this); 

        // fire button using mouse
        this.input.on('pointerdown', function(pointer){
            this.input.mouse.requestPointerLock();

            if(!this.p1Rocket.isFiring && pointer.leftButtonDown() && !this.gameOver){
                this.p1Rocket.isFiring = true;
                this.p1Rocket.sfxRocket.play();  // play sfx
            }
        }, this);
        
        // create sound instance 
        // cite: rexrainbow phaser 3 audio
        var config = {
            mute: false,
            volume: 0.25,
            rate:1,
            detune:0,
            seek:0,
            loop: true,
            delay: 0
        }

        this.background_sfx = this.sound.add('bgm_space');
        this.background_sfx.play(config);
        
     
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        this.space.tilePositionX -= 1;  // moving background

        if(!this.gameOver){
            this.p1Rocket.update(); // update rocket sprite
            this.ship01.update();   // update spaceships (x3)
            this.ship02.update();
            this.ship03.update(); 
            this.ufo.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ufo)){
            this.p1Rocket.reset();
            this.shipExplode(this.ufo);
        }
        // updated show the timer
        this.timeLeft = Math.trunc((this.currentTime / 1000) - this.clock.getElapsedSeconds());
        this.showTime.text = this.timeLeft;

    }

    checkCollision(rocket, ship){
        // simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
            return true;
        } else{
            return false;
        }
    }

    shipExplode(ship){
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'flares').setOrigin(0, 0);
        boom.anims.play('explode');                 // play explode animation
        boom.on('animationcomplete', () => {        // callback after anim completes
            ship.reset();                           // reset ship position
            ship.alpha = 1;                         // make ship visible again
            boom.destroy();                         // remove explosion sprite
        });
        this.p1score += ship.points;
        this.scoreLeft.text = this.p1score;

        // create 4 new explosion and randomize which one plays on impact
        this.sound.play(Phaser.Math.RND.pick(['sfx_explosion', 'sfx_first_boom', 'sfx_second_boom', 'sfx_third_boom', 'sfx_fourth_boom']));

        // particle effects when explode 
        // cite: rexrainbow particles
        this.add.particles(ship.x, ship.y, 'flares', {
            frame: ['red', 'yellow', 'green', 'blue', 'white'],
            speed: 100,
            lifespan: 1000,
            gravityY: 200,
            alpha: 1,
            duration: 100,
            blendMode: 'ADD'
        });
        this.currentTime = this.clock.delay += 1000;
    }

}