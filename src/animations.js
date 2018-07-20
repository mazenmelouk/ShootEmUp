import PIXI from 'pixi.js';
import jq from 'jquery';

import {
  detectBulletEnemyCollision,
  detectBulletStartButtonCollision,
  detectDestroyAllCollisions,
  detectGiftLocation,
  detectPlayerEnemyCollision,
  detectPlayerFireBallCollision,
} from './event.detections';
import { closeGame } from './event.handlers';
import global from './global';
import levels from './levels';
import { getBottomRight, getCenter, getTopLeft } from './sprite.helper';

function animateFireballs() {
  for (var i = 0; i < global.fireballs.length; i++) {
    global.fireballs[i].sprite.position.y +=
      4 * levels[global.currentLevel].fireballSpeed;

    if (getTopLeft(global.fireballs[i].sprite).y < jq('canvas').height()) {
      if (
        global.fireballs[i].animIndex >= 0 &&
        global.fireballs[i].animIndex <= 14
      ) {
        global.fireballs[i].animIndex +=
          0.4 * levels[global.currentLevel].fireballSpeed;
        global.fireballs[i].sprite.setTexture(
          PIXI.Texture.fromFrame(
            global.cacheIndices.fireball.start +
              Math.floor(global.fireballs[i].animIndex),
          ),
        );
      } else if (global.fireballs[i].animIndex <= 196) {
        global.fireballs[i].animIndex +=
          2 * levels[global.currentLevel].fireballSpeed;
        global.fireballs[i].sprite.setTexture(
          PIXI.Texture.fromFrame(
            global.cacheIndices.fireball.start +
              Math.floor(global.fireballs[i].animIndex),
          ),
        );
      } else if (
        global.fireballs[i].animIndex <
        global.cacheIndices.fireball.length - 1
      ) {
        global.fireballs[i].animIndex +=
          0.25 * levels[global.currentLevel].fireballSpeed;
        global.fireballs[i].sprite.setTexture(
          PIXI.Texture.fromFrame(
            global.cacheIndices.fireball.start +
              Math.floor(global.fireballs[i].animIndex),
          ),
        );
      } else {
        global.stage.removeChild(global.fireballs[i].sprite);
        global.fireballs.splice(i, 1);
      }
    } else {
      global.stage.removeChild(global.fireballs[i].sprite);
      global.fireballs.splice(i, 1);
    }
  }
}

function animatePlayerBlast() {
  if (global.Sprites.playerBlast.alpha > 0) {
    global.Sprites.playerBlast.alpha -= 0.004;
    global.Sprites.playerBlast.height += 4;
    global.Sprites.playerBlast.width += 4;
  } else {
    global.stage.removeChild(global.Sprites.playerBlast);
    global.removed = true;
    closeGame();
  }
}

function animateEnemyBlasts() {
  for (var i = 0; i < global.enemyBlasts.length; i++) {
    if (global.enemyBlasts[i].animIndex >= 24) {
      global.enemyBlasts.splice(i, 1);
      continue;
    }
    global.enemyBlasts[i].sprite.setTexture(
      new PIXI.Texture.fromFrame(
        Math.floor((global.enemyBlasts[i].animIndex += 0.5)) +
          global.cacheIndices.explosion1.start,
      ),
    );
    global.enemyBlasts[i].sprite.width += 2;
    global.enemyBlasts[i].sprite.height += 2;

    global.enemyBlasts[i].sprite.position.x +=
      getCenter(global.enemyBlasts[i].associatedEnemy.sprite).x -
      global.enemyBlasts[i].deltaXY.x;
    global.enemyBlasts[i].sprite.position.y +=
      getCenter(global.enemyBlasts[i].associatedEnemy.sprite).y -
      global.enemyBlasts[i].deltaXY.y;
    global.enemyBlasts[i].deltaXY = getCenter(
      global.enemyBlasts[i].associatedEnemy.sprite,
    );
  }
}

