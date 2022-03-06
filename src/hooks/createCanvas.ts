export const createCanvas = () => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.display = 'block'
  document.body.appendChild(canvas)

  return context
}
