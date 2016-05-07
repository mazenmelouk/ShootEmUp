function spawnEnemy1() {
    var enemySprite = new PIXI.Sprite(Textures.enemy1);
    enemySprite.height = Sprites.player.height * 1.1;
    enemySprite.width = Sprites.player.width * 1.1;
    enemySprite.position.x = Math.random() * ($("canvas").width() - 150);
    enemySprite.position.y = -enemySprite.height;
    var redMask = new PIXI.Sprite(Textures.enemy1Red);
    redMask.alpha = 0;
    enemySprite.addChild(redMask);
    enemies.push({sprite: enemySprite, type: 0, state: 'alive', injuries: 0,
    redMask: redMask});
    stage.addChild(enemySprite);
}

function spawnEnemy2() {
    var enemySprite = new PIXI.Sprite(Textures.enemy2);
    enemySprite.height = Sprites.player.height * 0.9;
    enemySprite.width = Sprites.player.width * 0.7;
    enemySprite.position.x = Math.random() * ($("canvas").width() - 150);
    enemySprite.position.y = -enemySprite.height;
    var redMask = new PIXI.Sprite(Textures.enemy2Red);
    redMask.alpha = 0;
    enemySprite.addChild(redMask);
    enemies.push({sprite: enemySprite, type: 1, state: 'alive', injuries: 0,
    redMask: redMask});
    stage.addChild(enemySprite);
}

function spawnEnemies() {
    if (paused || away || beginning)
        return;

    switch (currentLevel) {
        case 0:
            spawnEnemy1();
            break;
        case 1:
            var decision = Math.random() * 10;
            if (decision < 4)
                spawnEnemy1();
            else
                spawnEnemy2();
            break;
    }
}

function spawnPowers() {
    if (paused || away || beginning)
        return;
    giftType = Math.floor(Math.random() * 3);
    while(giftType==2 && destroyAll)
        giftType = Math.floor(Math.random() * 3);
    currentGift = powerUps[giftType];
    currentGift.position.x = Math.random() * ($("canvas").width() - 150);
    currentGift.position.y = 10;
    stage.addChild(currentGift);
}

function spawnFireballs() {
    if (paused || away || beginning)
        return;

    var fireball = {
        animIndex: 0,
        sprite: new PIXI.Sprite(new PIXI.Texture.fromFrame(cacheIndices.fireball.start))
    };

    fireball.sprite.anchor.x = fireball.sprite.anchor.y = 0.5;
    fireball.sprite.position.x = Math.random() * ($("canvas").width() - 150);
    fireball.sprite.position.y = -0.5 * fireball.sprite.height;

    fireballs.push(fireball);
    stage.addChild(fireball.sprite);
}

$(document).ready(function() {
    initTextures();
    initSprites();
    initTexts();

    stage = new PIXI.Stage(0xFFFFFF, true);
    renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
    $("body").append(renderer.view);

    initLevel(currentLevel);

    $.timer(spawnEnemies, Level[currentLevel].enemySpawnInterval, true);
    initPowers();
    $.timer(spawnFireballs, Level[currentLevel].fireballSpawnInterval, true);

    $("canvas").mousemove(moveFunction).click(clickFunction);
    $("canvas").get(0).touchmove = moveFunction;
    $(document).keypress(keyPressFunction);
    initStartScreen();

    requestAnimFrame(animate);

    $(window).load(
            function() {
                Sprites.background.position.y = $("body").height() - Textures.background.height;
                Sprites.background2.position.y = topEdge = -Textures.background.height + Sprites.background.position.y;
                $("canvas").attr({
                    width: $("body").width(),
                    height: $("body").height()
                });
                playSound('bg' + (currentLevel + 1));
                Texts.pauseText.position.x = $("body").width() / 2;
                Texts.pauseText.position.y = -200;
            }
    ).blur(blurFunction).focus(focusFunction);
});