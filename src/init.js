import jq from 'jquery';
import PIXI from 'pixi.js';

import { animate } from './animations';
import {
  blurFunction,
  clickFunction,
  focusFunction,
  keyPressFunction,
  moveFunction,
} from './event.handlers';
import global from './global';
import './jquery.timer';
import { initLevel } from './level';
import levels from './levels';
import { initSprites } from './sprite';
import { initStartScreen } from './startScreen';

function spawnEnemy1() {
  var enemySprite = new PIXI.Sprite(global.Textures.enemy1);
  enemySprite.height = global.Sprites.player.height * 1.1;
  enemySprite.width = global.Sprites.player.width * 1.1;
  enemySprite.position.x = Math.random() * (jq('canvas').width() - 150);
  enemySprite.position.y = -enemySprite.height;
  var redMask = new PIXI.Sprite(global.Textures.enemy1Red);
  redMask.alpha = 0;
  enemySprite.addChild(redMask);
  global.enemies.push({
    sprite: enemySprite,
    type: 0,
    state: 'alive',
    injuries: 0,
    redMask: redMask,
  });
  global.stage.addChild(enemySprite);
}

function spawnEnemy2() {
  var enemySprite = new PIXI.Sprite(global.Textures.enemy2);
  enemySprite.height = global.Sprites.player.height * 0.9;
  enemySprite.width = global.Sprites.player.width * 0.7;
  enemySprite.position.x = Math.random() * (jq('canvas').width() - 150);
  enemySprite.position.y = -enemySprite.height;
  var redMask = new PIXI.Sprite(global.Textures.enemy2Red);
  redMask.alpha = 0;
  enemySprite.addChild(redMask);
  global.enemies.push({
    sprite: enemySprite,
    type: 1,
    state: 'alive',
    injuries: 0,
    redMask: redMask,
  });
  global.stage.addChild(enemySprite);
}

function spawnEnemies() {
  if (global.paused || global.away || global.beginning) return;

  switch (global.currentLevel) {
    case 0:
      spawnEnemy1();
      break;
    case 1:
      var decision = Math.random() * 10;
      if (decision < 4) spawnEnemy1();
      else spawnEnemy2();
      break;
  }
}

function spawnFireballs() {
  if (global.paused || global.away || global.beginning) return;

  var fireball = {
    animIndex: 0,
    sprite: new PIXI.Sprite(
      new PIXI.Texture.fromFrame(global.cacheIndices.fireball.start),
    ),
  };

  fireball.sprite.anchor.x = fireball.sprite.anchor.y = 0.5;
  fireball.sprite.position.x = Math.random() * (jq('canvas').width() - 150);
  fireball.sprite.position.y = -0.5 * fireball.sprite.height;

  global.fireballs.push(fireball);
  global.stage.addChild(fireball.sprite);
}

function initPowers() {
  var Shield = new PIXI.Sprite(global.Textures.powerup_Shield);
  Shield.height = global.Sprites.player.height * 0.5;
  Shield.width = global.Sprites.player.width * 0.2;

  var MultiBullets = new PIXI.Sprite(global.Textures.powerup_MutliBullets);
  MultiBullets.height = global.Sprites.player.height * 0.5;
  MultiBullets.width = global.Sprites.player.width * 0.2;

  var BigBomb = new PIXI.Sprite(global.Textures.powerup_BigBomb);
  BigBomb.height = global.Sprites.player.height * 0.5;
  BigBomb.width = global.Sprites.player.width * 0.2;

  global.powerUps.push(global.Shield, MultiBullets, BigBomb);
}

