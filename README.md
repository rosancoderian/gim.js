# gim.js
Mini ES6 Html5 canvas game library

### gim.Assets

```javascript
let assets = new gim.Assets()
```

```javascript
assets.load([
    { name: '', url: '' }
])
```

```javascript
assets.on('complete', callback)
```

### gim.Game

```javascript
let game = new gim.Game(canvasId, width, height)
```

```javascript
game.start()
game.stop()
```

```javascript
game.on('update', callback)
game.on('render', callback)
```

```javascript
game.keyboard.on('down', callback)
game.keyboard.on('up', callback)
```

```javascript
game.mouse.on('down', callback)
game.mouse.on('up', callback)
```