class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 100

        // fruit/scrolling speed consistent ??
        this.TRASH_SPEED = 2

        this.xArray = [0, 50, 100, 250, 300, 350, 400]
        this.obstacleSpawnDelay = 2500

        // this.SC = "Score: "

        // this.BANANA_COUNT = 0

        // add water/hydration + depletion

    }

    // preload() {
    //     this.load.audio('collect', 'assets/zapsplat_multimedia_game_sound_collect_treasure_coin_001_40559.mp3')
    //     this.load.audio('ping', 'assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_002_49762.mp3')

    //     this.load.image('clouds', 'assets/clouds.png')
    //     this.load.image('park', 'assets/park.png')
    //     this.load.image('blue', 'assets/park-temp.png')
    //     this.load.image('tree', 'assets/tree.png')
    //     this.load.image('banana', 'assets/banana.png')
    //     this.load.image('watermelon', 'assets/watermelon.png')
    //     this.load.image('grapes', 'assets/grapes.png')
    //     this.load.image('can', 'assets/can.png')
    //     this.load.image('chips', 'assets/chips.png')

    //     this.load.image('button', 'assets/button.PNG')
    //     this.load.image('frog-button', 'assets/frog-button.PNG')

    //     this.load.image('up', 'assets/up.png')
    //     this.load.image('down', 'assets/down.png')


    //     this.load.spritesheet('trash-stinks', './assets/trash-stinks.png', {
    //         frameWidth: 1280,
    //         frameHeight: 980,
    //         startFrame: 0,
    //         endFrame: 3
    //     })
    //     this.load.spritesheet('duck-walk', './assets/duck-walks-blinks.png', {
    //         frameWidth: 64,
    //         frameHeight: 64,
    //         startFrame: 0,
    //         endFrame: 11
    //     })
    //     this.load.spritesheet('duck-idle', './assets/duck-idle-blinks.png', {
    //         frameWidth: 64,
    //         frameHeight: 64,
    //         startFrame: 0,
    //         endFrame: 8
    //     })

    // }

    create() {

        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)                                     
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)     
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)                                    
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)  

        // images
        this.park = this.add.tileSprite(0, 0, 14400, 9600, 'park').setOrigin(0,0).setScale(0.05)
        
        // this.p1duck = new Duck(this, game.config.width/2, game.config.height- borderUISize - borderPadding - 100, 'duck-walk').setOrigin(0.5, 0)
        this.p1duck = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 200, 'duck-walk').setOrigin(0.5, 0).setScale(1.4)
        this.p1duck.setCircle(this.p1duck.width / 2.8).setOffset(this.p1duck.width / 6, this.p1duck.width / 20)
        // this.banana = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 300, 'banana').setScale(0.02)
        this.grapes = this.physics.add.sprite(350, game.config.height- borderUISize - borderPadding - 200, 'grapes').setScale(0.02)
        this.watermelon = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 350, 'watermelon').setScale(0.017)
        

        this.can = this.physics.add.sprite(350, game.config.height- borderUISize - borderPadding - 200, 'can').setScale(0.017)
        this.chips = this.physics.add.sprite(350, game.config.height- borderUISize - borderPadding - 300, 'chips').setScale(0.045)
        // this.chips.setSize(this.chips.width / 1.7, this.chips.height / 2)
        // this.chips.setOffset(this.chips.width / 5 - 82, this.chips.height / 3)

        // this.trash = this.physics.add.sprite(350, game.config.height- borderUISize - borderPadding - 200, 'trash-bag')  
        // this.trash.setSize(920, 600).setOffset(this.trash.width / 15, this.trash.height / 3 + 30)
        // console.log('og trash')
        // console.log(this.trash.width / 15)
        // this.trash.setScale(0.07).setOrigin(0)


        // ideal tree size
        // this.tree = this.add.image(100, 100, 'tree').setScale(0.09)


        this.bananasss = this.physics.add.group();

        // per trash or whole group ??
        this.trashGroup = this.physics.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })

        // make delayed call ?? or initially 3, then delayed ?
        for (var i = 1; i < 16; i++) {
            var x = Phaser.Math.RND.between(0, game.config.width);
            var y = Phaser.Math.RND.between(200, game.config.height);
            var banan = this.physics.add.sprite((i % 7) * x, y, 'banana').setScale(0.02).setImmovable(true);
            // banan.num = this.BANANA_COUNT

            banan.setOffset(banan.width / 4, banan.height / 4).setSize(banan.width / 5, banan.height / 2)

            this.bananasss.add(banan)
            // this.BANANA_COUNT += 1
        }

        // var i = 0
        // this.time.addEvent({ delay: 175, callback: () => {

        //     var x = Phaser.Math.RND.between(0, game.config.width);
        //     var y = Phaser.Math.RND.between(200, game.config.height);
        //     var banan = this.physics.add.sprite((i % 7) * x, y, 'banana').setScale(0.02).setImmovable(true);
        //     // banan.num = this.BANANA_COUNT

        //     banan.setOffset(banan.width / 4, banan.height / 4).setSize(banan.width / 5, banan.height / 2)
        //     i += 1

        //     this.bananasss.add(banan) 
        // }})

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
    }


    // Bookmark v

