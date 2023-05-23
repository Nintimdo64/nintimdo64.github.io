//Canvas constants
const W = 1000;
const H = 800;

//Screen constants
const LOADING = 0;
const MAIN_MENU = 1;
const SCOREBOARD = 2;
const LEVEL1 = 3;
const LEVEL2 = 4;

//Sprite groups
let playerSprite;
let goalSprite;

let level1GroundSprite;
let level1BricksSprite;
let level1SpecialSprite;
let level1StairsSprite;
let level1TreeSprite;
let level1EnemySprite;
let level1TurtleSprite;

let level2Sprites;

//Sprite images
let playerImg;
let enemySpikeImg;
let enemyTurtleWalkImg;
let enemyTurtleProneImg;
let blockGroundImg;
let blockBrickImg;
let blockSpecialImg;
let blockBlankImg;
let blockStairsImg;
let treeSmallImg;
let treeMediumImg;
let treeLargeImg;
let goalImg;
let coinImg;
let menuBackgroundImg;
let stageBackgroundImg;
let stageBackgroundImgFlip;
let scoreboardImg;

//Buttons
let playButton;
let replayButton;

//Video
let rickroll;

//Sounds
let jumpSound;
let musicSound;
let dieSound;
let goalSound;
let turtleSound0;
let turtleSound1;

//Sprite Objects set up
let player;
let floor0;
let floor1;
let floor2;
let floor3;
let goal;
let turtle; 

//Related to Loading Screen
let lives = 5;
let wait;
let playerScore = 8500;

//Main menu scrolling variables
let bgx1 = 0;
let bgx2 = 1450;

//Variable to announce level 1 completion
let victory = false;

//current screen variable and inital value
let currentScreen = MAIN_MENU;


function preload(){
  //Images
  playerImg = loadImage('assets/character.png');
  blockGroundImg = loadImage('assets/blockFloor.png');
  blockFloor0Img = loadImage('assets/blockFloor0.png');
  blockFloor1Img = loadImage('assets/blockFloor1.png');
  blockFloor2Img = loadImage('assets/blockFloor2.png');
  blockFloor3Img = loadImage('assets/blockFloor3.png');
  blockBrickImg = loadImage('assets/blockBrick.png');
  blockBlankImg = loadImage('assets/blockBlank.png');
  blockSpecialImg = loadImage('assets/blockSpecial.png');
  blockStairsImg = loadImage('assets/blockStairs.png');
  treeSmallImg = loadImage('assets/tree0.png');
  treeMediumImg = loadImage('assets/tree1.png');
  treeLargeImg = loadImage('assets/tree2.png');
  coinImg = loadImage('assets/coin.png');
  logoImg = loadImage('assets/logo.png');
  goalImg = loadImage('assets/goal.png');
  menuBackgroundImg = loadImage('assets/background.jpg');
  stageBackgroundImg = loadImage('assets/stageBackground.png')
  stageBackgroundImgFlip = loadImage('assets/stageBackgroundFlip.png')
  enemySpikeImg = loadAnimation('assets/enemy0.png', 'assets/enemy1.png', 'assets/enemy2.png', 'assets/enemy1.png');
  enemyTurtleWalkImg = loadAnimation('assets/turtle0.png', 'assets/turtle1.png');
  enemyTurtleProneImg = loadAnimation('assets/turtleProne0.png', 'assets/turtleProne1.png');
  scoreboardImg = loadImage('assets/scoreboard.png');
  //JSON File
  gameData = loadJSON('data.json');
  //Sounds
  jumpSound = loadSound('assets/jump.mp3');
  dieSound = loadSound('assets/death.mp3');
  goalSound = loadSound('assets/goal.wav');
  gameoverSound = loadSound('assets/gameover.wav');
  bumpSound = loadSound('assets/bump.wav');
  coinSound = loadSound('assets/coin.wav');
  turtleSound0 = loadSound('assets/stomp.wav');
  turtleSound1 = loadSound('assets/kick.wav');
  //Videos
  rickroll = createVideo('assets/rickroll.mp4');
}

