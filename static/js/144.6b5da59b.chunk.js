"use strict";(self.webpackChunkgoose_track=self.webpackChunkgoose_track||[]).push([[144],{5193:function(t,e,n){var r;n.d(e,{Z:function(){return d}});var o=n(9439),c=n(2791),i=n(9120),u=n(1537),a=n(162);function l(t,e,n,r,i){var u=c.useState((function(){return i&&n?n(t).matches:r?r(t).matches:e})),l=(0,o.Z)(u,2),s=l[0],f=l[1];return(0,a.Z)((function(){var e=!0;if(n){var r=n(t),o=function(){e&&f(r.matches)};return o(),r.addListener(o),function(){e=!1,r.removeListener(o)}}}),[t,n]),s}var s=(r||(r=n.t(c,2))).useSyncExternalStore;function f(t,e,n,r,i){var u=c.useCallback((function(){return e}),[e]),a=c.useMemo((function(){if(i&&n)return function(){return n(t).matches};if(null!==r){var e=r(t).matches;return function(){return e}}return u}),[u,t,r,i,n]),l=c.useMemo((function(){if(null===n)return[u,function(){return function(){}}];var e=n(t);return[function(){return e.matches},function(t){return e.addListener(t),function(){e.removeListener(t)}}]}),[u,n,t]),f=(0,o.Z)(l,2),d=f[0],v=f[1];return s(v,d,a)}function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=(0,i.Z)(),r="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,o=(0,u.Z)({name:"MuiUseMediaQuery",props:e,theme:n}),c=o.defaultMatches,a=void 0!==c&&c,d=o.matchMedia,v=void 0===d?r?window.matchMedia:null:d,m=o.ssrMatchMedia,h=void 0===m?null:m,p=o.noSsr,y=void 0!==p&&p;var w="function"===typeof t?t(n):t;w=w.replace(/^@media( ?)/m,"");var g=void 0!==s?f:l,b=g(w,a,v,h,y);return b}},9126:function(t,e,n){n.d(e,{kum:function(){return o}});var r=n(9983);function o(t){return(0,r.w_)({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"}}]})(t)}},9983:function(t,e,n){n.d(e,{w_:function(){return l}});var r=n(2791),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},c=r.createContext&&r.createContext(o),i=function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},i.apply(this,arguments)},u=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n};function a(t){return t&&t.map((function(t,e){return r.createElement(t.tag,i({key:e},t.attr),a(t.child))}))}function l(t){return function(e){return r.createElement(s,i({attr:i({},t.attr)},e),a(t.child))}}function s(t){var e=function(e){var n,o=t.attr,c=t.size,a=t.title,l=u(t,["attr","size","title"]),s=c||e.size||"1em";return e.className&&(n=e.className),t.className&&(n=(n?n+" ":"")+t.className),r.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,o,l,{className:n,style:i(i({color:t.color||e.color},e.style),t.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),a&&r.createElement("title",null,a),t.children)};return void 0!==c?r.createElement(c.Consumer,null,(function(t){return e(t)})):e(o)}}}]);
//# sourceMappingURL=144.6b5da59b.chunk.js.map