import Swal from 'sweetalert2';


//canvas
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

//BOARD
const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 22;

const VIRTUAL_WIDTH = 12;
const VIRTUAL_HEIGHT = 3;

const BOARD_MARGIN_LEFT = 120;
const BOARD_MARGIN_TOP = 70;

//BLOCK
const BLOCK_SIZE = 25;

//SHAPE
const NUM_OF_PAT = 7;   //PAT = PATTERN
const SHAPE = [
	//ㅣ
	[
		[{x:-1, y:0}, {x:0, y:0}, {x:1, y:0}, {x:2, y:0}],
		[{x:1, y:-1}, {x:1, y:0}, {x:1, y:1}, {x:1, y:2}],
		[{x:-1, y:1}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}],
		[{x:0, y:-1}, {x:0, y:0}, {x:0, y:1}, {x:0, y:2}]
	],
	//ㅁ
	[
		[{x:0, y:-1}, {x:1, y:-1}, {x:0, y:0}, {x:1, y:0}],
		[{x:0, y:-1}, {x:1, y:-1}, {x:0, y:0}, {x:1, y:0}],
		[{x:0, y:-1}, {x:1, y:-1}, {x:0, y:0}, {x:1, y:0}],
		[{x:0, y:-1}, {x:1, y:-1}, {x:0, y:0}, {x:1, y:0}]
	],
	//ㅗ
	[
		[{x:-1, y:0}, {x:0, y:0}, {x:1, y:0}, {x:0, y:-1}],
		[{x:0, y:-1}, {x:0, y:0}, {x:0, y:1}, {x:1, y:0}],
		[{x:-1, y:0}, {x:0, y:0}, {x:1, y:0}, {x:0, y:1}],
		[{x:-1, y:0}, {x:0, y:-1}, {x:0, y:0}, {x:0, y:1}]
	],
	//ㄹ
	[
		[{x:-1, y:-1}, {x:0, y:-1}, {x:0, y:0}, {x:1, y:0}],
		[{x:1, y:-1}, {x:1, y:0}, {x:0, y:0}, {x:0, y:1}],
		[{x:-1, y:0}, {x:0, y:0}, {x:0, y:1}, {x:1, y:1}],
		[{x:0, y:-1}, {x:0, y:0}, {x:-1, y:0}, {x:-1, y:1}]
	],
	//ㄹ반대
	[
		[{x:1, y:-1}, {x:0, y:-1}, {x:0, y:0}, {x:-1, y:0}],
		[{x:0, y:-1}, {x:0, y:0}, {x:1, y:0}, {x:1, y:1}],
		[{x:1, y:0}, {x:0, y:0}, {x:0, y:1}, {x:-1, y:1}],
		[{x:-1, y:-1}, {x:-1, y:0}, {x:0, y:0}, {x:0, y:1}]
	],
	//ㄴ
	[
		[{x:-1, y:-1}, {x:-1, y:0}, {x:0, y:0}, {x:1, y:0}],
		[{x:1, y:-1}, {x:0, y:-1}, {x:0, y:0}, {x:0, y:1}],
		[{x:-1, y:0}, {x:0, y:0}, {x:1, y:0}, {x:1, y:1}],
		[{x:0, y:-1}, {x:0, y:0}, {x:0, y:1}, {x:-1, y:1}],
	],
	//ㄴ반대
	[
		[{x:1, y:-1}, {x:1, y:0}, {x:0, y:0}, {x:-1, y:0}],
		[{x:0, y:-1}, {x:0, y:0}, {x:0, y:1}, {x:1, y:1}],
		[{x:1, y:0}, {x:0, y:0}, {x:-1, y:0}, {x:-1, y:1}],
		[{x:-1, y:-1}, {x:0, y:-1}, {x:0, y:0}, {x:0, y:1}]
	]
];

//data
const BLANK = 1;
const WALL = 2;
const CEILING = 3;
const BLOCK = 0;    //5로 나누어 떨어지면 BLOCK이다.
const STICK = 5;    //ㅣ
const BOX = 10;     //ㅁ
const HAT = 15;     //ㅗ
const LCLIP = 20;   //ㄹ
const RCLIP = 25;   //ㄹ반대
const LCHAIR = 30;  //ㄴ
const RCHAIR = 35;  //ㄴ반대

//game level
const MAX_WAIT = [75, 64, 54, 45, 37, 30, 24, 19, 15, 12, 9, 6, 3, 1, 0];   //레벨별 하강 속도
const MAX_SURVIVAL = 75;    //충돌 후 생존시간

