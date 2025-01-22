// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing scene, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // rocket speed in pixels/frame

        this.sfxShot1 = scene.sound.add('sfx-shot1');
        this.sfxShot2 = scene.sound.add('sfx-shot2');
        this.sfxShot3 = scene.sound.add('sfx-shot3');
    }

    update()
    {
        // left/right movement
        if (!this.isFiring)
        {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width)
            {
                this.x -= this.moveSpeed;
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width)
            {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring)
        {
            this.isFiring = true;
            let randomInt = Math.floor(Math.random() * 3)
            if (randomInt == 0)
                this.sfxShot1.play();
            else if (randomInt == 1)
                this.sfxShot2.play();
            else if (randomInt == 2)
                this.sfxShot3.play();
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding)
        {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding)
        {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
            this.scene.timeOffset -= 3;
        }
    }

    // reset rocket to "ground"
    reset()
    {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}