import global from "./global";

export function initLevel() {
  global.stage.addChild(global.Sprites.background);
  global.stage.addChild(global.Sprites.background2);
  for (var i = 0; i < global.Sprites.planets.length; i++)
    global.stage.addChild(global.Sprites.planets[i]);
  global.stage.addChild(global.Texts.scoreText);
  global.stage.addChild(global.Sprites.blackOverlay);

  global.Sprites.blackOverlay.alpha = 0.5;
  global.stage.addChild(global.Texts.pauseText);
  global.stage.addChild(global.Sprites.resumeButton);
  global.stage.addChild(global.Texts.resume);
  global.stage.addChild(global.Sprites.sound);
}
