prediction = "";

Webcam.set({
    width: 350,
    height: 280,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+ data_uri +'">';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/toqR6GDzD/model.json', modelLoaded);

function modelLoaded()
{
    console.log("modelLoaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The first Prediction is" + prediction ;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
 if (error){
     console.error(error);
 }
 else
   {
     console.log(results);
     document.getElementById("result_gesture_name").innerHTML = results[0].label;

     prediction = results[0].label;

     speak();


     if (results[0].label == "AMAZING")
     {
         document.getElementById("gesture").innerHTML = "hi";
     }

     if (results[0].label == "BEST")
     {
         document.getElementById("gesture").innerHTML = "hello";
     }

     if (results[0].label == "VICTORY")
     {
         document.getElementById("gesture").innerHTML = "Yup!";
     }
    }
}