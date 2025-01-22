class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    create()
    {
        // place tile sprites
        this.space_back = this.add.tileSprite(0, 0, 640, 480, 'space_back').setOrigin(0,0);
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.planets = this.add.tileSprite(0, 0, 640, 480, 'planets').setOrigin(0,0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add 3 spaceships (plus 1 small in expert)
        if (game.settings.difficulty == 0)
        {
            this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship_large', 0, 30, 0).setOrigin(0,0);
            this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship_large', 0, 20, 0).setOrigin(0,0);
            this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship_large', 0, 10, 0).setOrigin(0,0);
        }
        if (game.settings.difficulty == 1)
        {
            this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 5, 'spaceship_large', 0, 30, 0).setOrigin(0,0);
            this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 5, 'spaceship_large', 0, 20, 0).setOrigin(0,0);
            this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 7, 'spaceship_large', 0, 10, 0).setOrigin(0,0);
            this.ship04 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship_small', 0, 50, 1).setOrigin(0,0);
        }

        // add trail particle emitters
        this.emitter1 = this.add.particles(66, 16, 'exhaust_large', {speed: 0, scale: {start: .8, end: 0}, alpha: {start: .8, end: 0}, lifespan: 1000, frequency: game.settings.freq});
        this.emitter1.startFollow(this.ship01);
        this.emitter2 = this.add.particles(66, 16, 'exhaust_large', {speed: 0, scale: {start: .8, end: 0}, alpha: {start: .8, end: 0}, lifespan: 1000, frequency: game.settings.freq});
        this.emitter2.startFollow(this.ship02);
        this.emitter3 = this.add.particles(66, 16, 'exhaust_large', {speed: 0, scale: {start: .8, end: 0}, alpha: {start: .8, end: 0}, lifespan: 1000, frequency: game.settings.freq});
        this.emitter3.startFollow(this.ship03);
        if (game.settings.difficulty == 1)
        {
            this.emitter4 = this.add.particles(34, 8, 'exhaust_small', {speed: 0, scale: {start: .8, end: 0}, alpha: {start: .8, end: 0}, lifespan: 1000, frequency: game.settings.freq * .75});
            this.emitter4.startFollow(this.ship04);
        }

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // initialize score
        this.p1Score = 0;

        // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, this.scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // set time clock
        this.startTime = new Date();
        this.totalTime = game.settings.gameTimer;
        this.timeElapsed = 0;
        this.timeOffset = 0;

        // display clock
        this.timerText = this.add.text(game.config.width - borderPadding * 4 - this.scoreConfig.fixedWidth, borderUISize + borderPadding * 2, game.settings.gameTimer, this.scoreConfig);
        
        // play background music
        this.bmg = this.sound.add('bmg', {volume: .4});
        this.bmg.loop = true;
        this.bmg.play();
    }

    update()
    {
        // update timer
        this.updateTimer();

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET))
        {
            this.bmg.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            this.bmg.stop();
            this.scene.start("menuScene");
        }

        // move tilesprites
        this.space_back.tilePositionX -= 0.5;
        this.starfield.tilePositionX -= 1;
        this.planets.tilePositionX -= 2;

        if (!this.gameOver)
        {
            this.p1Rocket.update();

            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            if (game.settings.difficulty == 1)
                this.ship04.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship01))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, this.emitter1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.emitter2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, this.emitter3);
        }
        if (game.settings.difficulty == 1)
        {
            if (this.checkCollision(this.p1Rocket, this.ship04))
            {
                this.p1Rocket.reset();
                this.shipExplode(this.ship04, this.emitter4);
            }
        }
    }

    checkCollision(rocket, ship)
    {
        // simple Axis-Aligned Bounding Box checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.y + rocket.height > ship.y)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    shipExplode(ship, emitter)
    {
        // temporarily hide ship
        ship.alpha = 0;
        emitter.frequency = 500;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        if (ship.size == 0)                     // play explode animation
            boom.anims.play('explode'); 
        else if (ship.size == 1)
            boom.anims.play('explode_small');
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            emitter.frequency = game.settings.freq;
            boom.destroy();                     // remove explosion sprite
        });

        // add to score and update text
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        // add to timer
        this.timeOffset += ship.points / 10;

        let randomInt = Math.floor(Math.random() * 5)
        if (randomInt == 0)
            this.sound.play('sfx-explosion1');
        else if (randomInt == 1)
            this.sound.play('sfx-explosion2');
        else if (randomInt == 2)
            this.sound.play('sfx-explosion3');
        else if (randomInt == 3)
            this.sound.play('sfx-explosion4');
        else if (randomInt == 4)
            this.sound.play('sfx-explosion5');
    }

    updateTimer()
    {
        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        this.timeElapsed = Math.abs(timeDifference / 1000) - this.timeOffset;   // time elapsed in seconds
        var timeRemaining = this.totalTime - this.timeElapsed;                  // time remaining in seconds

        if (!this.gameOver)
            this.timerText.text = Math.ceil(timeRemaining);

        if (this.timeElapsed >= game.settings.gameTimer)
            this.endGame();
    }

    endGame()
    {
        this.timerText.text = '0';

        this.scoreConfig.fixedWidth = 0;
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
        this.gameOver = true;
    }
}