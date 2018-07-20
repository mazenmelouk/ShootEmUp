import PIXI from 'pixi.js';
import jq from 'jquery';

import global from './global';
import { startGame, buttonMouseDown, buttonMouseUp } from './event.handlers';

import { muteUnmute } from './sound';

export function initSprites() {
  global.Sprites.blackOverlay = new PIXI.Sprite(global.Textures.blackOverlay);

  global.Sprites.background = new PIXI.Sprite(global.Textures.background);
  global.Sprites.background.anchor.x = 0;
  global.Sprites.background.anchor.y = 0;
  global.Sprites.background.position.x = 0;

  global.Sprites.background2 = new PIXI.Sprite(global.Textures.background);
  global.Sprites.background2.anchor.x = 0;
  global.Sprites.background2.anchor.y = 0;
  global.Sprites.background2.position.x = 0;

  global.Sprites.player = new PIXI.Sprite(global.Textures.player);
  global.Sprites.player.anchor.x = 0.5;
  global.Sprites.player.anchor.y = 0.5;
  global.Sprites.player.position.x = jq('body').width() / 2;
  global.Sprites.player.position.y = jq('body').height() / 1.6;
  global.Sprites.player.width = jq('body').width() * 0.1;
  global.Sprites.player.height = jq('body').height() * 0.1;

  global.Sprites.playerBlast = new PIXI.Sprite(global.Textures.playerBlast);
  global.Sprites.playerBlast.anchor.x = 0.5;
  global.Sprites.playerBlast.anchor.y = 0.5;
  global.Sprites.playerBlast.width = global.Sprites.player.width;
  global.Sprites.playerBlast.height = global.Sprites.player.height;

  global.Sprites.shield = new PIXI.Sprite(global.Textures.shield);
  global.Sprites.shield.anchor.x = 0.5;
  global.Sprites.shield.anchor.y = 0.5;
  global.Sprites.shield.width = global.Sprites.shield.height =
    global.Sprites.player.width;
  global.Sprites.shield.alpha = 0.2;

  global.Sprites.startButton = new PIXI.Sprite(global.Textures.startButton);
  global.Sprites.startButton.anchor.x = 0.5;
  global.Sprites.startButton.anchor.y = 0.5;
  global.Sprites.startButton.width = 256;
  global.Sprites.startButton.height = 128;
  global.Sprites.startButton.position.x = jq('body').width() / 2;
  global.Sprites.startButton.position.y = jq('body').height() / 2.15;
  global.Sprites.startButton.width = 256;
  global.Sprites.startButton.height = 64;
  global.Sprites.startButton.interactive = true;
  global.Sprites.startButton.click = startGame;

  global.Sprites.resumeButton = new PIXI.Sprite(global.Textures.resumeButton);
  global.Sprites.resumeButton.anchor.x = 0.5;
  global.Sprites.resumeButton.anchor.y = 0.5;
  global.Sprites.resumeButton.width = 256;
  global.Sprites.resumeButton.height = 128;
  global.Sprites.resumeButton.position.x = jq('body').width() / 2;
  global.Sprites.resumeButton.position.y = -50;
  global.Sprites.resumeButton.width = 256;
  global.Sprites.resumeButton.height = 64;
  global.Sprites.resumeButton.interactive = true;
  global.Sprites.resumeButton.mousedown = buttonMouseDown;
  global.Sprites.resumeButton.mouseup = buttonMouseUp;

  global.Sprites.sound = new PIXI.Sprite(global.Textures.soundOn);
  global.Sprites.sound.click = muteUnmute;
  global.Sprites.sound.interactive = true;
  global.Sprites.sound.anchor.x = global.Sprites.sound.anchor.y = 0.5;
  global.Sprites.sound.position.x = jq('body').width() * 0.97;
  global.Sprites.sound.position.y = 20;

  global.Sprites.planets = new Array();
  for (var i = 0; i < global.Textures.planets.length; i++) {
    var planet = new PIXI.Sprite(global.Textures.planets[i]);
    planet.anchor.x = planet.anchor.y = 0.5;
    planet.position.x =
      Math.round(Math.random() * jq('body').width() * 0.8) +
      jq('body').width() * 0.1;
    planet.position.y =
      Math.round(Math.random() * jq('body').height() * 0.8) +
      jq('body').height() * 0.1;
    planet.alpha = 0.5;
    global.Sprites.planets.push(planet);
  }
}
