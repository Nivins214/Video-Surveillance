img = "";
status_ = "";
_x = 0;
_y = 0;
objects = [];
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("result").innerHTML = "Status : Detecting Objects";
//    video = createCapture(VIDEO);// uncomment these 3 lines for live webcam video
//    video.center();
//    video.hide();
}
function modelLoaded() {
    console.log("Model Loaded!");
    status_ = true;
//    objectDetector.detect(uploadedVideo, gotResult); // first parameter can be image, live webcam, or uploaded video
}
function gotResult(error, results) {
    if (error) {
    console.log(error);
    }
    console.log(results);
    objects = results;
    console.log(objects.length);
}
function preload() {
//    img = loadImage('dog_cat.jpg');//this command as the be used when you detect an image file
uploadedVideo = createVideo("city.mp4");
uploadedVideo.hide();
uploadedVideo.loop();
uploadedVideo.volume(0);
uploadedVideo.speed(1);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}
function draw() {
//    img.resize(600, 400);
    image(uploadedVideo, 0, 0, 600, 400); // first parameter can be image, live webcam, or uploaded video
    if (status_ != "") {
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(uploadedVideo, gotResult); // first parameter can be image, live webcam, or uploaded video
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are : " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}