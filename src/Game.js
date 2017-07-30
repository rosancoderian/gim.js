import * as Stage from './Stage'
import * as Input from './Input'

const noop = function () {}

export function create (width, height) {
  let stage = Stage.create(width, height)
  let input = Input.create(stage.canvas)
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
  let onstart = scene.onstart || noop
  let onupdate = scene.onupdate || noop
  let onrender = scene.onrender || noop
  onstart()
  onrender(dt, game.stage, scene.actors)
  game._loop = window.requestAnimationFrame(function frame () {
    let ct = window.performance.now()
    dt += Math.min(1, (ct - lt) / 1000)
    while (dt > step) {
      onupdate(dt, scene.actors)
      dt -= step
    }
    onrender(dt, game.stage, scene.actors)
    lt = ct
    return window.requestAnimationFrame(frame)
  })
}