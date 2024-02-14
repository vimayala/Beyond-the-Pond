// structure taken from Prof Nathan Altice's Paddle Parkour, reimplemented to suit my game and needs
class Trash extends Phaser.GameObjects.Sprite {
    constructor(scene, image, speed) {

        var x = Phaser.Math.RND.between(game.config.width / 1.5, game.config.width);
        var y = Phaser.Math.RND.between(200, game.config.height);

        super(scene, x, y, image)
        scene.add.existing(this)
        this.image = image
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this)    // add to physics system

        this.newTrash = true
        this.speed = speed
    }

    update () {
        this.x -= this.speed
        if(this.newTrash && this.x < game.config.width / 2) {
            this.parentScene.addBarrier()
            this.newTrash = false
        }
        if(this.x < -this.width) {
            this.destroy()
        }
    }

    reset() {
        this.x = game.config.width
    }
}