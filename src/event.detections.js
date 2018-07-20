import jq from 'jquery';
import PIXI from 'pixi.js';

import global from './global';
import levels from './levels';
import { playSound } from './sound';
import {
  detectCollision,
  detectCollisionFireBall,
  getBottomRight,
  getCenter,
} from './sprite.helper';

export function detectPlayerEnemyCollision() {
  for (let i = 0; i < global.enemies.length; i++) {
    if (
      global.enemies[i].state != 'dying' &&
      detectCollision(global.Sprites.player, global.enemies[i].sprite)
    ) {
      if (global.shielded) {
        global.shielded = false;
        global.stage.removeChild(global.Sprites.shield);
        global.stage.removeChild(global.enemies[i].sprite);
        global.enemies.splice(i, 1);

        return;
      }
      global.dead = true;
      playSound('bigBlast');
      global.Sprites.playerBlast.position = getCenter(global.Sprites.player);
      global.stage.removeChild(global.enemies[i].sprite);
      global.enemies.splice(i, 1);
      global.stage.addChild(global.Sprites.playerBlast);
      global.stage.removeChild(global.Sprites.player);
      return;
    }
  }
}

export function detectPlayerFireBallCollision() {
  for (let i = 0; i < global.fireballs.length; i++) {
    if (
      detectCollisionFireBall(global.fireballs[i].sprite, global.Sprites.player)
    ) {
      if (global.shielded) {
        global.shielded = false;
        global.stage.removeChild(global.Sprites.shield);
        global.stage.removeChild(global.fireballs[i].sprite);
        global.fireballs.splice(i, 1);

        return;
      }
      global.dead = true;
      jq('body').css('cursor', 'auto');
      playSound('bigBlast');
      global.Sprites.playerBlast.position = getCenter(global.Sprites.player);
      global.stage.removeChild(global.fireballs[i].sprite);
      global.fireballs.splice(i, 1);
      global.stage.addChild(global.Sprites.playerBlast);
      global.stage.removeChild(global.Sprites.player);
      return;
    }
  }
}

export function summonSheild() {
  global.shielded = true;
  global.Sprites.shield.position = getCenter(global.Sprites.player);
  global.stage.addChild(global.Sprites.shield);
  playSound('shieldCharge');
}

export function detectGiftLocation() {
  if (detectCollision(global.currentGift, global.Sprites.player)) {
    if (global.giftType == 0) {
      summonSheild();
    } else if (global.giftType == 1) {
      global.multigunned = true;
      global.bulletsIsEmpty = false;
      global.bonuslimit = maxBonus;
      global.stage.addChild(Texts.counterText);
    } else {
      global.Textures.bigFatNuke = new PIXI.Texture(
        PIXI.Texture.fromImage('img/mario-cloud.png'),
      );
      global.Sprites.bigFatNuke = new PIXI.Sprite(global.Textures.bigFatNuke);
      global.Sprites.bigFatNuke.position = getCenter(global.currentGift);
      global.Sprites.bigFatNuke.anchor.x = global.Sprites.bigFatNuke.anchor.y = 0.5;
      global.Sprites.bigFatNuke.width = global.Sprites.bigFatNuke.height = 0;

      playSound('whoosh');

      global.destroyAll = true;
      global.stage.addChild(global.Sprites.bigFatNuke);
      global.stage.swapChildren(
        global.Sprites.bigFatNuke,
        global.Sprites.player,
      );
    }

    global.stage.removeChild(global.currentGift);
    global.giftIsActive = false;
    global.sendGift = true;
  }
  if (global.currentGift.position.y > jq('canvas').height()) {
    global.stage.removeChild(global.currentGift);
    global.giftIsActive = false;
    global.sendGift = true;
    return;
  }
}

export function detectBulletStartButtonCollision() {
  if (!global.beginning) return;
  for (var i = 0; i < global.bullets.length; i++) {
    if (detectCollision(global.bullets[i], global.Sprites.startButton)) {
      var bulletCenter = getCenter(global.bullets[i]);
      var buttonCenter = getCenter(global.Sprites.startButton);
      if (bulletCenter.x < buttonCenter.x) {
        global.rotDir = 1;
      } else if (bulletCenter.x > buttonCenter.x) {
        global.rotDir = -1;
      } else global.rotDir = 0;
      global.startGameAnimation = true;
      global.stage.removeChild(global.bullets[i]);
      global.bullets.splice(i, 1);
      global.Textures.startButton.setFrame(new PIXI.Rectangle(0, 64, 256, 64));
      playSound('start');
      return;
    }
  }
}
/*
 export function blastAllEnemies()
 {
 for (j = 0; j < global.enemies.length; j++)
 {
 var enemyBlast = {
 animIndex: 0
 };
 
 enemyBlast.sprite = new PIXI.Sprite(new PIXI.Texture.fromFrame(global.cacheIndices.explosion1.start));
 enemyBlast.sprite.anchor.x = enemyBlast.sprite.anchor.y = 0.5;
 enemyBlast.sprite.position = getCenter(global.enemies[j].sprite);
 enemyBlast.sprite.width = enemyBlast.sprite.height = global.enemies[j].sprite.width / 2.5;
 global.score += 10;
 
 playSound("blast");
 global.enemyBlasts.push(enemyBlast);
 global.stage.addChild(enemyBlast.sprite);
 
 global.enemies[j].injuries++;
 global.enemies[j].oscNo = 0;
 global.enemies[j].oscDir = 'right';
 global.enemies[j].oscPos = 0;
 global.enemies[j].state = 'dying';
 
 }
 
 }*/

