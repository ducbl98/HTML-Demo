let cvs = document.getElementById("ping-pong")
let ctx = cvs.getContext("2d")

const hitSound = new Audio('sounds/hitSound.wav')
const scoreSound = new Audio('sounds/scoreSound.wav')
const wallHitSound = new Audio('sounds/wallHitSound.wav')
const winningSound = new Audio('sounds/winningSound.mp3')

const framePerSecond = 50
const paddleWidth = cvs.width / 60;
const paddleHeight = cvs.height / 4;
const radiusBall = cvs.width / 50
let ball = new Ball(cvs.width / 2, cvs.height / 2, radiusBall, 5, 5, 7, '#11efce')
let user = new Paddle(0, cvs.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, '#b0343f')
let com = new Paddle(cvs.width - paddleWidth, cvs.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, '#5d206b')

function ruleDisplay() {
    let rule1 = document.getElementById("rule1")
    rule1.innerHTML = `Player left : Use W , S to move up , down`
    let rule2 = document.getElementById("rule2")
    rule2.innerHTML = `Player right : Use ▲ , ▼ S to move up , down`
}

function displayResult() {
    let txt = document.getElementById("Previous-result")
    txt.innerHTML = `Previous Result is ${loadScore1()} : ${loadScore2()}`
}

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
    ctx.font = "50px fantasy"
    ctx.fillText(txt, x, y)
}

function replay() {
    if (confirm("Do you want to restart")) {
        location.reload()
    }
}

function play() {
    let winScore
    do {
        winScore = +prompt("Input Winning Score")
    } while (winScore <= 0)

    function checkWin() {
        if (user.score === winScore) {
            winningSound.play()
            saveScore1(user.score)
            saveScore2(com.score)
            clearInterval(var1)
            alert("User Win")
            location.reload()
        }
        if (com.score === winScore) {
            winningSound.play()
            saveScore1(user.score)
            saveScore2(com.score)
            clearInterval(var1)
            alert("Computer Win")
            location.reload()
        }
    }

    function render() {
        ball.clear()
        ctx.fillStyle = '#fdc601'
        drawRectangle(0, 0, cvs.width, cvs.height)
        let img1 = new Image();
        img1.src = "images/img2.png"
        ctx.drawImage(img1, 0, 0, cvs.width / 2, cvs.height / 2, 0, cvs.height / 3, cvs.width / 2, cvs.height / 2)
        let img2 = new Image();
        img2.src = "images/" +
            "img1.png"
        ctx.drawImage(img2, 0, 0, cvs.width / 2, cvs.height / 2, cvs.width / 2, cvs.height / 3, cvs.width / 2, cvs.height / 2)
        user.draw()
        com.draw()
        drawNet()
        ball.move()
        ball.draw()
        drawText(user.score, cvs.width / 4, cvs.height / 5, "#7701fd")
        drawText(com.score, cvs.width * 3 / 4, cvs.height / 5, "#fd00b5")
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
        let player = ball.x < cvs.width / 2 ? user : com
        if (ball.collision(player)) {
            hitSound.play()
            let collidePoint = ball.y - (player.y + player.height / 2)
            collidePoint = collidePoint / (player.height / 2)
            let angleRad = (Math.PI / 4) * collidePoint
            let direction = ball.x < cvs.width / 2 ? 1 : -1
            ball.velocityX = direction * ball.speed * Math.cos(angleRad)
            ball.velocityY = direction * ball.speed * Math.sin(angleRad)
            ball.speed += 0.1
        }
        checkWin()
    }


    let var1 = setInterval(render, 1000 / framePerSecond)
    window.addEventListener('keydown', function (evt) {
        // user.move(evt)
        user.clear()
        com.clear()
        switch (evt.keyCode) {
            case 38:
                com.moveUp()
                break
            case 40:
                com.moveDown()
                break
            case 83:
                user.moveDown()
                break
            case 87:
                user.moveUp()
                break
        }
        user.draw()
        com.draw()
    })
}