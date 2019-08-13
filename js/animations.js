function animateFireballs() {
    for (var i = 0; i < fireballs.length; i++) {
        fireballs[i].sprite.position.y += 4 * Level[currentLevel].fireballSpeed;

        if (getTopLeft(fireballs[i].sprite).y < $("canvas").height()) {
            if (fireballs[i].animIndex >= 0 && fireballs[i].animIndex <= 14) {
                fireballs[i].animIndex += (0.4) * Level[currentLevel].fireballSpeed;
                fireballs[i].sprite.setTexture(PIXI.Texture.fromFrame(cacheIndices.fireball.start + Math.floor(fireballs[i].animIndex)));
            }
            else if (fireballs[i].animIndex <= 196) {
                fireballs[i].animIndex += 2 * Level[currentLevel].fireballSpeed;
                fireballs[i].sprite.setTexture(PIXI.Texture.fromFrame(cacheIndices.fireball.start + Math.floor(fireballs[i].animIndex)));
            }
            else if (fireballs[i].animIndex < (cacheIndices.fireball.length - 1)) {
                fireballs[i].animIndex += 0.25 * Level[currentLevel].fireballSpeed;
                fireballs[i].sprite.setTexture(PIXI.Texture.fromFrame(cacheIndices.fireball.start + Math.floor(fireballs[i].animIndex)));
            }
            else {
                stage.removeChild(fireballs[i].sprite);
                fireballs.splice(i, 1);
            }
        }
        else {
            stage.removeChild(fireballs[i].sprite);
            fireballs.splice(i, 1);
        }
    }
}

function animatePlayerBlast() {
    if (Sprites.playerBlast.alpha > 0) {
        Sprites.playerBlast.alpha -= 0.004;
        Sprites.playerBlast.height += 4;
        Sprites.playerBlast.width += 4;
    }
    else {
        stage.removeChild(Sprites.playerBlast);
        removed = true;
        closeGame();
    }
}

function animateEnemyBlasts() {
    for (var i = 0; i < enemyBlasts.length; i++) {
        if (enemyBlasts[i].animIndex >= 24) {
            enemyBlasts.splice(i, 1);
            continue;
        }
        enemyBlasts[i].sprite.setTexture(
                new PIXI.Texture.fromFrame(
                Math.floor(enemyBlasts[i].animIndex += 0.5) + cacheIndices.explosion1.start
                ));
        enemyBlasts[i].sprite.width += 2;
        enemyBlasts[i].sprite.height += 2;

        enemyBlasts[i].sprite.position.x += getCenter(enemyBlasts[i].associatedEnemy.sprite).x -
                enemyBlasts[i].deltaXY.x;
        enemyBlasts[i].sprite.position.y += getCenter(enemyBlasts[i].associatedEnemy.sprite).y -
                enemyBlasts[i].deltaXY.y;
        enemyBlasts[i].deltaXY =
                getCenter(enemyBlasts[i].associatedEnemy.sprite);
    }
}

function animateEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].sprite.position.y >= $(window).height() + enemies[i].sprite.anchor.y * enemies[i].sprite.height) {
            stage.removeChild(enemies[i].sprite);
            enemies.splice(i, 1);
        }
        else
            switch (enemies[i].state) {
                case 'alive':
                    switch (enemies[i].type) {
                        case 0:
                            enemies[i].sprite.position.y += Level[currentLevel].enemy1YSpeed;
                            break;
                        case 1:
                            var playerY = getCenter(Sprites.player).y;
                            var playerX = getCenter(Sprites.player).x;
                            var enemyY = getCenter(enemies[i].sprite).y;
                            var enemyX = getCenter(enemies[i].sprite).x;
                            if (enemyY >= playerY)
                                enemies[i].sprite.position.y += Level[currentLevel].enemy2YSpeed;
                            else {
                                enemies[i].sprite.position.y += Level[currentLevel].enemy2YSpeed;
                                enemies[i].sprite.position.x += (-enemyX + playerX) / 150;
                            }
                            break;
                    }
                    break;
                case 'dying':
                    if (enemies[i].oscNo >= 2) {
                        stage.removeChild(enemies[i].sprite);
                        enemies.splice(i, 1);
                        continue;
                    }
                    enemies[i].sprite.alpha -= 0.03125;
                case 'hurting':
                    if (enemies[i].oscNo >= 2) {
                        enemies[i].state = 'alive';
                        continue;
                    }
                    if (enemies[i].oscNo == 0)
                        enemies[i].redMask.alpha += 0.125;
                    else
                        enemies[i].redMask.alpha -= 0.125;
                    switch (enemies[i].oscDir) {
                        case 'right':
                            enemies[i].sprite.position.x += 1;
                            enemies[i].oscPos += 1;
                            if (enemies[i].oscPos == 2)
                                enemies[i].oscDir = 'left';
                            else
                            if (enemies[i].oscPos == 0)
                                enemies[i].oscNo++;
                            break;
                        case 'left':
                            enemies[i].sprite.position.x -= 1;
                            enemies[i].oscPos -= 1;
                            if (enemies[i].oscPos <= -2)
                                enemies[i].oscDir = 'right';
                            break;
                    }
                    break;
            }
    }
}