function spawnPowers() {
  if (global.paused || global.away || global.beginning) return;
  global.giftType = Math.floor(Math.random() * 3);
  while (global.giftType == 2 && global.destroyAll)
    global.giftType = Math.floor(Math.random() * 3);
  global.currentGift = global.powerUps[global.giftType];
  global.currentGift.position.x = Math.random() * (jq('canvas').width() - 150);
  global.currentGift.position.y = 10;
  global.stage.addChild(global.currentGift);
}

export function detectBulletEnemyCollision(bulletsArray) {
  var i, j;
  for (j = 0; j < global.enemies.length; j++)
    for (i = 0; i < bulletsArray.length; i++) {
      if (global.enemies[j].injuries >= global.enemyTypes.maxInjuries) return;
      if (
        detectCollision(bulletsArray[i], global.enemies[j].sprite) &&
        getBottomRight(global.enemies[j].sprite).y > 5
      ) {
        var enemyBlast = {
          animIndex: 0,
          associatedEnemy: global.enemies[j],
          deltaXY: getCenter(global.enemies[j].sprite),
        };

        enemyBlast.sprite = new PIXI.Sprite(
          new PIXI.Texture.fromFrame(global.cacheIndices.explosion1.start),
        );
        enemyBlast.sprite.anchor.x = enemyBlast.sprite.anchor.y = 0.5;
        enemyBlast.sprite.position = getCenter(bulletsArray[i]);
        enemyBlast.sprite.width = enemyBlast.sprite.height =
          global.enemies[j].sprite.width / 2.5;

        global.score +=
          10 *
          (global.currentLevel + 1) *
          global.enemyTypes[global.enemies[j].type].scoreFactor *
          (global.enemies[j].injuries + 1);

        if (global.score >= levels[global.currentLevel].scoreStep) LevelUp();

        playSound('blast');
        global.enemyBlasts.push(enemyBlast);
        global.stage.addChild(enemyBlast.sprite);

        global.stage.removeChild(bulletsArray[i]);
        bulletsArray.splice(i, 1);

        global.enemies[j].injuries++;
        global.enemies[j].oscNo = 0;
        global.enemies[j].oscDir = 'right';
        global.enemies[j].oscPos = 0;

        if (
          global.enemies[j].injuries >=
          global.enemyTypes[global.enemies[j].type].maxInjuries
        )
          global.enemies[j].state = 'dying';
        else {
          global.enemies[j].state = 'hurting';
        }
        if (
          global.score - global.prevScore >=
            levels[global.currentLevel].bonusStep &&
          global.sendGift
        ) {
          global.giftIsActive = true;
          global.sendGift = false;
          spawnPowers();
          global.prevScore = global.score;
        } else {
          global.sendGift = true;
        }
      }
    }
}

export function detectDestroyAllCollisions() {
  if (!global.destroyAll) return;
  for (var i = 0; i < global.enemies.length; i++) {
    if (
      Math.pow(
        getCenter(global.enemies[i].sprite).x -
          getCenter(global.Sprites.bigFatNuke).x,
        2,
      ) +
        Math.pow(
          getCenter(global.enemies[i].sprite).y -
            getCenter(global.Sprites.bigFatNuke).y,
          2,
        ) <=
        Math.pow(global.Sprites.bigFatNuke.width * 0.6, 2) &&
      global.enemies[i].state != 'dying'
    ) {
      global.enemies[i].state = 'dying';
      global.enemies[i].oscNo = 0;
      global.enemies[i].oscDir = 'right';
      global.enemies[i].oscPos = 0;
      global.score +=
        10 *
        (global.currentLevel + 1) *
        global.enemyTypes[global.enemies[i].type].scoreFactor *
        (global.enemies[i].injuries + 1);

      if (global.score >= levels[global.currentLevel.scoreStep]) LevelUp();
    }
  }
}
