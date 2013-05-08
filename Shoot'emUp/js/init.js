function initPowers() {
    var Shield = new PIXI.Sprite(Textures.powerup_Shield);
    Shield.height = Sprites.player.height * 0.5;
    Shield.width = Sprites.player.width * 0.2;

    var MultiBullets = new PIXI.Sprite(Textures.powerup_MutliBullets);
    MultiBullets.height = Sprites.player.height * 0.5;
    MultiBullets.width = Sprites.player.width * 0.2;

    var BigBomb = new PIXI.Sprite(Textures.powerup_BigBomb);
    BigBomb.height = Sprites.player.height * 0.5;
    BigBomb.width = Sprites.player.width * 0.2;

    powerUps.push(Shield, MultiBullets, BigBomb);
}

function initTextures() {
    Textures.blast = PIXI.Texture.fromImage("enemyBlast.png");
    Textures.player = PIXI.Texture.fromImage(Level[currentLevel].TextureFiles.player);
    Textures.background = PIXI.Texture.fromImage(Level[currentLevel].TextureFiles.background);
    Textures.playerBullet = PIXI.Texture.fromImage(Level[currentLevel].TextureFiles.playerBullet);
    Textures.enemy1 = PIXI.Texture.fromImage('img/enemy1.png');
    Textures.enemy1Red = PIXI.Texture.fromImage('img/enemy1Red.png');
    Textures.enemy2 = PIXI.Texture.fromImage('img/enemy2.png');
    Textures.enemy2Red = PIXI.Texture.fromImage('img/enemy2Red.png');
    Textures.shield = PIXI.Texture.fromImage("img//Shield.png");
    Textures.blackOverlay = PIXI.Texture.fromImage("img/black_overlay.png");
    Textures.powerup_Shield = PIXI.Texture.fromImage("img//PowerUps//powerup1.png");
    Textures.powerup_MutliBullets = PIXI.Texture.fromImage("img//PowerUps//powerup5.png");
    Textures.powerup_BigBomb = PIXI.Texture.fromImage("img//PowerUps//powerup6.png");
    Textures.playerBlast = PIXI.Texture.fromImage("specialBlast.png");
    Textures.soundOn = PIXI.Texture.fromImage('img/sound-on.png');
    Textures.soundOff = PIXI.Texture.fromImage('img/sound-off.png');

    Textures.planets = new Array();
    for (var i = 0; i < 3; i++)
        Textures.planets.push(PIXI.Texture.fromImage('img/planet' + i + '.png'));

    Textures.startButton = new PIXI.Texture(PIXI.Texture.fromImage('img/wide-button.png'),
            new PIXI.Rectangle(0, 0, 256, 64));
    Textures.startButton.noFrame = false;

    Textures.resumeButton = new PIXI.Texture(PIXI.Texture.fromImage('img/wide-button.png'),
            new PIXI.Rectangle(0, 0, 256, 64));
    Textures.resumeButton.noFrame = false;

    for (var i = 0; i < cacheIndices.explosion1.length; i++)
        new PIXI.Texture.addTextureToCache(PIXI.Texture.fromImage('img/explosion1/' + i + '.png'),
                cacheIndices.explosion1.start + i);

    for (var i = 0; i < cacheIndices.fireball.length; i++)
        new PIXI.Texture.addTextureToCache(PIXI.Texture.fromImage('img/fireball/' + i + '.png'),
                cacheIndices.fireball.start + i);
}

function reInitTextures() {
    Textures.startButton = new PIXI.Texture(PIXI.Texture.fromImage('img/wide-button.png'),
            new PIXI.Rectangle(0, 0, 256, 64));
    Textures.startButton.noFrame = false;

    Textures.resumeButton = new PIXI.Texture(PIXI.Texture.fromImage('img/wide-button.png'),
            new PIXI.Rectangle(0, 0, 256, 64));
    Textures.resumeButton.noFrame = false;
}

