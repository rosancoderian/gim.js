import * as games from './games'
import * as stages from './stages'

let sceneA = {
  onstart () {
    console.log('scene A')
  },
  onupdate (dt, { actorA, actorB }) {
    actorA.x += (10 * dt)
    actorB.x += (10 * dt)
  },
  onrender (dt, { ctx, canvas }, { actorA, actorB }) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = actorA.color;
    ctx.fillRect(actorA.x, actorA.y, actorA.width, actorA.height);
    ctx.fillStyle = actorB.color;
    ctx.fillRect(actorB.x, actorB.y, actorB.width, actorB.height);
  },
  actors: {
    actorA: { x: 0, y: 150, width: 25, height: 25, color: '#0000ff' },
    actorB: { x: 0, y: 200, width: 50, height: 30, color: '#ff0000' }
  }
}
let flappy = games.create(500, 500)
games.start(flappy, sceneA)