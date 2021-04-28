const cvs = document.getElementById("ping_pong")
const ctx = cvs.getContext("2d")
const winScore = 5

function drawRectangle(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fill()
}

function drawText(txt, x, y, color) {
    ctx.fillStyle = color
    ctx.font = "75px fantasy"
    ctx.fillText(txt, x, y)
}

function drawNet() {
    for (let i = 0; i <= cvs.height; i += 15) {
        drawRectangle(net.x, net.y + i, net.width, net.height, net.color)
    }
}

function render() {
    drawRectangle(0, 0, cvs.width, cvs.height, "black")
    drawRectangle(user.x, user.y, user.width, user.height, user.color)
    drawRectangle(com.x, com.y, com.width, com.height, com.color)
    drawNet()
    drawCircle(ball.x, ball.y, ball.radius, ball.color)
    drawText(user.score, cvs.width / 4 - 10, cvs.height / 5, "white")
    drawText(com.score, cvs.width * 3 / 4 - 10, cvs.height / 5, "white")
}

const user = {
    x: 0,
    y: cvs.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "white",
    score: 0
}
const com = {
    x: cvs.width - 10,
    y: cvs.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "white",
    score: 0
}
const net = {
    x: cvs.width / 2 - 2 / 2,
    y: 0,
    width: 2,
    height: 10,
    color: "white",
}
const ball = {
    x: cvs.width / 2,
    y: cvs.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white'
}
const framePerSecond = 50

function checkWin() {
    if (user.score === winScore) {
        return 1
    } else if (com.score === winScore) {
        return 2
    }
    return -1
}

function game() {
    render()
    update()
    if (checkWin() === 1) {
        alert("User Win")
        user.score = 0
        location.reload()
    } else if (checkWin() === 2) {
        alert("Com Win")
        com.score = 0
        location.reload()
    }
}

setInterval(game, 1000 / framePerSecond)

function update() {
    ball.x += ball.velocityX
    ball.y += ball.velocityY


    com.y += ((ball.y - (com.y + com.height / 2))) * 0.09

    if (ball.y + ball.radius >= cvs.height || ball.y - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY;
    }
    let player = (ball.x < cvs.width / 2) ? user : com
    if (collision(ball, player)) {
        let collidePoint = (ball.y - (player.y + player.height / 2));
        collidePoint = collidePoint / (player.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint
        let direction = (ball.x < cvs.width / 2) ? 1 : -1
        ball.velocityX = direction * ball.speed * Math.cos((angleRad))
        ball.velocityY = direction * ball.speed * Math.sin((angleRad))
        ball.speed += 0.1
    }

    if (ball.x - ball.radius < 0) {
        com.score++
        resetBall()
    } else if (ball.x + ball.radius > cvs.width) {
        user.score++
        resetBall()
    }

}

function resetBall() {
    ball.x = cvs.width / 2
    ball.y = cvs.height / 2
    ball.velocityX = -ball.velocityX
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

cvs.addEventListener("mousemove", movePaddle)


function movePaddle(evt) {
    let rect = cvs.getBoundingClientRect()
    user.y = evt.clientY - rect.top - user.height / 2
}



