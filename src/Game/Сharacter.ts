import { game } from '.'
import { Shot, ShotDir, SHOT_DIR_VALUES } from './Shot'

const SHOT_WIDTH = 20
const SHOT_HEIGHT = 20

export interface CharacterProps {
  x: number
  y: number
  speed: number
  color: string
  width: number
  height: number
  shotSpeed: number
  shotTimeout: number
}

export class Character {
  state: CharacterProps
  shots: Shot[] = []
  protected canShot = true
  protected isKill = false

  constructor(props: CharacterProps) {
    this.state = props
    const { state } = this

    document.addEventListener('keydown', (event) => {
      if (SHOT_DIR_VALUES.some((e) => e === event.key) && this.canShot) {
        this.canShot = false

        setTimeout(() => {
          this.canShot = true
        }, state.shotTimeout)

        this.shots.push(
          new Shot({
            width: SHOT_WIDTH,
            height: SHOT_HEIGHT,
            x: state.x + state.width / 2 - SHOT_WIDTH / 2,
            y: state.y + state.height / 2 - SHOT_HEIGHT / 2,
            speed: state.shotSpeed,
            dir: event.key as ShotDir,
            color: state.color,
          })
        )
      }
    })
  }

  fillShots() {
    this.shots = this.shots.filter((shot) => !shot.isShouldDestroy)

    this.shots.forEach((shot) => {
      shot.fill()
    })
  }

  checkIsKill() {
    const { enemies } = game

    enemies.forEach((enemy) => {
      enemy.shots.forEach((shot) => {
        const { x, y, width, height } = this.state

        if (
          shot.state.x > x &&
          shot.state.x < x + width &&
          shot.state.y > y &&
          shot.state.y < y + height
        ) {
          enemy.shots = enemy.shots.filter((e) => e !== shot)
          this.isKill = true
        }
      })
    })
  }

  startDirection() {
    const { state } = this
    const { GAME, direction } = game

    if (direction.currentDir === 'ArrowRight') {
      if (game.GAME.END_POINT_X - (state.x + state.width) < state.speed) {
        state.x = GAME.END_POINT_X - state.width
      } else {
        state.x += state.speed
      }
    }

    if (direction.currentDir === 'ArrowLeft') {
      if (state.x - GAME.ZERO_POINT_X < state.speed) {
        state.x = GAME.ZERO_POINT_X
      } else {
        state.x -= state.speed
      }
    }

    if (direction.currentDir === 'ArrowUp') {
      if (state.y - GAME.ZERO_POINT_Y < state.speed) {
        state.y = GAME.ZERO_POINT_Y
      } else {
        state.y -= state.speed
      }
    }
    if (direction.currentDir === 'ArrowDown') {
      if (GAME.END_POINT_Y - (state.y + state.height) < state.speed) {
        state.y = GAME.END_POINT_Y - state.height
      } else {
        state.y += state.speed
      }
    }
  }
}