//key value
const MOVE_RIGHT = 1;
const MOVE_LEFT = 2;
const ROTATE_RIGHT = 4;
const ROTATE_LEFT = 8;
const DROP_IMMEDIATELY = 16;
const DROP_FAST = 32;
const HOLD = 64;


//AI score criterion------------------------------
//제거 가능한 라인에 대한 가치 기준
const AI_CLEAR = 9;

//주변 요소들과의 밀착도에 대한 가치 기준
const AI_BLOCK_ADHESION = 4;
const AI_WALL_ADHESION = 3;
const AI_BOTTOM_ADHESION = 5;

//전체적인 풍경 형태에 대한 가치 기준
const AI_CUMULATION = -5;
const AI_BLANK = -10;
const AI_ROOF = -1;

let BasisForJudge = function() {
    this.method = 0;

    this.clears = 0;

    this.blockAdhesion = 0;
    this.wallAdhesion = 0;
    this.bottomAdhesion = 0;

    this.cumulations = 0;
    this.blanks = 0;
    this.roofs = 0;

    this.judgeScore = 0;

    this.makeJudgeScore = function() {
        this.judgeScore = this.clears;

        this.judgeScore += this.blockAdhesion;
        this.judgeScore += this.wallAdhesion;
        this.judgeScore += this.bottomAdhesion;

        this.judgeScore += this.cumulations;
        this.judgeScore += this.blanks;
        this.judgeScore += this.roofs;
    }
}
//------------------------------------------------


//실제 게임 판
let data = [];
for (let y = 0; y < BOARD_HEIGHT; y++) {
    data[y] = [];
    for (let x = 0; x < BOARD_WIDTH; x++) {
        if (x == 0 || x == BOARD_WIDTH - 1 || y == BOARD_HEIGHT - 1) {
            data[y][x] = WALL;
        }
        else if (y == 0) {
            data[y][x] = CEILING;
        }
        else {
            data[y][x] = BLANK;
        }
    }
}
//보조 게임 판
let virData = [];   //vir = virtual
for (let y = 0; y < VIRTUAL_HEIGHT; y++) {
    virData[y] = [];
    for (let x = 0; x < VIRTUAL_WIDTH; x++) {
        if (x == 0 || x == VIRTUAL_WIDTH - 1) {
            virData[y][x] = WALL;
        }
        else {
            virData[y][x] = BLANK;
        }
    }
}

//각종 게임 정보들
let nextPatIndex = [];
for (let i = 0; i < 3; i++) {
    nextPatIndex[i] = Math.floor(Math.random() * NUM_OF_PAT);
}

let level = 1;
let goal = 10;
let score = 0;

let mine = {
    x: 5,
    y: 1,
    dir: 0,
    patIndex: Math.floor(Math.random() * NUM_OF_PAT),

    wait: MAX_WAIT[level - 1],
    survival: MAX_SURVIVAL
}

let holdFlag = 0;
let holdPatIndex = -1;


