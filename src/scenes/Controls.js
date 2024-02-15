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
        this.test = this.add.image(game.config.width/2, game.config.height/2 - borderPadding - 5, 'blue').setScale(0.9, 0.75).setAlpha(0.85)
        
        var height = game.config.height/2 - borderUISize - borderPadding

        this.add.image(game.config.width/3, height - 62, 'up').setScale(0.05)
        this.add.image(game.config.width/3, height - 26, 'down').setScale(0.05)

        this.add.image(2.5 * game.config.width/4, height + 40, 'banana').setScale(0.2)
        this.add.image(2.95 * game.config.width/4, height + 40, 'grapes').setScale(0.2)
        this.add.image(3.5 * game.config.width/4, height + 40, 'watermelon').setScale(0.2)

        this.add.image(2.85 * game.config.width/4, height + 150, 'can').setScale(0.035)
        this.add.image(3.25 * game.config.width/4, height + 155, 'chips').setScale(0.05)
        this.add.image(3.65 * game.config.width/4, height + 150, 'trash-stinks').setScale(0.05)

        this.add.text(game.config.width/2, borderUISize + borderPadding + 25, 'Beyond the Pond', controlsConfig).setOrigin(0.5)

        controlsConfig.fontSize = '18px'
        controlsConfig.color = '#000000'

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

        controlsConfig.color = '#FFFFFF'

        this.add.text(game.config.width/8, height - 75, 'Move up', controlsConfig).setOrigin(0)
        this.add.text(game.config.width/8, height - 40, 'Move down', controlsConfig).setOrigin(0)
        this.add.text(game.config.width/8, height + 45, 'Gain points by collecting fruits!', controlsConfig).setOrigin(0)
        this.add.text(game.config.width/8, height + 130, 'Avoid the trash!', controlsConfig).setOrigin(0)
        this.add.text(game.config.width/8, height + 165, 'After running into three pieces, you lose!', controlsConfig).setOrigin(0)

        controlsConfig.fontSize = '24px'

        this.add.text(game.config.width/10, height - 110, 'To Control:', controlsConfig).setOrigin(0)
        this.add.text(game.config.width/10, height + 5, 'Points:', controlsConfig).setOrigin(0)
        this.add.text(game.config.width/5 - 15, height + 110, 'Obstacles:', controlsConfig).setOrigin(0.5)

        this.mySong = this.sound.add('waiting', {loop: true, volume: 0.8})
        this.mySong.play()

        this.begin.on('pointerdown', () => {
            this.mySong.stop()
            this.sound.play('click')
            this.scene.start('playScene') 
        })
        this.menu.on('pointerdown', () => {
            this.mySong.stop()
            this.sound.play('click')
            this.scene.start('menuScene') 
        })

    }

    update() {
        this.clouds.tilePositionX += 4

    }
}