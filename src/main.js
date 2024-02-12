// Victoria Ayala
// Beyond the Pond
// Hours: 
// Creative tilt: 


let config = {
    // type: Phaser.WEBGL,
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 720,
    height: 480,
    zoom: 2,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene : [ Menu, Play, Controls, Credits ]

}

let game = new Phaser.Game(config)
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, cursors


let SCROLL_SPEED = 1.75

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let { height, width } = game.config