//AI Brain----------------------------------------------
const Brain = function() {
    this.basisForJudges = [];
    for (let i = 0; i < 40; i++) {
        this.basisForJudges.push(new BasisForJudge());
    }

    this.initBasisForJudges = function() {
        for (let i = 0; i < 40; i++) {
            this.basisForJudges[i].method = 0;
            
            this.basisForJudges[i].clears = 0;

            this.basisForJudges[i].blockAdhesion = 0;
            this.basisForJudges[i].wallAdhesion = 0;
            this.basisForJudges[i].bottomAdhesion = 0;

            this.basisForJudges[i].cumulations = 0;
            this.basisForJudges[i].blanks = 0;
            this.basisForJudges[i].roofs = 0;

            this.basisForJudges[i].judgeScore = 0;
        }
    }

    //thinking data
    this.data = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        this.data[y] = [];
        for (let x = 0; x < BOARD_WIDTH; x++) {
            this.data[y][x] = data[y][x];
        }
    }
    //thinking virtual data
    this.virData = [];
    for (let y = 0; y < VIRTUAL_HEIGHT; y++) {
        this.virData[y] = [];
        for (let x = 0; x < VIRTUAL_WIDTH; x++) {
            this.virData[y][x] = virData[y][x];
        }
    }
    this.copyDataFromGameData = function() {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            this.data[y] = data[y].slice();
        }
        for (let y = 0; y < VIRTUAL_HEIGHT; y++) {
            this.virData[y] = virData[y].slice();
        }
    }

    this.judge = 0;
    this.method = 0;
    this.problem = true;

    this.x = mine.x;
    this.y = mine.y;
    this.dir = mine.dir;

    //내부 재정의 함수들-------------------------------------------
    this.canMove = function(dx, dy, dir, patIndex) {
        for (let i = 0; i < 4; i++) {
            let x = dx + SHAPE[patIndex][dir][i].x;
            let y = dy + SHAPE[patIndex][dir][i].y;
    
            if (0 < y) {
                if (this.data[y][x] != BLANK) {
                    return false;
                }
            }
            else if (this.virData[Math.abs(y)][x] != BLANK) {
                return false;
            }
        }
        return true;
    }

    this.downBlock = function(y) {
        for (; -(VIRTUAL_HEIGHT - 1) <= y; y--) {
            for (let x = 1; x < BOARD_WIDTH - 1; x++) {
                if (-(VIRTUAL_HEIGHT - 1) == y) {
                    this.virData[Math.abs(y)][x] = BLANK;
                }
                else if (1 < y) {
                    this.data[y][x] = this.data[y - 1][x];
                }
                else if (y == 1) {
                    this.data[1][x] = this.virData[0][x];
                }
                else {
                    this.virData[Math.abs(y)][x] = this.virData[Math.abs(y) + 1][x];
                }
            }
        }
    }

    this.checkSameBlock = function() {
        let clearLine = 0;

        for (let y = BOARD_HEIGHT - 2; 0 < y; y--) {
            let same = true;

            for (let x = 1; x < BOARD_WIDTH - 1; x++) {
                if (this.data[y][x] % 5 != BLOCK) {
                    same = false;
                    break;
                }
            }

            if (same) {
                this.downBlock(y);
                clearLine++;

                y++;
            }
        }

        return clearLine;
    }

    this.moveToRight = function(patIndex) {
        if (this.canMove(this.x + 1, this.y, this.dir, patIndex)) {
            this.x++;    
            return true;
        }
        return false;
    }
    this.moveToLeft = function(patIndex) {
        if (this.canMove(this.x - 1, this.y, this.dir, patIndex)) {
            this.x--;    
            return true;
        }
        return false;
    }
    this.moveToDown = function(patIndex) {
        if (this.canMove(this.x, this.y + 1, this.dir, patIndex)) {
            this.y++;
            return true;
        }
        return false;
    }
    this.moveToEnd = function(patIndex) {
        while (true) {
            if (this.moveToDown(patIndex) == false) {
                this.basisForJudges[this.judge].method |= this.x;
                this.basisForJudges[this.judge].method <<= 2;
                this.basisForJudges[this.judge].method |= this.dir;

                break;
            }
        }
    }

    this.copyMineToData = function(patIndex) {
        for (let i = 0; i < 4; i++) {
            let x = this.x + SHAPE[patIndex][this.dir][i].x;
            let y = this.y + SHAPE[patIndex][this.dir][i].y;
    
            if (0 < y) {
                this.data[y][x] = (patIndex + 1) * 5;
            }
            else {
                this.virData[Math.abs(y)][x] = (patIndex + 1) * 5;
            }
        }
    }
    //------------------------------------------------------------
}
const brain = new Brain();
//-----------------------------------------------------


//event
let leftPressed = false;
let upPressed = false;
let rightPressed = false;
let downPressed = false;

let spacePressed = false;
let fPressed = false;
let dPressed = false;

let pause = false;
let startLock = true; //5초 뒤 false;
let startTimer = 5;

function executeAction(action) {
    switch(action) {
    case "moveRight":
        rightPressed = true;
        break;
    case "moveLeft":
        leftPressed = true;
        break;
    case "rotateRight":
        upPressed = true;
        break;
    case "rotateLeft":
        downPressed = true;
        break;
    case "drop":
        spacePressed = true;
        break;
    case "fastDown":
        fPressed = true;
        break;
    case "hold":
        dPressed = true;
        break;
    case "pause":
        pause = true;
        break;
    }
}
function completeAction(action) {
    switch(action) {
    case "moveRight":
        rightPressed = false;
        break;
    case "moveLeft":
        leftPressed = false;
        break;
    case "rotateRight":
        upPressed = false;
        break;
    case "rotateLeft":
        downPressed = false;
        break;
    case "drop":
        spacePressed = false;
        break;
    case "fastDown":
        fPressed = false;
        break;
    case "hold":
        dPressed = false;
        break;
    case "pause":
        pause = false;
        break;
    }
}

