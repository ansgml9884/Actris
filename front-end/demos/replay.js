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
    nextPatIndex[i] = 0;
}

let level = 1;
let goal = 10;
let score = 0;

let mine = {
    x: 5,
    y: 1,
    dir: 0,
    patIndex: 0,

    wait: MAX_WAIT[level - 1],
    survival: MAX_SURVIVAL
}

let holdFlag = 0;
let holdPatIndex = -1;


//replay 관련
let gameTime = 0;
let PlayRecord = function(cutTime, pat, keys) {
    this.cutTime = cutTime;
    this.pat = pat;
    this.keys = keys;

    this.empty = function() {
        if (this.cutTime == 0 && this.pat == 0 && this.keys == 0) {
            return true;
        }
        return false;
    }
}
let playRecords = [];
let recordIndex = 0;

//getRecordTest
// function getRecords(records) {
//     // alert(records);
//     // console.log(records);
//     records = "0 1381 0 19 0 2 27 0 2 34 0 2 40 0 2 62 3 16 90 0 1 107 0 8 115 0 2 126 0 2 150 5 16 182 0 1 187 0 1 194 0 1 201 0 1 217 3 16 250 0 1 300 5 16 344 0 4 352 0 2 385 0 1 412 5 16 441 0 1 456 0 4 531 0 4 549 0 4 561 0 1 569 0 1 576 0 1 582 0 1 590 0 1 597 2 16 628 0 4 636 0 1 662 0 1 687 1 16 757 0 4 808 0 1 829 0 1 830 0 1 831 0 1 832 0 1 833 0 1 834 0 1 835 0 1 836 0 1 837 0 1 838 0 1 839 0 1 840 0 1 841 0 1 842 0 1 843 0 1 844 0 1 845 0 1 850 0 16 899 0 2 907 0 4 928 0 4 980 0 4 989 0 4 1005 0 2 1010 0 4 1014 0 4 1035 0 4 1042 0 4 1063 0 2 1071 0 4 1096 1 16 1137 0 4 1156 0 4 1173 0 4 1182 0 4 1202 0 4 1212 0 2 1232 1 16 1288 0 2 1309 0 2 1310 0 2 1311 0 2 1312 0 2 1313 0 2 1320 0 2 1328 0 2 1339 0 1 1349 0 1 1370 0 1 1371 0 1 1372 0 1 1373 0 1 1374 0 1 1375 0 1 1376 0 1 1377 0 1 1378 0 1 1379 0 1 1380 0 1 1383 0 1 1395 0 2 1416 0 2 1417 0 2 1418 0 2 1419 0 2 1420 0 2 1421 0 2 1422 0 2 1423 0 2 1424 0 2 1425 0 2 1426 0 2 1427 0 2 1428 0 2 1429 0 2 1430 0 2 1431 0 2 1432 0 2 1433 0 2 1438 0 1 1474 4 16 1512 0 8 1519 0 2 1528 0 2 1535 0 2 1542 0 2 1549 0 2 1561 5 16 1585 6 64 1618 0 2 1626 0 1 1647 0 1 1648 0 1 1649 0 1 1650 0 1 1651 0 1 1652 0 1 1653 0 1 1654 0 1 1655 0 1 1656 0 1 1657 0 1 1658 0 1 1659 0 1 1660 0 1 1661 0 1 1662 0 1 1663 0 1 1664 0 1 1665 0 1 1668 2 16 1707 0 8 1719 0 1 1727 0 1 1735 0 1 1757 0 2 1823 3 16 1952 0 64 1979 0 2 1987 0 2 1995 0 2 2002 0 2 2009 0 2 2022 6 16 2196 4 16 2212 3 16 2222 0 16 2231 0 16 2253 1 16 2265 2 16 2269 2 16 2277 4 16 2288 2 16 2309 5 16 2331 1 16"
// }

