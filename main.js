paddle1 = 10;
paddle2 = 10;

paddleX = 10;

paddle1Y = '';
paddle2Y = 685;

paddle1Height = 110;
paddle2Height = 70;

score1 = 0;
score2 = 0;

playscore = 0;
pcscore = 0;


ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

gameStatus = "";

function preload() {
    ballTouchPaddlel = loadSound("ball_touch_paddlel.wav");
    missed = loadSound("missed.wav");
}

function setup(){
    canvas = createCanvas(700,550);
    canvas.parent('canvas');

    video = createCapture(VIDEO);
    video.size(700, 550);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.lenght > 0)
    {

        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrsit);
    }
}

function startGame()
{
    gameStatus = "start";
    document.getElementById("status").innerHTML = "Game Is Loaded";
}

function draw(){
    if(gameStatus == "start")
    {
        background(0);
        image(video, 0, 0, 700, 550);

        fill("black");
        stroke("black");
        rect(680,0,20,700);

        fill("black");
        stroke("black");
        rect(0,0,20,700);

        if(scoreRightWrist > 0.2)
        {
            fill("red");
            stroke("red");
            circle(rightWristX, rightWristY, 30)
        }



        paddleInCanvas();


        fill(250,0,0);
        stroke(0,0,250);
        strokeWeight(0.5);
        paddlelY = rightWristY;
        rect(paddlelX,paddlelY,paddlel,paddlelHeight,100);



        fill("#FFA500");
        stroke("#FFA500");
        var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
    

        midline();
        

        drawScore();
    

        models();
    

        move();
    
    }
    
}
    
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;   
}
    
    
function midline(){
    for(i=0;i<480;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
}
    
    
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("red");
    stroke(250,0,0)
    text("Jogador:",100,50)
    text(playerscore,180,50);
    text("Computador:",500,50)
    text(pcscore,595,50)
}
    
    
function move(){
    fill(50,350,0);
    stroke(255,0,0);
    strokeWeight(0.5);
    ellipse(ball.x,ball.y,ball.r,20)
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
    if(ball.x+ball.r>width-ball.r/2){
        ball.dx=-ball.dx-0.5;       
    }
    if (ball.x-2.5*ball.r/2< 0){
    if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
        ball.dx = -ball.dx+0.5; 
        ballTouchPaddel.play();
        playerscore++;
    }
    else{
        pcscore++;
        missed.play();
        reset();
        navigator.vibrate(100);
    }
    }
    if(pcscore ==4){
        fill("#FFA500");
        stroke(0)
        rect(0,0,width,height-1);
        fill("white");
        stroke("white");
        textSize(25);
        text("Game Over!",width/2,height/2);
        text("Pressione o botão 'Recomeçar' para jogar novamente!",width/2,height/2+30)
        noLoop();
        pcscore = 0;
    }
    if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
    }   
}







function models() {
    textSize(18);
    fill('red');
    noStroke();
    text("Largura:"+wdith,195,15);
    text("Velocidade:"+abs(ball.dx),65,15);
    text("Altura:"+height,300,15);
}



function paddleInCanvas() {
    if(mouseY+paddlelHeight > height){
        mouseY=height-paddlelHeight;
    }
    if(mouseY < 0){
        mouseY = 0;
    }


}

function restart()
{
    loop();
    pcscore = 0;
    playerscore = 0;
}