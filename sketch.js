
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var PLAY = 1;
var END = 2;
var gameState = PLAY;
var jato, cloud, thunder;
var jatoImg, cloudImg, thunderImg;
var cloudGroup, thunderGroup;
var backgroundImage;
var score;
var restart, restartImg

function preload()
{
  backgroundImage = loadImage("Bg.jpg");
  jatoImg = loadImage("Jato.png");
  thunderImg = loadImage("raio.png");
  cloudImg = loadImage("Nuvem.png");
  restartImg = loadImage("restart.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Crie os corpos aqui.
    jato = createSprite(windowWidth - 650, windowHeight - 20, 50,50);
    jato.addImage(jatoImg);
	jato.scale = 0.4;

    restart = createSprite(windowWidth/2 - 200, windowHeight/2 - 200, 30,30);
    restart.addImage(restartImg);
    restart.scale = 0.3;

   
	
    thunderGroup = createGroup();
    cloudGroup = createGroup();
	

	jato.setCollider("rectangle",0,-180,400,450);

	Engine.run(engine);
  
  score = 0;
}


function draw() {
  rectMode(CENTER);
  background(backgroundImage);
   
   
   

   controls();
   
   
    if(gameState === 1){
    restart.visible = false;

    score = score + Math.round(frameRate())/1000;
   spawnClouds();
   spawnThunders();
   if(cloudGroup.isTouching(jato)){
	   jato.destroy();
     gameState = 2;
    
  }
 
   if(thunderGroup.isTouching(jato)){
	  jato.destroy();
    gameState = 2;
    
  }
  textSize(30);
  fill("white");
  text("Sobreviva o máximo de tempo! ", windowWidth/2 - 200, windowHeight/2 - 450);
  
  textSize(30);
    fill("white"); 
    text("Score: " + Math.round(score), windowWidth/2 - 600, windowHeight/2 - 400);

  }

  
   
  
  
 
   
    drawSprites();
    if(gameState === END){
    thunder.destroy();
    cloud.destroy();
    
   // restart.visible = true;
    
    textSize(30);
    fill("yellow");
    text("Você perdeu!!  Sua pontuação foi de: " + Math.round(score),  windowWidth/2 - 600, windowHeight/2);
    }
    
    }
  

   
 


function spawnClouds(){


	if(frameCount % 120 === 0){
cloud = createSprite(windowWidth - 650, windowHeight - 1040, 50,50);
 cloud.addImage(cloudImg);
  cloud.scale = 0.4;
   cloud.velocityY = + 3;
    cloud.x = Math.round(random(100, 1150));
     cloudGroup.add(cloud);
  }
}

function spawnThunders(){


	if(frameCount % 180 === 0){
thunder = createSprite(windowWidth - 650, windowHeight - 1040, 50,50);
 thunder.addImage(thunderImg);
  thunder.scale = 0.3;
   thunder.velocityY = + 2;
    thunder.x = Math.round(random(100, 1150));
	 thunderGroup.add(thunder);
}

 }

function controls(){
   
   
 if(keyIsDown(RIGHT_ARROW)){
	jato.position.x += 5;
 }

  if (keyIsDown(LEFT_ARROW)) {
    jato.position.x -= 5;
   
  }

 }
function mouseClicked(){
  if(restart.mouseClicked()){
    gameState = 1;
  }
}