function animateEnemies() {
  for (var i = 0; i < global.enemies.length; i++) {
    if (
      global.enemies[i].sprite.position.y >=
      jq(window).height() +
        global.enemies[i].sprite.anchor.y * global.enemies[i].sprite.height
    ) {
      global.stage.removeChild(global.enemies[i].sprite);
      global.enemies.splice(i, 1);
    } else
      switch (global.enemies[i].state) {
        case 'alive':
          switch (global.enemies[i].type) {
            case 0:
              global.enemies[i].sprite.position.y +=
                levels[global.currentLevel].enemy1YSpeed;
              break;
            case 1:
              var playerY = getCenter(global.Sprites.player).y;
              var playerX = getCenter(global.Sprites.player).x;
              var enemyY = getCenter(global.enemies[i].sprite).y;
              var enemyX = getCenter(global.enemies[i].sprite).x;
              if (enemyY >= playerY)
                global.enemies[i].sprite.position.y +=
                  levels[global.currentLevel].enemy2YSpeed;
              else {
                global.enemies[i].sprite.position.y +=
                  levels[global.currentLevel].enemy2YSpeed;
                global.enemies[i].sprite.position.x +=
                  (-enemyX + playerX) / 150;
              }
              break;
          }
          break;
        case 'dying':
          if (global.enemies[i].oscNo >= 2) {
            global.stage.removeChild(global.enemies[i].sprite);
            global.enemies.splice(i, 1);
            continue;
          }
          global.enemies[i].sprite.alpha -= 0.03125;
        case 'hurting':
          if (global.enemies[i].oscNo >= 2) {
            global.enemies[i].state = 'alive';
            continue;
          }
          if (global.enemies[i].oscNo == 0)
            global.enemies[i].redMask.alpha += 0.125;
          else global.enemies[i].redMask.alpha -= 0.125;
          switch (global.enemies[i].oscDir) {
            case 'right':
              global.enemies[i].sprite.position.x += 1;
              global.enemies[i].oscPos += 1;
              if (global.enemies[i].oscPos == 2)
                global.enemies[i].oscDir = 'left';
              else if (global.enemies[i].oscPos == 0) global.enemies[i].oscNo++;
              break;
            case 'left':
              global.enemies[i].sprite.position.x -= 1;
              global.enemies[i].oscPos -= 1;
              if (global.enemies[i].oscPos <= -2)
                global.enemies[i].oscDir = 'right';
              break;
          }
          break;
      }
  }
}

function animateBullets() {
  for (var i = 0; i < global.bullets.length; i++) {
    global.bullets[i].position.y -= global.ySpeed;
    if (global.bullets[i].position.y <= -1 * global.bullets[i].height) {
      global.stage.removeChild(global.bullets[i]);
      global.bullets.splice(i, 1);
      i--;
    }
  }
  if (
    global.multigunned ||
    global.bulletsR.length != 0 ||
    global.bulletsL.length != 0
  ) {
    for (var i = 0; i < global.bulletsR.length; i++) {
      global.bulletsR[i].position.y -= global.ySpeed;
      global.bulletsR[i].position.x += global.xSpeed;
      if (
        global.bulletsR[i].position.y <= -1 * global.bulletsR[i].height ||
        global.bulletsR[i].position.x <= -1 * global.bulletsR[i].width
      ) {
        global.stage.removeChild(global.bulletsR[i]);
        global.bulletsR.splice(i, 1);
        i--;
      }
    }
    for (var i = 0; i < global.bulletsL.length; i++) {
      global.bulletsL[i].position.y -= global.ySpeed;
      global.bulletsL[i].position.x -= global.xSpeed;
      if (
        global.bulletsL[i].position.y <= -1 * global.bulletsL[i].height ||
        global.bulletsL[i].position.x <= -1 * global.bulletsL[i].width
      ) {
        global.stage.removeChild(global.bulletsL[i]);
        global.bulletsL.splice(i, 1);
        i--;
      }
    }
  }
}