function initTextures() {
  global.Textures.blast = PIXI.Texture.fromImage('enemyBlast.png');
  global.Textures.player = PIXI.Texture.fromImage(
    levels[global.currentLevel].TextureFiles.player,
  );
  global.Textures.background = PIXI.Texture.fromImage(
    levels[global.currentLevel].TextureFiles.background,
  );
  global.Textures.playerBullet = PIXI.Texture.fromImage(
    levels[global.currentLevel].TextureFiles.playerBullet,
  );
  global.Textures.enemy1 = PIXI.Texture.fromImage('img/enemy1.png');
  global.Textures.enemy1Red = PIXI.Texture.fromImage('img/enemy1Red.png');
  global.Textures.enemy2 = PIXI.Texture.fromImage('img/enemy2.png');
  global.Textures.enemy2Red = PIXI.Texture.fromImage('img/enemy2Red.png');
  global.Textures.shield = PIXI.Texture.fromImage('img//Shield.png');
  global.Textures.blackOverlay = PIXI.Texture.fromImage(
    'img/black_overlay.png',
  );
  global.Textures.powerup_Shield = PIXI.Texture.fromImage(
    'img/powerUps/powerup1.png',
  );
  global.Textures.powerup_MutliBullets = PIXI.Texture.fromImage(
    'img/powerUps/powerup5.png',
  );
  global.Textures.powerup_BigBomb = PIXI.Texture.fromImage(
    'img/powerUps/powerup6.png',
  );
  global.Textures.playerBlast = PIXI.Texture.fromImage('specialBlast.png');
  global.Textures.soundOn = PIXI.Texture.fromImage('img/sound-on.png');
  global.Textures.soundOff = PIXI.Texture.fromImage('img/sound-off.png');

  global.Textures.planets = new Array();
  for (var i = 0; i < 3; i++)
    global.Textures.planets.push(
      PIXI.Texture.fromImage('img/planet' + i + '.png'),
    );

  global.Textures.startButton = new PIXI.Texture(
    PIXI.Texture.fromImage('img/wide-button.png'),
    new PIXI.Rectangle(0, 0, 256, 64),
  );
  global.Textures.startButton.noFrame = false;

  global.Textures.resumeButton = new PIXI.Texture(
    PIXI.Texture.fromImage('img/wide-button.png'),
    new PIXI.Rectangle(0, 0, 256, 64),
  );
  global.Textures.resumeButton.noFrame = false;

  for (var i = 0; i < global.cacheIndices.explosion1.length; i++) {
    new PIXI.Texture.addTextureToCache(
      PIXI.Texture.fromImage('img/explosion1/' + i + '.png'),
      global.cacheIndices.explosion1.start + i,
    );
  }

  for (var i = 0; i < global.cacheIndices.fireball.length; i++) {
    new PIXI.Texture.addTextureToCache(
      PIXI.Texture.fromImage('img/fireball/' + i + '.png'),
      global.cacheIndices.fireball.start + i,
    );
  }
}

function initTexts() {
  global.Texts.scoreText = new PIXI.Text(
    'Score: ' + global.score,
    { fontSize: '25px', fontFamily: 'Snippet' },
    'white',
  );
  global.Texts.scoreText.anchor.x = 0.5;
  global.Texts.scoreText.position.x = 120;
  global.Texts.scoreText.position.y = 10;
  global.Texts.counterText = new PIXI.Text(
    'Multi-Bullets: ' + global.bonuslimit,
    { fontSize: '25px', fontFamily: 'Snippet' },
    'white',
  );
  global.Texts.counterText.anchor.x = 0.5;
  global.Texts.counterText.position.x = 120;
  global.Texts.counterText.position.y = 50;
  global.Texts.pauseText = new PIXI.Text(
    'global.paused',
    { fontSize: '80px', fontWeight: 'bold', fontFamily: 'Podkova' },
    'red',
  );
  global.Texts.pauseText.anchor.x = 0.5;
  global.Texts.welcome = new PIXI.Text(
    "Shoot 'em Up!",
    { fontWeight: 'bold', fontSize: '100px', fontFamily: 'Podkova' },
    'white',
  );
  global.Texts.welcome.anchor.x = 0.5;
  global.Texts.welcome.position.x = jq('body').width() / 2;
  global.Texts.welcome.position.y = 100;
  global.Texts.start = new PIXI.Sprite(
    PIXI.Texture.fromImage('img/start-text.png'),
  );
  global.Texts.start.anchor.x = global.Texts.start.anchor.y = 0.5;
  global.Texts.start.position.x = jq('body').width() / 2;
  global.Texts.start.position.y = jq('body').height() / 2.13;
  global.Texts.resume = new PIXI.Sprite(
    PIXI.Texture.fromImage('img/resume-text.png'),
  );
  global.Texts.resume.anchor.x = global.Texts.resume.anchor.y = 0.5;
  global.Texts.resume.position.x = jq('body').width() / 2;
  global.Texts.resume.position.y = -50;
}

export function init() {
  initTextures();
  initSprites();
  initTexts();

  global.stage = new PIXI.Stage(
    0xffffff,
    true,
    jq(window).width(),
    jq(window).height(),
  );
  global.renderer = PIXI.autoDetectRenderer(
    jq(window).width(),
    jq(window).height(),
  );
  jq('body').append(global.renderer.view);

  initLevel(/*global.currentLevel*/);

  jq.timer(spawnEnemies, levels[global.currentLevel].enemySpawnInterval, true);
  initPowers();
  jq.timer(
    spawnFireballs,
    levels[global.currentLevel].fireballSpawnInterval,
    true,
  );

  jq('canvas')
    .mousemove(moveFunction)
    .click(clickFunction);
  jq('canvas').get(0).touchmove = moveFunction;
  jq(document).keypress(keyPressFunction);
  initStartScreen();

  requestAnimationFrame(animate);

  window.onload = function() {
    global.Sprites.background.position.y =
      jq('body').height() - global.Textures.background.height;
    global.Sprites.background2.position.y = global.topEdge =
      -global.Textures.background.height + global.Sprites.background.position.y;
    jq('canvas').attr({
      width: jq('body').width(),
      height: jq('body').height(),
    });
    global.Texts.pauseText.position.x = jq('body').width() / 2;
    global.Texts.pauseText.position.y = -200;
  };

  window.onblur = blurFunction;
  window.onfocus = focusFunction;
}