function setup() {
  //Canvas
  createCanvas(W, H);
  stageBackgroundImg.resize(0, H);
  stageBackgroundImgFlip.resize(0, H);
  //Player Sprite
  player = createSprite();
  player.addImage(playerImg);
  player.setCollider('circle', 0, 0, 25);
  player.velocity.y = 5;


  //Goal Sprite
  goal = createSprite(0, 0, gameData.goalData.wide, gameData.goalData.high);
  goalImg.resize(gameData.goalData.wide, 0);
  goal.addImage(goalImg);


  //Turtle Sprite
  turtle = createSprite(gameData.turtleData.xstart, gameData.turtleData.ystart, gameData.turtleData.w, gameData.turtleData.h);
  turtle.setCollider('rectangle', 0, 10, 60, 45);
  turtle.addAnimation('walking', enemyTurtleWalkImg);
  turtle.addAnimation('prone', enemyTurtleProneImg);
  turtle.mirrorX(-1);

  //Player and assigning it a group
  playerSprite = new Group();
  playerSprite.add(player);
  //Goal and assigning it a group
  goalSprite = new Group();
  goalSprite.add(goal);
  //Turtle and assigning it a group
  level1TurtleSprite = new Group();
  level1TurtleSprite.add(turtle);
  //Setting up other groups
  level2Sprites = new Group();
  level1GroundSprite = new Group();
  level1BricksSprite = new Group();
  level1SpecialSprite = new Group();
  level1StairsSprite = new Group();
  level1TreeSprite = new Group();


  //Floor block sprites Level 1
  floor0 = createSprite(gameData.floorData.x * 50 + blockFloor0Img.width/2, gameData.floorData.y[0]);
  floor0.addImage(blockFloor0Img);
  level1GroundSprite.add(floor0);
  floor1 = createSprite(gameData.floorData.x2 * 50 + blockFloor1Img.width/2, gameData.floorData.y[0]);
  floor1.addImage(blockFloor1Img);
  level1GroundSprite.add(floor1);
  floor2 = createSprite(gameData.floorData.x3 * 50 + blockFloor2Img.width/2 - 25, gameData.floorData.y[0]);
  floor2.addImage(blockFloor2Img);
  level1GroundSprite.add(floor2);
  floor3 = createSprite(gameData.floorData.x4 * 50 + blockFloor3Img.width/2 - 25, gameData.floorData.y[0]);
  floor3.addImage(blockFloor3Img);
  level1GroundSprite.add(floor3);

  //Bricks Level 1
  for (let i = 0; i < gameData.brickData.x1.length; i++){
    let c = createSprite(gameData.brickData.x1[i] * 50, gameData.brickData.y1);
    c.addImage(blockBrickImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1BricksSprite.add(c);
  }
  for (let i = 0; i < gameData.brickData.x2.length; i++){
    let c = createSprite(gameData.brickData.x2[i] * 50, gameData.brickData.y2);
    c.addImage(blockBrickImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1BricksSprite.add(c);
  }

  //Bricks level 2
  for (let i = 0; i < gameData.brickDataLevel2.x1.length; i++){
    let c = createSprite(gameData.brickDataLevel2.x1[i] * 50, gameData.brickDataLevel2.y1);
    c.addImage(blockBrickImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level2Sprites.add(c);
  }
  for (let i = 0; i < gameData.brickDataLevel2.x2.length; i++){
    let c = createSprite(gameData.brickDataLevel2.x2[i] * 50, gameData.brickDataLevel2.y2);
    c.addImage(blockBrickImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level2Sprites.add(c);
  }

  //Special Blocks Level 1
  for (let i = 0; i < gameData.specialBlockData.x1.length; i++){
    let c = createSprite(gameData.specialBlockData.x1[i] * 50, gameData.specialBlockData.y1);
    c.addImage('active', blockSpecialImg);
    c.addImage('hit', blockBlankImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1SpecialSprite.add(c);
  }
  for (let i = 0; i < gameData.specialBlockData.x2.length; i++){
    let c = createSprite(gameData.specialBlockData.x2[i] * 50, gameData.specialBlockData.y2);
    c.addImage('active', blockSpecialImg);
    c.addImage('hit', blockBlankImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1SpecialSprite.add(c);
  }
  //Stairs level 1
  for (let i = 0; i < gameData.stairsData.x1.length; i++){
    let c = createSprite(gameData.stairsData.x1[i] * 50, gameData.stairsData.y[0]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  for (let i = 0; i < gameData.stairsData.x2.length; i++){
    let c = createSprite(gameData.stairsData.x2[i] * 50, gameData.stairsData.y[1]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  for (let i = 0; i < gameData.stairsData.x3.length; i++){
    let c = createSprite(gameData.stairsData.x3[i] * 50, gameData.stairsData.y[2]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  for (let i = 0; i < gameData.stairsData.x4.length; i++){
    let c = createSprite(gameData.stairsData.x4[i] * 50, gameData.stairsData.y[3]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  for (let i = 0; i < gameData.stairsData.x5.length; i++){
    let c = createSprite(gameData.stairsData.x5[i] * 50, gameData.stairsData.y[4]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  for (let i = 0; i < gameData.stairsData.x6.length; i++){
    let c = createSprite(gameData.stairsData.x6[i] * 50, gameData.stairsData.y[5]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  for (let i = 0; i < gameData.stairsData.x7.length; i++){
    let c = createSprite(gameData.stairsData.x7[i] * 50, gameData.stairsData.y[6]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  for (let i = 0; i < gameData.stairsData.x8.length; i++){
    let c = createSprite(gameData.stairsData.x8[i] * 50, gameData.stairsData.y[7]);
    c.addImage(blockStairsImg);
    c.setCollider('rectangle', 0, 0, 51, 51);
    level1StairsSprite.add(c);
  }
  //Tree Sprites
  for (let i = 0; i < gameData.treeData.xsmall.length; i++){
    let c = createSprite(gameData.treeData.xsmall[i], gameData.treeData.y[0]);
    c.addImage(treeSmallImg);
    level1TreeSprite.add(c);
  }
  for (let i = 0; i < gameData.treeData.xmedium.length; i++){
    let c = createSprite(gameData.treeData.xmedium[i], gameData.treeData.y[1]);
    c.addImage(treeMediumImg);
    level1TreeSprite.add(c);
  }
  for (let i = 0; i < gameData.treeData.xtall.length; i++){
    let c = createSprite(gameData.treeData.xtall[i], gameData.treeData.y[2]);
    c.addImage(treeLargeImg);
    level1TreeSprite.add(c);
  }

  //Spike enemy Sprite
  level1EnemySprite = new Group();

  for (let i = 0; i < gameData.enemyData.startPosition.length; i++){
    let c = createSprite(gameData.enemyData.startPosition[i] * 50, gameData.enemyData.y1);
    c.addAnimation('idle', enemySpikeImg);
    c.setCollider('rectangle', 0, 10, 64, 54);
    level1EnemySprite.add(c);
  }
  for (let i = 0; i < gameData.enemyData.startPositionHigh.length; i++){
    let c = createSprite(gameData.enemyData.startPositionHigh[i] * 50, gameData.enemyData.y2);
    c.addAnimation('idle', enemySpikeImg);
    c.setCollider('rectangle', 0, 10, 64, 54);
    level1EnemySprite.add(c);
  }

  //Play Button
  playButton = createButton('Play');
  playButton.position(W/2 - playButton.size().width/2, H/4*3);
  playButton.mouseClicked(playButtonClicked);

  replayButton = createButton('Replay');
  replayButton.position(W - replayButton.size().width/2*3, 20);
  replayButton.mouseClicked(replayButtonClicked);
}

//Switch between different screens
function draw() {
  switch (currentScreen) {
    case LOADING:
      drawLoadingScreen();
      break;
    case MAIN_MENU:
      drawMainMenuScreen();
      break;
    case SCOREBOARD:
      drawScoreBoardScreen();
      break;
    case LEVEL1:
      drawLevel1Screen();
      break;
    case LEVEL2:
      drawLevel2Screen();
      break;
  }
}

//Loading Screen
function drawLoadingScreen(){
  background(0, 0, 0);
  rickroll.hide();
  camera.position.x = W/2;
  player.velocity.y = 5;
  fill('white');
  stroke('black');

  //If you have lives remaining and haven't completed level 1 yet
  if (lives > 0 && victory == false){
  player.position.x = gameData.playerData.startX;
  player.position.y = gameData.playerData.startY;
    for (let i = 0; i < level1EnemySprite.length - 2; i++){
      level1EnemySprite[i].position.x = gameData.enemyData.startPosition[i]*50;
      level1EnemySprite[i].position.y = gameData.enemyData.y1;
    }
      turtle.position.x = gameData.turtleData.xstart;
      turtle.position.y = gameData.turtleData.ystart;
    for (let i = 0; i < level1SpecialSprite.length; i++){
      level1SpecialSprite[i].changeImage('active');
      level1SpecialSprite[i].rotation = 0;
    }
    text(lives, W/2, H/2);
    image(playerImg, W/2 - 50, H/2, 50, 50);
    if (frameCount > wait + 180){
      currentScreen = LEVEL1;
    }
  }
  //If you have lives remaining and level 1 has been completed
  else if (lives > 0 && victory == true){
    player.position.x = 9925;
    player.position.y = gameData.playerData.startY;
    for(let i = 0; i < level1EnemySprite.length - 2; i++){
      level1EnemySprite[i].position.y = 150;
      level1EnemySprite[i].position.x = gameData.enemyData.startPosition[i]*50;
    }
    for (let i = 0; i < level1SpecialSprite.length; i++){
      level1SpecialSprite[i].changeImage('active');
      level1SpecialSprite[i].rotation = 0;
    }
    turtle.position.x = gameData.turtleData.xstart;
    turtle.position.y = 50;
    text(lives, W/2, H/2);
    image(playerImg, W/2 - 50, H/2, 50, 50);
    if (frameCount > wait + 180){
      currentScreen = LEVEL2;
    }
  }
  //Game over if out of lives
  else{
    text('GAME OVER', W/2 - 20, H/2);
    victory = false;
    playerScore = 0;
    player.position.x = gameData.playerData.startX;
    player.position.y = gameData.playerData.startY;
    if (frameCount > wait + 180 && !gameoverSound.isPlaying()){
      lives = 5;
      currentScreen = MAIN_MENU;
    }
    if (!dieSound.isPlaying() && !gameoverSound.isPlaying() && currentScreen == LOADING){
      gameoverSound.play();
    }
    for (let i = 0; i < level1GroundSprite.length; i++){
      level1GroundSprite[i].position.y = gameData.floorData.y[0];
    }
    for (let i = 0; i < level1TreeSprite.length; i++){
      level1TreeSprite[i].mirrorY(1);
      level1TreeSprite[i].position.y = 700 - level1TreeSprite[i].height/2;
    }
    for(let i = 0; i < level1EnemySprite.length - 2; i++){
      level1EnemySprite[i].position.y = gameData.enemyData.y1;
      level1EnemySprite[i].position.x = gameData.enemyData.startPosition[i]*50;
    }
    for (let i = 0; i < level1SpecialSprite.length; i++){
      level1SpecialSprite[i].changeImage('active');
      level1SpecialSprite[i].rotation = 0;
    }
    turtle.position.x = gameData.turtleData.xstart;
    turtle.position.y = gameData.turtleData.ystart;
    goal.mirrorY(1);
  }
}

//Main Menu
function drawMainMenuScreen(){
  rickroll.hide();
  image(menuBackgroundImg, bgx1, 0, 0, H);
  image(menuBackgroundImg, bgx2, 0, 0, H);
  image(logoImg, W/2 - logoImg.width/2, H/4);
  playButton.show();
  replayButton.hide();
  bgx1--;
  bgx2--;
  if (bgx1 < -1450){
    bgx1 = 1450;
  }
  if (bgx2 < -1450){
    bgx2 = 1450;
  }
}

//Scoreboard
function drawScoreBoardScreen(){
  //Image effect for background
  tint(100, 100, 100, 255);
  image(menuBackgroundImg, bgx1, 0, 0, H);
  image(menuBackgroundImg, bgx2, 0, 0, H);
  tint(255, 255, 255, 255);
  camera.position.x = W/2;
  textSize(16);
  fill('white');
  stroke('black');
  //If player has the new high score, play video, adjust score screen visually and move all other names down
  if (playerScore > 6000){
    image(scoreboardImg, W/2 - scoreboardImg.width/2 + 3, 25);
    for(let i = 0; i < gameData.scoreboardData.name.length; i++){
      if (playerScore > 6000 && i == 0){
        text('Player', W/2 - 150, 120 + 20*i);
        text(playerScore, W/2, 120 + 20*i);
        text(lives, W/2 + 150, 120 + 20*i);
      }
      else{
        text(gameData.scoreboardData.name[i-1], W/2 - 150, 120 + 20*i);
        text(gameData.scoreboardData.score[i-1], W/2, 120 + 20*i);
        text(gameData.scoreboardData.lives[i-1], W/2 + 150, 120 + 20*i);
      }
    }
    rickroll.show();
    rickroll.size(480, 270);
    image(rickroll, W/2 - 240, 440, 480, 270);
    rickroll.loop();
  }
  //Otherwise, player gets added to leaderboard but no video plays
  else{
    image(scoreboardImg, W/2 - scoreboardImg.width/2 + 3, H/2 - scoreboardImg.height/2);
    for(let i = 0; i < gameData.scoreboardData.name.length; i++){
      if(playerScore >= gameData.scoreboardData.score[i] && playerScore < gameData.scoreboardData.score[i-1]){
        text('Player', W/2 - 150, 355 + 20*i);
        text(playerScore, W/2, 355 + 20*i);
        text(lives, W/2 + 150, 355 + 20*i);
      }
      else{
        text(gameData.scoreboardData.name[i], W/2 - 150, 355 + 20*i);
        text(gameData.scoreboardData.score[i], W/2, 355 + 20*i);
        text(gameData.scoreboardData.lives[i], W/2 + 150, 355 + 20*i);
      }
    }
  }
  rickroll.hide();
  playButton.hide();
  replayButton.show();
  //Scrolling background
  bgx1--;
  bgx2--;
  if (bgx1 < -1450){
    bgx1 = 1450;
  }
  if (bgx2 < -1450){
    bgx2 = 1450;
  }
}
//Level 1
function drawLevel1Screen(){
  background(146, 144, 255);
  playButton.hide();  
  image(stageBackgroundImg, -W, 0);

  //Set up goal position
  goal.position.x = gameData.goalData.x;
  goal.position.y = gameData.goalData.y;

  //Draw Sprites
  drawSprites(playerSprite);
  drawSprites(level1EnemySprite);
  drawSprites(level1TurtleSprite);
  drawSprites(level1BricksSprite);
  drawSprites(level1GroundSprite);
  drawSprites(level1SpecialSprite);
  drawSprites(level1StairsSprite);
  drawSprites(level1TreeSprite);
  drawSprites(goalSprite);

  //Draw score and lives
  fill('white');
  stroke('black');
  text('Lives: '+lives, camera.position.x + W/2 - 50, camera.position.y - H/2 + 20);
  text('Score: '+playerScore, camera.position.x - W/2 + 10, camera.position.y - H/2 + 20);


  //Kills player if falls down pit
  if (player.position.y > H){
    dieSound.play();
    lives--;
    wait = frameCount;
    player.velocity.x = 0;
    currentScreen = LOADING;
  }
  camera.position.x = player.position.x;

  //Left Arrow behaviour
  if (keyIsDown(LEFT_ARROW) && !goalSound.isPlaying()) {
    if (keyIsDown(SHIFT)){
      if (player.velocity.x > -gameData.playerData.maxSS){
        player.velocity.x--;
      }
      player.rotation -= 6;
    }
    else {
      if (player.velocity.x > -gameData.playerData.maxS){
        player.velocity.x--;
      }
      player.rotation -= 4;
    }
  }
  //Right Arrow behaviour
  else if (keyIsDown(RIGHT_ARROW) && !goalSound.isPlaying()) {
    if (keyIsDown(SHIFT)){
      if (player.velocity.x < gameData.playerData.maxSS){
        player.velocity.x++;
      }
      player.rotation += 6;
    }
    else {
      if (player.velocity.x < gameData.playerData.maxS){
        player.velocity.x++;
      }
    player.rotation += 4;
    }
  }
  //Behaviour if no direction button is pressed
  else{
    player.velocity.x = 0;
    player.rotationSpeed = 0;
  }
  //Sets player collide with ground and allows player to jump off it
  if (player.collide(level1GroundSprite)){
  player.velocity.y = 0;
    if (keyIsDown(32)){
      if (player.velocity.x > gameData.playerData.maxS){
        player.velocity.y = -gameData.playerData.jumpHS;
      }
      else{
        player.velocity.y = -gameData.playerData.jumpH;
      }
      jumpSound.play();
    }
  }
  else {
    player.velocity.y++;
  }

//Bricks behaviour when colliding with player
  for (let i = 0; i < level1BricksSprite.length; i++){
    if (player.collide(level1BricksSprite[i])){
      if (player.position.y > level1BricksSprite[i].position.y && player.position.x > level1BricksSprite[i].position.x - 25 && player.position.x < level1BricksSprite[i].position.x + 25){
        jumpSound.stop();
        bumpSound.play();
        player.velocity.y = 5;
      }
    else if(player.position.y < level1BricksSprite[i].position.y && player.position.x > level1BricksSprite[i].position.x - 25 && player.position.x < level1BricksSprite[i].position.x + 25){
      player.velocity.y = 0;
        if (keyIsDown(32)){
          if (player.velocity.x > gameData.playerData.maxS){
            player.velocity.y = -gameData.playerData.jumpHS;
          }
          else{
            player.velocity.y = -gameData.playerData.jumpH;
          }
          jumpSound.play();
        }
      }
    }
  }

//Stairs behaviour with player
  for (let i = 0; i < level1StairsSprite.length; i++){
    if (player.collide(level1StairsSprite[i]) && player.position.y < level1StairsSprite[i].position.y && player.position.x > level1StairsSprite[i].position.x - 25 && player.position.x < level1StairsSprite[i].position.x + 25){
      player.velocity.y = 0;
      if (keyIsDown(32)){
        if (player.velocity.x > gameData.playerData.maxS){
          player.velocity.y = -gameData.playerData.jumpHS;
        }
        else{
          player.velocity.y = -gameData.playerData.jumpH;
        }
        jumpSound.play();
      }
    }
  }

//Tree behaviour with player
  for (let i = 0; i < level1TreeSprite.length; i++){
    if (player.collide(level1TreeSprite[i]) && player.position.y < level1TreeSprite[i].position.y && player.position.x > level1TreeSprite[i].position.x - 50 && player.position.x < level1TreeSprite[i].position.x + 50){
      player.velocity.y = 0;
      if (keyIsDown(32)){
        if (player.velocity.x > gameData.playerData.maxS){
          player.velocity.y = -gameData.playerData.jumpHS;
        }
        else{
          player.velocity.y = -gameData.playerData.jumpH;
        }
        jumpSound.play();
      }
    }
  }

//? block behaviour with player
  for (let i = 0; i < level1SpecialSprite.length; i++){
    if (player.collide(level1SpecialSprite[i])){
      if (player.position.y > level1SpecialSprite[i].position.y && player.position.x > level1SpecialSprite[i].position.x - 25 && player.position.x < level1SpecialSprite[i].position.x + 25){
        if (level1SpecialSprite[i].rotation > 0){
          jumpSound.stop();
          bumpSound.play();
          player.velocity.y = 5;
        }
        //Gives player points if first time hitting block
        else{
          level1SpecialSprite[i].changeImage('hit');
          level1SpecialSprite[i].rotation++;
          coinSound.play();
          playerScore += 500;
          jumpSound.stop();
          player.velocity.y = 5;
        }
      }
    else if(player.position.y < level1SpecialSprite[i].position.y && player.position.x > level1SpecialSprite[i].position.x - 25 && player.position.x < level1SpecialSprite[i].position.x + 25){
      player.velocity.y = 0;
      if (keyIsDown(32)){
          if (player.velocity.x > gameData.playerData.maxS){
            player.velocity.y = -gameData.playerData.jumpHS;
          }
          else{
            player.velocity.y = -gameData.playerData.jumpH;
          }
          jumpSound.play();
        }
      }
    }
  }

//Apply gravity to spikes
  for (let i = 0; i < level1EnemySprite.length; i++){
    if (level1EnemySprite[i].overlap(level1GroundSprite) || level1EnemySprite[i].overlap(level1BricksSprite) || level1EnemySprite[i].overlap(level1SpecialSprite)){
      level1EnemySprite[i].velocity.y = 0;
    }
    else{
      level1EnemySprite[i].position.y += 7;
    }
    if (level1EnemySprite[i].collide(level1TreeSprite)){
      level1EnemySprite[i].velocity.x = -level1EnemySprite[i].velocity.x;
    }
    if (turtle.overlap(level1EnemySprite[i]) && turtle.velocity.x > 0){
      turtleSound1.play();
      playerScore += 100;
      level1EnemySprite[i].position.x -= 2000;
    }
    level1EnemySprite[i].maxSpeed = 2;
    if(level1EnemySprite[i].position.x < camera.position.x + W/2){
      if(level1EnemySprite[i].velocity.x < level1EnemySprite[i].maxSpeed){
      level1EnemySprite[i].velocity.x--;
      }
    }
    else{
      level1EnemySprite[i].velocity.x = 0;
    }
  }
//Kills player is touches a spike
  if (player.collide(level1EnemySprite)){
    dieSound.play();
    lives--;
    wait = frameCount;
    player.velocity.x = 0;
    currentScreen = LOADING;
  }

//Apply gravity to turtle
  if (turtle.overlap(level1GroundSprite)){
    turtle.velocity.y = 0;
  }
  else{
    turtle.position.y += 7;
  }
  if (turtle.collide(level1StairsSprite)){
    turtle.velocity.x = -turtle.velocity.x;
  }
  if (turtle.rotation == 0){
    turtle.maxSpeed = 2;
    if(turtle.position.x < camera.position.x + W/2){
      if(turtle.velocity.x < turtle.maxSpeed){
        turtle.velocity.x--;
      }
    }
    else{
      turtle.velocity.x = 0;
    }
  }
  else{
    turtle.maxSpeed = 15;
  }
//Kills player is touches a turtle. Also allows player to jump on turtle, rendering it prone and kickable
  if (player.collide(turtle)){
    if(turtle.rotation == 0 && player.position.y < turtle.position.y){
      turtleSound0.play();
      player.velocity.y = -8;
      turtle.changeAnimation('prone');
      turtle.rotation = 1;
      turtle.velocity.x = 0;
    }
    else if(turtle.rotation == 0){
      dieSound.play();
      lives--;
      wait = frameCount;
      player.velocity.x = 0;
      currentScreen = LOADING;
    }
    else if(turtle.rotation > 0 && turtle.velocity.x == 0){
      turtleSound1.play(); 
      if (player.position.x > turtle.position.x){
        turtle.velocity.x = -15;
      }
      else{
        turtle.velocity.x = 15;
      }
    }
    else if(turtle.rotation > 0 && turtle.velocity.x > 0 && player.position.y < turtle.position.y){
      turtle.velocity.x = 0;
      turtleSound1.play();
    }
    else{
      dieSound.play();
      lives--;
      wait = frameCount;
      player.velocity.x = 0;
      currentScreen = LOADING;
    }
  }


//Goal
  if (player.overlap(goalSprite) && !goalSound.isPlaying()){
    goalSound.play();
    victory = true;
    playerScore += 1000;
  }
  if (goalSound.isPlaying()){
    player.position.x++;
    player.rotation++;
  }

  if (victory == true && !goalSound.isPlaying()){
    wait = frameCount;
    currentScreen = LOADING;
  }
}

//Level 2
function drawLevel2Screen(){

  background(146, 144, 255);
  playButton.hide();  
  image(stageBackgroundImgFlip, -W, 0);


  //Set up goal position
  goal.position.x = 10;
  goal.position.y = gameData.goalData.y;
  goal.mirrorY(-1);
  goal.position.y = 100 + goal.height/2;

  //Draw Sprites
  drawSprites(playerSprite);
  drawSprites(level1EnemySprite);
  drawSprites(level1TurtleSprite);
  drawSprites(level1GroundSprite);
  drawSprites(level1SpecialSprite);
  drawSprites(level1TreeSprite);
  drawSprites(level2Sprites);
  drawSprites(goalSprite);

  //Level 2 Moving around assets
  for (let i = 0; i < level1GroundSprite.length; i++){
    level1GroundSprite[i].position.y = 50;
  }
  for (let i = 0; i < level1TreeSprite.length; i++){
    level1TreeSprite[i].mirrorY(-1);
    level1TreeSprite[i].position.y = 100 + level1TreeSprite[i].height/2;
  }

  //Draw score and lives
  fill('white');
  stroke('black');
  text('Lives: '+lives, camera.position.x + W/2 - 50, camera.position.y - H/2 + 20);
  text('Score: '+playerScore, camera.position.x - W/2 + 10, camera.position.y - H/2 + 20);

  //Kills player if fall down 
  if (player.position.y > H){
    dieSound.play();
    lives--;
    wait = frameCount;
    player.velocity.x = 0;
    currentScreen = LOADING;
  }
  //Locks camera to follow player
  camera.position.x = player.position.x;

  //Left Arrow behaviour
  if (keyIsDown(LEFT_ARROW)) {
    if (keyIsDown(SHIFT)){
      if (player.velocity.x > -gameData.playerData.maxSS){
        player.velocity.x--;
      }
      player.rotation -= 6;
    }
    else {
      if (player.velocity.x > -gameData.playerData.maxS){
        player.velocity.x--;
      }
      player.rotation -= 4;
    }
  }
//Right Arrow behaviour
  else if (keyIsDown(RIGHT_ARROW)) {
    if (keyIsDown(SHIFT)){
      if (player.velocity.x < gameData.playerData.maxSS){
        player.velocity.x++;
      }
      player.rotation += 6;
    }
    else {
      if (player.velocity.x < gameData.playerData.maxS){
        player.velocity.x++;
      }
      player.rotation += 4;
    }
  }
  //Behaviour if no direction button is pressed
  else{
    player.velocity.x = 0;
    player.rotationSpeed = 0;
  }
//Sets player collide with objects and allows player to jump off them
  if (player.collide(level1GroundSprite)){
    jumpSound.stop();
    bumpSound.play();
    player.velocity.y = 5;
  }
  else {
    player.velocity.y++;
  }


//Brick behaviour
for (let i = 0; i < level2Sprites.length; i++){
  if (player.collide(level2Sprites[i])){
    if (player.position.y > level2Sprites[i].position.y && player.position.x > level2Sprites[i].position.x - 25 && player.position.x < level2Sprites[i].position.x + 25){
        jumpSound.stop();
        bumpSound.play();
        player.velocity.y = 5;
      }
    else if(player.position.y < level2Sprites[i].position.y){
      player.velocity.y = 0;
      if (keyIsDown(32)){
        if (player.velocity.x > gameData.playerData.maxS){
          player.velocity.y = -gameData.playerData.jumpHS;
          }
        else{
          player.velocity.y = -gameData.playerData.jumpH;
          }
        jumpSound.play();
        }
      }
    }
  }

//Tree behaviour
for (let i = 0; i < level1TreeSprite.length; i++){
  if (player.collide(level1TreeSprite[i]) && player.position.y < level1TreeSprite[i].position.y && player.position.x > level1TreeSprite[i].position.x - 50 && player.position.x < level1TreeSprite[i].position.x + 50){
    player.velocity.y = 0;
    if (keyIsDown(32)){
      if (player.velocity.x > gameData.playerData.maxS){
        player.velocity.y = -gameData.playerData.jumpHS;
        }
      else{
        player.velocity.y = -gameData.playerData.jumpH;
        }
      jumpSound.play();
      }
    }
  }

//? block behaviour
  for (let i = 0; i < level1SpecialSprite.length; i++){
    if (player.collide(level1SpecialSprite[i])){
      if (player.position.y > level1SpecialSprite[i].position.y && player.position.x > level1SpecialSprite[i].position.x - 25 && player.position.x < level1SpecialSprite[i].position.x + 25){
        if (level1SpecialSprite[i].rotation > 0){
          jumpSound.stop();
          bumpSound.play();
          player.velocity.y = 5;
        }
        else{
          level1SpecialSprite[i].changeImage('hit');
          level1SpecialSprite[i].rotation++;
          coinSound.play();
          playerScore += 500;
          jumpSound.stop();
          player.velocity.y = 5;
        }
      }
      else if(player.position.y < level1SpecialSprite[i].position.y && player.position.x > level1SpecialSprite[i].position.x - 25 && player.position.x < level1SpecialSprite[i].position.x + 25){
        player.velocity.y = 0;
        if (keyIsDown(32)){
          if (player.velocity.x > gameData.playerData.maxS){
            player.velocity.y = -gameData.playerData.jumpHS;
          }
          else{
            player.velocity.y = -gameData.playerData.jumpH;
          }
          jumpSound.play();
        }
      }
    }
  }

//Apply gravity to spikes
  for (let i = 0; i < level1EnemySprite.length; i++){
    if (level1EnemySprite[i].overlap(level1GroundSprite) || level1EnemySprite[i].overlap(level1StairsSprite) || level1EnemySprite[i].overlap(level2Sprites) || level1EnemySprite[i].overlap(level1BricksSprite) || level1EnemySprite[i].overlap(level1SpecialSprite) || level1EnemySprite[i].position.x < camera.position.x - W/2 - level1EnemySprite[i].width/2){
      level1EnemySprite[i].velocity.y = 0;
    }
    else{
      level1EnemySprite[i].position.y += 7;
    }
    if (level1EnemySprite[i].collide(level1TreeSprite) || level1EnemySprite[i].collide(level1StairsSprite)){
      level1EnemySprite[i].velocity.x = -level1EnemySprite[i].velocity.x;
    }
    if (turtle.overlap(level1EnemySprite[i]) && turtle.velocity.x > 0){
      turtleSound1.play();
      playerScore += 100;
      level1EnemySprite[i].position.x -= 2000;
    }
    level1EnemySprite[i].maxSpeed = 2;
    if(level1EnemySprite[i].position.x > camera.position.x - W/2 - level1EnemySprite[i].width/2){
      if(level1EnemySprite[i].velocity.x < level1EnemySprite[i].maxSpeed){
      level1EnemySprite[i].velocity.x--;
      }
    }
  else{
      level1EnemySprite[i].velocity.x = 0;
    }
  }
//Kills player is touches a spike
  if (player.collide(level1EnemySprite)){
    dieSound.play();
    lives--;
    wait = frameCount;
    player.velocity.x = 0;
    currentScreen = LOADING;
  }

//Apply gravity to turtle
  if (turtle.overlap(level1GroundSprite) || turtle.position.x < camera.position.x - W/2){
    turtle.velocity.y = 0;
  }
  else{
    turtle.position.y += 7;
  }
  if (turtle.collide(level1StairsSprite)){
    turtle.velocity.x = -turtle.velocity.x;
  }
if (turtle.rotation == 0){
  turtle.maxSpeed = 2;
  if(turtle.position.x > camera.position.x - W/2){
    if(turtle.velocity.x < turtle.maxSpeed){
      turtle.velocity.x--;
      }
    }
  else{
    turtle.velocity.x = 0;
    }
  }
else{
  turtle.maxSpeed = 15;
  }
//Kills player is touches a turtle
if (player.collide(turtle)){
  if(turtle.rotation == 0 && player.position.y < turtle.position.y){
    turtleSound0.play();
    player.velocity.y = -8;
    turtle.changeAnimation('prone');
    turtle.rotation = 1;
    turtle.velocity.x = 0;
    }
  else if(turtle.rotation == 0){
    dieSound.play();
    lives--;
    wait = frameCount;
    player.velocity.x = 0;
    currentScreen = LOADING;
    }
  else if(turtle.rotation > 0 && turtle.velocity.x == 0){
    turtleSound1.play(); 
    if (player.position.x > turtle.position.x){
      turtle.velocity.x = -15;
      }
    else{
      turtle.velocity.x = 15;
      }
    }
  else if(turtle.rotation > 0 && turtle.velocity.x > 0 && player.position.y < turtle.position.y){
    turtle.velocity.x = 0;
    turtleSound1.play();
    }
  else{
    dieSound.play();
    lives--;
    wait = frameCount;
    player.velocity.x = 0;
    currentScreen = LOADING;
    }
  }

//Goal
if (player.overlap(goalSprite) && !goalSound.isPlaying()){
  goalSound.play();
  playerScore += 1000;
  currentScreen = SCOREBOARD;
  }
}



//Play Clicked
function playButtonClicked() {
  player.position.x = gameData.playerData.startX;
  player.position.y = gameData.playerData.startY;
  currentScreen = SCOREBOARD;
}
//Replay clicked
function replayButtonClicked() {
  victory = false;
  lives = 5;
  score = 0;
//Resets anything changed in level 2
  for (let i = 0; i < level1GroundSprite.length; i++){
    level1GroundSprite[i].position.y = gameData.floorData.y[0];
  }
  for (let i = 0; i < level1TreeSprite.length; i++){
    level1TreeSprite[i].mirrorY(1);
    level1TreeSprite[i].position.y = 700 - level1TreeSprite[i].height/2;
  }
  for(let i = 0; i < level1EnemySprite.length - 2; i++){
    level1EnemySprite[i].position.y = gameData.enemyData.y1;
    level1EnemySprite[i].position.x = gameData.enemyData.startPosition[i]*50;
  }
  for (let i = 0; i < level1SpecialSprite.length; i++){
    level1SpecialSprite[i].changeImage('active');
    level1SpecialSprite[i].rotation = 0;
  }
  turtle.position.x = gameData.turtleData.xstart;
  turtle.position.y = gameData.turtleData.ystart;
  goal.mirrorY(1);

  player.position.x = gameData.playerData.startX;
  player.position.y = gameData.playerData.startY;
  currentScreen = MAIN_MENU;
  rickroll.stop();
}
