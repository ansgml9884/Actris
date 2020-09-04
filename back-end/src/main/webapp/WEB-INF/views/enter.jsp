<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="enter.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <audio autoplay id="myaudio">
    <source src="music/bgm_enter_Firecrack Sound Effect.mp3" type="audio/mp3">
  </audio>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>  
</head>
<body>
  <div id="addRanking">
  <div class="jb-box">
    <video muted autoplay loop>
      <source src="videos/Fireworks.mp4" type="video/mp4">
    </video>
  </div>

  <div class="head">
    <h1>HIGH SCORE</h1>
    <h3>123124</h3>
  </div>

  <div class="enter" >
    <h2> CONGRATURATION !</h2>

      <table class="tg1">
        <thead>
          <tr>
            <th class="text1">SCORE</th>
            <th class="score">${param.score}</th>
          </tr>
        </thead>
      </table>
      <table class="tg2">
        <thead>
          <tr>
            <th>NAME</th>
            <th><input id="name" type="text" v-model="name" placeholder="Enter your name"></input></th>
          </tr>
        </thead>
      </table>
      <table class="tg3">
        <thead>
          <tr>
            <th class="comment">COMMENT</th>
            <th><input id="comment" type="text" v-model="note" placeholder="Leave your comment"></input></th>
          </tr>
        </thead>
      </table>
   <br> <button class="done" v-on:click="insert(${param.record},${param.score})" >DONE</button>
  </div>

<footer class="top">
  <img class=img1 src="images/crown.png"/>
  <h2>-  TOP3  -</h2>
  <table class="toptable">
    <thead>
      <tr>
        <th></th>
        <th class="text4">SCORE</th>
        <th class="text5">NAME</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(ranking,index) in rankings" v-bind:key="ranking.id">
        <td class="rank">{{order[index]}}</td>
        <td class="rankScore">{{ranking.score}}</td>
        <td class="rankName">{{ranking.name}}</td>
      </tr>
    </tbody>
    </table>

</footer>
</div>
</body>
<script>
    new Vue({
        el : "#addRanking",
        data : {
            rankings: null,
            ranking : null,
            order : ["1ST", "2ND", "3RD"],
            name: "",
            note: "",
            replay : null
        },
        created : function() {
          axios.get('http://127.0.0.1:80/rankings/0')
                .then(response => {
                   this.rankings = response.data;
                   this.rankings.splice(3);
               })
               .catch(error => console.log(error));
        },
        methods : {
            insert: function(record, score) {
                axios.post('http://127.0.0.1:80/replay', { 
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    record : record
                })
                .then(response => {
                    this.replay = response.data;
                    axios.post('http://127.0.0.1:80/rankings', { 
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                       	name : this.name,
    					score : score,
                        note : this.note,
                        replay_id : this.replay.id
                    })
                    .then(response => {
                        this.ranking = response.data;
                        location.href="http://127.0.0.1:1234/ranking.html"
                    })
                    .catch(error => console.log(error));
                })
                .catch(error => console.log(error));

            }
        }
    });
    </script>
</html>