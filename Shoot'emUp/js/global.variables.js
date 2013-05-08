var bullets = new Array();
var enemies = new Array();
var enemyBlasts = new Array();
var fireballs = new Array();
var powerUps = new Array();
var bulletsR = new Array();
var bulletsL = new Array();

var shielded = false;
var multigunned=false;
var destroyAll=false;
var bonuslimit=0;
var maxBonus=10;
var bulletsIsEmpty=true;

var dead = false;
var removed = false;
var cantClick = false;
var paused = false;
var away = false;
var mute = false;
var clickDelay = 300;
var ySpeed = 3;
var xSpeed = 2;
var pausing = false;
var resuming = false;
var beginning = true;
var currentGift; //the gift itself
var sendGift = true;// false if a gift is on display
var giftIsActive = false;// true if gift is displayed until gift is taken or out screen
var giftType = -1;// 0=sheild,1=multibullets,2=big bomb
var startGameAnimation = false;
var score = 0;
var prevScore = 0;
var bonusStep=50;
var currentLevel = 0;
var rotDir = 0;
var Textures = new Object();
var Sprites = new Object();
var Texts = new Object();
var bigFatNuke = new Object();

var cacheIndices = {
    explosion1:{start: 0, length:25},
    fireball:{start:25, length:216}
};

var stage, blastTexture, renderer, topEdge;

var enemyTypes = new Array({
    maxInjuries:1,
    scoreFactor:1
},{
    maxInjuries:2,
    scoreFactor:1.5
}
);

var nOsc = 2;