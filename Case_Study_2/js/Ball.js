class Ball{
    constructor(x,y,r,vX,vY,speed,color) {
        this.x=x
        this.y=y
        this.radius=r
        this.velocityX=vX
        this.velocityY=vY
        this.speed=speed
        this.color=color
        this.canvas =document.getElementById("ping-pong")
        this.ctx=this.canvas.getContext("2d")
    }
    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.ctx.closePath()
        this.ctx.fill()
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
    move(){
        this.x+=this.velocityX
        this.y+=this.velocityY
        if (this.y + this.radius >= cvs.height || this.y - this.radius <= 0) {
            this.velocityY = -this.velocityY
        }
    }
    collision(p) {
        p.top = p.y
        p.bottom = p.height + p.y
        p.left = p.x
        p.right = p.x + p.width

        let top = this.y - this.radius
        let bottom = this.y + this.radius
        let left = this.x - this.radius
        let right = this.x + this.radius

        return right > p.left && left < p.right && bottom > p.top && top < p.bottom
    }
    resetBall() {
        this.x = cvs.width / 2
        this.y = cvs.height / 2
        this.velocityX = -this.velocityX
        this.velocityY = -this.velocityY
        this.speed = 5
    }
}