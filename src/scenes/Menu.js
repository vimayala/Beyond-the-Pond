class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('park', 'assets/park-temp.png')
        this.load.spritesheet('duck-walk', './assets/duck-walks-blinks.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 11
        })
        this.load.spritesheet('duck-idle', './assets/duck-idle-blinks.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 8
        })

    }

    create() {

        this.anims.create({
            key: 'walking',
            frameRate: 9,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('duck-walk', {
                start: 0,
                end: 11
            })
        })

        this.anims.create({
            key: 'idle',
            frameRate: 9,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('duck-idle', {
                start: 0,
                end: 8
            })
        })


        let menuConfig = {
            fontFamily: 'American Typewriter',
            fontSize: '28px', 
            backgroundColor: '#F3B141', 
            color: '#843605',
            align: 'right', padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // this.add.bitmapText(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,  'pixeboy', 'Beyond The Pong!').setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Beyond the Pond', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            // this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            // this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}

// init() prepares any data for the scene
// preload() prepares any assets we’ll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously (every frame, ideally) and allows us to update logic and game objects