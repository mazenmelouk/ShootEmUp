function moveFunction(data) {
    if (dead || paused)
        return;

    Sprites.player.position.x = data.pageX;
    Sprites.player.position.y = data.pageY;
    if (shielded) {
        Sprites.shield.position.x = data.pageX;
        Sprites.shield.position.y = data.pageY;
    }
}

function startGame() {
    startGameAnimation = true;
}

function clickFunction() {
    if (cantClick || dead || paused)
        return;

    var bullet = new PIXI.Sprite(Textures.playerBullet);
    bullet.width = Sprites.player.width * 0.04;
    bullet.height = Sprites.player.height * 0.3;
    bullet.anchor.x = 0.5;
    bullet.anchor.y = 0.5;
    bullet.position.x = getCenter(Sprites.player).x;
    bullet.position.y = getTopLeft(Sprites.player).y - bullet.height / 2.0;

    stage.addChild(bullet);
    bullets.push(bullet);

    playSound("bullet");

    if (multigunned) {
        bonuslimit--;
        var right, left;
        right = new PIXI.Sprite(Textures.playerBullet);
        left = new PIXI.Sprite(Textures.playerBullet);
        right.width = left.width = Sprites.player.width * 0.04;
        right.height = left.height = Sprites.player.height * 0.3;
        right.anchor.x = left.anchor.x = 0.5;
        right.anchor.y = left.anchor.y = 0.5;
        right.position.x = left.position.x = getCenter(Sprites.player).x;
        right.position.y = left.position.y = getTopLeft(Sprites.player).y - bullet.height / 2.0;
        right.rotation = 0.78532981625;
        left.rotation = -0.78532981625;
        stage.addChild(right);
        stage.addChild(left);
        bulletsR.push(right);
        bulletsL.push(left);
        if (bonuslimit == 0)
        {
            multigunned = false;
            stage.removeChild(Texts.counterText);
        }
    }

    cantClick = true;
    $.timer(function() {
        cantClick = false;
    }).once(clickDelay);
}

function focusFunction() {
    away = false;
    if (!paused)
        resumeSounds();
}

function blurFunction() {
    away = true;
    if (!paused)
        pauseSounds();
}

function pauseGame() {
    paused = true;
    pausing = true;
    resuming = false;
    stage.removeChild(Sprites.blackOverlay);
    stage.addChild(Sprites.blackOverlay);
    stage.removeChild(Texts.pauseText);
    stage.addChild(Texts.pauseText);
    stage.removeChild(Sprites.resumeButton);
    stage.addChild(Sprites.resumeButton);
    stage.swapChildren(Sprites.blackOverlay, Sprites.sound);
    pauseSounds();
    $("body").css("cursor", "auto");
}

function unPauseGame() {
    paused = false;
    pausing = false;
    resuming = true;
    resumeSounds();
    $("body").css("cursor", "none");
}

function buttonMouseDown() {
    Textures.resumeButton.setFrame(new PIXI.Rectangle(0, 64, 256, 64));
}

function buttonMouseUp() {
    Textures.resumeButton.setFrame(new PIXI.Rectangle(0, 0, 256, 64));
    cantClick = true;
    unPauseGame();
    $.timer(function() {
        cantClick = false;
    }).once(300);
}

function LevelUp() {
    pauseSound('bg' + (currentLevel + 1));
    currentLevel++;
    if (currentLevel >= Level.length)
        closeGame();
    else
        playSound('bg' + (currentLevel + 1));
}

function closeGame() {
    stage = new PIXI.Stage(0xFFFFFF, true);
    beginning = true;
    enemies = new Array();
    bullets = new Array();
    enemyBlasts = new Array();
    fireballs = new Array();
    bulletsR = new Array();
    bulletsL = new Array();
    shielded = multigunned = dead = cantClick = removed = paused = pausing =
            resuming = giftIsActive = startGameAnimation = false;
    score = 0;
    sendGift = true;
    giftType = -1;
    currentLevel = 0;
    reInitTextures();
    reInitSprites();
    reInitTexts();
    initLevel(currentLevel);

    $('body').css({'cursor': 'none'});

    initStartScreen();
}

function closeThis() {
    if (paused)
        unPauseGame();
    else
        closeGame();
}

function keyPressFunction(key) {
    if (beginning)
        return;

    if (key.which == 13) {
        closeThis();
        return;
    }

    switch (String.fromCharCode(key.which).toLowerCase()) {
        case 'p':
            if (!paused) {
                pauseGame();
            }
            else {
                unPauseGame();
            }
            break;
        case 'm':
            muteUnmute();
            break;
        case 'c':
            closeThis();
            break;
    }
}