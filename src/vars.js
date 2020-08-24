let size = cc.winSize;
let gravity = -750;
let birdJumpForce = 500;
let speedX = -200;
let speedY = 0;
let maxSpeedX = -500;
let maxSpeedY = -10000;
let spaceWidth = 300;
let minSpaceWidth = 200;
let minSpaceHeight = 200;
let score = 0;
let spaceHeight = 300;

let ls = cc.sys.localStorage;
let hsKey = "highScore";
let highScore = ls.getItem(hsKey);
if (highScore == null) highScore = 0;
