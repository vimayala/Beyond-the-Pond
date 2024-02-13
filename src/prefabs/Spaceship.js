class Trash extends Phaser.GameObjects.Sprite {
    constructor(scene, image, speed) {


        // pick random x and y ?

        var x = Phaser.Math.RND.between(0, game.config.width);
        var y = Phaser.Math.RND.between(200, game.config.height);

        super(scene, x, y, image)
        scene.add.existing(this)
        this.image = 'trash'

        // this.moveSpeed = game.settings.spaceshipSpeed
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this)    // add to physics system


        this.newTrash = true
        this.speed = speed
        // this.setVelocityX(speed)

        if(this.image == 'chips'){
            console.log('cheeps')
            this.parentScene.add.existing(this).setScale(0.045)
        }
        else if(this.image == 'can') {
            console.log('can')
            this.parentScene.add.existing(this).setScale(0.017)
        }
        else{
            console.log('trash')
            // this.parentScene.add.existing(this).setSize(920, 600) //.setOffset(this.image.width / 15, this.image.height / 3 + 30)
            this.parentScene.add.existing(this).setScale(0.07)
            this.parentScene.add.existing(this).setOrigin(0)
        }

    }

    update () {
        this.X -= this.speed
        if(this.Trash && this.x < game.config.width / 2) {
            // (recursively) call parent scene method from this context
            this.parentScene.addBarrier(this.parent, this.velocity, this.image)
            this.newBarrier = false
        }
        if(this.x < -this.width) {
            this.destroy()
        }
    }

    reset() {
        this.x = game.config.width
    }
}