//키감 조절기
let KeyInfo = function(key, hesitate, delay, press) {
    this.key = key;
    this.hesitate = hesitate;
    this.delay = delay;
    this.press = press;
}
let keySet = [];
function checkKeyPressed(key) {
    switch (key) {
    case MOVE_RIGHT:
        if (rightPressed) {
            return true;
        }
        break;
    case MOVE_LEFT:
        if (leftPressed) {
            return true;
        }
        break;
    case ROTATE_RIGHT:
        if (upPressed) {
            return true;
        }
        break;
    case ROTATE_LEFT:
        if (downPressed) {
            return true;
        }
        break;
    case DROP_IMMEDIATELY:
        if (spacePressed) {
            return true;
        }
        break;
    case DROP_FAST:
        if (fPressed) {
            return true;
        }
        break;
    case HOLD:
        if (dPressed) {
            return true;
        }
        break;
    }

    return false;
}
function controllKey(key, hesitateToChainMove, eachDelayDuringChainMove) {
    let info = null;
    for (let i = 0; i < keySet.length; i++) {
        if (key == keySet[i].key) {
            info = keySet[i];
            break;
        }
    }
    if (info == null) {
        info = new KeyInfo(key, hesitateToChainMove, 0, false);
        keySet.push(info);
    }

    if (checkKeyPressed(key)) {
        if (info.press) {
            if (0 < info.hesitate) {
                info.hesitate--;
            }
            else if (0 < info.delay) {
                info.delay--;
            }
            else {
                info.delay = eachDelayDuringChainMove;
                return true;
            }
        }
        else {
            info.press = true;
            return true;
        }
    }
    else if (info.press) {
        info.press = false;
        info.hesitate = hesitateToChainMove;
    }

    return false;
}

//키 이벤트 처리기
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 38) {
        upPressed = true;
    }
    else if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
    else if (e.keyCode == 32) {
        spacePressed = true;
    }
    else if (e.keyCode == 70) {
        fPressed = true;
    }
    else if (e.keyCode == 68) {
        dPressed = true;
    }
    else if (e.keyCode == 27) {
        pause = !pause;
    }
});
document.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
    else if (e.keyCode == 32) {
        spacePressed = false;
    }
    else if (e.keyCode == 70) {
        fPressed = false;
    }
    else if (e.keyCode == 68) {
        dPressed = false;
    }
});

document.getElementById("pauseBtn").onclick = function() {
    pause = !pause;
}

function showTimer(){
    startTimer--;
    if(startTimer < 0){
        startLock = false;
        clearInterval(startInterval);
        completeAction("pause");
    }
}
var startInterval = setInterval(showTimer, 1000);

//게임 시작
let gameOver = false;
let gameInterval = null;

executeAction("pause");
draw();
gameInterval = setInterval(playGame, 25);


function getNewBlock() {
    mine.x = 5;
    mine.y = 1;
    mine.dir = 0;
    mine.patIndex = nextPatIndex[0];
    for (let i = 0; i < 2; i++) {
        nextPatIndex[i] = nextPatIndex[i + 1];
    }
    nextPatIndex[2] = Math.floor(Math.random() * NUM_OF_PAT);

    holdFlag = 0;
    mine.survival = MAX_SURVIVAL;

    return canMove(mine.x, mine.y, mine.dir);
}

function moveToDown(increaseScore) {
    if (canMove(mine.x, mine.y + 1, mine.dir)) {
        mine.y++;

        if (increaseScore) {
            score += 1;
        }

        return true;
    }

    return false;
}

function canMove(dx, dy, dir) { //d = destination
    for (let i = 0; i < 4; i++) {
        let x = dx + SHAPE[mine.patIndex][dir][i].x;
        let y = dy + SHAPE[mine.patIndex][dir][i].y;

        if (0 < y) {
            if (data[y][x] != BLANK) {
                return false;
            }
        }
        else if (virData[Math.abs(y)][x] != BLANK) {
            return false;
        }
    }

    return true;
}

function copyMineToData() {
    for (let i = 0; i < 4; i++) {
        let x = mine.x + SHAPE[mine.patIndex][mine.dir][i].x;
        let y = mine.y + SHAPE[mine.patIndex][mine.dir][i].y;

        if (0 < y) {
            data[y][x] = (mine.patIndex + 1) * 5;
        }
        else {
            virData[Math.abs(y)][x] = (mine.patIndex + 1) * 5;
        }
    }
}

