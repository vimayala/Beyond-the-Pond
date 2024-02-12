class Trash extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        // this.moveSpeed = game.settings.spaceshipSpeed
        this.parentScene = scene
        this.scene.physics.add.existing(this);
        this.newTrash = true
        this.setVelocityX(SCROLL_SPEED)
    }

    update () {
        if(this.Trash && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addBarrier(this.parent, this.velocity)
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