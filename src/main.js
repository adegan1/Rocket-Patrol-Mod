// Name: Andrew Degan
// Project Title: Rocket Patrol Relaunched
// Completion Time: ~5 hours
// Mods:
//  Create a new enemy Spaceship type that's smaller, moves faster, and is worth more points (5)
//      -This new enemy ship is only available in Expert Mode
//  Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
//  Display the time remaining (in seconds) on the screen (3)
//  Create 4 new explosion sound effects and randomize which one plays on impact (3)
//  Implement parallax scrolling for the background (3)
//  Add your own looping background music to the Play scene (1)
//  Add trail particles to ships
// Sources:
//  Josh Morony: https://www.joshmorony.com/how-to-create-an-accurate-timer-for-phaser-games/
//  Bosca Ceoil Blue: https://yurisizov.itch.io/boscaceoil-blue

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
};

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;