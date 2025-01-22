class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        // load images/tile sprites
        this.load.image('rocket', './assets/sprites/rocket.png');
        this.load.image('spaceship_large', './assets/sprites/spaceship_large.png');
        this.load.image('spaceship_small', './assets/sprites/spaceship_small.png');
        this.load.image('space_back', './assets/sprites/space_back.png');
        this.load.image('starfield', './assets/sprites/starfield.png');
        this.load.image('planets', './assets/sprites/planets.png');
        // particle sprites
        this.load.image('exhaust_large', './assets/sprites/exhaust_large.png');
        this.load.image('exhaust_small', './assets/sprites/exhaust_small.png');

        // load spritesheets
        this.load.spritesheet('explosion', './assets/sprites/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        this.load.spritesheet('explosion_small', './assets/sprites/explosion_small.png', {
            frameWidth: 32,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 4
        });

        // load audio
        this.load.audio('sfx-select', './assets/audio/select.wav');
        // explosion sfx
        this.load.audio('sfx-explosion1', './assets/audio/explosion1.wav');
        this.load.audio('sfx-explosion2', './assets/audio/explosion2.wav');
        this.load.audio('sfx-explosion3', './assets/audio/explosion3.wav');
        this.load.audio('sfx-explosion4', './assets/audio/explosion4.wav');
        this.load.audio('sfx-explosion5', './assets/audio/explosion5.wav');
        // shot sfx
        this.load.audio('sfx-shot1', './assets/audio/shot1.wav');
        this.load.audio('sfx-shot2', './assets/audio/shot2.wav');
        this.load.audio('sfx-shot3', './assets/audio/shot3.wav');
        // music
        this.load.audio('bmg', './assets/audio/space_bmg.wav');
    }

    create()
    {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode_small',
            frames: this.anims.generateFrameNumbers('explosion_small', {start: 0, end: 4, first: 0}),
            frameRate: 15
        });

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        // display menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60,
                difficulty: 0,
                freq: 200
            };
            this.sound.play('sfx-select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT))
        {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4.5,
                gameTimer: 45,
                difficulty: 1,
                freq: 100
            };
            this.sound.play('sfx-select');
            this.scene.start('playScene');
        }
    }
}