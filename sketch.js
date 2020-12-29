//Create variables here
var dog,happyDog,database,foods,foodStock;

function preload()
{
  //load images here
  dogHappy = loadImage("images/dogImg1.png")
  dogSad = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250,300,150,150);
  dog.addImage(dogSad);
  dog.scale = 0.15;

  foodStock = database.ref("Food")
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)
  
  //add styles here

  if(keyDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }
  drawSprites();
  fill("blue");
  text("food remaining: "+foods,170,200);
  textSize(13)
  text("Press up arrow to feed charley",300,20);

}

function readStock(data){
  foods = data.val()
  console.log(foods)
}

function writeStock(count){
  if(count <= 0){
    count = 0
  }
  else{
    count = count-1
  }
  database.ref('/').update({
    Food:count
  })
  
}
