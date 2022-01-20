const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let score = 0;
let id;
let checkCollision;

canvas.width = 500;
canvas.height = 700;

class Driver{
  constructor(){
    this.x = 225;
    this.y = 600;
    this.width = 50;
    this.height = 100;
    this.image = new Image();
  }
  
  move(direction) {
    switch(direction) {
      case "ArrowLeft":
        if (driver.x < 0 + driver.width) {
          driver.x = 0;
        } else {
          driver.x -= 20;
        }
        break;
      case "ArrowRight":
        if (driver.x > canvas.width - driver.width * 2) {
          driver.x = canvas.width - driver.width;
        } else {
          driver.x += 20;
        }
        break;
    }
  }

}

class Object {
  constructor() {
    // y and height are constant
    // 40 - 265 => x
    this.x = Math.random() * (265 - 40) + 40; 
    this.y = 0;
    // 100 - 300 => width
    this.width = Math.random() * (300 - 100) + 100;
    this.height = 25;
  }

  // draw() {

  // }
}

const objArr = [];
function addObj() {
  const obj = new Object();
  objArr.push(obj);
}

setInterval(addObj, 2000);

const driver = new Driver();
driver.image.src = "../images/car.png";

document.addEventListener("keydown", (e) => {
  switch(e.code) {
    case "ArrowLeft":
      driver.move("ArrowLeft");
      break;
    case "ArrowRight":
      driver.move("ArrowRight");
      break;
  }
})

driver.image.onload = () => {
    context.drawImage(driver.image, driver.x, driver.y, driver.width, driver.height);
}



let lose = false;
//'game engine'
window.onload = () => {

  document.getElementById('start-button').onclick = () => {
    animate();
  }

  function animate(){
    id = window.requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width, canvas.height);
    

    context.fillStyle = "white";
    context.font = "30px monospace"
    context.fillText(`Score: ${score}`, 80, 20, 150);
    objArr.forEach(e => {
      // Draw Object
      context.fillStyle = "red";
      context.fillRect(e.x, e.y++, e.width, e.height);
      // Add Score
      if (e.y > canvas.height - e.height) {
        objArr.shift();
        score++;
      }
      // Check Collision
      checkCollision = detectCollision(driver, e);
      if (checkCollision) {
        lose = true;
      }
    })

    context.drawImage(driver.image, driver.x, driver.y, driver.width, driver.height);

    if (lose) {
      gameOver();
    }
  }
}


function gameOver() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "red";
  context.font = "48px monospace";
  context.fillText("Game Over!", 100, 150, 400);
  context.fillStyle = "white";
  context.font = "40px monospace";
  context.fillText("Your final score", 60, 250, 400);
  context.fillText(score, 200, 300, 400);
  window.cancelAnimationFrame(id);
}

function detectCollision(driver, obj){
    if (
    driver.x < obj.x + obj.width &&
    driver.x + driver.width > obj.x &&
    driver.y < obj.y + obj.height &&
    driver.y + driver.height > obj.y
  ) {
    return true;
  }
}


