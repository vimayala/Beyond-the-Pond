class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.audio('collect', 'assets/zapsplat_multimedia_game_sound_collect_treasure_coin_001_40559.mp3')
        this.load.audio('ping', 'assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_002_49762.mp3')
        this.load.audio('click', 'assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_001_49806.mp3')
        this.load.audio('game-over', './assets/zapsplat_multimedia_game_sound_error_lose_thud_negative_001_74526.mp3')

        this.load.image('clouds', 'assets/clouds.png')
        this.load.image('park', 'assets/park.png')
        this.load.image('blue', 'assets/park-temp.png')
        this.load.image('tree', 'assets/tree.png')
        this.load.image('banana', 'assets/banana.png')
        this.load.image('watermelon', 'assets/watermelon.png')
        this.load.image('grapes', 'assets/grapes.png')
        this.load.image('can', 'assets/can.png')
        this.load.image('chips', 'assets/chips.png')
        this.load.image('trash-bag', 'assets/trash.png')

        this.load.image('button', 'assets/button.PNG')
        this.load.image('frog-button', 'assets/frog-button.PNG')

        this.load.image('up', 'assets/up.png')
        this.load.image('down', 'assets/down.png')


        this.load.spritesheet('trash-stinks', './assets/trash-stinks.png', {
            frameWidth: 1280,
            frameHeight: 980,
            startFrame: 0,
            endFrame: 3
        })
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
            key: 'trash-stinky',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('trash-stinks', {
                start: 0,
                end: 3
            })
        })


        this.anims.create({
            key: 'walking',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('duck-walk', {
                start: 0,
                end: 11
            })
        })

        let menuConfig = {
            fontFamily: 'American Typewriter',
            fontSize: '48px', 
            backgroundColor: '#B1D5EF99', 
            color: '#FFFFFF',
            align: 'right', padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.clouds = this.add.tileSprite(0, 0, 14400, 9600, 'clouds').setOrigin(0,0).setScale(0.05)
        this.box = this.add.image(game.config.width/2, game.config.height/2 + borderPadding + borderUISize, 'blue').setScale(0.65, 0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 15, 'Beyond the Pond', menuConfig).setOrigin(0.5)


        menuConfig.fontSize = '18px'
        menuConfig.color = '#000000'
        menuConfig.backgroundColor = '#FFFFFF00'

        var height = game.config.height/2 - borderUISize - borderPadding

        this.begin = this.add.image(game.config.width/2, height + 65,'frog-button').setScale(0.1)
        this.controls = this.add.image(game.config.width/2, height + 126,'button').setScale(0.1)
        this.credits = this.add.image(game.config.width/2, height + 175,'button').setScale(0.1)

        this.begin.setInteractive({
            useHandCursor: true
        })
        this.controls.setInteractive({
            useHandCursor: true
        })
        this.credits.setInteractive({
            useHandCursor: true
        })

        this.add.text(game.config.width/2, height + 75, 'Play', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, height + 126, 'Controls', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, height + 175, 'Credits', menuConfig).setOrigin(0.5)


        // this.credits = this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 175,'button').setScale(0.1)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.begin.on('pointerdown', () => {
            // play sfx
            this.sound.play('click')
            this.scene.start('playScene') 
        })
        this.controls.on('pointerdown', () => {
            // play sfx
            this.sound.play('click')
            this.scene.start('controlScene') 
        })
        this.credits.on('pointerdown', () => {
            // play sfx
            this.sound.play('click')
            this.scene.start('creditsScene') 
        })

    }

    update() {
        this.clouds.tilePositionX += 4
        // if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {

        //     game.settings = {
        //         // spaceshipSpeed: 3,
        //     }

        //     // this.sound.play('sfx-select')
        //     this.scene.start('playScene')
        // }

    }
}