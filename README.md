# :video_game:Actris
### 플레이데이터 Pose-Estimation 개발자 교육 과정 중간 프로젝트 
### 휴먼포즈 인식 기반 테트리스 게임   
<br>

### :rocket: 팀명: Team Rocket (로켓단)
### :family: 팀원: 김문희, 김용수, 양희영, 오나영 

<br>
<br>

## :book:프로젝트 설명
### 1. Overview of Actress   
Covid19의 범유행으로 인해 마음대로 돌아다닐수도 없는 세상이다.      
스트레스 풀 방법이 줄어든 요즘, 사회적 거리두기를 하면서 코로나로부터 안전하게 스트레스를 해소하는 방법을 찾고자 하였다.

### 2. Features of Actress
<b>친숙하면서도 새롭고 즐겁게 무료로 즐길수있는 Actris !</b>  :sparkler:

테트리스는 누구나 한번쯤 접해본 게임이다.       
이 친숙한 국민게임을 온몸으로 새롭고 즐겁게 캠과 모니터만 있으면 무료로 이용할 수 있다.
<br>
<br>

### :pencil2: 사용언어, 기술스택
<table class="tg">
<thead>
  <tr>
    <th class="tg-m9r4">Platform</th>
    <th class="tg-0lax">Web</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-m9r4">Language</td>
    <td class="tg-0lax">Java, JavaScript, C++, Html, Css</td>
  </tr>
  <tr>
    <td class="tg-m9r4">Library</td>
    <td class="tg-0lax">Vue.js, jQuery, Tensorflow Lite</td>
  </tr>
  <tr>
    <td class="tg-m9r4">Server</td>
    <td class="tg-0lax">Apache Tomcat</td>
  </tr>
  <tr>
    <td class="tg-m9r4">Framework</td>
    <td class="tg-0lax">Yarn, Eclipse, Visual Studio Code</td>
  </tr>
  <tr>
    <td class="tg-m9r4">Database</td>
    <td class="tg-0lax">Oracle</td>
  </tr>
</tbody>
</table>

<br>
<br>

## :page_with_curl: 프로그램 설계 및 구조
### 1. DB 설계

<img width="413" alt="1" src="https://user-images.githubusercontent.com/56735744/105849410-b1eaa980-6023-11eb-961d-5f02ccf795b4.png">  <img width="413" alt="2" src="https://user-images.githubusercontent.com/56735744/105849414-b3b46d00-6023-11eb-8285-6d99f6e1eef0.png">

## 2. 서버 통신
<img width="407" alt="3" src="https://user-images.githubusercontent.com/56735744/105851919-14917480-6027-11eb-86d0-210d9a7908e6.png">  <img width="412" alt="4" src="https://user-images.githubusercontent.com/56735744/105851913-12c7b100-6027-11eb-8f15-e1bcf05cc566.png">  <img width="410" alt="5" src="https://user-images.githubusercontent.com/56735744/105851916-13f8de00-6027-11eb-82ed-1cdf6e6843ca.png">  <img width="412" alt="6" src="https://user-images.githubusercontent.com/56735744/105851917-14917480-6027-11eb-8ed4-5439299f7c1a.png">

## 3. 게임 로직
<img width="407" alt="10" src="https://user-images.githubusercontent.com/56735744/105852965-80281180-6028-11eb-82f2-b136ee3d9b84.png">   
<img width="402" alt="12" src="https://user-images.githubusercontent.com/56735744/105852971-81f1d500-6028-11eb-8d8c-c6b620d4d8b1.png">   
<img width="406" alt="11" src="https://user-images.githubusercontent.com/56735744/105852970-81593e80-6028-11eb-98f4-8a3b779c2f7f.png">   

