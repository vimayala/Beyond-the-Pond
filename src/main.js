// Victoria Ayala
// Beyond the Pond
// Hours: 
// Creative tilt: 


let config = {
    // type: Phaser.WEBGL,
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,     // for tinting
    width: 720,
    height: 480,
    zoom: 2,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene : [ Menu, Play, Controls, GameOver, Credits ]

}

let game = new Phaser.Game(config)
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, cursors

const trashTypes = ['chips', 'can', 'trash-bag']
const fruitTypes = ['banana', 'grapes', 'watermelon']

// let SCROLL_SPEED = 1.75

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

var playerScore = 0

// var difficulty = 0
// var last_score = 0

let { height, width } = game.config