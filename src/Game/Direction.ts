type Dir = string[]
export type CurrentDir = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft' | undefined
const DIR_VALUES = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']

export class Direction {
  dir: Dir = []

  constructor() {
    document.addEventListener('keydown', (event) => {
      if (DIR_VALUES.includes(event.key)) {
        this.dir.push(event.key)
      }
    })

    document.addEventListener('keyup', (event) => {
      if (DIR_VALUES.includes(event.key)) {
        this.dir = this.dir.filter((e) => e !== event.key)
      }
    })
  }

  get currentDir() {
    return this.dir[this.dir.length - 1] as CurrentDir
  }
}
