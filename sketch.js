var PLAY = 1, END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score

var ground, invisible

var survivalTime = 0;
var score = 0;

var food

var restart;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 300);
  
  monkey = createSprite(80,210,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.08;
  
  monkey.debug = true

  ground = createSprite(400,237,900,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x)
  
  invisible = createSprite(400,240,800,2);
  invisible.visible = true;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {

  background("cyan");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime , 100,50);
  text("score: " + score , 480,50);

  if(gameState === PLAY){
     if(keyDown("space")&& monkey.y >= 150) {
      monkey.velocityY = -10;
   }
  monkey.velocityY = monkey.velocityY + 0.8;
    
    
  
  survivalTime= Math.ceil(frameCount/frameRate())
  
  if (ground.x < 200){
    ground.x = ground.width/2;
  }
     
    
  stroke("white");
  textSize(20);
  fill("white");
  if(monkey.isTouching(foodGroup)){
    score = score+2
    foodGroup.destroyEach();
    
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
    }
    
  food();
  stones();
    
  } else if(gameState === END){
      ground.velocityX= 0;
      monkey.velocityY= 0;
    
    obstacleGroup.setVelocityXEach(0); 
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1)
    foodGroup.setLifetimeEach(-1)
    
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime , 100,50);
  }
  
  
  
  
  monkey.collide(invisible); 
  
  
  
  
  
  drawSprites();
}


function food() {
  
  if (frameCount % 80 === 0) {
   var bananas = createSprite(600,50,40,10);
    bananas.addImage(bananaImage)
    bananas.y = Math.round(random(120,190))
    bananas.scale = 0.09;
    bananas.velocityX = -4;
    
    foodGroup.add(bananas);
    
   bananas.lifetime = 200
    
    //adjust the depth
    bananas.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
    }
}


 function stones() {
   if (frameCount % 300 === 0) {
   var obstacle = createSprite(600,222,40,10);
    obstacle.addImage(obstaceImage)
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    
    obstacleGroup.add(obstacle);
    
   obstacle.lifetime = 200
     
   }
 }


function reset(){
  gameState = PLAY;
  score=0;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  ground.velocityX= -4;
}