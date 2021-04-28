let cvs = document.getElementById("ping-pong")
let ctx = cvs.getContext("2d")
let paddleWidth = 10
let paddleHeight = 100
let netWidth = 2
let upMove1 = false
let downMove1 = false
let upMove2 = false
let downMove2 = false
let ballSpeed = 5
const user = {
    x: 0,
    y: cvs.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0
}
const com = {
    x: cvs.width - paddleWidth,
    y: cvs.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0
}
const ball = {
    x: cvs.width / 2,
    y: cvs.height / 2,
    radius: 7,
    speed: ballSpeed,
    velocityX: 5,
    velocityY: 5,
    color: "blue"
}
const net = {
    x: cvs.offsetWidth / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: 10,
    color: 'white'
}

function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fill()
}

function drawNet() {
    for (let i = 0; i < cvs.height; i += 15) {
        drawRectangle(net.x, net.y + i, net.width, net.height, net.color)
    }
}

function drawText(txt, x, y, color) {
    ctx.fillStyle = color
    ctx.font = "50px fantasy"
    ctx.fillText(txt, x, y)
}

function render() {
    drawRectangle(0, 0, cvs.width, cvs.height, "black")
    drawRectangle(user.x, user.y, user.width, user.height, user.color)
    drawRectangle(com.x, com.y, com.width, com.height, com.color)
    drawNet()
    drawCircle(ball.x, ball.y, ball.radius, ball.color)
    drawText(user.score, cvs.width / 4, cvs.height / 5, user.color)
    drawText(com.score, cvs.width * 3 / 4, cvs.height / 5, com.color)
}
function checkWin() {
    let userWin=user.score===10
    let comWin=com.score===10
    if(userWin){
        clearInterval(var1)
        alert("User Win")
        location.reload()
    }
    if(comWin){
        clearInterval(var1)
        alert("Computer Win")
        location.reload()
    }
}

let var1= setInterval(game, 1000 / 50)

function game() {
    update()
    render()
    console.log(user.score)
    console.log(com.score)
}

function resetBall() {
    ball.x = cvs.width / 2
    ball.y = cvs.height / 2
    ball.velocityX = -ball.velocityX
    ball.velocityY = -ball.velocityY
    ball.speed = ballSpeed
}

function collision(b, p) {
    p.top = p.y
    p.bottom = p.height + p.y
    p.left = p.x
    p.right = p.x + p.width

    b.top = b.y - b.radius
    b.bottom = b.y + b.radius
    b.left = b.x - b.radius
    b.right = b.x + b.radius

    return b.right > p.left && b.left < p.right && b.bottom > p.top && b.top < p.bottom
}

function update() {
    checkWin()
    if (upMove1 && user.y > 0) {
        user.y -= 16
    } else if (downMove1 && user.y < cvs.height - user.height) {
        user.y += 16
    }
    if (upMove2 && com.y > 0) {
        com.y -= 16
    } else if (downMove2 && com.y < cvs.height - com.height) {
        com.y += 16
    }
    ball.x += ball.velocityX
    ball.y += ball.velocityY
    if (ball.y + ball.radius >= cvs.height || ball.y - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY
    }
    if (ball.x - ball.radius <= 0) {
        com.score++
        resetBall()
    }
    if (ball.x + ball.radius > cvs.width) {
        user.score++
        resetBall()
    }
    let player = ball.x < cvs.width / 2 ? user : com
    if (collision(ball, player)) {
        let collidePoint = ball.y - (player.y + player.height / 2)
        collidePoint = collidePoint / (player.height / 2)
        let angleRad = (Math.PI / 4) * collidePoint
        let direction = ball.x < cvs.width / 2 ? 1 : -1
        ball.velocityX = direction * ball.speed * Math.cos(angleRad)
        ball.velocityY = direction * ball.speed * Math.sin(angleRad)
        ball.speed += 0.1
    }
}

window.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 38 :
            upMove1 = false
            break
        case 40:
            downMove1 = false
            break
    }
})
window.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 87 :
            upMove2 = false
            break
        case 83:
            downMove2 = false
            break
    }
})
window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 38 :
            upMove1 = true
            break
        case 40:
            downMove1 = true
            break
    }
})
window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 87 :
            upMove2 = true
            break
        case 83:
            downMove2 = true
            break
    }
})