function downBlock(y) {
    for (; -(VIRTUAL_HEIGHT - 1) <= y; y--) {
        for (let x = 1; x < BOARD_WIDTH - 1; x++) {
            if (-(VIRTUAL_HEIGHT - 1) == y) {
                virData[Math.abs(y)][x] = BLANK;
            }
            else if (1 < y) {
                data[y][x] = data[y - 1][x];
            }
            else if (y == 1) {
                data[1][x] = virData[0][x];
            }
            else {
                virData[Math.abs(y)][x] = virData[Math.abs(y) + 1][x];
            }
        }
    }
}

function checkSameBlock() {
    let clearLine = 0;

    for (let y = BOARD_HEIGHT - 2; 0 < y; y--) {
        let same = true;

        for (let x = 1; x < BOARD_WIDTH - 1; x++) {
            if (data[y][x] % 5 != BLOCK) {
                same = false;
                break;
            }
        }

        if (same) {
            downBlock(y);
            clearLine++;

            y++;
        }
    }

    return clearLine;
}

function removeCompleteLine() {
    let removeLine = checkSameBlock();

    switch (removeLine) {
    case 1:
        score += 100 * level;
        break;
    case 2:
        score += 300 * level;
        break;
    case 3:
        score += 500 * level;
        break;
    case 4:
        score += 800 * level;
        break;
    }

    goal -= removeLine;

    if (goal <= 0) {
        if (level == 15) {
            return false;
        }
        else {
            level++;
            goal += 10;
        }
    }

    return true;
}

function goToWork() {
    if (canMove(mine.x, mine.y + 1, mine.dir)) {
        if (mine.wait != 0) {
            mine.wait--;
        }
        else {
            moveToDown(false);
            mine.wait = MAX_WAIT[level - 1];
        }
    }
    else if (0 < mine.survival) {
        mine.survival--;
    }
    else {
        copyMineToData();
        if (removeCompleteLine() == false) {
            return false;
        }

        if (getNewBlock() == false) {
            return false;
        }
    }

    return true;
}

function moveToRight() {
    if (canMove(mine.x + 1, mine.y, mine.dir)) {
        mine.x++;
        mine.survival = MAX_SURVIVAL;

        return true;
    }

    return false;
}

function moveToLeft() {
    if (canMove(mine.x - 1, mine.y, mine.dir)) {
        mine.x--;
        mine.survival = MAX_SURVIVAL;

        return true;
    }

    return false;
}

function canRotate(dir) {
    if (canMove(mine.x, mine.y, dir)) {
        return true;
    }

    let x = mine.x;
    let y = mine.y;

    if (mine.patIndex == 0) {
        for (let i = 0; i < 4; i++) {
            if (i == 2) {
                x = mine.x;
                y = mine.y;
            }

            if (i < 2) {
                if (dir % 2 == 0) {
                    x++;
                }
                else {
                    y++;
                }
            }
            else {
                if (dir % 2 == 0) {
                    x--;
                }
                else {
                    y--;
                }
            }

            if (canMove(x, y, dir)) {
                mine.x = x;
                mine.y = y;

                return true;
            }
        }
    }
    else {
        switch (mine.dir) {
        case 0:
            y--;
            break;
        case 1:
            x++;
            break;
        case 2:
            y++;
            break;
        case 3:
            x--;
            break;
        }

        if (canMove(x, y, dir)) {
            mine.x = x;
            mine.y = y;

            return true;
        }
    }

    return false;
}

function rotateRight() {
    let dir = (mine.dir + 1) % 4;

    if (canRotate(dir)) {
        mine.dir = dir;
        mine.survival = MAX_SURVIVAL;

        return true;
    }

    return false;
}

function rotateLeft() {
    let dir = (mine.dir + 3) % 4;

    if (canRotate(dir)) {
        mine.dir = dir;
        mine.survival = MAX_SURVIVAL;

        return true;
    }

    return false;
}

function holdThisBlock() {
    if (holdFlag == 1) {
        return true;
    }

    let tempPatIndex = holdPatIndex;
    holdPatIndex = mine.patIndex;

    if (tempPatIndex == -1) {
        getNewBlock();
    }
    else {
        mine.patIndex = tempPatIndex;
        mine.x = 5;
        mine.y = 1;
        mine.dir = 0;

        if (canMove(mine.x, mine.y, mine.dir) == false) {
            return false;
        }
    }
    mine.survival = MAX_SURVIVAL;
    holdFlag = 1;

    return true;
}

function moveToEnd() {
    while (true) {
        if (moveToDown(false) == false) {
            copyMineToData();
            if (removeCompleteLine() == false) {
                return false;
            }

            break;
        }
        else {
            score += 2;
        }
    }

    return getNewBlock();
}

