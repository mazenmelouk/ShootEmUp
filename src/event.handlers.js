import jq from 'jquery';
import PIXI from 'pixi.js';

import global from './global';
import { initLevel } from './level';
import { reInitSprites, reInitTexts, reInitTextures } from './reinit';
import {
  muteUnmute,
  pauseSound,
  pauseSounds,
  playSound,
  resumeSounds,
} from './sound';
import { getTopLeft, getCenter } from './sprite.helper';
import { initStartScreen } from './startScreen';

export function moveFunction(data) {
  if (global.dead || global.paused) return;

  global.Sprites.player.position.x = data.pageX;
  global.Sprites.player.position.y = data.pageY;
  if (global.shielded) {
    global.Sprites.shield.position.x = data.pageX;
    global.Sprites.shield.position.y = data.pageY;
  }
}

export function startGame() {
  playSound('bg' + (global.currentLevel + 1));
  global.startGameAnimation = true;
}

export function clickFunction() {
  if (global.cantClick || global.dead || global.paused) return;

  var bullet = new PIXI.Sprite(global.Textures.playerBullet);
  bullet.width = global.Sprites.player.width * 0.04;
  bullet.height = global.Sprites.player.height * 0.3;
  bullet.anchor.x = 0.5;
  bullet.anchor.y = 0.5;
  bullet.position.x = getCenter(global.Sprites.player).x;
  bullet.position.y = getTopLeft(global.Sprites.player).y - bullet.height / 2.0;

  global.stage.addChild(bullet);
  global.bullets.push(bullet);

  playSound('bullet');

  if (global.multigunned) {
    global.bonuslimit--;
    var right, left;
    right = new PIXI.Sprite(global.Textures.playerBullet);
    left = new PIXI.Sprite(global.Textures.playerBullet);
    right.width = left.width = global.Sprites.player.width * 0.04;
    right.height = left.height = global.Sprites.player.height * 0.3;
    right.anchor.x = left.anchor.x = 0.5;
    right.anchor.y = left.anchor.y = 0.5;
    right.position.x = left.position.x = getCenter(global.Sprites.player).x;
    right.position.y = left.position.y =
      getTopLeft(global.Sprites.player).y - bullet.height / 2.0;
    right.rotation = 0.78532981625;
    left.rotation = -0.78532981625;
    global.stage.addChild(right);
    global.stage.addChild(left);
    global.bulletsR.push(right);
    global.bulletsL.push(left);
    if (global.bonuslimit == 0) {
      global.multigunned = false;
      global.stage.removeChild(Texts.counterText);
    }
  }

  global.cantClick = true;
  jq.timer(function() {
    global.cantClick = false;
  }).once(global.clickDelay);
}

export function focusFunction() {
  global.away = false;
  if (!global.paused) resumeSounds();
}

export function blurFunction() {
  global.away = true;
  if (!global.paused) pauseSounds();
}

export function pauseGame() {
  global.paused = true;
  global.pausing = true;
  global.resuming = false;
  global.stage.removeChild(global.Sprites.blackOverlay);
  global.stage.addChild(global.Sprites.blackOverlay);
  global.stage.removeChild(Texts.pauseText);
  global.stage.addChild(Texts.pauseText);
  global.stage.removeChild(global.Sprites.resumeButton);
  global.stage.addChild(global.Sprites.resumeButton);
  global.stage.swapChildren(global.Sprites.blackOverlay, global.Sprites.sound);
  pauseSounds();
  jq('body').css('cursor', 'auto');
}

export function unPauseGame() {
  global.paused = false;
  global.pausing = false;
  global.resuming = true;
  resumeSounds();
  jq('body').css('cursor', 'none');
}

export function buttonMouseDown() {
  global.Textures.resumeButton.setFrame(new PIXI.Rectangle(0, 64, 256, 64));
}

export function buttonMouseUp() {
  global.Textures.resumeButton.setFrame(new PIXI.Rectangle(0, 0, 256, 64));
  global.cantClick = true;
  unPauseGame();
  jq.timer(function() {
    global.cantClick = false;
  }).once(300);
}

export function LevelUp() {
  pauseSound('bg' + (global.currentLevel + 1));
  global.currentLevel++;
  if (global.currentLevel >= Level.length) closeGame();
  else playSound('bg' + (global.currentLevel + 1));
}

export function closeGame() {
  global.stage = new PIXI.Stage(0xffffff, true);
  global.beginning = true;
  global.enemies = new Array();
  global.bullets = new Array();
  global.enemyBlasts = new Array();
  global.fireballs = new Array();
  global.bulletsR = new Array();
  global.bulletsL = new Array();
  global.shielded = global.multigunned = global.dead = global.cantClick = global.removed = global.paused = global.pausing = global.resuming = global.giftIsActive = global.startGameAnimation = false;
  global.score = 0;
  global.sendGift = true;
  global.giftType = -1;
  global.currentLevel = 0;
  reInitTextures();
  reInitSprites();
  reInitTexts();
  initLevel(/*global.currentLevel*/);

  jq('body').css({ cursor: 'none' });

  initStartScreen();
}

export function closeThis() {
  if (global.paused) unPauseGame();
  else closeGame();
}

export function keyPressFunction(key) {
  if (global.beginning) return;

  if (key.which == 13) {
    closeThis();
    return;
  }

  switch (String.fromCharCode(key.which).toLowerCase()) {
    case 'p':
      if (!global.paused) {
        pauseGame();
      } else {
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
