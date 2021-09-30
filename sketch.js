var bg, shooter, shooterImg, shooter_ShootingImg, player, zombie, zombie_img, zombieGroup;
var heart1, heart2, heart3, heart_img1, heart_img2, heart_img3, bulletGroup, gameState = "fight";
var bullets = 70, bullet, score = 0, life = 3, lose, wining, explosionSound;
function preload() {
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_ShootingImg = loadImage("assets/shooter_3.png");
  bg = loadImage("assets/bg.jpeg");
  zombie_img = loadImage("assets/zombie.png")
  heart_img1 = loadImage("assets/heart_1.png")
  heart_img2 = loadImage("assets/heart_2.png")
  heart_img3 = loadImage("assets/heart_3.png")
  lose = loadSound("assets/lose.mp3")
  wining = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight)
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;

  heart1 = createSprite(displayWidth - 150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heart_img1);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth - 100, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heart_img2);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth - 150, 40, 20, 20);
  heart3.visible = false;
  heart3.addImage("heart3", heart_img3);
  heart3.scale = 0.4;

  zombieGroup = new Group();
  bulletGroup = new Group();
}
function draw() {
  background(bg)
  if (gameState === "fight") {
    if (life === 3) {
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }
    if (life === 2) {
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
    }
    if (life === 1) {
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }
    if(life===0){
      heart3.visible=false;
      heart2.visible=false;
      heart1.visible=false;
      gameState="Lost"
          }
    if (score == 100) {
      gameState = "Won";
      wining.play()

    }
    if (keyDown("UP_ARROW") || touches.length > 0) player.y = player.y - 30;
    if (keyDown("DOWN_ARROW") || touches.length > 0) player.y = player.y + 30;
    if (keyWentDown("space")) {
      bullet = createSprite(displayWidth - 1150, player.y - 33, 30, 10);
      bullet.scale = 0.5
      bullet.velocityX = 20;
      bulletGroup.add(bullet);
      player.depth = bullet.depth;
      player.depth = player.depth + 2
      player.addImage(shooter_ShootingImg);
      bullets = bullets - 1;
      console.log(bullets)
    }
    else if (keyWentUp("space")) player.addImage(shooterImg);

    if (zombieGroup.isTouching(bulletGroup)) {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(bulletGroup)) {
          zombieGroup[i].destroy();
          bulletGroup.destroyEach();
          score = score + 2;
          explosionSound.play();
        }
      }
    }
    if (zombieGroup.isTouching(player)) {
      lose.play();
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(player)) {
          zombieGroup[i].destroy();
          life=life-1;
        }
      }
    }
    if (bullets == 0) {
      gameState = "Bullet"
    }
    enemy();
  }
  drawSprites();
  textSize(20);
  fill("White");
  text("Bullets = " + bullets, displayWidth - 210, displayHeight / 2 - 250)
  text("Score = " + score, displayWidth - 200, displayHeight / 2 - 220)
  text("Lives = " + life, displayWidth - 200, displayHeight / 2 - 280)
  if (gameState == "Lost") {
    textSize(100);
    fill("Red");
    text("You Lost", 400, 400);
    zombieGroup.destroyEach();
    player.destroy();
  }
  else if (gameState == "Bullet") {
    textSize(50);
    fill("Yellow");
    text("You ran out of ammo", 470, 410);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }
  else if (gameState == "Won") {
    textSize(100);
    fill("Yellow");
    text("You Won", 470, 410);
    zombieGroup.destroyEach();
    player.destroy();
  }
}

function enemy() {
  if (frameCount % 50 === 0) {
    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40);
    zombie.addImage(zombie_img);
    zombie.scale = 0.156789
    zombie.velocityX = -3;
    zombie.lifetime = 400.5669
    zombie.setCollider("rectangle", 0, 0, 400, 400);
    zombieGroup.add(zombie);
  }

}