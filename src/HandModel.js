import React, { useEffect,  useState } from 'react'
import {
  GestureRecognizer,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import { HAND_CONNECTIONS } from '@mediapipe/hands';
import { drawLandmarks, drawConnectors } from '@mediapipe/drawing_utils';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
// import Indicator from './Indicator';


//********************************************************** */
let gestureRecognizer = undefined;
let doPredictions = false ;
let categoryName = undefined ;
let video = undefined;
let canvasElement = undefined;
let canvasCtx = undefined;
let categoryScore = undefined;
let vision = undefined ;
let MenuInnerHTML = undefined ;

const createGestureRecognizer = async () => {
   vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-11/wasm"
  );
  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task"
    },
    runningMode: "VIDEO"
  });
};
//vsfv
export default function HandModel() {
const [label , setLabel] = useState('Anything');


const[category  , setCategory] = useState('categoryName') ;

  const [doPredictionsBtn , setBtn] = useState('Start') ;
  function handleDoPredictions(){
    if(doPredictions === false){
      doPredictions = true ;
      preRun();
      predictWebcam()
      setBtn('Stop')
    }
    else{
      doPredictions = false ;
      setBtn('Test Again')

    }
  }


  useEffect(() => {
    createGestureRecognizer();
    console.log("ReRender : createGestureRecognizer Reached");

  }, [])


  function preRun() {
    video = document.getElementById("video_in");
    canvasElement = document.getElementById("video_out");
    canvasCtx = canvasElement.getContext("2d");
    MenuInnerHTML  = document.getElementById('select-small');
  }



  async function predictWebcam() {
    if (doPredictions) {
    // Now let's start detecting the stream.
    let nowInMs = Date.now();
    let results = gestureRecognizer.recognizeForVideo(video, nowInMs);

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(video, 0, 0);

    if (results.landmarks) {
      for (let landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 2
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 1 });
      }
    }
    canvasCtx.restore();
    if (results.gestures.length > 0) {

      categoryName = results.gestures[0][0].categoryName;
      categoryScore = parseFloat(
        results.gestures[0][0].score * 100
      ).toFixed(2);

      console.log(`GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %`);
      setLabel(MenuInnerHTML.innerHTML)
      setCategory(categoryName) ;
      if(categoryName === MenuInnerHTML.innerHTML){
        handleDoPredictions();
      }

    }
    // Call this function again to keep predicting when the browser is ready.
   
      window.requestAnimationFrame(predictWebcam);
    }
    else {
      console.info("Stopped The Prediction : Target Reached");
    }


  }




  return (

    <Box width={672}>
    <Card>
        <CardContent> 
    
      <Button variant="contained" sx={{display : 'inline-flex'}} onClick={() => {
        handleDoPredictions();
      }}>{doPredictionsBtn}</Button>
      
      {
        !doPredictions && <div style ={{display : 'inline'}} >  ✅  Correct :  {label} </div>
      }
{
  doPredictions && <div> ❌ Thats : {category}</div>
}
  
        </CardContent>
           
    </Card>
</Box>



    
  )
}
