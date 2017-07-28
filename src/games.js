import * as stages from'./stages'

export function create (width, height) {
  let stage = stages.create(width, height)
  return {
    stage,
    _scene: null,
    _loop: null
  }
}

export function start (game, scene) {
  if(game._loop) {
    window.cancelAnimationFrame(game._loop)
  }
  game._scene = scene
  let dt = 0
  let lt = window.performance.now()
  let step = 1 / 60
  scene.onstart()
  scene.onrender(dt, game.stage, scene.actors)
  game._loop = window.requestAnimationFrame(function frame () {
    let ct = window.performance.now()
    dt += Math.min(1, (ct - lt) / 1000)
    while (dt > step) {
      scene.onupdate(dt, scene.actors)
      dt -= step
    }
    scene.onrender(dt, game.stage, scene.actors)
    lt = ct
    return window.requestAnimationFrame(frame)
  })
}