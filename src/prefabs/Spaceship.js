// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue, size)
    {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.size = size;
    }

    update()
    {
        // move spaceship left
        if (this.size == 0)
            this.x -= this.moveSpeed;
        else if (this.size == 1)
            this.x -= this.moveSpeed * 1.75;

        // wrap from left to right edge
        if (this.x <= 0 - this.width)
        {
            this.x = game.config.width;
        }
    }

    // reset position
    reset()
    {
        this.x = game.config.width
    }
}