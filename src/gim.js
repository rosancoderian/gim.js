function initGame(width, height) {
  let renderer = Renderer(width, height)
  let data = {}
  return {
    width,
    height,
    data,
    renderer
  }
}

function initRenderer(width, height) {
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.backgroundColor = '#000'
  document.body.appendChild(canvas)
  let ctx = canvas.getContext('2d')
  return {
    ctx,
    canvas
  }
}

exports.start = function start({
  onsetup,
  onupdate,
  onrender
}) {
  let dt = 0
  let lt = window.performance.now()
  let step = 1 / 60
  let game = initGame()
  let renderer = initRenderer()
  onsetup()
  window.requestAnimationFrame(function frame() {
    ct = window.performance.now()
    dt += Math.min(1, (ct - lt) / 1000)
    while (dt > step) {
      onupdate(dt)
      dt -= step
    }
    onrender(dt, renderer)
    lt = ct
    window.requestAnimationFrame(frame)
  })
}

exports.game = function game(width, height) {
  return {

  }
}