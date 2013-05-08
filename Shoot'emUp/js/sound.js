function muteUnmute() {
    mute = !mute;
    if (mute){
        muteSound();
        Sprites.sound.setTexture(Textures.soundOff);
    }
    else{
        unmuteSound();
        Sprites.sound.setTexture(Textures.soundOn);
    }
}

function muteSound() {
    $("audio").each(function() {
        $(this).get(0).volume = 0;
    });
}

function unmuteSound() {
    $("audio").each(function() {
        $(this).get(0).volume = 1;
    });
}

function playSound(soundID) {
    document.getElementById(soundID).load();
    document.getElementById(soundID).play();
}

function pauseSound(soundID) {
    document.getElementById(soundID).pause();
}

function pauseSounds() {
    $("audio").each(function() {
        var audio = $(this).get(0);
        if (audio.currentTime > 0 || audio.id == ("bg" + (currentLevel + 1)))
            audio.pause();
    });
}

function resumeSounds() {
    $("audio").each(function() {
        var audio = $(this).get(0);
        if (audio.currentTime > 0 || audio.id == ('bg' + (currentLevel + 1)))
            audio.play();
    });
}

function resumeSound(soundID) {
    document.getElementById(soundID).play();
}