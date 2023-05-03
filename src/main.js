/*
Brian Camilo
Boom BEACH SHUTTLE
Approx 10-12hrs
- Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
- Allow the player to control the Rocket after it's fired (5)
- Create a new scrolling tile sprite for the background (5)
- Create 4 new explosion sound effects and randomize which one plays on impact (10)
- Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
- Display the time remaining (in seconds) on the screen (10) - still has bugs where it only initializes based time
- Implement the 'FIRE' UI text from the original game (5)
- Implement mouse control for player movement and mouse click to fire (15)
- Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)
- Create a new title screen (e.g., new artwork, typography, layout) (10)
- Implement a new timing/scoring mechanism that *adds* time to the clock for successful hits (15)
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard var
let keyF, keyR, keyLEFT, keyRIGHT, pointer, keyE, keyH;