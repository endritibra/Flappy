
const bird= document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground=document.querySelector(".ground");

//position of the bird when starting
let birdLeft=220;
let birdBottom=200;
let gravity=2;
let isGameOver=false;

let timerId=setInterval(startGame,20);



function startGame(){
    
    birdBottom-=gravity; 
    bird.style.bottom = birdBottom+ 'px';
    bird.style.left=birdLeft+'px';
    bird.style.transform="rotate(0) scale(1) ";

}

function jump(){
    if(birdBottom<500) birdBottom+=50;
   
    bird.style.bottom=birdBottom+'px';
    bird.style.transform = "rotate(20deg) scale(1.04)";
}

function control(e){
    if(e.keyCode===32){
        jump()
    }
}




function generateObstacle(){
    let obstacleLeft=500
    let randomHeight=Math.floor(Math.random()*400);
    let obstacleBottom=randomHeight
    const obstacle = document.createElement('div')
    obstacle.classList.add('obstacle');
    gameDisplay.appendChild(obstacle);
    obstacle.style.left=obstacleLeft+'px';  
    obstacle.style.bottom=obstacleBottom+'px';

    function moveObstacle(){   
        obstacleLeft-=2;
        obstacle.style.left=obstacleLeft+'px';   
            console.log(obstacleLeft)
            console.log(birdLeft)
        if(obstacleLeft === -60){
            clearInterval(timerId)
            gameDisplay.removeChild(obstacle)        
        }      
        
       if (
            //obstacleLeft>200  &&  obstacleLeft<280 && birdLeft===220 ||
            birdBottom === 0 
            ) {
                clearInterval(timerId)
            gameOver()
        }
    }

    let timerId=setInterval(moveObstacle,20);
    if(!isGameOver) setTimeout(generateObstacle,4000)
}

generateObstacle();
 
function gameOver(){
    clearInterval(timerId)
    isGameOver=true;
    console.log("gameover")
    document.removeEventListener('keyup',control);
}

//lets us use the gravity, the function is invoked every 0.02 secs

document.addEventListener('keyup',control) ;


