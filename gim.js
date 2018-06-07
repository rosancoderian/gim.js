(function (root) {
    class Emitter {
        constructor (all = Object.create(null)) {
            this.all = all
        }
    
        on(type, handler) {
            (this.all[type] || (this.all[type] = [])).push(handler);
        }
        
        off(type, handler) {
            if (this.all[type]) {
                this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1);
            }
        }
    
        emit(type, ...args) {
            (this.all[type] || []).slice().map(function (handler) { handler(...args); });
            (this.all['*'] || []).slice().map(function (handler) { handler(type, ...args); });
        }
    }

    class Assets extends Emitter {
        constructor () {
            super()
            this.assets = {}
        }

        load (assets = []) {
            return Promise.all(assets.map((asset) => {
                let img = new Image()
                return new Promise((resolve, reject) => {
                    img.onload = () => {
                        this.assets[asset.name] = img
                        resolve()
                    }
                    img.onerror = () => reject()
                    img.src = asset.url
                })
            })).then(() => {
                this.emit('complete')
            })
        }
    
        get (name) {
            return this.assets[name]
        }
    }

    class Ticker extends Emitter {
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

    class Canvas extends Emitter {
        constructor (id, width, height) {
            super()
            this.id = id
            this.width = width
            this.height = height
            this.el = document.getElementById(id)
            this.el.width = width
            this.el.height = height
            this.el.setAttribute('tabindex', 1)
            this.ctx = this.el.getContext('2d')
            this.ctx.imageSmoothingEnabled = false
        }
    
        clear (fill = '#000', x = 0, y = 0, width = this.width, height = this.height) {
            this.ctx.fillStyle = fill
            this.ctx.fillRect(x, y, width, height)
        }
    }

    class Keyboard extends Emitter {
        constructor (canvas) {
            super()
            this.map = this._mapKey()
            this._pressed = Object.values(this.map).reduce((_pressed, key) => {
                _pressed[key] = false
                return _pressed
            }, {})
            canvas.el.addEventListener('keydown', e => {
                let key = this.map[e.which]
                if (this._pressed[key] === false) {
                    this._pressed[key] = setInterval(() => {
                        this.emit('down', key, e)
                    }, 1E3 / 60)
                }
            })
            canvas.el.addEventListener('keyup', e => {
                let key = this.map[e.which]
                clearInterval(this._pressed[key])
                this._pressed[key] = false
                this.emit('up', key, e)
            })
        }
    
        isDown (code) {
            return this._pressed[code] && true
        }
    
        isUp (code) {
            return !this._pressed[code] && true
        }
    
        _mapKey () {
            let map = {
                8: 'backspace',
                9: 'tab',
                13: 'enter',
                16: 'shift',
                17: 'ctrl',
                18: 'alt',
                20: 'capslock',
                27: 'esc',
                32: 'space',
                33: 'pageup',
                34: 'pagedown',
                35: 'end',
                36: 'home',
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',
                45: 'insert',
                46: 'delete',
                91: 'leftwindow',
                92: 'rightwindow',
                93: 'select',
                144: 'numlock',
                145: 'scrolllock',
                106: '*',
                107: '+',
                109: '-',
                110: '.',
                111: '/',
                186: ';',
                187: '=',
                188: ',',
                189: '-',
                190: '.',
                191: '/',
                192: '`',
                219: '[',
                220: '\\',
                221: ']',
                222: '\''
            }
            // alpha
            for (var i = 0; i < 26; i++) {
                map[65+i] = (10 + i).toString(36);
            }
            // numeric
            for (i = 0; i < 10; i++) {
                map[48+i] = ''+i;
                map[96+i] = 'numpad'+i;
            }
            // fn
            for (i = 1; i < 20; i++) {
                map[111+i] = 'f'+i;
            }
            return map
        }
    }

    class Mouse extends Emitter {
        constructor (canvas) {
            super()
            this.canvas = canvas
            canvas.el.addEventListener('mousemove', e => this.emit('move', e.buttons, this._pos(e), e))
            canvas.el.addEventListener('mousedown', e => this.emit('down', e.buttons, this._pos(e), e))
            canvas.el.addEventListener('mouseup', e => this.emit('up', e.buttons, this._pos(e), e))
        }

        _pos (e) {
            let offsetTop = this.canvas.el.offsetTop
            let offsetLeft = this.canvas.el.offsetLeft
            return {
                x: e.clientX - offsetTop,
                y: e.clientY - offsetLeft
            }
        }
    }

    class Game extends Emitter {
        constructor (canvasId, w, h) {
            super()
            this.ticker = new Ticker()
            this.canvas = new Canvas(canvasId, w, h)
            this.keyboard = new Keyboard(this.canvas)
            this.mouse = new Mouse(this.canvas)
            this.ticker.on('update', dt => {
                this.emit('update', dt, this)
                this.canvas.clear()
                this.emit('render', this.canvas)
            })
        }
    
        start () {
            this.ticker.start()
            this.emit('start', this)
        }
    
        stop () {
            this.ticker.stop()
            this.emit('stop')
        }
    }

    let gim = {
        Emitter,
        Assets,
        Ticker,
        Canvas,
        Keyboard,
        Mouse,
        Game,
    }

    if (!root) {
        module.exports = gim
    } else {
        root.gim = gim
    }
})(window)