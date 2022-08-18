status = "";
objects = [];
function preload() {
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.position(430, 300);
    video = createCapture(VIDEO);
    video.size400, 300
    video.hide();
}

function draw() {
    image(video, 0, 0, 400, 300);
    if(status != "") {
        objectdetecter.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status = Objects Detected";
            fill("blue");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name) {
                video.stop();
                objectdetecter.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                speak_this = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(speak_this);
            }
            else {
                document.getElementById("status").innerHTML = object_name + " Not Found";
            }
        }
    }
}

function start() {
    objectdetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}