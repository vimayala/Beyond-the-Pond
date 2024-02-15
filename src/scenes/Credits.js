class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {

        this.sound.play('game-over')


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
        
        var height = game.config.height/2 - borderUISize - borderPadding

        // this.add.image(2.85 * game.config.width/4, height + 150, 'can').setScale(0.035)
        // this.add.image(3.25 * game.config.width/4, height + 155, 'chips').setScale(0.05)
        // this.add.image(3.65 * game.config.width/4, height + 150, 'trash-stinks').setScale(0.05)

        // this.test.setTint('0xFFFFFF')
        this.add.text(game.config.width/2, borderUISize + borderPadding / 0.2, 'Credits:', controlsConfig).setOrigin(0.5)
        controlsConfig.fontSize = '24px'

        // this.load.audio('ping', 'assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_002_49762.mp3')
        // this.load.audio('click', 'assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_001_49806.mp3')
        // this.load.audio('game-over', './assets/zapsplat_multimedia_game_sound_error_lose_thud_negative_001_74526.mp3')

        this.add.text(game.config.width/8, (borderUISize + borderPadding) / 0.225, `All Sound FXs: Zapsplat`, controlsConfig).setOrigin(0)


        this.add.text(game.config.width/8, (borderUISize + borderPadding) / 0.275, `Assets created on Resprite`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/8, (borderUISize + borderPadding) / 0.35, `Music created on Garage Band`, controlsConfig).setOrigin(0)

        controlsConfig.fontSize = '14px'

        this.add.text(game.config.width/7, (borderUISize + borderPadding) / 0.19, `Audios:`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.175, `• Game Sound Collect Treasure Coin 001:`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.160, `• Children’s game tone, collect or grab item, single notification, soft ping 1 Sound Effect`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.145, `• Children’s game tone, collect or grab item, single notification, soft ping 2 Sound Effect`, controlsConfig).setOrigin(0)
        this.add.text(game.config.width/6, (borderUISize + borderPadding) / 0.132, `• Game sound, thud, error, lose, negative 1`, controlsConfig).setOrigin(0)


        
        // controlsConfig.fontSize = '72px'
        // this.add.text(game.config.width/2, (borderUISize + borderPadding) / 0.15, `${playerScore}`, controlsConfig).setOrigin(0.5)


        playerScore = 0

        // if score 0-100, try again
        // if 100-300, good game
        //if 300+, amazing!

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

        // this.add.text(game.config.width/8, height - 75, 'Move up', controlsConfig).setOrigin(0)
        // this.add.text(game.config.width/8, height - 40, 'Move down', controlsConfig).setOrigin(0)
        // this.add.text(game.config.width/8, height + 45, 'Gain points by collecting fruits!', controlsConfig).setOrigin(0)
        // this.add.text(game.config.width/8, height + 130, 'Avoid the trash!', controlsConfig).setOrigin(0)
        // this.add.text(game.config.width/8, height + 165, 'After running into three pieces, you lose!', controlsConfig).setOrigin(0)

        // controlsConfig.fontSize = '24px'


        // this.add.text(game.config.width/10, height - 110, 'To Control:', controlsConfig).setOrigin(0)
        // this.add.text(game.config.width/10, height + 5, 'Points:', controlsConfig).setOrigin(0)
        // this.add.text(game.config.width/5 - 15, height + 110, 'Obstacles:', controlsConfig).setOrigin(0.5)






        // this.credits = this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 175,'button').setScale(0.1)

        this.begin.on('pointerdown', () => {
            // play sfx
            this.scene.start('playScene') 
        })
        this.menu.on('pointerdown', () => {
            // play sfx
            this.scene.start('menuScene') 
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
