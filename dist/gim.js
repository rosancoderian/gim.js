/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__games__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stages__ = __webpack_require__(2);



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
let flappy = __WEBPACK_IMPORTED_MODULE_0__games__["a" /* create */](500, 500)
__WEBPACK_IMPORTED_MODULE_0__games__["b" /* start */](flappy, sceneA)

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony export (immutable) */ __webpack_exports__["b"] = start;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stages__ = __webpack_require__(2);


function create (width, height) {
  let stage = __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* create */](width, height)
  return {
    stage,
    _scene: null,
    _loop: null
  }
}

function start (game, scene) {
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
function create (width, height) {
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.backgroundColor = '#000'
  document.body.appendChild(canvas)
  let ctx = canvas.getContext('2d')
  return { ctx, canvas }
}

/***/ })
/******/ ]);