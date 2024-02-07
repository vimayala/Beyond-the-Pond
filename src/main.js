// Victoria Ayala
// Beyond the Pond
// Hours: 
// Creative tilt: 


let config = {
    type: Phaser.AUTO,
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
    scene : [ Menu, Play ]

}

let game = new Phaser.Game(config)
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, cursors



let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let { height, width } = game.config