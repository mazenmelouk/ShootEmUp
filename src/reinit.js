import jq from 'jquery';
import PIXI from 'pixi.js';

import global from './global';

export function reInitTextures() {
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
}

export function reInitSprites() {
  global.Sprites.player.position.x = jq('body').width() / 2;
  global.Sprites.player.position.y = jq('body').height() / 1.6;

  global.Sprites.startButton.position.x = jq('body').width() / 2;
  global.Sprites.startButton.position.y = jq('body').height() / 2.15;
  global.Sprites.startButton.alpha = 1;
  global.Sprites.startButton.rotation = 0;

  global.Sprites.resumeButton.position.x = jq('body').width() / 2;
  global.Sprites.resumeButton.position.y = -100;

  global.Sprites.playerBlast.alpha = 1;
  global.Sprites.playerBlast.width = global.Sprites.player.width;
  global.Sprites.playerBlast.height = global.Sprites.player.height;
}

export function reInitTexts() {
  global.Texts.start.position.x = jq('body').width() / 2;
  global.Texts.start.position.y = jq('body').height() / 2.13;
  global.Texts.start.alpha = 1;
  global.Texts.start.rotation = 0;

  global.Texts.welcome.position.x = jq('body').width() / 2;
  global.Texts.welcome.position.y = 100;
}
