import global from "./global";

export function initStartScreen() {
  global.stage.addChild(global.Texts.welcome);
  global.stage.addChild(global.Sprites.startButton);
  global.stage.addChild(global.Texts.start);
  global.stage.addChild(global.Sprites.player);
}
