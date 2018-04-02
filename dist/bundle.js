!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),n=function(){function n(t){e(this,n),t&&(this.global=t)}return t(n,[{key:"get",value:function(e){try{return JSON.parse(this.global.getItem(e)||null)}catch(t){return this.global.getItem(e)}}},{key:"set",value:function(e,t){this.global.setItem(e,JSON.stringify(t))}},{key:"each",value:function(e){for(var t=this.global.length-1;t>=0;t--){var n=this.global.key(t);e(this.get(n),n)}}},{key:"remove",value:function(e){this.global.removeItem(e)}},{key:"clearAll",value:function(){this.global.clear()}}]),n}(),i=new n(window.localStorage);new n(window.sessionStorage);window.onload=function(){!function(e){if("function"==typeof e){var t="hidden";t in document?document.addEventListener("visibilitychange",n):(t="mozHidden")in document?document.addEventListener("mozvisibilitychange",n):(t="webkitHidden")in document?document.addEventListener("webkitvisibilitychange",n):(t="msHidden")in document?document.addEventListener("msvisibilitychange",n):"onfocusin"in document?document.onfocusin=document.onfocusout=n:window.onpageshow=window.onpagehide=window.onfocus=window.onblur=n,void 0!==document[t]&&n({type:document[t]?"blur":"focus"})}function n(n){var i="visible",o="hidden",a={focus:i,focusin:i,pageshow:i,blur:o,focusout:o,pagehide:o};e(),(n=n||window.event).type in a?document.body.className=a[n.type]:document.body.className=this[t]?"hidden":"visible"}}(function(){"hidden"===document.body.className&&window.calcTime.start(),"visible"===document.body.className&&window.calcTime.stop()})};var o=function(){function n(t){e(this,n),"function"==typeof t.callback&&(this.callback=t.callback),this.timespan=n.isNum(t.timespan),this.clearId=null,this.stay_sec=null,this.true_sec=null,this.start()}return t(n,[{key:"start",value:function(){this.clearId||this.interval()}},{key:"stop",value:function(){this.clearId&&(clearInterval(this.clearId),this.stay_sec+=Number(n.convert(this.isEffective("stay_sec"),!1)),i.set("stay_sec",{total_sec:n.convert(this.stay_sec,!0),timestamp:Math.round((new Date).getTime()/1e3)}),this.true_sec=this.stay_sec,this.clearId=null)}},{key:"interval",value:function(){var e=(new Date).getTime(),t=this;t.clearId=setInterval(function n(){var i=Math.round(((new Date).getTime()-e)/1e3);return t.stay_sec=i,t.true_sec=t.stay_sec,t.true_sec>0&&t.true_sec%t.timespan==0&&t.callback(),n}(),1e3)}},{key:"isEffective",value:function(e){var t=i.get(e);return t&&"timestamp"in t?n.checkDated(t.timestamp)?t.total_sec:(i.remove(e),null):null}}],[{key:"convert",value:function(e,t){return null==e?null:t?window.btoa&&window.btoa(e):window.atob&&window.atob(e)}},{key:"isNum",value:function(e){var t=Number(e);return!isNaN(t)&&t>10?t:10}},{key:"checkDated",value:function(e){var t=new Date(1e3*e),n=t.getFullYear(),i=t.getMonth()+1,o=t.getDate()+1,a=n+"-"+(i<10?"0"+i:i)+"-"+o+" 00:00:00";return Date.parse(a)/1e3>e}}]),n}();window.CalcTime=o});
