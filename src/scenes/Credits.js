class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        let controlsConfig = {
            fontFamily: 'American Typewriter',
            fontSize: '48px', 
            color: '#FFFFFF',
            align: 'right', padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.clouds = this.add.tileSprite(0, 0, 14400, 9600, 'clouds').setOrigin(0,0).setScale(0.05)
        this.test = this.add.image(game.config.width/2, game.config.height/2 - borderPadding - 5, 'blue').setScale(0.9, 0.75).setAlpha(0.85)
        
        this.add.text(game.config.width/2, borderUISize + borderPadding / 0.2, 'Credits:', controlsConfig).setOrigin(0.5)
        controlsConfig.fontSize = '24px'

        this.add.text(game.config.width/8, (borderUISize + borderPadding) / 0.225, `All Sound FXs: Zapsplat`, controlsConfig).setOrigin(0)


        this.add.text(game.config.width/8, (borderUISize + borderPadding) / 0.275, `Assets created on Resprite`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/8, (borderUISize + borderPadding) / 0.35, `Music created on Garage Band`, controlsConfig).setOrigin(0)

        controlsConfig.fontSize = '14px'

        this.add.text(game.config.width/7, (borderUISize + borderPadding) / 0.19, `Audios:`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.175, `• Game Sound Collect Treasure Coin 001:`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.160, `• Children’s game tone, collect or grab item, single notification, soft ping 1 Sound Effect`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.145, `• Children’s game tone, collect or grab item, single notification, soft ping 2 Sound Effect`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.132, `• Game sound, thud, error, lose, negative 1`, controlsConfig).setOrigin(0)

        this.add.text(game.config.width/8, (borderUISize + borderPadding) / 0.12, `Code credits Nathan Altice where appropriate`, controlsConfig).setOrigin(0)

        
        playerScore = 0

        controlsConfig.fontSize = '18px'
        controlsConfig.color = '#000000'


        this.begin = this.add.image(3 * game.config.width/4, game.config.height - borderUISize - borderPadding,'frog-button').setScale(0.1)
        this.menu = this.add.image(game.config.width/4, game.config.height - borderUISize - borderPadding + 10,'button').setScale(0.1)
        this.add.text(3 * game.config.width/4, game.config.height - borderUISize - borderPadding + 10, 'Play Again', controlsConfig).setOrigin(0.5)
        this.add.text(game.config.width/4, game.config.height - borderUISize - borderPadding + 10, 'Menu', controlsConfig).setOrigin(0.5)

        this.menu.setInteractive({
            useHandCursor: true
        })

        this.begin.setInteractive({
            useHandCursor: true
        })

        controlsConfig.color = '#FFFFFF'

        this.mySong.stop()
        this.sound.play('click')

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
