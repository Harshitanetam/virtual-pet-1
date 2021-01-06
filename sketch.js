//Create variables here
var dog
var dogImg,dogImg1;
var database;
var foodStock,foodS;

function preload()
{
  //load images here
  dogImg=loadImage("images/Dog.png");
  dogImg1=loadImage("images/happy dog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
    
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {  
background(46,139,87);
  
  //add styles here

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(dogImg1);
  }
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note:Press UP_ARROW Key To Feed Drago Milk",130,10,300,20);
}

//function to read values from DB
function readStock(data){
  foodS=data.val();
}
// Function to write values in DB
function writeStock(x){
  if(x <= 0){
     x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
