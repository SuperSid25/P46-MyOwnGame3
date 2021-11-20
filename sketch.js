var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacleAsteroid, obstacleAsteroidImage;
var obstacleGroup;
var spaceBG, spaceBGImage, rocketPlayer, rocketPlayerImage, endScreen, endScreenImage;
var count;

function preload(){
  
  obstacleAsteroidImage = loadImage("asteroid.png");
  spaceBGImage = loadImage("background.png");
  rocketPlayerImage = loadImage("rocketPlayer.png");
  endScreenImage = loadImage("endScreenOver.PNG");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // var obstacleAsteroid = createSprite();
  obstacleGroup = createGroup();
  
  spaceBG = createSprite(150, 50, width+200, height);
  spaceBG.addImage(spaceBGImage);
  spaceBG.scale = 9;
  spaceBG.y = spaceBG.height /2;
  
  rocketPlayer = createSprite(width/4,300);
  rocketPlayer.addImage(rocketPlayerImage);
  rocketPlayer.scale = 0.25;
  //rocketPlayer.debug = true;
  rocketPlayer.setCollider("circle");  
  
  endScreen = createSprite(displayWidth/2, displayHeight/2);
  endScreen.addImage(endScreenImage);
  endScreen.scale = 1.3;
  endScreen.visible = false;
  
  
  
}

function draw() {
 background("black");
  
  if(gameState === PLAY){
  spaceBG.velocityY = (6 + 3*count / 100);

  count = Math.round(World.frameCount/4);
  //count = 2;
  
  if(count % 100 === 0){
    //playSound("sound://category_explosion/melodic_loss_6.mp3");
  }
  
  spaceBG.velocityY = 2;
   if (spaceBG.y>400){
      spaceBG.y = spaceBG.height/2;
   }
    
  spawnObstacleAsteroid();
  
  // if (keyDown("up")){
  //   rocketPlayer.y = rocketPlayer.y-2;
  // }
  
  // if (keyDown("down")){
  //   rocketPlayer.y = rocketPlayer.y+2;
  // }
  
  if (keyDown(LEFT_ARROW)){
    rocketPlayer.x = rocketPlayer.x-10;
  }
  
  if (keyDown(RIGHT_ARROW)){
    rocketPlayer.x = rocketPlayer.x+10;
  }
  
  if (obstacleGroup.isTouching(rocketPlayer)) {
    gameState = END;
   //playSound("sound://category_explosion/8bit_explosion.mp3");
  }
  } else if(gameState === END){
    rocketPlayer.destroy();
    obstacleGroup.destroyEach();
    spaceBG.velocityY = 0;
    spaceBG.destroy();
    count.visible = false;
    endScreen.visible = true;
    
  }
   drawSprites();
   
   textSize(30);
  fill("yellow");
  text("Score: "+ count, 250, 100);
}

function spawnObstacleAsteroid() {
  //write code here to spawn the clouds
  if (World.frameCount % 45 === 0) {
    var obstacleAsteroid = createSprite(0,0,40,10);
    obstacleAsteroid.x = Math.round(random(0,width/2));
    obstacleAsteroid.addImage(obstacleAsteroidImage);
    
    //obstacleAsteroid.debug = true;
    obstacleAsteroid.setCollider("circle",0,0,60);
    
    obstacleAsteroid.scale = 0.5;
    //obstacleAsteroid.velocityY = 10;

    obstacleAsteroid.velocityY = (6 + count / 100);

    
     //assign lifetime to the variable
    obstacleAsteroid.lifetime = 134;
    
    //adjust the depth
    obstacleAsteroid.depth = rocketPlayer.depth;
    rocketPlayer.depth = rocketPlayer.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacleAsteroid);
  }
}