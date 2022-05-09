import { Character, CharacterProps } from './Сharacter'
import { Canvas } from './Canvas'

export class Сircle extends Character {
  constructor(props: CharacterProps, private canvas: Canvas) {
    super(props)
  }

  fill() {
    if (this.isKill) {
      return
    }

    const { x, y, color, width } = this.state
    const { canvas } = this
    const radius = width / 2

    canvas.ctx.beginPath()
    canvas.ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false)
    canvas.ctx.fillStyle = color
    canvas.ctx.fill()

    if (this.canShot) {
      canvas.ctx.strokeStyle = 'lightgreen'
      canvas.ctx.stroke()
      canvas.ctx.lineWidth = 1 
    }

    this.startDirection()
    this.fillShots()
    this.checkIsKill()
  }
}
