// Victoria Ayala
// Beyond the Pond
// Hours: ~26 ?
    // I lost count bc I take too long to draw and I just barely got the hang of Phaser after realizing I could look at 
    // Nathan's example on Monday...
// Creative tilt: I made my own music by making the song on the piano, then finalizing it on Garage Band. 
    // It might seem like I threw it together but I went through 6 drafts of songs before deciding to keep it simple to loo. 
// I also tried to stick with 32 bit art, but I think I have a consistent style and made it a bit kid-like with the music and art combo!

// I don't have a justification for the technically interesting implementations, I think I used common methods and (as mentioned),
// I spent more time trying to learn Phaser and fixing errors.

let config = {
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
let keyLEFT, keyRIGHT, cursors

const trashTypes = ['chips', 'can', 'trash-bag']
const fruitTypes = ['banana', 'grapes', 'watermelon']

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

var playerScore = 0

let { height, width } = game.config