function manipulate() {
    if (brain.method == -1) {
        brain.problem = true;
        return true;
    }
    if ((brain.method & HOLD) == HOLD) {
        if (!holdThisBlock()) {
            return false;
        }
    }

    //destination direction
    const dDir = (brain.method & 3);
    if (dDir != mine.dir) {
        if (dDir == 3) {
            rotateLeft();
        }
        else {
            rotateRight();
        }
    }

    //destination x
    const dX = (brain.method >> 2) & 15;
    if (mine.x < dX) {
        moveToRight();
    }
    else if (dX < mine.x) {
        moveToLeft();
    }
    else if (dDir == mine.dir) {
        if (!moveToEnd()) {
            return false;
        }

        brain.problem = true;
    }

    return true;
}


function scanHorizontalExtent(patIndex) {
    let xLCut = brain.x;
    let xRCut = brain.x;

    while (true) {
        if (brain.moveToLeft(patIndex) == false) {
            break;
        }
        xLCut--;
    }
    brain.x = 5;

    while (true) {
        if (brain.moveToRight(patIndex) == false) {
            break;
        }
        xRCut++;
    }
    brain.x = 5;

    return [xLCut, xRCut];
}

function scanVerticalExtent(yCut) {
    for (let x = 1; x < BOARD_WIDTH - 1; x++) {
        for (yCut[x] = -(VIRTUAL_HEIGHT - 1); yCut[x] < (BOARD_HEIGHT - 1); yCut[x]++) {
            if (0 < yCut[x]) {
                if (brain.data[yCut[x]][x] != BLANK) {
                    break;
                }
            }
            else if (brain.virData[Math.abs(yCut[x])][x] != BLANK) {
                break;
            }
        }
    }
}

function feelSurround(patIndex) {
    let Point = function(x, y) {
        this.x = x;
        this.y = y;
    }
    let checkedPoints = [];

    for (let i = 0; i < 4; i++) {
        let x = brain.x + SHAPE[patIndex][brain.dir][i].x;
        let y = brain.y + SHAPE[patIndex][brain.dir][i].y;

        for (let j = 0; j < 4; j++) {
            let tempX;
            let tempY;

            if (j == 0) {
                tempX = x - 1;
            }
            else if (j == 1) {
                tempX = x + 1;
            }
            else {
                tempX = x;
            }

            if (j == 2) {
                tempY = y - 1;
            }
            else if (j == 3) {
                tempY = y + 1;
            }
            else {
                tempY = y;
            }

            if (checkedPoints.length != 0) {
                let samePoint = false;

                for (let k = 0; k < checkedPoints.length; k++) {
                    if (brain.x == checkedPoints[k].x && brain.y == checkedPoints[k].y) {
                        samePoint = true;
                        break;
                    }
                }

                if (samePoint) {
                    continue;
                }
            }

            checkedPoints.push(new Point(tempX, tempY));

            if (0 < tempY) {
                if (brain.data[tempY][tempX] % 5 == BLOCK) {
                    brain.basisForJudges[brain.judge].blockAdhesion++;
                }
                else if (tempX == 0 || tempX == BOARD_WIDTH - 1) {
                    brain.basisForJudges[brain.judge].wallAdhesion++;
                }
                else if (tempY == BOARD_HEIGHT - 1) {
                    brain.basisForJudges[brain.judge].bottomAdhesion++;
                }
            }
            else if (brain.data[Math.abs(tempY)][tempX] % 5 == BLOCK) {
                brain.basisForJudges[brain.judge].blockAdhesion++;
            }
            else if (tempX == 0 || tempX == BOARD_WIDTH - 1) {
                brain.basisForJudges[brain.judge].wallAdhesion++;
            }
        }
    }
    
    brain.basisForJudges[brain.judge].blockAdhesion *= AI_BLOCK_ADHESION;
    brain.basisForJudges[brain.judge].blockAdhesion *= AI_WALL_ADHESION;
    brain.basisForJudges[brain.judge].blockAdhesion *= AI_BOTTOM_ADHESION;
}

function countRoof(yCut, x, y) {
    for (y = y - 1; yCut < y; y--) {
        if (0 < y) {
            if (brain.data[y][x] == BLANK) {
                break;
            }
            else {
                brain.basisForJudges[brain.judge].roofs++;
            }
        }
        else if (brain.virData[Math.abs(y)][x] == BLANK) {
            break;
        }
        else {
            brain.basisForJudges[brain.judge].roofs++;
        }
    }
}

