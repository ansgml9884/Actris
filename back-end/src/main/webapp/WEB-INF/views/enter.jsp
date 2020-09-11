<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="enter.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>

<body>
  <video id="bgvideo" muted autoplay loop>
    <source src="videos/Fireworks.mp4" type="video/mp4">
  </video>
  <audio id="my_audio" autoplay>
    <source src="music/bgm_enter_FirecrackSoundEffect.mp3" type="audio/mp3">
  </audio>
   <audio id='donesound' src="music/bgm_done_BtnSoundEffect.mp3"></audio>
  <h2 id="congrats">CONGRATURATION !</h2>
  <!-- Ranking 추가 -->
  <div id="addRanking">
  <div class="enter" >
    <table class="scoreinputs">
      <tr>
        <th class="inputconts">SCORE</th>
        <th>${param.score}</th>
      </tr>
      <tr>
        <th class="inputconts">NAME</th>
        <th><input class="inputconts" type="text" v-model="name" placeholder="Enter your name"
        			maxlength="7" oninput="numberMaxLength(this)"></input></th>
      </tr>
      <tr>
        <th class="inputconts">COMMENT</th>
        <th><input class="inputconts" type="text" v-model="note" placeholder="Leave your comment" 
        			maxlength="14" oninput="numberMaxLength(this)"></input></th>
      </tr>
    </table>
    <br> <button class="done" onmouseenter="donesound()" v-on:click="insert('${param.record}',${param.score})" >DONE</button>
  </div>
  <footer>
	<img id="crown" src="images/crown.png" />
	<div id="top3">- TOP3 -</div>
		<table id="top3table" cellspacing="30" cellpadding="5">
			<tr id="tableRow" v-for="(ranking,index) in rankings" v-bind:key="ranking.id">
				<td class="rank">{{order[index]}}</td>
				<td class="rankconts">{{ranking.score}}</td>
				<td class="rankconts">{{ranking.name}}</td>
			</tr>
		</table>
	</footer>
  </div>
</body>

<script type="text/javascript">
	function donesound() {
    let audio = document.getElementById("donesound");
    audio.play();
    audio.volume = 0.6;
}
    setTimeout(function(){
      document.getElementById("my_audio").play();
    }, 1000)
    
       //뒤로가기 막기
       history.pushState(null, null, location.href);
       window.onpopstate = function () {
         history.go(1);
        };
    
    function numberMaxLength(e){
        if(e.value.length > e.maxLength){
            e.value = e.value.slice(0, e.maxLength);
        }
    }
    
</script>
<script>
    new Vue({
        el : "#addRanking",
        data : {
            rankings: null,
            order : ["1ST", "2ND", "3RD"],
            name: "",
            note: "",
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
            	axios.post('http://127.0.0.1:80/rankings', { 
                    headers: {
                        'Content-type': 'application/json'
                    },
                    record : record,
                    ranking : JSON.stringify({
               			"name" : this.name,
               			"score" : score,
                    	"note" : this.note
                    })
                })
                .then(response => {
                	location.href="http://127.0.0.1:1234/ranking.html"
                })
                .catch(error => console.log(error));
            }
        }
    });
</script>
</html>