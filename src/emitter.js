export default class Emitter {
	constructor (all = Object.create(null)) {
		this.all = all;
	}
	
	on (type, handler) {
		;(this.all[type] || (this.all[type] = [])).push(handler)
	}
	
	off (type, handler) {
		if (this.all[type]) {
			this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1)
		}
	}
	
	emit (type, ...args) {
		;(this.all[type] || []).slice().map(handler => handler(...args))
		;(this.all["*"] || []).slice().map(handler => handler(type, ...args))
	}
}