function feelLandScape(yCut) {
    let mostHeight = yCut[1];
    for (let i = 1; i < BOARD_WIDTH - 1; i++) {
        if (yCut[i] < mostHeight) {
            mostHeight = yCut[i];
        }
    }

    let floor = 1;
    for (let y = BOARD_HEIGHT - 2; mostHeight <= y; y--) {
        for (let x = 1; x < BOARD_WIDTH - 1; x++) {
            if (y < yCut[x]) {
                continue;
            }

            if (0 < y) {
                if (brain.data[y][x] == BLANK) {
                    brain.basisForJudges[brain.judge].blanks++;
                    countRoof(yCut[x], x, y);
                }
                else {
                    brain.basisForJudges[brain.judge].cumulations += floor;
                }
            }
            else {
                if (brain.virData[Math.abs(y)][x] == BLANK) {
                    brain.basisForJudges[brain.judge].blanks++;
                    countRoof(yCut[x], x, y);
                }
                else {
                    brain.basisForJudges[brain.judge].cumulations += floor;
                }
            }
        }

        floor++;
    }

    brain.basisForJudges[brain.judge].cumulations *= AI_CUMULATION;
    brain.basisForJudges[brain.judge].blanks *= AI_BLANK;
    brain.basisForJudges[brain.judge].roofs *= AI_ROOF;
}

function feel(patIndex) {
    feelSurround(patIndex);

    brain.copyMineToData(patIndex);
    brain.basisForJudges[brain.judge].clears = brain.checkSameBlock() * AI_CLEAR;

    let yCut = [];
    scanVerticalExtent(yCut);
    feelLandScape(yCut);

    brain.makeJudgeScore();
    brain.judge++;
}

function getTopBasisForJudge() {
    let topScore = 0;
    for (let i = 1; i < brain.judge; i++) {
        if (brain.basisForJudges[topScore].judgeScore < brain.basisForJudges[i].judgeScore) {
            topScore = i;
        }
    }
    return brain.basisForJudges[topScore];
}

function think() {
    if (brain.problem == false) {
        return;
    }
    if (holdPatIndex == -1) {
        brain.method = -1;
        return;
    }

    let equal = false;
    if (holdPatIndex == mine.patIndex) {
        equal = true;
    }

    let topBasisForJudges = [];
    let patIndex;

    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            patIndex = mine.patIndex;
        }
        else {
            patIndex = holdPatIndex;
        }

        brain.initBasisForJudges();
        brain.judge = 0;

        for (brain.dir = 0; brain.dir < 4; brain.dir++) {
            brain.x = 5;
            brain.y = 1;

            let [xLCut, xRCut] = scanHorizontalExtent(patIndex);

            for (let x = xLCut; x <= xRCut; x++) {
                brain.copyDataFromGameData();

                brain.x = x;
                brain.y = 1;

                brain.moveToEnd(patIndex);

                feel(patIndex);
            }
        }

        topBasisForJudges[i] = getTopBasisForJudge();
        if (equal || holdFlag == 1) {
            break;
        }
    }

    brain.method = 0;
    if (equal || holdFlag == 1) {
        brain.method |= topBasisForJudges[0].method;
    }
    else {
        if (topBasisForJudges[0].judgeScore < topBasisForJudges[1].judgeScore) {
            brain.method |= HOLD;
            brain.method |= topBasisForJudges[1].method;
        }
    }

    brain.problem = false;
}


function playGame() {
    if (pause) {
        return;
    }
    if (gameOver) {
        clearInterval(gameInterval);
        return;
    }
    
    if (!manipulate()) {
        gameOver = true;
    }
    if (!goToWork()) {
        gameOver = true;
    }
}


function drawRect(xpos, ypos, what) {
    ctx.beginPath();

    switch (what) {
    case BLANK:
        ctx.fillStyle = "#C8C8C8";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case WALL:
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case CEILING:
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FF0000";
        break;
    case STICK:
        ctx.fillStyle = "#00D8FF";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case BOX:
        ctx.fillStyle = "#FFE400";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case HAT:
        ctx.fillStyle = "#660058";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case LCLIP:
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case RCLIP:
        ctx.fillStyle = "#1DDB16";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case LCHAIR:
        ctx.fillStyle = "#0000FF";
        ctx.strokeStyle = "#FFFFFF";
        break;
    case RCHAIR:
        ctx.fillStyle = "#FF8224";
        ctx.strokeStyle = "#FFFFFF";
        break;
    }

    ctx.rect(xpos, ypos, BLOCK_SIZE, BLOCK_SIZE);
    ctx.stroke();

    ctx.fill();
    ctx.closePath();
}

