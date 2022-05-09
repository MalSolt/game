import { CharacterProps } from './Сharacter'
import { game } from '.'
import { Shot, SHOT_DIR_VALUES } from './Shot'

const SHOT_WIDTH = 10
const SHOT_HEIGHT = 10

interface Props extends CharacterProps {}

export class Enemy {
  state: Props
  shots: Shot[] = []
  private shotInterval: NodeJS.Timer
  private enemyCreateInterval: NodeJS.Timer

  constructor(props: Props) {
    this.state = props
    const { state } = this

    this.enemyCreateInterval = setInterval(() => {
      game.enemies.push(
        new Enemy({
          x: Math.floor(Math.random() * 10) * 100 + Math.floor(Math.random() * 10) * 10,
          y: Math.floor(Math.random() * 10) * 60 + Math.floor(Math.random() * 10) * 10,
          width: 50,
          height: 50,
          speed: 0.5,
          color: 'purple',
          shotTimeout: 500,
          shotSpeed: 1,
        })
      )
    }, 1000)

    this.shotInterval = setInterval(() => {
      SHOT_DIR_VALUES.forEach((dir) => {
        this.shots.push(
          new Shot({
            width: SHOT_WIDTH,
            height: SHOT_HEIGHT,
            x: state.x + state.width / 2 - SHOT_WIDTH / 2,
            y: state.y + state.height / 2 - SHOT_HEIGHT / 2,
            speed: state.shotSpeed,
            dir,
            color: state.color,
          })
        )
      })
    }, state.shotTimeout)
  }

  startDirection() {
    const { x, y } = game.me.state
    const { state } = this

    if (state.x < x) {
      state.x += state.speed
    } else {
      state.x -= state.speed
    }

    if (state.y < y) {
      state.y += state.speed
    } else {
      state.y -= state.speed
    }
  }

  fillShots() {
    this.shots = this.shots.filter((shot) => !shot.isShouldDestroy)

    this.shots.forEach((shot) => {
      shot.fill()
    })
  }

  checkIsKill() {
    const { me, enemies } = game
    const { x, y, width, height } = this.state

    enemies
      .filter((e) => e !== this)
      .forEach((enemy) => {
        enemy.shots.forEach((shot) => {
          if (
            shot.state.x > x &&
            shot.state.x < x + width &&
            shot.state.y > y &&
            shot.state.y < y + height
          ) {
            clearInterval(this.shotInterval)
            clearInterval(this.enemyCreateInterval)
            enemy.shots = enemy.shots.filter((e) => e !== shot)
            game.enemies = enemies.filter((e) => e !== this)
          }
        })
      })

    me.shots.forEach((shot) => {
      if (
        shot.state.x > x &&
        shot.state.x < x + width &&
        shot.state.y > y &&
        shot.state.y < y + height
      ) {
        clearInterval(this.shotInterval)
        clearInterval(this.enemyCreateInterval)
        // me.shots = me.shots.filter((e) => e !== shot)
        game.enemies = enemies.filter((e) => e !== this)
      }
    })
  }

  fill() {
    const { x, y, width, height, color } = this.state
    const { canvas } = game

    canvas.ctx.fillStyle = color
    canvas.ctx.fillRect(x, y, width, height)

    this.fillShots()
    this.checkIsKill()
    this.startDirection()
  }
}
