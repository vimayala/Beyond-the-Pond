class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // this.load.spritesheet('duck-walk', './assets/duck-walks-blinks.png', {
        //     frameWidth: 64,
        //     frameHeight: 64,
        //     startFrame: 0,
        //     endFrame: 11
        // })
        this.PLAYER_VELOCITY = 100
    }

    create() {

        this.park = this.add.tileSprite(0, 0, 720, 480, 'park').setOrigin(0, 0)
        
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)       // green
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)                                      // all white
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)      // |
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)                                     // |
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)      // vv
        // this.p1duck = new Duck(this, game.config.width/2, game.config.height- borderUISize - borderPadding - 100, 'duck-walk').setOrigin(0.5, 0)
        this.p1duck = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 200, 'duck-walk').setOrigin(0.5, 0).setScale(1.4)
        this.p1duck.play('walking')
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.p1Score = 0
        let scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px', 
            backgroundColor: '#F3B141', 
            color: '#843605',
            align: 'right', padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // this.anims.create({
        //     key: 'walking',
        //     frameRate: 12,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('duck-walk', {
        //         start: 0,
        //         end: 8
        //     })
        // })
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        this.gameOver = false
        scoreConfig.fixedWidth = 0
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // console.log(this.p1duck.y)
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'
        if(this.p1duck.y >= 125){
            if(cursors.up.isDown){
                playerVector.y = -1
                playerDirection = 'up'
            }
        }
        if(this.p1duck.y <= 367){
            if(cursors.down.isDown){
                playerVector.y = 1
                playerDirection = 'down'
            }
        }

        playerVector.normalize()

        this.p1duck.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        // let playerMovement
        // playerVector.length() ? playerMovement = 'walking' : playerMovement = 'idle'
        // this.p1duck.play(playerMovement)




        
        // if(Phaser.Input.Keyboard.JustDown(keyFIRE)){
        //     this.p1duck.play('walking')
        // }
        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
        //     this.scene.restart()
        // }
        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     this.scene.start("menuScene")
        // }
        // // this.park.tilePositionX -= 3.5
        // if(!this.gameOver) {
        //     this.p1duck.update()
        //     // this.ship01.update()
        //     // this.ship02.update()
        //     // this.ship03.update()
        // }

        // this.physics.add.collider(this.p1duck, this.ship03,
        //     this.handleCollision, null, this)

        // if(this.checkCollision(this.p1duck, this.ship03)) {
        //     // console.log('kaboom ship 03')
        //     this.p1duck.reset()
        //     this.shipExplode(this.ship03)
        // }
        // if(this.checkCollision(this.p1duck, this.ship02)) {
        //     this.p1duck.reset()
        //     this.shipExplode(this.ship02)

        // }
        // if(this.checkCollision(this.p1duck, this.ship01)) {
        //     this.p1duck.reset()
        //     this.shipExplode(this.ship01)
 
        // }
    }

    handleCollision(duck, ship){
        duck.reset()
        this.shipExplode(ship)
        }
    

}
