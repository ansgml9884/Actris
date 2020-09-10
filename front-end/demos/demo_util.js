/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

import {executeAction, completeAction} from './tetris.js'

const color = 'aqua';
const lineWidth = 2;

export const tryResNetButtonName = 'tryResNetButton';
export const tryResNetButtonText = '[New] Try ResNet50';

/**
 * Toggles between the loading UI and the main canvas UI.
 */
export function toggleLoadingUI(
    showLoadingUI, loadingDivId = 'loading', mainDivId = 'main') {
  if (showLoadingUI) {
    document.getElementById(loadingDivId).style.display = 'block';
    document.getElementById(mainDivId).style.display = 'none';
  } else {
    document.getElementById(loadingDivId).style.display = 'none';
    document.getElementById(mainDivId).style.display = 'block';
  }
}

function toTuple({y, x}) {
  return [y, x];
}
let leftShoulder = null;
let leftWrist = null;
let rightWrist = null;
let latestLeftWrist = null;
let latestRightWrist = null;

let dropLock = false;
let fastDownLock = false;
let leftMoveLock = false;
let rightMoveLock = false;
let holdLock = false;
let pauseLock = false;
let leftRotateLock = false;
let rightRotateLock = false;
let rotateLock = false;

export function moveBlock(y, x, r, part){

  if(part=='leftShoulder'){
    if(leftShoulder==null){
      leftShoulder = [y,x];
    }
    //fastDown - 자리에 앉기
    if(fastDownLock && y-50<=leftShoulder[0]){
      fastDownLock = false;
      rotateLock = false;
      completeAction("fastDown");
    }else if(!fastDownLock){
      if(y-leftShoulder[0]>100){
        executeAction("fastDown");
        fastDownLock = true;
      }else if(y-leftShoulder[0]>50){
        rotateLock = true;
      }
    }
    //drop - 제자리 뛰기
    if(dropLock && y>=leftShoulder[0]-20){
      dropLock = false;
      completeAction("drop");
    }else if(!dropLock && y<leftShoulder[0]-50){
      executeAction("drop");
      dropLock = true;
    }
  }
  
  if(part=='leftWrist'){
    latestLeftWrist = [y,x];
    if(leftWrist==null){
      leftWrist = [y,x];
    }
    //moveLeft - 왼손 왼쪽으로
    if(leftMoveLock && x+50>=leftWrist[1]){
      leftMoveLock = false;
      completeAction("moveLeft");
    }else if(!leftMoveLock && leftWrist[1]-x>100){
      executeAction("moveLeft");
      leftMoveLock = true;
    }
    //rotateLeft - 왼손 아래로
    if(leftRotateLock && y<=leftWrist[0]+50){
      leftRotateLock = false;
      completeAction("rotateLeft");
    }else if(!rotateLock && !leftRotateLock && y-leftWrist[0]>100){
      executeAction("rotateLeft");
      leftRotateLock = true;
    }
  }

  if(part=='rightWrist'){
    latestRightWrist = [y,x];
    if(rightWrist==null){
      rightWrist = [y,x];
    }
    //moveRight - 오른손 오른쪽으로
    if(rightMoveLock && x<=rightWrist[1]+50){
      rightMoveLock = false;
      completeAction("moveRight");
    }else if(!rightMoveLock && x-rightWrist[1]>100){
      executeAction("moveRight");
      rightMoveLock = true;
    }
    //rotateRight - 오른손 아래로
    if(rightRotateLock && y<=rightWrist[0]+50){
      rightRotateLock = false;
      completeAction("rotateRight");
    }else if(!rotateLock && !rightRotateLock && y-rightWrist[0]>100){
      executeAction("rotateRight");
      rightRotateLock = true;
    }
  }
  //hint - 양손 들기
  //hold - 왼손 들기 hold
  if(part=='leftWrist'){
    latestLeftWrist = [y,x];
    if(leftWrist==null){
      leftWrist = [y,x];
    }
    if(holdLock && y+50>=leftWrist[0]){
      holdLock = false;
      pauseLock = leftMoveLock = rightMoveLock = false;      
      completeAction("hold");
    }else if(!holdLock){
      if(leftWrist[0]-y>100){
        if(latestRightWrist[0]<y+20){
          console.log('hint');
          holdLock = true;
          pauseLock = leftMoveLock = rightMoveLock = true; 
        }else{
          executeAction("hold");
          holdLock = true;
        }
      }
    }
  }
  //pause - 오른손 들기 
  if(part=='rightWrist'){
    latestRightWrist = [y,x];
    if(rightWrist==null){
      rightWrist = [y,x];
    }else if(pauseLock && y+50>=rightWrist[0]){
      pauseLock = false;
      holdLock = leftMoveLock = rightMoveLock = false;      
    }else if(!pauseLock){
      if(rightWrist[0]-y>100){
        if(latestLeftWrist[0]<y+20){
          console.log('hint');
          pauseLock = true;
          holdLock = leftMoveLock = rightMoveLock = true; 
        }else{
          executeAction("pause");
          pauseLock = true;
        }
      }
    }
  }
}

export function drawPoint(ctx, y, x, r, color, part) {  
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.font = '10px serif';
  //ctx.fillText(part, x, y);
  //ctx.fillText(x.toFixed(2) + '    ' + y.toFixed(2), x, y);
  ctx.fill();
}

export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints =
      posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
        toTuple(keypoints[0].position), toTuple(keypoints[1].position), color,
        scale, ctx);
  });
}

export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    if (keypoint.score < minConfidence) {
      continue;
    }

    const {y, x} = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color, keypoint.part);
    moveBlock(y * scale, x * scale, 3, keypoint.part);
  }
}

export async function renderToCanvas(a, ctx) {
  const [height, width] = a.shape;
  const imageData = new ImageData(width, height);

  const data = await a.data();

  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    const k = i * 3;

    imageData.data[j + 0] = data[k + 0];
    imageData.data[j + 1] = data[k + 1];
    imageData.data[j + 2] = data[k + 2];
    imageData.data[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

export function renderImageToCanvas(image, size, canvas) {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);
}

export function drawHeatMapValues(heatMapValues, outputStride, canvas) {
  const ctx = canvas.getContext('2d');
  const radius = 5;
  const scaledValues = heatMapValues.mul(tf.scalar(outputStride, 'int32'));

  drawPoints(ctx, scaledValues, radius, color);
}

function drawPoints(ctx, points, radius, color) {
  const data = points.buffer().values;

  for (let i = 0; i < data.length; i += 2) {
    const pointY = data[i];
    const pointX = data[i + 1];

    if (pointX !== 0 && pointY !== 0) {
      ctx.beginPath();
      ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

export function drawOffsetVectors(
    heatMapValues, offsets, outputStride, scale = 1, ctx) {
  const offsetPoints =
      posenet.singlePose.getOffsetPoints(heatMapValues, outputStride, offsets);

  const heatmapData = heatMapValues.buffer().values;
  const offsetPointsData = offsetPoints.buffer().values;

  for (let i = 0; i < heatmapData.length; i += 2) {
    const heatmapY = heatmapData[i] * outputStride;
    const heatmapX = heatmapData[i + 1] * outputStride;
    const offsetPointY = offsetPointsData[i];
    const offsetPointX = offsetPointsData[i + 1];

    drawSegment(
        [heatmapY, heatmapX], [offsetPointY, offsetPointX], color, scale, ctx);
  }
}