function animateBullets() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].position.y -= ySpeed;
        if (bullets[i].position.y <= -1 * bullets[i].height) {
            stage.removeChild(bullets[i]);
            bullets.splice(i, 1);
            i--;
        }
    }
    if (multigunned || bulletsR.length != 0 || bulletsL.length != 0)
    {
        for (var i = 0; i < bulletsR.length; i++) {
            bulletsR[i].position.y -= ySpeed;
            bulletsR[i].position.x += xSpeed;
            if (bulletsR[i].position.y <= -1 * bulletsR[i].height || bulletsR[i].position.x <= -1 * bulletsR[i].width)
            {
                stage.removeChild(bulletsR[i]);
                bulletsR.splice(i, 1);
                i--;

            }
        }
        for (var i = 0; i < bulletsL.length; i++) {
            bulletsL[i].position.y -= ySpeed;
            bulletsL[i].position.x -= xSpeed;
            if (bulletsL[i].position.y <= -1 * bulletsL[i].height || bulletsL[i].position.x <= -1 * bulletsL[i].width)
            {
                stage.removeChild(bulletsL[i]);
                bulletsL.splice(i, 1);
                i--;

            }
        }
    }
}

function animateBackground() {
    Sprites.background.position.y += 2;
    Sprites.background2.position.y += 2;
    if (Sprites.background.position.y >= $("body").height()) {
        Sprites.background.position.y = Sprites.background2.position.y - Sprites.background.height;
    }
    if (Sprites.background2.position.y >= $("body").height()) {
        Sprites.background2.position.y = Sprites.background.position.y - Sprites.background2.height;
    }
}

function animatePauseUnpause() {
    if (pausing) {
        Sprites.blackOverlay.alpha += 0.05;
        Texts.pauseText.position.y += 20;
        Sprites.resumeButton.position.y += 20;
        Texts.resume.position.y +=20;
        if (Sprites.blackOverlay.alpha >= 0.6) {
            pausing = false;
        }
    }
    else if (resuming) {
        stage.removeChild(Sprites.blackOverlay);
        stage.addChild(Sprites.blackOverlay);
        Sprites.blackOverlay.alpha -= 0.01;
        Sprites.resumeButton.position.y -= 4;
        Texts.resume.position.y -=4;
        Texts.pauseText.position.y -= 4;
        if (Sprites.blackOverlay.alpha <= 0)
            resuming = false;
    }
}

function animateGameStart() {
    if (!startGameAnimation)
        return;
    Texts.welcome.position.y -= 7;
    Sprites.blackOverlay.alpha -= 0.007;
    Sprites.startButton.rotation += rotDir * 0.2;
    Texts.start.rotation += rotDir * 0.2;
    Texts.start.alpha -= 0.06;
    Sprites.startButton.alpha -= 0.06;
    if (Sprites.blackOverlay.alpha <= 0.45) {
        Textures.startButton.setFrame(new PIXI.Rectangle(0, 0, 256, 64));
        if (Sprites.blackOverlay.alpha <= 0) {
            startGameAnimation = false;
            beginning = false;
        }
    }
}

function animateDestroyAll() {
    if (!destroyAll)
        return;
    if (getTopLeft(Sprites.bigFatNuke).x < -$('body').width() * 0.2 && getTopLeft(Sprites.bigFatNuke).y < -$('body').height() * 0.2
            && getBottomRight(Sprites.bigFatNuke).x > $('body').width() * 1.2 && getBottomRight(Sprites.bigFatNuke).y > $('body').height() * 1.2) {
        destroyAll = false;
        stage.removeChild(Sprites.bigFatNuke);
        return;
    }
    Sprites.bigFatNuke.width += 13;
    Sprites.bigFatNuke.height += 13;
}

function animate() {
    requestAnimFrame(animate);
    if (!away) {
        animatePauseUnpause();
        animateGameStart();
        detectBulletStartButtonCollision();
        if (!paused) {
            if (!dead) {
                detectPlayerEnemyCollision();
                detectPlayerFireBallCollision();
                animateBackground();
            }
            else
            if (!removed)
                animatePlayerBlast();
            detectBulletEnemyCollision(bullets);
            if (multigunned || !bulletsIsEmpty) {
                detectBulletEnemyCollision(bulletsL);
                detectBulletEnemyCollision(bulletsR);
            }
            if (multigunned) {
                Texts.counterText.setText("Multi-bullets: " + bonuslimit);
            }

            animateEnemies();
            animateBullets();
            animateEnemyBlasts();
            animateFireballs();
            animateDestroyAll();
            detectDestroyAllCollisions();
            Texts.scoreText.setText("Level " + (currentLevel + 1) + " - Score : " + score);

            if (giftIsActive) {
                currentGift.position.y += 3;
                detectGiftLocation();
            }
        }
    }
    renderer.render(stage);
}