function animateBackground() {
  global.Sprites.background.position.y += 2;
  global.Sprites.background2.position.y += 2;
  if (global.Sprites.background.position.y >= jq('body').height()) {
    global.Sprites.background.position.y =
      global.Sprites.background2.position.y - global.Sprites.background.height;
  }
  if (global.Sprites.background2.position.y >= jq('body').height()) {
    global.Sprites.background2.position.y =
      global.Sprites.background.position.y - global.Sprites.background2.height;
  }
}

function animatePauseUnpause() {
  if (global.pausing) {
    global.Sprites.blackOverlay.alpha += 0.05;
    global.Texts.pauseText.position.y += 20;
    global.Sprites.resumeButton.position.y += 20;
    global.Texts.resume.position.y += 20;
    if (global.Sprites.blackOverlay.alpha >= 0.6) {
      global.pausing = false;
    }
  } else if (global.resuming) {
    global.stage.removeChild(global.Sprites.blackOverlay);
    global.stage.addChild(global.Sprites.blackOverlay);
    global.Sprites.blackOverlay.alpha -= 0.01;
    global.Sprites.resumeButton.position.y -= 4;
    global.Texts.resume.position.y -= 4;
    global.Texts.pauseText.position.y -= 4;
    if (global.Sprites.blackOverlay.alpha <= 0) global.resuming = false;
  }
}

function animateGameStart() {
  if (!global.startGameAnimation) return;
  global.Texts.welcome.position.y -= 7;
  global.Sprites.blackOverlay.alpha -= 0.007;
  global.Sprites.startButton.rotation += global.rotDir * 0.2;
  global.Texts.start.rotation += global.rotDir * 0.2;
  global.Texts.start.alpha -= 0.06;
  global.Sprites.startButton.alpha -= 0.06;
  if (global.Sprites.blackOverlay.alpha <= 0.45) {
    global.Textures.startButton.setFrame(new PIXI.Rectangle(0, 0, 256, 64));
    if (global.Sprites.blackOverlay.alpha <= 0) {
      global.startGameAnimation = false;
      global.beginning = false;
    }
  }
}

function animateDestroyAll() {
  if (!global.destroyAll) return;
  if (
    getTopLeft(global.Sprites.bigFatNuke).x < -jq('body').width() * 0.2 &&
    getTopLeft(global.Sprites.bigFatNuke).y < -jq('body').height() * 0.2 &&
    getBottomRight(global.Sprites.bigFatNuke).x > jq('body').width() * 1.2 &&
    getBottomRight(global.Sprites.bigFatNuke).y > jq('body').height() * 1.2
  ) {
    global.destroyAll = false;
    global.stage.removeChild(global.Sprites.bigFatNuke);
    return;
  }
  global.Sprites.bigFatNuke.width += 13;
  global.Sprites.bigFatNuke.height += 13;
}

export function animate() {
  requestAnimationFrame(animate);
  if (!global.away) {
    animatePauseUnpause();
    animateGameStart();
    detectBulletStartButtonCollision();
    if (!global.paused) {
      if (!global.dead) {
        detectPlayerEnemyCollision();
        detectPlayerFireBallCollision();
        animateBackground();
      } else if (!global.removed) animatePlayerBlast();
      detectBulletEnemyCollision(global.bullets);
      if (global.multigunned || !global.bulletsIsEmpty) {
        detectBulletEnemyCollision(global.bulletsL);
        detectBulletEnemyCollision(global.bulletsR);
      }
      if (global.multigunned) {
        global.Texts.counterText.setText(
          'Multi-global.bullets: ' + global.bonuslimit,
        );
      }

      animateEnemies();
      animateBullets();
      animateEnemyBlasts();
      animateFireballs();
      animateDestroyAll();
      detectDestroyAllCollisions();
      global.Texts.scoreText.setText(
        'levels ' + (global.currentLevel + 1) + ' - Score : ' + global.score,
      );

      if (global.giftIsActive) {
        global.currentGift.position.y += 3;
        detectGiftLocation();
      }
    }
  }
  global.renderer.render(global.stage);
}
