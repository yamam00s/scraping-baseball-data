!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){const r=n(2),o=n(3);t.exports=(async()=>{const t=await r.launch({args:["--no-sandbox","--disable-setuid-sandbox"]}),e=await t.newPage();await e.goto("https://baseball.yahoo.co.jp/npb/stats/batter?series=5&type=1",{waitUntil:"domcontentloaded"});const n=await e.$$eval("table.NpbPlSt tr:not(.yjMS)",t=>{return t.reduce((t,e)=>{const n=e.textContent.split(/\n/).filter(t=>""!==t);return t.push(n),t},[])}),a=await new o(n),u=await a.createBatterDataList();return await t.close(),u})()},function(t,e){t.exports=require("puppeteer")},function(t,e,n){const r=n(4);t.exports=class{constructor(t=[]){this.dataList=t}createBatterDataList(){return this.dataList.map(t=>{return t.reduce((t,e,n)=>(t[r[n]]=e,t),{})})}}},function(t,e){t.exports=["順位","名前","チーム","打率","試合","打席","打数","安打","二塁打","三塁打","本塁打","塁打","打点","得点","三振","四球","死球","犠打","犠飛","盗塁","盗塁死","併殺打","出塁率","長打率","OPS","得点圏","失策"]}]);