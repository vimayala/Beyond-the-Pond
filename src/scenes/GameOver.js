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
    
            this.duck = this.add.sprite(game.config.width/6, (borderUISize + borderPadding) / 0.15, 'duck-idle').setScale(2)
            this.duck.play('idle')

            this.menu.setInteractive({
                useHandCursor: true
            })
    
            this.begin.setInteractive({
                useHandCursor: true
            })
    
            controlsConfig.color = '#FFFFFF'
            this.begin.on('pointerdown', () => {
                this.sound.play('click')
                this.scene.start('playScene') 
            })
            this.menu.on('pointerdown', () => {
                this.sound.play('click')
                this.scene.start('menuScene') 
            })
        }
    
        update() {
            this.clouds.tilePositionX += 4
        }
    }