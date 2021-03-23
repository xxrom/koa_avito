require('source-map-support/register');
module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Koa = __webpack_require__(/*! koa */ "koa");

const logger = __webpack_require__(/*! koa-morgan */ "koa-morgan");

const Router = __webpack_require__(/*! koa-router */ "koa-router");

const koaBody = __webpack_require__(/*! koa-body */ "koa-body");

const server = new Koa();
const router = new Router();

const api = __webpack_require__(/*! ./queries */ "./src/queries.js");

router.get("/", (ctx, next) => {
  ctx.body = "io ---";
});
router.get("/card", async ctx => {
  const data = await api.getAllCards(ctx);
  console.log("data ", data);
  ctx.body = {
    status: 200,
    message: "getAllCards",
    data
  };
});
router.get("/card/:id", async ctx => {
  const data = await api.getOneCard(ctx);
  console.log("data ", data);
  ctx.body = {
    status: 200,
    message: "getOneCard",
    data
  };
});
router.post("/card", koaBody(), async ctx => {
  const data = await api.addOneCard(ctx);
  console.log("data", data);
  ctx.body = {
    status: 200,
    message: "addOneCard",
    data
  };
});
router.put("/card/:id", koaBody(), async ctx => {
  const data = await api.updateOneCard(ctx);
  console.log("data", data);
  ctx.body = {
    status: 200,
    message: "updateOneCard",
    data
  };
});
router.delete("/card/:id", async ctx => {
  const data = await api.removeOneCard(ctx);
  console.log("data ", data);
  ctx.body = {
    status: 200,
    message: "removeOneCard",
    data
  };
});
router.post("/data", ctx => {
  console.log(ctx.require.body);
  ctx.body = {
    data: ctx.request.body
  };
});
server.use(logger("tiny")).use(router.routes()).use(router.allowedMethods()).use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}).listen(3010);

/***/ }),

/***/ "./src/queries.js":
/*!************************!*\
  !*** ./src/queries.js ***!
  \************************/
/*! exports provided: getAllCards, getOneCard, addOneCard, updateOneCard, removeOneCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCards", function() { return getAllCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOneCard", function() { return getOneCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOneCard", function() { return addOneCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateOneCard", function() { return updateOneCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeOneCard", function() { return removeOneCard; });
// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
const {
  Pool,
  Client
} = __webpack_require__(/*! pg */ "pg");

const client = new Client({
  user: "postgres",
  host: "192.168.1.61",
  database: "avito",
  password: "123456",
  port: 5433
});
client.connect();
const pool = new Pool({
  user: "postgres",
  host: "192.168.1.61",
  database: "avito",
  password: "123456",
  port: 5433
});
const getAllCards = async ctx => {
  try {
    console.log("getAllCards");
    const data = await pool.query("select * from videocards;");
    return data.rows;
  } catch (e) {
    console.error("ERROR: getAllCards/", e);
  }
};
const getOneCard = async ctx => {
  try {
    console.log('ctx', ctx.params);
    const id = ctx.params.id;
    console.log(`getOneCard ${id}`);
    const data = await pool.query(`select * from videocards where card_id = ${id};`);
    return data.rows[0];
  } catch (e) {
    console.error("ERROR: getOneCard/", e);
  }
};
const addOneCard = async ctx => {
  try {
    console.log('ctx', ctx.params);
    console.log('ctx', ctx.request.body);
    const {
      card_id,
      link,
      title,
      price,
      timeAgo,
      geo
    } = ctx.request.body;
    const createdTime = Date.now();
    console.log(`addOneCard ${card_id}`);
    const data = await pool.query(`insert into videocards values (DEFAULT, ${card_id}, '${link}', '${title}', '${price}', '${timeAgo}', '${geo}', ${createdTime});`);
    return data.rows;
  } catch (e) {
    console.error("ERROR: addOneCard/", e);
    return e.message;
  }
};
const updateOneCard = async ctx => {
  try {
    console.log('ctx', ctx.params);
    const id = ctx.params.id;
    console.log('ctx', ctx.request.body);
    const {
      link,
      title,
      price,
      timeAgo,
      geo
    } = ctx.request.body;
    const createdTime = Date.now();
    console.log(`updateOneCard ${id}`);
    const data = await pool.query(`UPDATE videocards SET link = '${link}', title = '${title}', price = '${price}', timeAgo = '${timeAgo}', geo = '${geo}', createdTime = ${createdTime} WHERE card_id = ${id};`);
    return data.rows;
  } catch (e) {
    console.error("ERROR: updateOneCard/", e);
    return e.message;
  }
};
const removeOneCard = async ctx => {
  try {
    console.log('ctx', ctx.params);
    const id = ctx.params.id;
    console.log(`removeOneCard ${id}`);
    const data = await pool.query(`DELETE FROM videocards WHERE card_id = ${id}`);
    return data.rows;
  } catch (e) {
    console.error("ERROR: removeOneCard/", e);
    return e.message;
  }
};
/*

create table videocards {
 id serial PRIMARY KEY,
 card_id int4,
 link text,
 title text,
 price int4,
 timeAgo text,
 geo text,
 createdTime int8
}

+ /card       get     get get all cards
+ /card/:id   get     get one card
+ /card       post    add one card
/card/:id   put     update card
+ /card/:id   delete  * delete card

ADD 
curl -d '{"card_id": "2131858292", "link": "/moskovskaya_oblast_ivanteevka/tovary_dlya_kompyutera/videokarta_4_gb_geforce_gtx_980_asus_strix_oc_2131858292?slocation=107620", "title": "Видеокарта 4 gb geforce gtx 980 asus strix OC", "price": "20000", "timeAgo": "20 hours ago", "geo": "ivanteevka" }' -H "Content-Type: application/json" -X POST http://localhost:3010/card

UPDATE
curl -d '{"link": "/moskovskaya_oblast_ivanteevka/tovary_dlya_kompyutera/videokarta_4_gb_geforce_gtx_980_asus_strix_oc_2131858292?slocation=107620", "title": "Видеокарта 4 gb geforce gtx 980 asus strix OC", "price": "20000", "timeAgo": "20 hours ago", "geo": "ivanteevka222" }' -H "Content-Type: application/json" -X PUT http://localhost:3010/card/2108953106

REMOVE
curl -X DELETE http://localhost:3010/card/2131858292
{"status":200,"message":"removeOneCard","data":[]}

*/

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nikita/js/koa_avito/src/index.js */"./src/index.js");


/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),

/***/ "koa-morgan":
/*!*****************************!*\
  !*** external "koa-morgan" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-morgan");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ })

/******/ });
//# sourceMappingURL=main.map