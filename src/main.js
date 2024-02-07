let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    zoom: 2,
    scene : [ Menu, Play ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

let game = new Phaser.Game(config)
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, cursors



let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let { height, width } = game.config