img = "";
Status = "";
objects=[];
alarm="";

function setup()
{

   canvas = createCanvas(380 , 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();

   objectidentifier = ml5.objectDetector('cocossd' , modelLoaded );
   document.getElementById("status").innerHTML = "Status : Detecting object";

}

function preload()
{

  alarm = loadSound("Alarm.mp3");

}

function draw()
{

   image(video,0,0,380,380);

   if(Status != "")
   {  r = random(255);
      g = random(255);
      b = random(255)
      objectidentifier.detect(video , gotresult);
      for (i = 0; i < objects.length; i++)
      {

         document.getElementById("status").innerHTML = "Status: Object Detected";
         document.getElementById("number_of_objects").innerHTML = "Baby Found"

         fill(r , g , b);
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + "" + percent + "%" , objects[i].x , objects[i].y);
         noFill();
         stroke(r , g , b);
         rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

         if(objects[i].label != "person")
         {

              alarm.play();

         }
       else
       {

         alarm.stop();

       }
         

      }

   }
 
}

function modelLoaded()
{

    console.log("Model Loaded!!!");
    Status = true;

}

function gotresult(error , results)
{

 if(error)
 {

   console.log(error);

 }

 console.log(results);
 objects = results;

}
