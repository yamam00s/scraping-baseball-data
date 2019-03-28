(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ScrapingLibrary"] = factory();
	else
		root["ScrapingLibrary"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-console */
const puppeteer = __webpack_require__(2);
const BaseballDataController = __webpack_require__(3);

module.exports = (async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(
    'https://baseball.yahoo.co.jp/npb/stats/batter?series=5&type=1',
    {
      waitUntil: 'domcontentloaded'
    }
  );

  const listSelector = 'table.NpbPlSt tr:not(.yjMS)'; // .yjMSはtableの上下にある項目名のため除外
  const extractedDataList = await page.$$eval(listSelector, element => {
    const handledDataList = element.reduce((prev, current) => {
      // 多重配列作成時にblankなデータは取り除く
      const currentTextList = current.textContent
        .split(/\n/)
        .filter(data => data !== '');
      prev.push(currentTextList);
      return prev;
    }, []);
    return handledDataList;
  });

  const BaseballData = await new BaseballDataController(extractedDataList);
  const BaseballDataList = await BaseballData.createBatterDataList();

  await browser.close();

  return BaseballDataList;
})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const batterColumnList = __webpack_require__(4);

module.exports = class BaseballJsonList {
  constructor(dataList = []) {
    this.dataList = dataList;
  }

  createBatterDataList() {
    const resultDataList = this.dataList.map(dataList => {
      const keyAddDataList = dataList.reduce((prev, current, index) => {
        // eslint-disable-next-line no-param-reassign
        prev[batterColumnList[index]] = current;
        return prev;
      }, {});
      return keyAddDataList;
    });

    return resultDataList;
    // For data Debug
    // resultDataList.forEach(data => {
    // console.log(data);
    // });
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = [
  '順位',
  '名前',
  'チーム',
  '打率',
  '試合',
  '打席',
  '打数',
  '安打',
  '二塁打',
  '三塁打',
  '本塁打',
  '塁打',
  '打点',
  '得点',
  '三振',
  '四球',
  '死球',
  '犠打',
  '犠飛',
  '盗塁',
  '盗塁死',
  '併殺打',
  '出塁率',
  '長打率',
  'OPS',
  '得点圏',
  '失策'
];


/***/ })
/******/ ]);
});