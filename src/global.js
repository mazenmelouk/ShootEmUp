export default {
  bullets: [],
  enemies: [],
  enemyBlasts: [],
  fireballs: [],
  powerUps: [],
  bulletsR: [],
  bulletsL: [],

  shielded: false,
  multigunned: false,
  destroyAll: false,
  bonuslimit: 0,
  maxBonus: 10,
  bulletsIsEmpty: true,

  dead: false,
  removed: false,
  cantClick: false,
  paused: false,
  away: false,
  mute: false,
  clickDelay: 300,
  ySpeed: 3,
  xSpeed: 2,
  pausing: false,
  resuming: false,
  beginning: true,
  currentGift: null, //the gift itself
  sendGift: true, // false if a gift is on display
  giftIsActive: false, // true if gift is displayed until gift is taken or out screen
  giftType: -1, // 0=sheild,1=multibullets,2=big bomb
  startGameAnimation: false,
  score: 0,
  prevScore: 0,
  bonusStep: 50,
  currentLevel: 0,
  rotDir: 0,
  Textures: {},
  Sprites: {},
  Texts: {},
  bigFatNuke: {},

  cacheIndices: {
    explosion1: { start: 0, length: 25 },
    fireball: { start: 25, length: 216 },
  },

  stage: null,
  blastTexture: null,
  renderer: null,
  topEdge: null,

  enemyTypes: [
    {
      maxInjuries: 1,
      scoreFactor: 1,
    },
    {
      maxInjuries: 2,
      scoreFactor: 1.5,
    },
  ],

  nOsc: 2,
};
