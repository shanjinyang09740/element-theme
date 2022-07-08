!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.netio=t():e.netio=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,r)=>{for(var s in r)e.o(r,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:r[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>g});var r={};e.r(r),e.d(r,{ajax:()=>f,arrayBuffer:()=>b,blob:()=>m,get:()=>p,html:()=>u,json:()=>y,post:()=>d,xml:()=>c});let s=new Map,o=1;const n=new DOMParser,l=e=>e instanceof i;class i extends class{constructor(e="Root"){this.eventName=`Event.${e}`}on(e,t){let r=`${Date.now()}-${o++}`;return s.has(e)||s.set(e,new Map),s.get(e).set(r,{callback:t,once:!1}),r}once(e,t){let r=`${Date.now()}-${o++}`;return s.has(e)||s.set(e,new Map),s.get(e).set(r,{callback:t,once:!0}),r}off(e,t){if(s.has(e)){let r=s.get(e);if(void 0===t)s.delete(e);else if("function"==typeof t)for(let[e,t]of r)t.callback===t&&r.delete(e);else r.delete(t)}}emit(e,t){if(s.has(e)){let r=s.get(e);for(let[e,s]of r)s.callback.call(this,t),s.once&&r.delete(e)}}}{constructor(e){super(),e=e instanceof NodeList?[...e]:[e],this.els=e,this.euid=Date.now(),this._remarkIndex()}_remarkIndex(){let e=0;if(this.length)for(;e<this.length;)delete this[e],e++;for(this._remarkLength(),e=0;e<this.length;)this[e]=this.els[e],e++}_remarkLength(){this.length=this.els.length}eq(e){return new i(this.els[e])}find(e){return a(e,this.els[0])}first(){return this.eq(0)}last(){return this.eq(this.length-1)}forEach(){Array.prototype.forEach.apply(this.els,arguments)}map(){Array.prototype.map.apply(this.els,arguments)}some(){Array.prototype.some.apply(this.els,arguments)}errey(){Array.prototype.errey.apply(this.els,arguments)}attr(e,t){if("object"==typeof e)for(var r in e)this.els.forEach((t=>{t.setAttribute(r,e[r])}));else{if(null==t)return this.els[0].getAttribute(e);this.els.forEach((r=>{r.setAttribute(e,t)}))}}css(e,t){if("object"==typeof e)for(var r in e)this.els.forEach((t=>{t.style[r]=e[r]}));else{if(null==t)return this.els[0].style[e];this.els.forEach((r=>{r.style[e]=t}))}}addClass(e){e=e.split(" "),this.els.forEach((t=>{t.classList.add(...e)}))}removeClass(e){e=e.split(" "),this.els.forEach((t=>{t.classList.remove(...e)}))}toggleClass(e){this.els.forEach((t=>{t.classList.toggle(e)}))}append(e){if(!e)return this;let t=e;return l(e)||(t=a(e)),t.forEach((e=>{this.els[0].append(e)})),this}appendTo(e){if(!e)return this;let t=e;return l(e)||(t=a(e)),this.els.forEach((e=>{t[0].append(e)})),this}prepend(e){if(!e)return this;let t=e;l(e)||(t=a(e));let r=this.els[0].firstChild;return t.forEach((e=>{this.els[0].insertBefore(e,r)})),this}prependTo(e){if(!e)return this;let t=e;l(e)||(t=a(e));let r=t[0].firstChild;return this.els.forEach((e=>{t[0].insertBefore(e,r)})),this}after(e){if(!e)return this;let t=e;l(e)||(t=a(e));let r=this.els[0].parentNode;return t.forEach((e=>{r.insertBefore(e,this.els[0].nextSibling)})),this}before(e){if(!e)return this;let t=e;l(e)||(t=a(e));let r=this.els[0].parentNode;return t.forEach((e=>{r.insertBefore(e,this.els[0])})),this}html(e){if(void 0===e)return this.els[0].innerHTML;this.els[0].innerHTML=e}}const a=(e,t)=>{if("string"==typeof e){if(e.startsWith("<")){let t=n.parseFromString(e,"text/html").body.childNodes;return new i(t)}return t=t||document,new i(t.querySelectorAll(e))}return new i(e)};window.$=a;const h=a,f=(new DOMParser,e=>{let t,{method:r="GET",url:s,headers:o,data:n,responseType:l,timeout:i}=e;if("GET"!=r&&"POST"!=r)return Promise.reject(new Error("Unkown KeyWord"));let a=new Promise(((e,a)=>{let h=new XMLHttpRequest;t=h,h.open(r,s,!0),i&&(h.timeout=i);for(let e in o)h.setRequestHeader(e,o);l&&(h.responseType=l),h.onreadystatechange=function(){if(h.readyState===XMLHttpRequest.DONE){var t=h.status;0===t||t>=200&&t<400?e(h.response):a(t)}},h.send(n)}));return a.xhr=t,a.abort=t.abort,a}),p=(e,t="text")=>f({method:"GET",url:e,responseType:t}),d=(e,t,r="text")=>f({method:"POST",url:e,data:t,responseType:r}),u=(e,t)=>f({method:t?"POST":"GET",url:e,data:t,responseType:"document"}),c=(e,t)=>f({method:t?"POST":"GET",url:e,data:t,responseType:"document"}),y=(e,t)=>f({method:t?"POST":"GET",url:e,data:t,responseType:"json"}),m=(e,t)=>f({method:t?"POST":"GET",url:e,data:t,responseType:"blob"}),b=(e,t)=>f({method:t?"POST":"GET",url:e,data:t,responseType:"arrayBuffer"});let T=new Object;T.__proto__.extends=e=>{for(let t in e)T.__proto__[t]=e[t]},T.extends(r),T.extends.call(h,r),T.$=h,window.WebNetIO=T;const g=T;return t})()}));
//# sourceMappingURL=netio.js.map