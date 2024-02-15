class GameOver extends Phaser.Scene {
        constructor() {
            super('gameOverScene')
        }
    
        create() {
    
            this.sound.play('game-over')


            let controlsConfig = {
                fontFamily: 'American Typewriter',
                fontSize: '64px', 
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
            this.add.text(game.config.width/2, borderUISize + borderPadding / 0.2, 'Game Over!', controlsConfig).setOrigin(0.5)
            controlsConfig.fontSize = '48px'
            this.add.text(game.config.width/2, (borderUISize + borderPadding) / 0.25, `Your score was`, controlsConfig).setOrigin(0.5)

            var message = 'Try again!'
            if(playerScore > 100 && playerScore < 350){
                message = "Good job!"
            }
            else if(playerScore >= 350){
                message = "Amazing game!"
            }

            controlsConfig.fontSize = '24px'
            this.add.text(game.config.width/2, (borderUISize + borderPadding) / 0.12, message, controlsConfig).setOrigin(0.5)


            
            controlsConfig.fontSize = '72px'
            this.add.text(game.config.width/2, (borderUISize + borderPadding) / 0.15, `${playerScore}`, controlsConfig).setOrigin(0.5)


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