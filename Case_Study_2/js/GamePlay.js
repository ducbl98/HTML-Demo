// grab a reference of our "canvas" using its id
let cvs = document.getElementById("ping-pong")
// get a "context" to draw on canvas
let ctx = cvs.getContext("2d")
// add sounds
const hitSound = new Audio('sounds/hitSound.wav')
const scoreSound = new Audio('sounds/scoreSound.wav')
const wallHitSound = new Audio('sounds/wallHitSound.wav')
const winningSound = new Audio('sounds/winSound.wav')
//add images
let img1 = new Image()
img1.src = "images/img2.png"
let img2 = new Image()
img2.src = "images/img1.png"
//FPS
const framePerSecond = 50
//Some Initiated Value
const paddleWidth = cvs.width / 60;
const paddleHeight = cvs.height / 4;
const radiusBall = cvs.width / 50
let count =0
let disableAILeft = true
let disableAIRight = true
let checkStart = true
let ball = new Ball(cvs.width / 2, cvs.height / 2, radiusBall, 5, 5, 7, '#11efce')
let user = new Paddle(0, cvs.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, '#b0343f', false)
let com = new Paddle(cvs.width - paddleWidth, cvs.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, '#5d206b', false)

//Display Rule
function ruleDisplay() {
    let rule1 = document.getElementById("rule1")
    rule1.innerHTML = `Player left : Use W , S to move up , down`
    let rule2 = document.getElementById("rule2")
    rule2.innerHTML = `Player right : Use ▲ , ▼ S to move up , down`
}

/*Display Previous Result*/
function displayResult() {
    let txt = document.getElementById("Previous-result")
    txt.innerHTML = `Previous Result is ${loadScore1()} : ${loadScore2()}`
    let txt2=document.getElementById("Previous-time")
    txt2.innerHTML=`The Last Time Play is ${loadTime()}`
}
/*Local storage*/
function saveScore1(score) {
    localStorage.setItem('user', score);
}

function loadScore1() {
    if (localStorage.hasOwnProperty('user')) {
        return localStorage.getItem('user');
    } else {
        return 0;
    }
}

function saveScore2(score) {
    localStorage.setItem('com', score);
}

function loadScore2() {
    if (localStorage.hasOwnProperty('com')) {
        return localStorage.getItem('com');
    } else {
        return 0;
    }
}
function saveTime(time) {
    localStorage.setItem('time', time);
}

function loadTime() {
    if (localStorage.hasOwnProperty('time')) {
        return localStorage.getItem('time');
    } else {
        return 0;
    }
}

/*Draw Game Board*/
function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function drawNet() {
    for (let i = 0; i < cvs.height; i += 15) {
        drawRectangle(cvs.offsetWidth / 2 - 2 / 2, i, 2, 10, 'black')
    }
}

function drawText(txt, x, y, color) {
    ctx.fillStyle = color
    ctx.font = "75px fantasy"
    ctx.fillText(txt, x, y)
}

function replay() {
    if (confirm("Do you want to restart")) {
        location.reload()
    }
}
function timeCount() {
    count++
    document.getElementById("Time-count").innerHTML= ` Time : ${count/framePerSecond}`
}
//Start Game
function start() {
    let playAi = confirm("Do you want to play vs Ai ")
    if (playAi) {
        let directionPlay = confirm("Do you want to play on the left or on the right ? Yes for right And No for left")
        if (directionPlay) {
            disableAILeft = false
            user.status = true
        } else {
            disableAIRight = false
            com.status = true
        }
    }
    if (checkStart) {
        play()
        checkStart = false
    }
}

//Load Game
function play() {
    let winScore
    do {
        winScore = +prompt("Input Winning Score")
    } while (winScore <= 0)

    //Check Win Condition
    function checkWin() {
        if (user.score === winScore) {
            saveTime(count/framePerSecond)
            winningSound.play()
            saveScore1(user.score)
            saveScore2(com.score)
            clearInterval(var1)
            alert("User Win")
            location.reload()
        }
        if (com.score === winScore) {
            saveTime(count/framePerSecond)
            winningSound.play()
            saveScore1(user.score)
            saveScore2(com.score)
            clearInterval(var1)
            alert("Computer Win")
            location.reload()
        }
    }
    //setup AI
    function aiMove() {
        if (com._status) {
            com.y += ((ball.y - (com.y + com.height / 2))) * 0.09
        }
        if (user._status) {
            user.y += ((ball.y - (user.y + user.height / 2))) * 0.09
        }
    }

    //Update GameBoard
    function render() {
        timeCount()
        ball.clear()
        ctx.fillStyle = '#fdc601'
        drawRectangle(0, 0, cvs.width, cvs.height)

        ctx.drawImage(img1, 0, 0, cvs.width / 2, cvs.height / 2, 0, cvs.height / 3, cvs.width / 2, cvs.height / 2)
        ctx.drawImage(img2, 0, 0, cvs.width / 2, cvs.height / 2, cvs.width / 2, cvs.height / 3, cvs.width / 2, cvs.height / 2)
        user.draw()
        com.draw()
        drawNet()
        ball.move()
        aiMove()
        ball.draw()
        drawText(user.score, cvs.width / 4, cvs.height / 5, "#7701fd")
        drawText(com.score, cvs.width * 3 / 4, cvs.height / 5, "#fd00b5")
        /*Score point*/
        if (ball.x - ball.radius <= 0) {
            scoreSound.play()
            com.score++
            ball.resetBall()
        }
        if (ball.x + ball.radius > cvs.width) {
            scoreSound.play()
            user.score++
            ball.resetBall()
        }
        /*Detect collision with paddle*/
        let player = ball.x < cvs.width / 2 ? user : com
        if (ball.collision(player)) {
            hitSound.play()
            let collidePoint = ball.y - (player.y + player.height / 2)
            collidePoint = collidePoint / (player.height / 2)
            let angleRad = (Math.PI / 4) * collidePoint
            let direction = ball.x < cvs.width / 2 ? 1 : -1
            ball.velocityX = direction * ball.speed * Math.cos(angleRad)
            ball.velocityY = direction * ball.speed * Math.sin(angleRad)
            ball.speed += 0.5
        }
        checkWin()
        }
    //Game loop
    let var1 = setInterval(render, 1000 / framePerSecond)

    //Keyboard Event
    window.addEventListener('keydown', function (evt) {
        // user.move(evt)
        user.clear()
        com.clear()
        switch (evt.keyCode) {
            case 38:
                if (disableAIRight) {
                    com.moveUp()
                }
                break
            case 40:
                if (disableAIRight) {
                    com.moveDown()
                }
                break
            case 83:
                if (disableAILeft) {
                    user.moveDown()
                }
                break
            case 87:
                if (disableAILeft) {

                    user.moveUp()
                }
                break
        }
        user.draw()
        com.draw()
    })
}