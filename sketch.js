
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var zombie;
var zombieSprite;
var ufoSprite;
var ufo; 
var zombieGroup;
var bullet;
var bulletGroup;
var gameState = "shoot";
var bg, bgImg;

score = 0;


function preload(){
	ufoSprite = loadImage("Saucer_-_Vehicle_-_Fortnite.png");
	zombieSprite = loadImage("9-2-minecraft-zombie-png.png");
	bgImg = loadImage("maxresdefault.jpg");
}

function setup() {
	createCanvas(windowWidth,windowHeight);

	bg = createSprite(displayWidth/2-20, displayHeight/2-40,20,20);
	bg.addImage(bgImg);
	bg.scale = 1.5;

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ufo = createSprite(displayWidth-1000, displayHeight-300, 50, 50);
	ufo.addImage(ufoSprite);
	ufo.scale = 0.5
	ufo.debug = true;
	ufo.setCollider("rectangle",0,0,400,400);

	zombieGroup = new Group();
	bulletGroup = new Group();


	Engine.run(engine);
	score = 0;
}


function draw() {
  rectMode(CENTER);
  console.log(frameCount);
  background(0);
  if(gameState == "shoot"){
	  if(keyDown("RIGHT_ARROW")||touches.length>0){
		ufo.x = ufo.x +50;
	  }
	  if(keyDown("LEFT_ARROW")||touches.length>0){
		ufo.x = ufo.x -50;
	  }

	  if(keyDown("space")){
		bullet = createSprite(ufo.x, displayHeight - 300,20,10);
		bullet.velocityY = -5;
		bulletGroup.add(bullet);
		ufo.depth = bullet.depth;
		ufo.depth+2;
	  }

	  ZombieSpawn();

	  if(zombieGroup.isTouching(bulletGroup)){
		for (var i=0;i<zombieGroup.length;i++){
			if(zombieGroup[i].isTouching(bulletGroup)){
				zombieGroup[i].destroy();
				bulletGroup.destroyEach();
				score = score + 1;
			}
			
		}
	  }

	  if(zombieGroup.isTouching(ufo)){
 

		for(var i=0;i<zombieGroup.length;i++){     
			 
		 if(zombieGroup[i].isTouching(ufo)){
		   
		   for (var i = 0; i< zombieGroup.length;i++){
			 if(zombieGroup[i].isTouching(ufo)){
			   zombieGroup[i].destroy();
			   ufo.destroy();
			   gameState = "lose";
			 }
		   }
		  } 
		}
	   }  

	   if(score == 5){
		   gameState == "won"
	   }

	}
	
	drawSprites();

	textSize(20);
	fill("white");
	text("score=" + score,displayWidth-200,displayHeight/2 - 220);

	if(gameState == "lost"){
		textSize(100);
		fill("red");
		text("You Lost",400,400);
		zombieGroup.destroyEach();
		ufo.destroy();
	  }
	  
	  else if(gameState == "won"){
		textSize(100);
		fill("yellow");
		text("You win", 400,400);
		zombieGroup.destroyEach();
		ufo.destroy();
	  }

}

 


function ZombieSpawn(){
	if(frameCount%150===0){
		zombie = createSprite(random(500,1500),100,40,40);

		zombie.addImage(zombieSprite);
		zombie.scale = 0.1;
		zombie.velocityY = 5;
		zombie.debug = true;
		zombie.setCollider("rectangle",0,0,500,500);

		zombie.lifetime = 600;
		zombieGroup.add(zombie);
	}
}