## PoseNet
![12](https://user-images.githubusercontent.com/56735744/105853202-c54c4380-6028-11eb-8d54-6ffcec8177a7.jpg)   
<img width="360" alt="20" src="https://user-images.githubusercontent.com/56735744/105853155-b796be00-6028-11eb-9a59-6485bdcfc86a.png">






# Pre-trained TensorFlow.js models

This repository hosts a set of pre-trained models that have been ported to
TensorFlow.js.

The models are hosted on NPM and unpkg so they can be used in any project out of the box. They can be used directly or used in a transfer learning
setting with TensorFlow.js.

To find out about APIs for models, look at the README in each of the respective
directories. In general, we try to hide tensors so the API can be used by
non-machine learning experts.

For those interested in contributing a model, please file a [GitHub issue on tfjs](https://github.com/tensorflow/tfjs/issues) to gauge
interest. We are trying to add models that complement the existing set of models
and can be used as building blocks in other apps.

## Models

<table style="max-width:100%;table-layout:auto;">
  <tr style="text-align:center;">
    <th>Type</th>
    <th>Model</th>
    <th>Demo</th>
    <th>Details</th>
    <th>Install</th>
  </tr>
  <!-- Images -->
  <!-- ** MobileNet -->
  <tr>
    <td rowspan="10"><b>Images</b></td>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./mobilenet"><div style='vertical-align:middle; display:inline;'>MobileNet</div></a></b></td>
    <td><a href=""></a></td>
    <td rowspan="2">Classify images with labels from the <a href="http://www.image-net.org/">ImageNet database</a>.</td>
    <td rowspan="2"><code>npm i @tensorflow-models/mobilenet</code></td>
  </tr>
  <tr>
    <td><a href="./mobilenet/demo/index.html">source</a></td>
  </tr>
  <!-- ** PoseNet -->
  <tr>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./posenet"><div style='vertical-align:middle; display:inline;'>PoseNet</div></a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html">live</a></td>
    <td rowspan="2">A machine learning model which allows for real-time human pose estimation in the browser. See a detailed description <a href="https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5">here</a>.</td>
    <td rowspan="2"><code>npm i @tensorflow-models/posenet</code></td>
  </tr>
  <tr>
    <td><a href="./posenet/demos/camera.html">source</a></td>
  </tr>
  <!-- ** Coco SSD -->
  <tr>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./coco-ssd"><div style='vertical-align:middle; display:inline;'>Coco SSD</div></a></b></td>
    <td><a href=""></a></td>
    <td rowspan="2">Object detection model that aims to localize and identify multiple objects in a single image. Based on the <a href="https://github.com/tensorflow/models/blob/master/research/object_detection/README.md">TensorFlow object detection API</a>.</td>
    <td rowspan="2"><code>npm i @tensorflow-models/coco-ssd</code></td>
  </tr>
  <tr>
    <td><a href="./coco-ssd/demo">source</a></td>
  </tr>
  <!-- ** BodyPix -->
  <tr>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./body-pix"><div style='vertical-align:middle; display:inline;'>BodyPix</div></a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-models/demos/body-pix/index.html">live</a></td>
    <td rowspan="2">Real-time person and body part segmentation in the browser using TensorFlow.js.</td>
    <td rowspan="2"><code>npm i @tensorflow-models/body-pix</code></td>
  </tr>
  <tr>
    <td><a href="./body-pix/demos/index.html">source</a></td>
  </tr>
    <!-- ** DeepLab -->
  <tr>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./deeplab"><div style='vertical-align:middle; display:inline;'>DeepLab v3</div></a></b></td>
    <td><a href=""></a></td>
    <td rowspan="2">Semantic segmentation</td>
    <td rowspan="2"><code>npm i @tensorflow-models/deeplab</code></td>
  </tr>
  <tr>
    <td><a href="./deeplab/demo/index.html">source</a></td>
  </tr>
  <!-- * Audio -->
  <!-- ** Speech Commands -->
  <tr>
    <td rowspan="2"><b>Audio</b></td>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./speech-commands"><div style='vertical-align:middle; display:inline;'>Speech Commands</div></a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-speech-model-test/2019-01-03a/dist/index.html">live</a></td>
    <td rowspan="2">Classify 1 second audio snippets from the <a href="https://www.tensorflow.org/tutorials/sequences/audio_recognition">speech commands dataset</a>.</td>
    <td rowspan="2"><code>npm i @tensorflow-models/speech-commands</code></td>
  </tr>
  <tr>
    <td><a href="./speech-commands/demo/index.html">source</a></td>
  </tr>
  <!-- * Text -->
  <!-- ** Universal Sentence Encoder -->
  <tr>
    <td rowspan="4"><b>Text</b></td>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./universal-sentence-encoder"><div style='vertical-align:middle; display:inline;'>Universal Sentence Encoder</div></a></b></td>
    <td><a href=""></a></td>
    <td rowspan="2">Encode text into a 512-dimensional embedding to be used as inputs to natural language processing tasks such as sentiment classification and textual similarity.</td>
    <td rowspan="2"><code>npm i @tensorflow-models/universal-sentence-encoder</code></td>
  </tr>
  <tr>
    <td><a href="./universal-sentence-encoder/demo">source</a></td>
  </tr>
  <!-- ** Text Toxicity -->
  <tr>
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./toxicity"><div style='vertical-align:middle; display:inline;'>Text Toxicity</div></a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-models/demos/toxicity/index.html">live</a></td>
    <td rowspan="2">Score the perceived impact a comment might have on a conversation, from "Very toxic" to "Very healthy".</td>
    <td rowspan="2"><code>npm i @tensorflow-models/toxicity</code></td>
  </tr>
  <tr>
    <td><a href="./toxicity/demo/index.html">source</a></td>
  </tr>
  <!-- * General Utilities -->
  <tr>
    <td rowspan="2"><b>General Utilities</b></td>
  <!-- ** KNN Classifier -->
    <td rowspan="2"><b><a style="white-space:nowrap; display:inline-block;" href="./knn-classifier"><div style='vertical-align:middle; display:inline;'>KNN Classifier</div></a></b></td>
    <td><a href=""></a></td>
    <td rowspan="2">This package provides a utility for creating a classifier using the K-Nearest Neighbors algorithm. Can be used for transfer learning.</td>
    <td rowspan="2"><code>npm i @tensorflow-models/knn-classifier</code></td>
  </tr>
  <tr>
    <td><a href="./knn-classifier/demo">source</a></td>
  </tr>
</table>

## Development

You can run the unit tests for any of the models by running the following
inside a directory:

`yarn test`

New models should have a test NPM script (see [this](./mobilenet/package.json) `package.json` and `run_tests.ts` [helper](./mobilenet/run_tests.ts) for reference).

To run all of the tests, you can run the following command from the root of this
repo:

`yarn presubmit`
