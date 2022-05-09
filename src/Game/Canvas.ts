import { Game } from "."

export class Canvas {
  private canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D

  constructor(GAME: Game) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = GAME.WIDTH
    this.canvas.height = GAME.HEIGHT
    this.canvas.style.display = 'block'
    document.body.appendChild(this.canvas)
  }
}
