class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 75
        this.TRASH_SPEED = 2
        this.SCROLL_SPEED = 1.75
        this.difficulty = 0
        this.last_score = 0
        this.mode = 'easy'
        this.obstacleSpawnDelay = 2500
    }

    create() {
        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)                                     
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)     
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)                                    
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)  

        // images
        this.park = this.add.tileSprite(0, 0, 1440, 960, 'park').setOrigin(0,0).setScale(0.5)
        
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

        // keys defined
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        cursors = this.input.keyboard.createCursorKeys()

        // scoring
        playerScore = 0
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
        this.scoreLeft = this.add.text(borderUISize + borderPadding - 40 , borderUISize + borderPadding * 2 - 20, `${playerScore}`, scoreConfig)
        this.gameOver = false
        scoreConfig.fixedWidth = 0
        this.p1duck.trashCount = 0
    
        this.lives = this.add.sprite(155, borderUISize + borderPadding - 20, 'lives').setScale(0.1)

        this.addFruit()

        // delayed call and difficulty timer taken from Nathan Altice's Paddle Parkour Method
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
        this.physics.add.collider(this.p1duck, this.fruitGroup, this.handleFruitCollision, null, this, this.fruitGroup)
        this.physics.add.collider(this.p1duck, this.trashGroup, this.handleTrashCollision, null, this, this.trashGroup)

        this.mySong = this.sound.add('beyond', {loop: true, volume: 0.8})
        this.mySong.play()
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
        trash.body.setImmovable()
        this.trashGroup.add(trash)
    }

    addFruit() {
        var index = Phaser.Math.RND.between(0, 2);
        var fruitPicked = fruitTypes[index]

        let fruit = new Fruit(this, fruitPicked, this.SCROLL_SPEED)

        if(fruitPicked == 'banana'){
            fruit.body.setCircle(fruit.width / 5)
            fruit.body.setSize(fruit.width / 2, fruit.height / 2)
            fruit.body.setOffset(fruit.width / 5, fruit.height / 4)
            fruit.setScale(0.08)

        }
        else if(fruitPicked == 'grapes') {
            fruit.setScale(0.07)
            fruit.body.setSize(fruit.width / 2, fruit.height / 1.5 )
            fruit.body.setOffset(fruit.width / 5, fruit.height / 4)
        }
        else{
            fruit.setScale(0.07)
            fruit.body.setSize(fruit.width /1.25, fruit.height / 2)
            fruit.body.setOffset(fruit.width / 7, fruit.height / 2.5)

        }
        fruit.body.setImmovable()
        this.fruitGroup.add(fruit)
    }


    update() {
        this.park.tilePositionX += (2)       // Stay at initial scroll speed
        
        let playerVector = new Phaser.Math.Vector2(0, 0)
        if(this.p1duck.y >= 135){
            if(cursors.up.isDown){
                playerVector.y = -1
            }
        }
        if(this.p1duck.y <= 400){
            if(cursors.down.isDown){
                playerVector.y = 1
            }
        }
        playerVector.normalize()
        this.p1duck.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    }

    handleFruitCollision(duck, fruit){
        fruit.destroy()
        this.sound.play('collect')
        playerScore += 5
        this.scoreLeft.text = playerScore
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

        if(this.p1duck.trashCount >=3) {
            this.scene.start('gameOverScene') 
            this.mySong.stop()
        }
        else{
            this.lives.setFrame(this.p1duck.trashCount)
        }
        this.PLAYER_VELOCITY = 100
    }

    levelBump(){
        if(playerScore % 50 == 0 && playerScore != this.last_score){
            this.difficulty += 1
            if(this.TRASH_SPEED <= 4){
                this.last_score = playerScore
                this.SCROLL_SPEED *= 1.2
                this.TRASH_SPEED *= 1.2
                // this.PLAYER_VELOCITY *= 1.05
            }
            else if (this.TRASH_SPEED > 4 && this.mode == 'easy'){
                this.harderMode = this.time.addEvent({
                    delay: 10000,
                    callback: this.addBarrier,
                    callbackScope: this,
                    loop: true
                })
                this.mode = 'middle'
                this.PLAYER_VELOCITY *= 1.05
                this.mySong.setRate(1.02)
            }
            else if(this.mode == 'middle' && playerScore > 300){
                this.PLAYER_VELOCITY = 100
                this.mode = 'end'
                this.mySong.setRate(1.05)
            }
        }
    }
}