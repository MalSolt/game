import { Character, CharacterProps } from './Сharacter'
import { game } from '.'

export class Rect extends Character {
  constructor(props: CharacterProps) {
    super(props)
  }

  fill() {
    const { x, y, width, height, color } = this.state
    const { canvas } = game

    canvas.ctx.fillStyle = color
    canvas.ctx.fillRect(x, y, width, height)

    if (this.canShot) {
      canvas.ctx.strokeStyle = 'lightgreen'
      canvas.ctx.strokeRect(x, y, width, height)
      canvas.ctx.lineWidth = 1
    }

    this.startDirection()
    this.fillShots()
  }
}
