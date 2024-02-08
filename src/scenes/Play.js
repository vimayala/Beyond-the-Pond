class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 100

        // fruit/scrolling speed consistent ??
        this.FRUIT_SPEED = 1.75
        this.TRASH_SPEED = 2

        // add water/hydration + depletion

    }

    create() {

        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)                                     
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)     
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)                                    
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)  

        // images
        this.park = this.add.tileSprite(0, 0, 720, 480, 'park').setOrigin(0, 0)
        
        // this.p1duck = new Duck(this, game.config.width/2, game.config.height- borderUISize - borderPadding - 100, 'duck-walk').setOrigin(0.5, 0)
        this.p1duck = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 200, 'duck-walk').setOrigin(0.5, 0).setScale(1.4)
        // this.banana = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 300, 'banana').setScale(0.02)
        this.grapes = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 250, 'grapes').setScale(0.02)
        this.watermelon = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 350, 'watermelon').setScale(0.017)
       
        this.can = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 200, 'can').setScale(0.017)



        this.bananasss = this.physics.add.group();

        for (var i = 0; i < 3; i++) {
            console.log(i)
            var x = Phaser.Math.RND.between(0, game.config.width);
            var y = Phaser.Math.RND.between(150, game.config.height);
    
            var banan = this.physics.add.sprite(x, y, 'banana').setScale(0.02);
        }

        // changing physics sizes
        // this.banana.setCircle(this.banana.width / 5)

        // this.banana.setSize(this.banana.width / 2, this.banana.height / 2)
        // this.banana.setOffset(this.banana.width / 5, this.banana.height / 4)

        this.grapes.setSize(this.grapes.width / 2, this.grapes.height / 1.5 )
        this.grapes.setOffset(500, 600)
        
        this.watermelon.setSize(this.watermelon.width - 10, this.watermelon.height / 2 + 200)
        this.watermelon.setOffset(0, 950)

        this.can.setSize(this.can.width / 1.75, this.can.height / 2 - 200)
        this.can.setOffset(350, 750)



        // start animation
        this.p1duck.play('walking')

        // keys defined
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        cursors = this.input.keyboard.createCursorKeys()

        // scoring
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
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        this.gameOver = false
        scoreConfig.fixedWidth = 0
        this.p1duck.trashCount = 0
    }

    update() {

        // console.log(this.banana.width)
        // this.banana.x -= this.FRUIT_SPEED
        this.grapes.x -= this.FRUIT_SPEED
        this.watermelon.x -= this.FRUIT_SPEED

        this.can.x -= this.TRASH_SPEED

        if(this.p1duck.trashCount >= 3) {
            // change scene to game over
            // display score

        }
        
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


        // destroying would destroy every instance,, need to change so it deletes the single instance
        this.physics.add.collider(this.p1duck, this.banana, this.handleFruitCollision, null, this, this.banana)
        this.physics.add.collider(this.p1duck, this.grapes, this.handleFruitCollision, null, this, this.grapes)
        this.physics.add.collider(this.p1duck, this.watermelon, this.handleFruitCollision, null, this, this.watermelon)
        
        this.physics.add.collider(this.p1duck, this.can, this.handleTrashCollision, null, this, this.can)



                // Simulate scrolling
                // subtract from y pos every update per
                // obstacle
                // fruit
                // background



        // if(this.banana.x < -this.banana.x - 100){
        //     this.banana.destroy()
        // }
        if(this.grapes.x < -this.grapes.x - 100){
            this.grapes.destroy()
        }


    }

    handleFruitCollision(duck, fruit){

        // update collision box

        // make duck quack or coin collect

        //maybe make banana have flash animation or something

        fruit.destroy()
        this.sound.play('collect')
        this.p1Score += 5
        this.scoreLeft.text = this.p1Score
        this.PLAYER_VELOCITY *= 1.05

    }

    handleTrashCollision(duck, trash){

        // make duck blink white

        // maybe eyes change

        trash.destroy()
        this.sound.play('ping')
        // this.p1Score()           // change score ?
        // run into 3, end game ?
        this.p1duck.trashCount += 1
        this.PLAYER_VELOCITY = 100
    }

}



// increase player velocity for points attained
// reset player velocity when colliding with obstacle

