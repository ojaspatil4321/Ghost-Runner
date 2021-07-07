var tower, towerimg;
var climber, climberimg, climberGroup;
var door, doorimg, doorGroup;
var ghost, ghostimg;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";

var spookySound

function preload(){
  
  towerimg = loadImage("tower.png");
  climberimg = loadImage("climber.png");
  doorimg = loadImage("door.png");
  ghostimg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower", towerimg);
  tower.velocityY = 1;
  
  climberGroup = new Group();
  doorGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghost", ghostimg);
  ghost.scale = 0.6;
}

function draw(){
  background("black")
  
  if(gameState === "play"){

    if(tower.y >400){
      tower.y = 300
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x-5
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x+5
    }

    if(keyDown("space")){
      ghost.velocityY = -10
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    spawnDoors();
    
    if(climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0
      
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
  }  
  
  drawSprites();
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(50)
    text("Game Over", 175,300);
    tower.velocityY = 0;
  }
  
}

function spawnDoors(){
  if(frameCount % 200 === 0 ){
    door = createSprite(200,-50,10,10);
    climber = createSprite(200,10,10,10);
    invisibleBlock =createSprite(200,10,10,10);
    
    door.x = Math.round(random(125,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage("door", doorimg);
    climber.addImage("climber", climberimg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    door.lifetime = 650;
    invisibleBlock.lifetime = 650;
    climber.lifetime = 650;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
