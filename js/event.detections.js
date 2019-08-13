function detectPlayerEnemyCollision() {
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].state != 'dying' && detectCollision(Sprites.player, enemies[i].sprite)) {
            if (shielded) {
                shielded = false;
                stage.removeChild(Sprites.shield);
                stage.removeChild(enemies[i].sprite);
                enemies.splice(i, 1);

                return;
            }
            dead = true;
            playSound("bigBlast");
            Sprites.playerBlast.position = getCenter(Sprites.player);
            stage.removeChild(enemies[i].sprite);
            enemies.splice(i, 1);
            stage.addChild(Sprites.playerBlast);
            stage.removeChild(Sprites.player);
            return;
        }
    }
}

function detectPlayerFireBallCollision() {
    for (i = 0; i < fireballs.length; i++) {
        if (detectCollisionFireBall(fireballs[i].sprite, Sprites.player)) {
            if (shielded) {
                shielded = false;
                stage.removeChild(Sprites.shield);
                stage.removeChild(fireballs[i].sprite);
                fireballs.splice(i, 1);

                return;
            }
            dead = true;
            $("body").css("cursor", "auto");
            playSound("bigBlast");
            Sprites.playerBlast.position = getCenter(Sprites.player);
            stage.removeChild(fireballs[i].sprite);
            fireballs.splice(i, 1);
            stage.addChild(Sprites.playerBlast);
            stage.removeChild(Sprites.player);
            return;
        }
    }
}

function summonSheild() {
    shielded = true;
    Sprites.shield.position = getCenter(Sprites.player);
    stage.addChild(Sprites.shield);
    playSound('shieldCharge');
}

function detectGiftLocation() {
    if (detectCollision(currentGift, Sprites.player))
    {
        if (giftType == 0) {
            summonSheild();
        }
        else if (giftType == 1) {
            multigunned = true;
            bulletsIsEmpty = false;
            bonuslimit = maxBonus;
            stage.addChild(Texts.counterText);
        }
        else {
            Textures.bigFatNuke = new PIXI.Texture(PIXI.Texture.fromImage('img/mario-cloud.png'));
            Sprites.bigFatNuke = new PIXI.Sprite(Textures.bigFatNuke);
            Sprites.bigFatNuke.position = getCenter(currentGift);
            Sprites.bigFatNuke.anchor.x = Sprites.bigFatNuke.anchor.y = 0.5;
            Sprites.bigFatNuke.width = Sprites.bigFatNuke.height = 0;

            playSound('whoosh');

            destroyAll = true;
            stage.addChild(Sprites.bigFatNuke);
            stage.swapChildren(Sprites.bigFatNuke, Sprites.player);
        }

        stage.removeChild(currentGift);
        giftIsActive = false;
        sendGift = true;
    }
    if (currentGift.position.y > $("canvas").height()) {
        stage.removeChild(currentGift);
        giftIsActive = false;
        sendGift = true;
        return;
    }
}

function detectBulletStartButtonCollision() {
    if (!beginning)
        return;
    for (var i = 0; i < bullets.length; i++) {
        if (detectCollision(bullets[i], Sprites.startButton)) {
            var bulletCenter = getCenter(bullets[i]);
            var buttonCenter = getCenter(Sprites.startButton);
            if (bulletCenter.x < buttonCenter.x) {
                rotDir = 1;
            }
            else if (bulletCenter.x > buttonCenter.x) {
                rotDir = -1;
            }
            else
                rotDir = 0;
            startGameAnimation = true;
            stage.removeChild(bullets[i]);
            bullets.splice(i, 1);
            Textures.startButton.setFrame(new PIXI.Rectangle(0, 64, 256, 64));
            playSound('start');
            return;
        }
    }
}
/*
 function blastAllEnemies()
 {
 for (j = 0; j < enemies.length; j++)
 {
 var enemyBlast = {
 animIndex: 0
 };
 
 enemyBlast.sprite = new PIXI.Sprite(new PIXI.Texture.fromFrame(cacheIndices.explosion1.start));
 enemyBlast.sprite.anchor.x = enemyBlast.sprite.anchor.y = 0.5;
 enemyBlast.sprite.position = getCenter(enemies[j].sprite);
 enemyBlast.sprite.width = enemyBlast.sprite.height = enemies[j].sprite.width / 2.5;
 score += 10;
 
 playSound("blast");
 enemyBlasts.push(enemyBlast);
 stage.addChild(enemyBlast.sprite);
 
 enemies[j].injuries++;
 enemies[j].oscNo = 0;
 enemies[j].oscDir = 'right';
 enemies[j].oscPos = 0;
 enemies[j].state = 'dying';
 
 }
 
 }*/
function detectBulletEnemyCollision(bulletsArray) {
    var i, j;
    for (j = 0; j < enemies.length; j++)
        for (i = 0; i < bulletsArray.length; i++) {
            if (enemies[j].injuries >= enemyTypes.maxInjuries)
                return;
            if ((detectCollision(bulletsArray[i], enemies[j].sprite) && getBottomRight(enemies[j].sprite).y > 5)) {
                var enemyBlast = {
                    animIndex: 0,
                    associatedEnemy: enemies[j],
                    deltaXY: getCenter(enemies[j].sprite)
                };

                enemyBlast.sprite = new PIXI.Sprite(new PIXI.Texture.fromFrame(cacheIndices.explosion1.start));
                enemyBlast.sprite.anchor.x = enemyBlast.sprite.anchor.y = 0.5;
                enemyBlast.sprite.position = getCenter(bulletsArray[i]);
                enemyBlast.sprite.width = enemyBlast.sprite.height = enemies[j].sprite.width / 2.5;

                score += 10 * (currentLevel + 1) * (enemyTypes[enemies[j].type].scoreFactor)
                        * (enemies[j].injuries + 1);

                if (score >= Level[currentLevel].scoreStep)
                    LevelUp();

                playSound("blast");
                enemyBlasts.push(enemyBlast);
                stage.addChild(enemyBlast.sprite);

                stage.removeChild(bulletsArray[i]);
                bulletsArray.splice(i, 1);

                enemies[j].injuries++;
                enemies[j].oscNo = 0;
                enemies[j].oscDir = 'right';
                enemies[j].oscPos = 0;

                if (enemies[j].injuries >= enemyTypes[enemies[j].type].maxInjuries)
                    enemies[j].state = 'dying';
                else {
                    enemies[j].state = 'hurting';

                }
                if ((score - prevScore) >= Level[currentLevel].bonusStep && sendGift) {
                    giftIsActive = true;
                    sendGift = false;
                    spawnPowers();
                    prevScore = score;
                }
                else {
                    sendGift = true;
                }
            }
        }
}

function detectDestroyAllCollisions() {
    if (!destroyAll)
        return;
    for (var i = 0; i < enemies.length; i++) {
        if (Math.pow(getCenter(enemies[i].sprite).x - getCenter(Sprites.bigFatNuke).x, 2)
                + Math.pow(getCenter(enemies[i].sprite).y - getCenter(Sprites.bigFatNuke).y, 2)
                <= Math.pow(Sprites.bigFatNuke.width * 0.6, 2) && enemies[i].state!='dying') {
            enemies[i].state = 'dying';
            enemies[i].oscNo = 0;
            enemies[i].oscDir = 'right';
            enemies[i].oscPos = 0;
            score += 10 * (currentLevel + 1) * (enemyTypes[enemies[i].type].scoreFactor)
                    * (enemies[i].injuries + 1);

            if (score >= Level[currentLevel].scoreStep)
                LevelUp();
        }
    }
}