function drawText(text, fontSize, fontColor, x, y, align) {
    ctx.font = fontSize;
    ctx.textAlign = align;
    ctx.fillStyle = fontColor;
    ctx.fillText(text, x, y);
}

function drawData() {
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            let xpos = BOARD_MARGIN_LEFT + (x * BLOCK_SIZE);
            let ypos = BOARD_MARGIN_TOP + (y * BLOCK_SIZE);
            
            drawRect(xpos, ypos, data[y][x]);
        }
    }
}

function drawMine() {
    for (let i = 0; i < 4; i++) {
        let x = mine.x + SHAPE[mine.patIndex][mine.dir][i].x;
        let y = mine.y + SHAPE[mine.patIndex][mine.dir][i].y;

        if (y <= 0) {
            continue;
        }

        let xpos = BOARD_MARGIN_LEFT + (x * BLOCK_SIZE);
        let ypos = BOARD_MARGIN_TOP + (y * BLOCK_SIZE);

        let what = (mine.patIndex + 1) * 5;
        drawRect(xpos, ypos, what);
    }
}

function drawNext() {
    drawText("Next", "40px Arial", "#C4B73B", BOARD_MARGIN_LEFT + 360, BOARD_MARGIN_TOP + 30, "center");
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 4; i++) {
            let x = (BOARD_WIDTH + 2) + SHAPE[nextPatIndex[j]][0][i].x;
            let y = (3 + (3 * j)) + SHAPE[nextPatIndex[j]][0][i].y;

            let xpos = BOARD_MARGIN_LEFT + (x * BLOCK_SIZE);
            let ypos = BOARD_MARGIN_TOP + (y * BLOCK_SIZE);

            let what = (nextPatIndex[j] + 1) * 5;
            drawRect(xpos, ypos, what);
        }
    }
}

function drawHold() {
    drawText("Hold", "40px Arial", "#C4B73B", BOARD_MARGIN_LEFT - 60, BOARD_MARGIN_TOP + 30, "center");
    if (holdPatIndex != -1) {
        for (let i = 0; i < 4; i++) {
            let x = -3 + SHAPE[holdPatIndex][0][i].x;
            let y = 3 + SHAPE[holdPatIndex][0][i].y;

            let xpos = BOARD_MARGIN_LEFT + (x * BLOCK_SIZE);
            let ypos = BOARD_MARGIN_TOP + (y * BLOCK_SIZE);

            let what = (holdPatIndex + 1) * 5;
            drawRect(xpos, ypos, what);
        }
    }
}

function drawInfo() {
    drawNext();
    drawHold();    

    //점수
    drawText(score, "55px Arial", "#FF9600", BOARD_MARGIN_LEFT + 300, BOARD_MARGIN_TOP - 10, "right");

    //목표 제거 라인 갯수
    drawText("Goal", "40px Arial", "#C4B73B", BOARD_MARGIN_LEFT + 360, BOARD_MARGIN_TOP + 410, "center");
    drawText(goal, "40px Arial", "#FF9600", BOARD_MARGIN_LEFT + 360, BOARD_MARGIN_TOP + 450, "center");

    //레벨
    drawText("Level", "40px Arial", "#C4B73B", BOARD_MARGIN_LEFT + 360, BOARD_MARGIN_TOP + 510, "center");
    drawText(level, "40px Arial", "#FF9600", BOARD_MARGIN_LEFT + 360, BOARD_MARGIN_TOP + 550, "center");

    //pause
    if (pause){
        if(!startLock) {
            drawText("Pause", "40px Arial", "#4B6464", BOARD_MARGIN_LEFT + 150, BOARD_MARGIN_TOP + 200, "center");
            drawText("ESC to continue", "20px Arial", "#4B6464", BOARD_MARGIN_LEFT + 150, BOARD_MARGIN_TOP + 230, "center");
        }else{
            if(0 < startTimer){
                drawText(startTimer, "90px Arial", "#4B6464", BOARD_MARGIN_LEFT + 150, BOARD_MARGIN_TOP + 200, "center");
            }else{ 
                drawText("Game Start!", "40px Arial", "#4B6464", BOARD_MARGIN_LEFT + 150, BOARD_MARGIN_TOP + 200, "center");
            }
        }
    }

    //Game over
    if (gameOver) {
        drawText("Game over!", "40px Arial", "#4B6464", BOARD_MARGIN_LEFT + 150, BOARD_MARGIN_TOP + 200, "center");
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawData();
    drawMine();
    drawInfo();

    requestAnimationFrame(draw);
}