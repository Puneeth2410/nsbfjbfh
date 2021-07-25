const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;
var blank;
var bubble,bubble_img;
var higherground;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;




function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubble_img = loadImage("bubble.png")
 

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(500,800)
  frameRate(80);
  
  rabbit = bunny
  
  


  engine = Engine.create();
  world = engine.world;
  var fruit_opitions= {
    restitution:0.8
  }
  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  higherground = new Ground(300,170,100,10)

  ground = new Ground(200,height-10,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  



  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);


  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
   higherground.show();

  
  ground.show();

  

  if(collide(fruit,bunny,80)==true)
  {
    remove_rope();
    bubble.visble=false
    world.remove(engine.world,fruit);
    fruit=null
    
    bunny.changeAnimation('eating');
  }

  if(collide(fruit,bubble,40)==true)
  {
    engine.world.gravity.y=-1
    bubble.position.x=fruit.position.x
    bubble.position.y=fruit.position.y
   
  }
  drawSprites();

 
   
}

function drop()
{
  cut_sound.play();
  rope2.break();
  con2.dettach();
  con2= null
}

 function remove_rope() {
   rope.break();
   con.dettach()
   con = null
 }
 

function collide(body,sprite,x)

{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
        {
               return true; 
            }
            else{
              return false;
            }
         }
}


     