let records = "0 1381 0 19 0 2 27 0 2 34 0 2 40 0 2 62 3 16 90 0 1 107 0 8 115 0 2 126 0 2 150 5 16 182 0 1 187 0 1 194 0 1 201 0 1 217 3 16 250 0 1 300 5 16 344 0 4 352 0 2 385 0 1 412 5 16 441 0 1 456 0 4 531 0 4 549 0 4 561 0 1 569 0 1 576 0 1 582 0 1 590 0 1 597 2 16 628 0 4 636 0 1 662 0 1 687 1 16 757 0 4 808 0 1 829 0 1 830 0 1 831 0 1 832 0 1 833 0 1 834 0 1 835 0 1 836 0 1 837 0 1 838 0 1 839 0 1 840 0 1 841 0 1 842 0 1 843 0 1 844 0 1 845 0 1 850 0 16 899 0 2 907 0 4 928 0 4 980 0 4 989 0 4 1005 0 2 1010 0 4 1014 0 4 1035 0 4 1042 0 4 1063 0 2 1071 0 4 1096 1 16 1137 0 4 1156 0 4 1173 0 4 1182 0 4 1202 0 4 1212 0 2 1232 1 16 1288 0 2 1309 0 2 1310 0 2 1311 0 2 1312 0 2 1313 0 2 1320 0 2 1328 0 2 1339 0 1 1349 0 1 1370 0 1 1371 0 1 1372 0 1 1373 0 1 1374 0 1 1375 0 1 1376 0 1 1377 0 1 1378 0 1 1379 0 1 1380 0 1 1383 0 1 1395 0 2 1416 0 2 1417 0 2 1418 0 2 1419 0 2 1420 0 2 1421 0 2 1422 0 2 1423 0 2 1424 0 2 1425 0 2 1426 0 2 1427 0 2 1428 0 2 1429 0 2 1430 0 2 1431 0 2 1432 0 2 1433 0 2 1438 0 1 1474 4 16 1512 0 8 1519 0 2 1528 0 2 1535 0 2 1542 0 2 1549 0 2 1561 5 16 1585 6 64 1618 0 2 1626 0 1 1647 0 1 1648 0 1 1649 0 1 1650 0 1 1651 0 1 1652 0 1 1653 0 1 1654 0 1 1655 0 1 1656 0 1 1657 0 1 1658 0 1 1659 0 1 1660 0 1 1661 0 1 1662 0 1 1663 0 1 1664 0 1 1665 0 1 1668 2 16 1707 0 8 1719 0 1 1727 0 1 1735 0 1 1757 0 2 1823 3 16 1952 0 64 1979 0 2 1987 0 2 1995 0 2 2002 0 2 2009 0 2 2022 6 16 2196 4 16 2212 3 16 2222 0 16 2231 0 16 2253 1 16 2265 2 16 2269 2 16 2277 4 16 2288 2 16 2309 5 16 2331 1 16"
let recordStrings = records.split(' ');
for (let i = 0; i < recordStrings.length; i += 3) {
    playRecords.push(
        new PlayRecord(
            Number(recordStrings[i]),
            Number(recordStrings[i + 1]),
            Number(recordStrings[i + 2])
        )
    );
}

// let playRecord = new PlayRecord();
// playRecord.pat = (playRecord.pat | nextPatIndex[2]) << 3;
// playRecord.pat = (playRecord.pat | nextPatIndex[1]) << 3;
// playRecord.pat = (playRecord.pat | nextPatIndex[0]) << 3;
// playRecord.pat |= mine.patIndex;
// playRecords.push(playRecord);

let record = playRecords[recordIndex++];
mine.patIndex = record.pat & 7;
nextPatIndex[0] = (record.pat >>= 3) & 7;
nextPatIndex[1] = (record.pat >>= 3) & 7;
nextPatIndex[2] = (record.pat >>= 3) & 7;

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

draw();
executeAction("pause");
gameInterval = setInterval(playGame, 25);


function getNewBlock() {
    mine.x = 5;
    mine.y = 1;
    mine.dir = 0;
    mine.patIndex = nextPatIndex[0];
    for (let i = 0; i < 2; i++) {
        nextPatIndex[i] = nextPatIndex[i + 1];
    }
    nextPatIndex[2] = playRecords[recordIndex].pat;

    holdFlag = 0;
    mine.survival = MAX_SURVIVAL;

    if (canMove(mine.x, mine.y, mine.dir)) {
        return true;
    }
    return false;
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
    if (playRecords[recordIndex].cutTime != gameTime) {
        return true;
    }
    let record = playRecords[recordIndex];

    if ((record.keys & MOVE_RIGHT) == MOVE_RIGHT) {
        moveToRight();
    }
    if ((record.keys & MOVE_LEFT) == MOVE_LEFT) {
        moveToLeft();
    }

    if ((record.keys & DROP_FAST) == DROP_FAST) {
        moveToDown(true);
    }
    if ((record.keys & DROP_IMMEDIATELY) == DROP_IMMEDIATELY) {
        if (moveToEnd() == false) {
            return false;
        }
    }

    if ((record.keys & ROTATE_RIGHT) == ROTATE_RIGHT) {
        rotateRight();
    }
    if ((record.keys & ROTATE_LEFT) == ROTATE_LEFT) {
        rotateLeft();
    }

    if ((record.keys & HOLD) == HOLD) {
        if (holdThisBlock() == false) {
            return false;
        }
    }

    return true;
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

    if (playRecords[recordIndex].cutTime == gameTime) {
        recordIndex++;
    }
    gameTime++;
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