function initSprites() {
    Sprites.blackOverlay = new PIXI.Sprite(Textures.blackOverlay);

    Sprites.background = new PIXI.Sprite(Textures.background);
    Sprites.background.anchor.x = 0;
    Sprites.background.anchor.y = 0;
    Sprites.background.position.x = 0;

    Sprites.background2 = new PIXI.Sprite(Textures.background);
    Sprites.background2.anchor.x = 0;
    Sprites.background2.anchor.y = 0;
    Sprites.background2.position.x = 0;

    Sprites.player = new PIXI.Sprite(Textures.player);
    Sprites.player.anchor.x = 0.5;
    Sprites.player.anchor.y = 0.5;
    Sprites.player.position.x = $('body').width() / 2;
    Sprites.player.position.y = $('body').height() / 1.6;
    Sprites.player.width = $('body').width() * 0.1;
    Sprites.player.height = $('body').height() * 0.1;

    Sprites.playerBlast = new PIXI.Sprite(Textures.playerBlast);
    Sprites.playerBlast.anchor.x = 0.5;
    Sprites.playerBlast.anchor.y = 0.5;
    Sprites.playerBlast.width = Sprites.player.width;
    Sprites.playerBlast.height = Sprites.player.height;

    Sprites.shield = new PIXI.Sprite(Textures.shield);
    Sprites.shield.anchor.x = 0.5;
    Sprites.shield.anchor.y = 0.5;
    Sprites.shield.width = Sprites.shield.height = Sprites.player.width;
    Sprites.shield.alpha = 0.2;

    Sprites.startButton = new PIXI.Sprite(Textures.startButton);
    Sprites.startButton.anchor.x = 0.5;
    Sprites.startButton.anchor.y = 0.5;
    Sprites.startButton.width = 256;
    Sprites.startButton.height = 128;
    Sprites.startButton.position.x = $('body').width() / 2;
    Sprites.startButton.position.y = $('body').height() / 2.15;
    Sprites.startButton.width = 256;
    Sprites.startButton.height = 64;
    Sprites.startButton.interactive = true;
    Sprites.startButton.click = startGame;

    Sprites.resumeButton = new PIXI.Sprite(Textures.resumeButton);
    Sprites.resumeButton.anchor.x = 0.5;
    Sprites.resumeButton.anchor.y = 0.5;
    Sprites.resumeButton.width = 256;
    Sprites.resumeButton.height = 128;
    Sprites.resumeButton.position.x = $('body').width() / 2;
    Sprites.resumeButton.position.y = -50;
    Sprites.resumeButton.width = 256;
    Sprites.resumeButton.height = 64;
    Sprites.resumeButton.interactive = true;
    Sprites.resumeButton.mousedown = buttonMouseDown;
    Sprites.resumeButton.mouseup = buttonMouseUp;

    Sprites.sound = new PIXI.Sprite(Textures.soundOn);
    Sprites.sound.click = muteUnmute;
    Sprites.sound.interactive = true;
    Sprites.sound.anchor.x = Sprites.sound.anchor.y = 0.5;
    Sprites.sound.position.x = $('body').width() * 0.97;
    Sprites.sound.position.y = 20;

    Sprites.planets = new Array();
    for (var i = 0; i < Textures.planets.length; i++) {
        var planet = new PIXI.Sprite(Textures.planets[i]);
        planet.anchor.x = planet.anchor.y = 0.5;
        planet.position.x = Math.round(Math.random() * $('body').width() * 0.8) +
                $('body').width() * 0.1;
        planet.position.y = Math.round(Math.random() * $('body').height() * 0.8) +
                $('body').height() * 0.1;
        planet.alpha = 0.5;
        Sprites.planets.push(planet);
    }
}

function reInitSprites() {
    Sprites.player.position.x = $('body').width() / 2;
    Sprites.player.position.y = $('body').height() / 1.6;

    Sprites.startButton.position.x = $('body').width() / 2;
    Sprites.startButton.position.y = $('body').height() / 2.15;
    Sprites.startButton.alpha = 1;
    Sprites.startButton.rotation = 0;

    Sprites.resumeButton.position.x = $('body').width() / 2;
    Sprites.resumeButton.position.y = -100;

    Sprites.playerBlast.alpha = 1;
    Sprites.playerBlast.width = Sprites.player.width;
    Sprites.playerBlast.height = Sprites.player.height;
}

function reInitTexts() {
    Texts.start.position.x = $('body').width() / 2;
    Texts.start.position.y = $('body').height() / 2.13;
    Texts.start.alpha = 1;
    Texts.start.rotation = 0;

    Texts.welcome.position.x = $("body").width() / 2;
    Texts.welcome.position.y = 100;
}

function initTexts() {
    Texts.scoreText = new PIXI.Text("Score: " + score, "25px Snippet", "white");
    Texts.scoreText.anchor.x = 0.5;
    Texts.scoreText.position.x = 120;
    Texts.scoreText.position.y = 10;

    Texts.counterText = new PIXI.Text("Multi-Bullets: " + bonuslimit, "25px Snippet", "white");
    Texts.counterText.anchor.x = 0.5;
    Texts.counterText.position.x = 120;
    Texts.counterText.position.y = 50;

    Texts.pauseText = new PIXI.Text("Paused", "bold 80px Podkova", "red");
    Texts.pauseText.anchor.x = 0.5;

    Texts.welcome = new PIXI.Text("Shoot 'em Up!", "bold 100px Podkova", "white");
    Texts.welcome.anchor.x = 0.5;
    Texts.welcome.position.x = $("body").width() / 2;
    Texts.welcome.position.y = 100;

    Texts.start = new PIXI.Sprite(PIXI.Texture.fromImage('img/start-text.png'));
    Texts.start.anchor.x = Texts.start.anchor.y = 0.5;
    Texts.start.position.x = $('body').width() / 2;
    Texts.start.position.y = $('body').height() / 2.13;
    
    Texts.resume = new PIXI.Sprite(PIXI.Texture.fromImage('img/resume-text.png'));
    Texts.resume.anchor.x = Texts.resume.anchor.y = 0.5;
    Texts.resume.position.x = $('body').width() / 2;
    Texts.resume.position.y = -50;;
}

function initLevel(level) {
    stage.addChild(Sprites.background);
    stage.addChild(Sprites.background2);
    for(var i=0; i<Sprites.planets.length; i++)
        stage.addChild(Sprites.planets[i]);
    stage.addChild(Texts.scoreText);
    stage.addChild(Sprites.blackOverlay);

    Sprites.blackOverlay.alpha = 0.5;
    stage.addChild(Texts.pauseText);
    stage.addChild(Sprites.resumeButton);
    stage.addChild(Texts.resume);
    stage.addChild(Sprites.sound);
}

function initStartScreen() {
    stage.addChild(Texts.welcome);
    stage.addChild(Sprites.startButton);
    stage.addChild(Texts.start);
    stage.addChild(Sprites.player);
}