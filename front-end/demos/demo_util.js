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

//first value
let leftShoulder = null;
let leftWrist = null;
let rightWrist = null;
let leftElbow = null;
let rightElbow = null;

//latest value
let latestLeftElbow = null;
let latestRightElbow = null;

//downfast시 rotate 방지
let rotateLock = false;

export function moveBlock(y, x, part){

  if(part=='leftElbow'){
    latestLeftElbow = [y,x];
    if(leftElbow==null){
      leftElbow = [y,x];
    }
  }

  if(part=='rightElbow'){
    latestRightElbow = [y,x];
    if(rightElbow==null){
      rightElbow = [y,x];
    }
  }

  if(part=='leftShoulder'){
    if(leftShoulder==null){
      leftShoulder = [y,x];
    }
    //fastDown - 자리에 앉기
    if(y-50<leftShoulder[0]){
      rotateLock = false;
      completeAction("fastDown");
    }else if(y-leftShoulder[0]>100){
      executeAction("fastDown");
    }else if(y-leftShoulder[0]>50){
      rotateLock = true;
    }
    //drop - 제자리 뛰기
    if(y>leftShoulder[0]-20){
      completeAction("drop");
    }else if(y<leftShoulder[0]-50){
      executeAction("drop");
    }
  }
  
  if(part=='leftWrist'){
    if(leftWrist==null){
      leftWrist = [y,x];
    }
    //moveLeft - 왼손 왼쪽으로
    if(x+50>leftWrist[1]){
      completeAction("moveLeft");
    }else if(leftWrist[1]-x>100){
      executeAction("moveLeft");
    }
    //rotateLeft - 왼손 아래로
    if(y<leftWrist[0]+50){
      completeAction("rotateLeft");
    }else if(!rotateLock && y-leftWrist[0]>100){
      executeAction("rotateLeft");
    }
    //hold - 왼손 위로//hint - 양손
    if(y+50>leftWrist[0]){
      completeAction("hold");
      completeAction("hint");
    }else if(leftWrist[0]-y>100){
      if(latestRightElbow[0]>rightElbow[0]-20){
        executeAction("hold");
      }else if(latestRightElbow[0]+50<rightElbow[0]){
        executeAction("hint");
      }
    }
  }

  if(part=='rightWrist'){
    if(rightWrist==null){
      rightWrist = [y,x];
    }
    //moveRight - 오른손 오른쪽으로
    if(x<rightWrist[1]+50){
      completeAction("moveRight");
    }else if(x-rightWrist[1]>100){
      executeAction("moveRight");
    }
    //rotateRight - 오른손 아래로
    if(y<rightWrist[0]+50){
      completeAction("rotateRight");
    }else if(!rotateLock && y-rightWrist[0]>100){
      executeAction("rotateRight");
    }
    //pause - 오른손 위로//hint - 양손
    if(y+50>rightWrist[0]){
      completeAction("hint");
    }else if(rightWrist[0]-y>100){
      if(latestLeftElbow[0]>leftElbow[0]-20){
        executeAction("pause");
      }else if(latestLeftElbow[0]+50<leftElbow[0]){
        executeAction("hint");
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
    moveBlock(y * scale, x * scale, keypoint.part);
  }
}