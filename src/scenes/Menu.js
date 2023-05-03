class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('sfx_first_boom', './assets/boom.wav');    
        this.load.audio('sfx_second_boom', './assets/boom1.wav');    
        this.load.audio('sfx_third_boom', './assets/boom2.wav');    
        this.load.audio('sfx_fourth_boom', './assets/boom3.wav');  
        this.load.audio('bgm_space', './assets/spacesound.mp3');  
        this.load.image('elon', './assets/elon.jpeg')

    }
    
    create(){
        this.elon = this.add.tileSprite(0, 0, 640, 480, 'elon').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#C42935',
            color: '#FFFFFF',
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize -
            borderPadding, 'BOOM BEACH SHUTTLE', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'User ←→ arrows to move & (F) to fire',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2,game.config.height / 2 + borderUISize + 
        borderPadding, 'OR User Mouse to control &',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 324, '(Left-Click Button) to fire',
            menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#AB5AD6';
        this.add.text(game.config.width / 2, 366, 'Press E for Easy or H for Hard', menuConfig).setOrigin(0.5);
        
        // define keys
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyE)){
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            } 
            
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }

            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        
    }

}