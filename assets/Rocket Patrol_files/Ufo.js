class Ufo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x ,y, texture, frame); {
            scene.add.existing(this);                               // add to existing scene
            this.points = pointValue;                               // store pointValue
            this.moveSpeed = game.settings.spaceshipSpeed + 2;      // pixel per frame
        }
    }

    update(){
        // move ufo left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    // position reset
    reset(){
        this.x = game.config.width;
    }
}