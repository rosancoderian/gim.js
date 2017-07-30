export function create (width, height) {
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.backgroundColor = '#000'
  document.body.appendChild(canvas)
  let ctx = canvas.getContext('2d')
  return { ctx, canvas }
}