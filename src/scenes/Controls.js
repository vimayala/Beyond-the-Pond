class Controls extends Phaser.Scene {
    constructor() {
        super('controlScene')
    }

    create() {

        let controlsConfig = {
            fontFamily: 'American Typewriter',
            fontSize: '36px', 
            color: '#FFFFFF',
            align: 'right', padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.clouds = this.add.tileSprite(0, 0, 14400, 9600, 'clouds').setOrigin(0,0).setScale(0.05)
        this.test = this.add.image(game.config.width/2, game.config.height/2 - borderPadding - 5, 'blue').setScale(0.9, 0.75)
        this.test.setTint('0xFFFFFF')
        this.add.text(game.config.width/2, borderUISize + borderPadding + 25, 'Beyond the Pond', controlsConfig).setOrigin(0.5)


        controlsConfig.fontSize = '18px'
        controlsConfig.color = '#000000'

        var height = game.config.height/2 - borderUISize - borderPadding

        this.begin = this.add.image(3 * game.config.width/4, game.config.height - borderUISize - borderPadding,'frog-button').setScale(0.1)
        this.menu = this.add.image(game.config.width/4, game.config.height - borderUISize - borderPadding + 10,'button').setScale(0.1)
        this.add.text(3 * game.config.width/4, game.config.height - borderUISize - borderPadding + 10, 'Play', controlsConfig).setOrigin(0.5)
        this.add.text(game.config.width/4, game.config.height - borderUISize - borderPadding + 10, 'Menu', controlsConfig).setOrigin(0.5)

        this.menu.setInteractive({
            useHandCursor: true
        })

        this.begin.setInteractive({
            useHandCursor: true
        })

        this.add.text(game.config.width/4, height - 60, 'Move up', controlsConfig).setOrigin(0.5)
        this.add.text(game.config.width/4, height - 45, 'Move down', controlsConfig).setOrigin(0.5)-
        this.add.text(game.config.width/4, height - 15, 'Gain points by collecting fruits!', controlsConfig).setOrigin(0.5)-
        this.add.text(game.config.width/4, height - 0, 'Avoid the trash!', controlsConfig).setOrigin(0.5)
        this.add.text(game.config.width/4, height + 15, 'After running into three pieces, you lose!', controlsConfig).setOrigin(0.5)

        controlsConfig.fontSize = '24px'


        this.add.text(game.config.width/6, height - 75, 'To Control:', controlsConfig).setOrigin(0.5)
        this.add.text(game.config.width/6, height - 30, 'Points:', controlsConfig).setOrigin(0.5)







        // this.credits = this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 175,'button').setScale(0.1)

        // this.begin.on('pointerdown', () => {
        //     // play sfx
        //     this.scene.start('playScene') 
        // })
        // this.controls.on('pointerdown', () => {
        //     // play sfx
        //     this.scene.start('controlScene') 
        // })
        // this.credits.on('pointerdown', () => {
        //     // play sfx
        //     this.scene.start('creditsScene') 
        // })

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