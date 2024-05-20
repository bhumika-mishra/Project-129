song = "";
song2 = "";
scoreleftWrist = 0;
statusleftWrist = "";
scoreRightWrist = 0;
statusRightWrist = "";


function preload(){
    song = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,  modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results){
if(results.length > 0){
 console.log(results);
 scoreRightWrist = results[0].pose.keypoints[10].score;
 scoreleftWrist = results[0].pose.keypoints[9].score;
 console.log("RightWristX = " + scoreRightWrist + "scoreLeftWrist = "+ scoreRightWrist);
 console.log(scoreleftWrist);

 leftWristX = results[0].pose.leftWrist.x;
 leftWristY = results[0].pose.leftWrist.y;
 console.log("leftWristX = " + leftWristX + "leftWristY = "+ leftWristY);

 rightWristX = results[0].pose.rightWrist.x;
 rightWristY = results[0].pose.rightWrist.y;
 console.log("rightWristX = " + rightWristX + "rightWristY = "+ rightWristY);

}
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function draw(){
    image(video, 0, 0, 600, 530);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.001)
    {

    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200 ){
        document.getElementById("speed").innerHTML = "Speed =1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300 ){
        document.getElementById("speed").innerHTML = "Speed =1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400 ){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500 ){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);

    }
}

    if(scoreleftWrist > 0.001){ 
    song = song.isPlaying()
    console.log(song);
   song2 = song2.isPlaying()
   console.log(song2);
    circle(leftWristX, leftWristY, 20);
 }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
