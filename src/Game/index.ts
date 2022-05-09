import { Enemy } from './Enemy'
import { Canvas } from './Canvas'
import { Direction } from './Direction'
import { Сircle } from './Сircle'

export interface Game {
  WIDTH: number
  HEIGHT: number
  ZERO_POINT_X: number
  ZERO_POINT_Y: number
  END_POINT_X: number
  END_POINT_Y: number
}

class GameModel {
  GAME: Game = {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    ZERO_POINT_X: 0,
    ZERO_POINT_Y: 0,
    END_POINT_X: window.innerWidth,
    END_POINT_Y: window.innerHeight,
  }
  canvas: Canvas = new Canvas(this.GAME)
  direction: Direction = new Direction()
  enemies: Enemy[] = [
    new Enemy({
      x: 120,
      y: 510,
      width: 50,
      height: 50,
      speed: 0.5,
      color: 'purple',
      shotTimeout: 200,
      shotSpeed: 1,
    }),
  ]
  me = new Сircle(
    {
      x: 800,
      y: 640,
      speed: 3,
      color: 'red',
      width: 50,
      height: 50,
      shotTimeout: 100,
      shotSpeed: 15,
    },
    this.canvas
  )
}

export const game = new GameModel()
