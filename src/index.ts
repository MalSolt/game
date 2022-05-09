import { game } from './Game'

const { GAME, canvas, me } = game

const render = () => {
  canvas.ctx.fillStyle = '#00000f'
  canvas.ctx.fillRect(0, 0, GAME.WIDTH, GAME.HEIGHT)
  game.enemies.forEach((enemy) => enemy.fill())
  me.fill()
}

setInterval(render, 5)