// create new barriers and add them to existing barrier group
    addBarrier() {
        // let speedVariance =  Phaser.Math.Between(0, 50)
        
        // make array to pick random trash obstacle

        var trashPicked = 'trash-bag'

        let trash = new Trash(this, 'trash-bag', this.TRASH_SPEED)
        if(trashPicked == 'trash-bag'){
            console.log('bag')
            trash.body.setSize(920, 600)
            trash.body.setOffset(trash.width / 15, trash.height / 3 + 30)

        }
        trash.setTint('0xFF00FF')
        this.trashGroup.add(trash)
        trash.x = game.config.width / 2
        trash.y = game.config.height / 2
    }


    update() {
        this.park.tilePositionX += (5 * SCROLL_SPEED)

        this.bananasss.getChildren().forEach( (banana => {banana.x -= SCROLL_SPEED}))
        this.grapes.x -= SCROLL_SPEED
        this.watermelon.x -= SCROLL_SPEED

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
        // this.physics.add.collider(this.p1duck, this.banana, this.handleFruitCollision, null, this, this.banana)
        this.physics.add.collider(this.p1duck, this.grapes, this.handleFruitCollision, null, this, this.grapes)
        // this.physics.add.collider(this.p1duck, this.watermelon, this.handleFruitCollision, null, this, this.watermelon)
        // this.physics.add.collider(this.p1duck, this.can, this.handleTrashCollision, null, this, this.can)
        
        this.physics.add.collider(this.p1duck, this.can, this.handleTrashCollision, null, this, this.can)

        this.physics.add.collider(this.p1duck, this.bananasss, this.handleFruitCollision, null, this, this.bananasss)


                // Simulate scrolling
                // subtract from y pos every update per
                // obstacle
                // fruit
                // background


        this.bananasss.getChildren().forEach(banana => {
            if(banana.x < -banana.x - 100){
                banana.destroy()
                // console.log('bye bye banana')
            }
            if(this.grapes.x < -this.grapes.x - 100){
                this.grapes.destroy()
            }
            }
        )


    }



    handleFruitCollision(duck, fruit){

        // update collision box
    
        // make duck quack or coin collect
    
        //maybe make banana have flash animation or something
    
        fruit.destroy()
        this.sound.play('collect')
        this.p1Score += 5
        // var strSC = `${this.p1Score}`
        this.scoreLeft.text = this.p1Score
        this.PLAYER_VELOCITY *= 1.05
    
    }
    
    handleTrashCollision(duck, trash){
    
        // make duck blink white
    
        // maybe eyes change
        
        duck.setTint(0xf05a4f)
        this.time.addEvent({ delay: 175, callback: () => {
            this.p1duck.clearTint()
            this.time.addEvent({ delay: 100, callback: () => {this.p1duck.setTint(0xf05a4f)}, callbackScope: this});
            this.time.addEvent({ delay: 125, callback: () => {this.p1duck.clearTint()}, callbackScope: this})

        }, callbackScope: this})

        // this.scene.time.delayedCall(2500, duck.clearTint())
        // this.scene.time.delayedCall(1500, duck.setTint(0xf05a4f))
        // this.scene.time.delayedCall(2000, duck.clearTint())
        trash.destroy()
        this.sound.play('ping')
        // this.p1Score()           // change score ?
        // run into 3, end game ?
        this.p1duck.trashCount += 1
        this.PLAYER_VELOCITY = 100
        
    }



    // handleFruitGroupCollision(duck, fruitGroup){

    //     fruitGroup.destroy()
    //     this.sound.play('collect')
    //     this.p1Score += 5
    //     this.scoreLeft.text = this.p1Score
    //     this.PLAYER_VELOCITY *= 1.05

    // }

}






// increase player velocity for points attained
// reset player velocity when colliding with obstacle



// .setTint()
    // type: Phaser WEBGL needed to tint