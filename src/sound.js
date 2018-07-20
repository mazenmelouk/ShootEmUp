import jq from 'jquery';

import global from './global';

export function muteUnmute() {
  global.mute = !global.mute;
  if (global.mute) {
    muteSound();
    global.Sprites.sound.setTexture(global.Textures.soundOff);
  } else {
    unmuteSound();
    global.Sprites.sound.setTexture(global.Textures.soundOn);
  }
}

export function muteSound() {
  jq('audio').each(function() {
    jq(this).get(0).volume = 0;
  });
}

export function unmuteSound() {
  jq('audio').each(function() {
    jq(this).get(0).volume = 1;
  });
}

export function playSound(soundID) {
  document.getElementById(soundID).load();
  document.getElementById(soundID).play();
}

export function pauseSound(soundID) {
  document.getElementById(soundID).pause();
}

export function pauseSounds() {
  jq('audio').each(function() {
    var audio = jq(this).get(0);
    if (audio.currentTime > 0 || audio.id == 'bg' + (global.currentLevel + 1))
      audio.pause();
  });
}

export function resumeSounds() {
  jq('audio').each(function() {
    var audio = jq(this).get(0);
    if (audio.currentTime > 0 || audio.id == 'bg' + (global.currentLevel + 1))
      audio.play();
  });
}

export function resumeSound(soundID) {
  document.getElementById(soundID).play();
}
