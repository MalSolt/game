import { game } from '.'

export type ShotDir = 'w' | 'd' | 's' | 'a'
export const SHOT_DIR_VALUES: ShotDir[] = ['w', 'd', 's', 'a']

interface ShotProps {
  x: number
  y: number
  speed: number
  dir: ShotDir
  color: string
  width: number
  height: number
}

interface State extends ShotProps {
  width: number
  height: number
}

export class Shot {
  state: State

  constructor(props: ShotProps) {
    this.state = props
  }

  startDirection() {
    const { state } = this

    if (state.dir === 'w') {
      state.y -= state.speed
    }

    if (state.dir === 'd') {
      state.x += state.speed
    }

    if (state.dir === 's') {
      state.y += state.speed
    }

    if (state.dir === 'a') {
      state.x -= state.speed
    }
  }

  get isShouldDestroy() {
    const { GAME } = game
    const { x, y, width, height } = this.state

    if (
      x < GAME.ZERO_POINT_X ||
      x + width > GAME.END_POINT_X ||
      y < GAME.ZERO_POINT_Y ||
      y + height > GAME.END_POINT_Y
    ) {
      return true
    }

    return false
  }

  fill() {
    const { ctx } = game.canvas
    const { x, y, width, height, color } = this.state

    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)

    this.startDirection()
  }
}
