class Paddle {
    set status(value) {
        this._status = value;
    }
    constructor(x, y, w, h, color,status) {
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.color = color
        this.canvas = document.getElementById('ping-pong')
        this.ctx = this.canvas.getContext("2d")
        this.score = 0
        this.speed = 32
        this._status = status;
    }

    draw() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height)
    }

    moveDown() {
        if (this.y + this.height < this.canvas.height)
            this.y += this.speed
    }

    moveUp() {
        if (this.y > 0)
            this.y -= this.speed
    }
}