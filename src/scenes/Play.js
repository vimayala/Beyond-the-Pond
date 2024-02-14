class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 75

        // fruit/scrolling speed consistent ??
        this.TRASH_SPEED = 2

        // this.xArray = [0, 50, 100, 250, 300, 350, 400]


        this.obstacleSpawnDelay = 2500

        // this.SC = "Score: "

        // this.BANANA_COUNT = 0

        // add water/hydration + depletion

    }

    create() {


        
        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)                                     
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)     
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)                                    
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)  

        // images
        this.park = this.add.tileSprite(0, 0, 14400, 9600, 'park').setOrigin(0,0).setScale(0.05)
        
        this.p1duck = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 200, 'duck-walk').setOrigin(0.5, 0).setScale(1.4)
        this.p1duck.setCircle(this.p1duck.width / 2.8).setOffset(this.p1duck.width / 6, this.p1duck.width / 20)

        this.fruitGroup = this.physics.add.group({
            runChildUpdate: true
        })

        this.trashGroup = this.physics.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })


        // start animation
        this.p1duck.play('walking')
        // this.trash.play('trash-stinky')

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
            fontSize: '24px', 
            backgroundColor: '#B1D5EFE0', 
            color: '#FFFFFF',
            align: 'left', padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 100
        }
        this.scoreWord = this.add.text(borderUISize + borderPadding - 40 , borderUISize + borderPadding * 2 - 50, 'Score: ', scoreConfig)
        scoreConfig.align = 'right'
        scoreConfig.fontSize = '30px'
        this.scoreLeft = this.add.text(borderUISize + borderPadding - 40 , borderUISize + borderPadding * 2 - 20, `${this.p1Score}`, scoreConfig)
        this.gameOver = false
        scoreConfig.fixedWidth = 0
        this.p1duck.trashCount = 0
    

        this.addFruit()

        this.time.delayedCall(this.obstacleSpawnDelay, () => { 
            this.addBarrier() 
        })

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        })

        // // set up cursor keys
        // cursors = this.input.keyboard.createCursorKeys()


        this.physics.add.collider(this.p1duck, this.fruitGroup, this.handleFruitCollision, null, this, this.fruitGroup)
        this.physics.add.collider(this.p1duck, this.trashGroup, this.handleTrashCollision, null, this, this.trashGroup)


    }



    addBarrier() {
        var index = Phaser.Math.RND.between(0, 2);
        var trashPicked = trashTypes[index]

        let trash = new Trash(this, trashPicked, this.TRASH_SPEED)

        if(trashPicked == 'chips'){
            trash.setScale(0.045)
        }
        else if(trashPicked == 'can') {
            trash.setScale(0.017)
            trash.body.setSize(trash.width / 1.75, trash.height / 2 - 200)
            trash.body.setOffset(350, 750)
        }
        else{
            trash.body.setSize(920, 600)
            trash.body.setOffset(trash.width / 15, trash.height / 3 + 30)
            trash.setScale(0.06)
            trash.setOrigin(0)
            trash.play('trash-stinky')
        }
        this.trashGroup.add(trash)
    }

    addFruit() {
        var index = Phaser.Math.RND.between(0, 2);
        var fruitPicked = fruitTypes[index]

        let fruit = new Fruit(this, fruitPicked, SCROLL_SPEED)

        if(fruitPicked == 'banana'){
            console.log('banana')
            fruit.body.setCircle(fruit.width / 5)
            fruit.body.setSize(fruit.width / 2, fruit.height / 2)
            fruit.body.setOffset(fruit.width / 5, fruit.height / 4)
            fruit.setScale(0.02)

        }
        else if(fruitPicked == 'grapes') {
            fruit.setScale(0.02)
            fruit.body.setSize(fruit.width / 2, fruit.height / 1.5 )
            fruit.body.setOffset(500, 600) 
        }
        else{
            fruit.setScale(0.017)
            fruit.body.setSize(fruit.width - 350, fruit.height / 2 + 200)
            fruit.body.setOffset(250, 900)

        }
        this.fruitGroup.add(fruit)
    }


    update() {
        this.park.tilePositionX += (5 * 1.75)       // Stay at initial scroll speed

        if(this.p1duck.trashCount >=3) {
            // change scene to game over
            console.log('over')
            this.scene.start('gameOverScene') 
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

        // if(this.p1Score % 10 == 0 && this.p1Score != 0){
        //     difficulty += 1
        // }
        // if(difficulty % 3 == 0 && difficulty != 0){
        //     difficulty += 1
        //     SCROLL_SPEED *= 1.07
        //     this.TRASH_SPEED *= 1.07
        //     this.PLAYER_VELOCITY *= 1.05
        //     console.log('increase velocity')

        // }


        // looped delayed call

        this.time.delayedCall(20000, () => { 
            console.log('speed up!')
            SCROLL_SPEED *= 1.07
            this.TRASH_SPEED *= 1.07
        })


    }

    handleFruitCollision(duck, fruit){
    
        fruit.destroy()
        this.sound.play('collect')
        this.p1Score += 5
        this.scoreLeft.text = this.p1Score
        this.PLAYER_VELOCITY *= 1.05
    
    }
    
    handleTrashCollision(duck, trash){
        
        duck.setTint(0xf05a4f)
        this.time.addEvent({ delay: 175, callback: () => {
            this.p1duck.clearTint()
            this.time.addEvent({ delay: 100, callback: () => {this.p1duck.setTint(0xf05a4f)}, callbackScope: this});
            this.time.addEvent({ delay: 125, callback: () => {this.p1duck.clearTint()}, callbackScope: this})

        }, callbackScope: this})
        trash.destroy()
        this.sound.play('ping')
        this.p1duck.trashCount += 1
        this.PLAYER_VELOCITY = 100
    }

}




// increase player velocity for points attained
// reset player velocity when colliding with obstacle



// .setTint()
    // type: Phaser WEBGL needed to tint