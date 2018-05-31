import Emitter from './emitter.js'

export default class Ticker extends Emitter {
	constructor () {
		super()
		this.fps = 60
		this._raf = null
		this._last = null
		this._now = null
		this._dt = null
		this._accumulator = 0
		this._delta = 1E3 / this.fps
		this._step = 1 / this.fps

	}

	start () {
		requestAnimationFrame(step => this._update(step))
		this.emit('start')
	}

	stop () {
		if (this._raf) {
			cancelAnimationFrame(this._raf)
			this.emit('stop')
		}
	}
	
	_update () {
		this._raf = requestAnimationFrame(step => this._update(step))
		this._now = performance.now()
		this._dt = this._now - this._last
		this._last = this._now
		if (this._dt > 1E3) {
			return
		}
		this._accumulator += this._dt
		while (this._accumulator >= this._delta) {
			this.emit('update', this._step)
			this._accumulator -= this._delta;
		}
	}
}