!function(e){function t(t){for(var i,r,a=t[0],c=t[1],h=t[2],l=0,f=[];l<a.length;l++)r=a[l],s[r]&&f.push(s[r][0]),s[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(u&&u(t);f.length;)f.shift()();return o.push.apply(o,h||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,a=1;a<n.length;a++){var c=n[a];0!==s[c]&&(i=!1)}i&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},s={0:0},o=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var h=0;h<a.length;h++)t(a[h]);var u=c;o.push([100,1]),n()}({100:function(e,t,n){"use strict";n.r(t);n(25),n(36),n(37),n(62),n(24),n(39),n(40),n(41),n(42),n(70),n(43);var i=n(13),s=n.n(i);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var u=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=a(this,c(t).call(this))).$canvas=document.querySelector(".canvas"),e.context=e.$canvas.getContext("2d"),e.$video=document.querySelector(".camera"),e.$captureButton=document.querySelector(".js-capture"),e.startCamera(),e.bind(),e}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,s.a),n=t,(i=[{key:"bind",value:function(){var e=this;this.$captureButton.addEventListener("click",function(){e.renderCameraImageInCanvas()})}},{key:"startCamera",value:function(){var e=this;navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:300,height:300},audio:!1}).then(function(t){e.$video.srcObject=t}).catch(function(t){console.log(e.$video),alert(t)})}},{key:"stopCamera",value:function(){this.$video.srcObject.getTracks().forEach(function(e){e.stop()}),this.$video.srcObject=null}},{key:"renderCameraImageInCanvas",value:function(){var e=this.$video.offsetWidth,t=this.$video.offsetHeight;this.context.drawImage(this.$video,0,0,e,t),this.$video.classList.add("js-hide"),this.$captureButton.classList.add("js-hide"),this.stopCamera(),this.emit("renderCameraImage",this.context)}}])&&r(n.prototype,i),o&&r(n,o),t}();n(88),n(89),n(95),n(97),n(73),n(98);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function v(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var m=function e(t,n){k(this,e),this.id=n,this.src="./images/sticker/sticker".concat(t,".png"),this.leftTopPoint={x:100,y:100},this.width=100,this.height=100},y=function(e){function t(e){var n;return k(this,t),(n=v(this,p(t).call(this))).$canvas=document.querySelector(".canvas"),n.context=n.$canvas.getContext("2d"),n.$offScreen=document.createElement("canvas"),n.$offScreen.width=n.$canvas.width,n.$offScreen.height=n.$canvas.height,n.offScreenContext=n.$offScreen.getContext("2d"),n.$backImageScreen=document.createElement("canvas"),n.$backImageScreen.width=n.$canvas.width,n.$backImageScreen.height=n.$canvas.height,n.backImageScreenContext=n.$backImageScreen.getContext("2d"),n.backImageScreenContext.putImageData(e,0,0),n.context.drawImage(n.$backImageScreen,0,0,300,300),n.$stickerWrapper=document.querySelector(".sticker-wrapper"),n.$stickers=document.querySelectorAll(".js-sticker"),n.$removeStickerButton=document.querySelector(".js-removeSticker"),n.$createImageButton=document.querySelector(".js-createImageButton"),n.diff={x:0,y:0},n.diffX=0,n.diffY=0,n.lastScreenX=0,n.lastScreenY=0,n.isStickerTouched=!1,n.stickerId=0,n.activeStickerId=0,n.stickersOnCanvas=[],n.stickerPosition_past={x:0,y:0},n.stickerSize_past={width:0,height:0},n.aspect=1,n.RANGE_OFFSET=15,n.LEFT_LINE=1,n.BOTTOM_LINE=2,n.RIGHT_LINE=4,n.TOP_LINE=8,n.LEFT_TOP_POINT=n.LEFT_LINE+n.TOP_LINE,n.LEFT_BOTTOM_POINT=n.LEFT_LINE+n.BOTTOM_LINE,n.RIGHT_BOTTOM_POINT=n.RIGHT_LINE+n.BOTTOM_LINE,n.RIGHT_TOP_POINT=n.RIGHT_LINE+n.TOP_LINE,n.clickProperty=0,n.$stickerWrapper.classList.remove("js-hide"),n.$removeStickerButton.classList.remove("js-hide"),n.$createImageButton.classList.remove("js-hide"),n.bind(),n}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,s.a),n=t,(i=[{key:"bind",value:function(){var e=this;this.$canvas.addEventListener("mousedown",function(t){e.handleMouseDown(t)}),this.$canvas.addEventListener("mousemove",function(t){e.handleMouseMove(t)}),document.addEventListener("mouseup",function(t){e.handleMouseUp(t)}),this.$canvas.addEventListener("touchstart",function(t){e.handleTouchStart(t)}),this.$canvas.addEventListener("touchmove",function(t){e.handleTouchMove(t)}),document.addEventListener("touchend",function(t){e.handleTouchEnd(t)}),f(this.$stickers).forEach(function(t){t.addEventListener("click",function(n){e.handleClickStickerList(t,n)})}),this.$removeStickerButton.addEventListener("click",function(t){t.preventDefault(),e.stickersOnCanvas.splice(e.stickersOnCanvas.length-1,1),e.renderStickers()}),this.$createImageButton.addEventListener("click",function(){e.renderOutputImage(),e.$stickerWrapper.classList.add("js-hide"),e.$removeStickerButton.classList.add("js-hide"),e.$createImageButton.classList.add("js-hide"),e.createImage(),document.querySelector(".image-wrapper").classList.remove("js-hide")})}},{key:"handleMouseDown",value:function(e){this.singleTouchStart(e)}},{key:"handleMouseMove",value:function(e){this.singleTouchMove(e)}},{key:"handleMouseUp",value:function(){this.isStickerTouched=!1,this.clickProperty=0}},{key:"handleTouchStart",value:function(e){var t=e.touches;e.preventDefault(),1===t.length?this.singleTouchStart(e):(this.doubleTouchStart(e),this.isDoubleTouched=!0),this.isTouched=!0}},{key:"handleTouchMove",value:function(e){if(this.isTouched){var t=e.touches;1===t.length?this.singleTouchMove(e):t.length>=2&&this.isDoubleTouched&&this.doubleTouchMove(e)}}},{key:"handleTouchEnd",value:function(){this.handleMouseUp(),this.isTouched=!1,this.isDoubleTouched=!1}},{key:"singleTouchStart",value:function(e){var t="touchstart"===e.type?e.touches[0].screenX:e.screenX,n="touchstart"===e.type?e.touches[0].screenY:e.screenY;this.lastScreenX=t,this.lastScreenY=n,this.isStickerTouched=this.judgeWhereClickOnTheSticker(e),this.isStickerTouched&&(this.decideOperatedSticker(e),this.renderStickers())}},{key:"singleTouchMove",value:function(e){if(!1!==this.isStickerTouched){var t="touchmove"===e.type?e.touches[0].screenX:e.screenX,n="touchmove"===e.type?e.touches[0].screenY:e.screenY;this.diffX=t-this.lastScreenX,this.diffY=n-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.operateSticker(e),this.renderStickers(),this.lastScreenX=t,this.lastScreenY=n}}},{key:"doubleTouchStart",value:function(e){var t=e.touches,n=t[0].screenX,i=t[1].screenX,s=t[0].screenY,o=t[1].screenY;this.lastScreenX=(i+n)/2,this.lastScreenY=(o+s)/2,this.lastLength=Math.hypot(i-n,o-s),this.isDoubleTouched=!0}},{key:"doubleTouchMove",value:function(e){console.log("doubleTouchMove  Start");var t=e.touches,n=t[0].screenX,i=t[1].screenX,s=t[0].screenY,o=t[1].screenY,r=(i+n)/2,a=(o+s)/2,c=Math.hypot(i-n,o-s),h=c/this.lastLength;this.diffX=r-this.lastScreenX,this.diffY=a-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.pinchSticker(h),this.moveSticker(),this.renderStickers(),this.lastLength=c,this.lastScreenX=r,this.lastScreenY=a}},{key:"judgeWhereClickOnTheSticker",value:function(e){console.log(e);for(var t=e.target.getBoundingClientRect(),n="touchstart"===e.type?e.touches[0].clientX-window.pageXOffset-t.left:e.offsetX,i="touchstart"===e.type?e.touches[0].clientY-window.pageYOffset-t.top:e.offsetY,s=!1,o=0,r=this.stickersOnCanvas.length;o<r;o++){var a=this.stickersOnCanvas[o],c=a.leftTopPoint.x,h=a.leftTopPoint.x+a.width,u=a.leftTopPoint.y,l=a.leftTopPoint.y+a.height;o===this.stickersOnCanvas.length-1&&(c-=this.RANGE_OFFSET,h+=this.RANGE_OFFSET,u-=this.RANGE_OFFSET,l+=this.RANGE_OFFSET),c<=n&&n<=h&&u<=i&&i<=l?(this.activeStickerId=a.id,o===this.stickersOnCanvas.length-1&&this.judgeClickOnTheLine(n,i,c,h,u,l),console.log("onSticker"),s=!0):console.log("notOnSticker")}return s}},{key:"judgeClickOnTheLine",value:function(e,t,n,i,s,o){this.judgeLeftLine(e,n),this.judgeBottomLine(t,o),this.judgeRightLine(e,i),this.judgeTopLine(t,s)}},{key:"judgeLeftLine",value:function(e,t){t<=e&&e<=t+2*this.RANGE_OFFSET&&(this.clickProperty+=this.LEFT_LINE)}},{key:"judgeBottomLine",value:function(e,t){t-2*this.RANGE_OFFSET<=e&&e<=t&&(this.clickProperty+=this.BOTTOM_LINE)}},{key:"judgeRightLine",value:function(e,t){t-2*this.RANGE_OFFSET<=e&&e<=t&&(this.clickProperty+=this.RIGHT_LINE)}},{key:"judgeTopLine",value:function(e,t){t<=e&&e<=t+2*this.RANGE_OFFSET&&(this.clickProperty+=this.TOP_LINE)}},{key:"operateSticker",value:function(e){var t=e.target.getBoundingClientRect(),n="touchmove"===e.type?e.touches[0].clientX-window.pageXOffset-t.left:e.offsetX,i="touchmove"===e.type?e.touches[0].clientY-window.pageYOffset-t.top:e.offsetY;0===this.clickProperty?this.moveSticker():this.resizeSticker(n,i)}},{key:"decideOperatedSticker",value:function(){var e=this,t=this.stickersOnCanvas.findIndex(function(t){return t.id===e.activeStickerId}),n=this.stickersOnCanvas[t];this.stickersOnCanvas.splice(t,1),this.stickersOnCanvas.push(n),this.stickerPosition_past.x=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x,this.stickerPosition_past.y=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y,this.stickerSize_past.width=this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickerSize_past.height=this.stickersOnCanvas[this.stickersOnCanvas.length-1].height}},{key:"moveSticker",value:function(){this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x+=this.diffX,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y+=this.diffY}},{key:"pinchSticker",value:function(e){var t=this.stickersOnCanvas[this.stickersOnCanvas.length-1],n=t.width*e-t.width,i=t.height*e-t.height;this.stickersOnCanvas[this.stickersOnCanvas.length-1].width*=e,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height*=e,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x-=n/2,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y-=i/2}},{key:"resizeSticker",value:function(e,t){switch(this.clickProperty){case this.LEFT_TOP_POINT:console.log("left top point"),this.resizeHandleLeftTop(e,t);break;case this.LEFT_BOTTOM_POINT:console.log("left bottom point"),this.resizeHandleLeftBottom(e,t);break;case this.RIGHT_BOTTOM_POINT:console.log("right bottom point"),this.resizeHandleRightBottom(e,t);break;case this.RIGHT_TOP_POINT:console.log("right top point"),this.resizeHandleRightTop(e,t)}}},{key:"resizeHandleLeftTop",value:function(e,t){var n=this.stickersOnCanvas[this.stickersOnCanvas.length-1],i=n.width+n.leftTopPoint.x,s=n.height+n.leftTopPoint.y,o=i-e,r=s-t;this.adjustSizing(o,r),this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=i-this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=s-this.stickersOnCanvas[this.stickersOnCanvas.length-1].height}},{key:"resizeHandleLeftBottom",value:function(e,t){var n=this.stickersOnCanvas[this.stickersOnCanvas.length-1],i=n.width+n.leftTopPoint.x,s=i-e,o=t-n.leftTopPoint.y;this.adjustSizing(s,o),this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=i-this.stickersOnCanvas[this.stickersOnCanvas.length-1].width}},{key:"resizeHandleRightBottom",value:function(e,t){var n=this.stickersOnCanvas[this.stickersOnCanvas.length-1],i=e-n.leftTopPoint.x,s=t-n.leftTopPoint.y;this.adjustSizing(i,s)}},{key:"resizeHandleRightTop",value:function(e,t){var n=this.stickersOnCanvas[this.stickersOnCanvas.length-1],i=n.height+n.leftTopPoint.y,s=e-n.leftTopPoint.x,o=i-t;this.adjustSizing(s,o),this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=i-this.stickersOnCanvas[this.stickersOnCanvas.length-1].height}},{key:"adjustSize",value:function(e,t){arguments.length>2&&void 0!==arguments[2]&&arguments[2],arguments.length>3&&void 0!==arguments[3]&&arguments[3];var n=this.stickersOnCanvas.length-1;console.log(e);var i=Math.max(e,3*this.RANGE_OFFSET),s=Math.max(t,3*this.RANGE_OFFSET);e>=t?(this.stickersOnCanvas[n].width=i,this.stickersOnCanvas[n].height=i*this.aspect):(this.stickersOnCanvas[n].height=s,this.stickersOnCanvas[n].width=s*this.aspect)}},{key:"handleClickStickerList",value:function(e,t){t.preventDefault(),this.addSticker(e),this.renderStickers()}},{key:"addSticker",value:function(e){var t=new m(e.dataset.stickerNum,this.stickerId);this.stickersOnCanvas.push(t),this.activeStickerId=this.stickerId,this.stickerId++}},{key:"renderStickers",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var e=new Image,t="grey",n=2,i=0,s=this.stickersOnCanvas.length;i<s;i++){i===s-1&&(t="white",n=3),e.src=this.stickersOnCanvas[i].src;var o=this.stickersOnCanvas[i].leftTopPoint.x,r=this.stickersOnCanvas[i].leftTopPoint.y,a=this.stickersOnCanvas[i].width,c=this.stickersOnCanvas[i].height;this.offScreenContext.drawImage(e,o,r,a,c),this.drawFrameLine(o,r,a,c,t),this.drawCornerMark(o,r,a,c,n)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"drawFrameLine",value:function(e,t,n,i,s){this.offScreenContext.strokeStyle=s,this.offScreenContext.beginPath(),this.offScreenContext.strokeRect(e,t,n,i)}},{key:"drawCornerMark",value:function(e,t,n,i,s){this.offScreenContext.strokeStyle="black",this.offScreenContext.fillStyle="white",this.drawArc(e,t,s),this.drawArc(e,t+i,s),this.drawArc(e+n,t,s),this.drawArc(e+n,t+i,s)}},{key:"drawArc",value:function(e,t,n){this.offScreenContext.beginPath(),this.offScreenContext.arc(e,t,n,0,2*Math.PI,!1),this.offScreenContext.stroke()}},{key:"renderOutputImage",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var e=new Image,t=0,n=this.stickersOnCanvas.length;t<n;t++){e.src=this.stickersOnCanvas[t].src;var i=this.stickersOnCanvas[t].leftTopPoint.x,s=this.stickersOnCanvas[t].leftTopPoint.y,o=this.stickersOnCanvas[t].width,r=this.stickersOnCanvas[t].height;this.offScreenContext.drawImage(e,i,s,o,r)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"createImage",value:function(){var e=this.$canvas.toDataURL();document.querySelector(".image").src=e}}])&&d(n.prototype,i),o&&d(n,o),t}();function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function T(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var w=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=T(this,b(t).call(this))).$canvas=document.querySelector(".canvas"),e.context=e.$canvas.getContext("2d"),e.$offScreen=document.createElement("canvas"),e.$offScreen.width=e.$canvas.width,e.$offScreen.height=e.$canvas.height,e.offScreenContext=e.$offScreen.getContext("2d"),e.$scaleUpButton=document.querySelector(".js-scaleUp"),e.$scaleDownButton=document.querySelector(".js-scaleDown"),e.$scaleOkButton=document.querySelector(".js-scaleOk"),e}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(t,s.a),n=t,(i=[{key:"init",value:function(e){this.$scaleUpButton.classList.remove("js-hide"),this.$scaleDownButton.classList.remove("js-hide"),this.$scaleOkButton.classList.remove("js-hide"),this.originalImage=e,this.imageWidth=300,this.imageHeight=300,this.lastTranslateX=0,this.lastTranslateY=0,this.lastScreenX=0,this.lastScreenY=0,this.diffX=0,this.diffY=0,this.lastLength=0,this.lastScale=1,this.positionX=0,this.positionY=0,this.renderWidth=0,this.renderHeight=0,this.isTouched=!1,this.isDoubleTouched=!1,this.bind()}},{key:"bind",value:function(){var e=this;this.handlers={mousedown:this.handleMouseDown.bind(this),mousemove:this.handleMouseMove.bind(this),mouseup:this.handleMouseUp.bind(this),touchstart:this.handleTouchStart.bind(this),touchmove:this.handleTouchMove.bind(this),touchend:this.handleTouchEnd.bind(this)},this.$canvas.addEventListener("mousedown",this.handlers.mousedown),this.$canvas.addEventListener("mousemove",this.handlers.mousemove),document.addEventListener("mouseup",this.handlers.mouseup),this.$canvas.addEventListener("touchstart",this.handlers.touchstart),this.$canvas.addEventListener("touchmove",this.handlers.touchmove),document.addEventListener("touchend",this.handlers.touchend),this.$scaleUpButton.addEventListener("click",function(t){t.preventDefault();e.resize(1.1),e.render()}),this.$scaleDownButton.addEventListener("click",function(t){t.preventDefault();e.resize(1/1.1),e.render()}),this.$scaleOkButton.addEventListener("click",function(){e.$scaleUpButton.classList.add("js-hide"),e.$scaleDownButton.classList.add("js-hide"),e.$scaleOkButton.classList.add("js-hide"),e.$canvas.removeEventListener("mousedown",e.handlers.mousedown),e.$canvas.removeEventListener("mousemove",e.handlers.mousemove),document.removeEventListener("mouseup",e.handlers.mouseup),e.$canvas.removeEventListener("touchstart",e.handlers.touchstart),e.$canvas.removeEventListener("touchmove",e.handlers.touchmove),document.removeEventListener("touchend",e.handlers.mouseup),e.emit("requestedRenderSticker",e.context)})}},{key:"handleMouseDown",value:function(e){var t=e.screenX,n=e.screenY;this.lastScreenX=t,this.lastScreenY=n,this.isTouched=!0}},{key:"handleMouseMove",value:function(e){this.isTouched&&this.singleTouchMove(e)}},{key:"handleMouseUp",value:function(){this.resetValues()}},{key:"resetValues",value:function(){this.isTouched=!1,this.isDoubleTouched=!1,this.lastTranslateX=0,this.lastTranslateY=0,this.diffX=0,this.diffY=0,this.lastScreenX=0,this.lastScreenY=0}},{key:"handleTouchStart",value:function(e){var t=e.touches;e.preventDefault(),1===t.length?this.singleTouchStart(e):(this.doubleTouchStart(e),this.isDoubleTouched=!0),this.isTouched=!0}},{key:"handleTouchMove",value:function(e){if(this.isTouched){var t=e.touches;1===t.length?this.singleTouchMove(e):t.length>=2&&this.isDoubleTouched&&this.doubleTouchMove(e)}}},{key:"handleTouchEnd",value:function(){this.resetValues()}},{key:"singleTouchStart",value:function(e){var t=e.touches;this.lastScreenX=t[0].screenX,this.lastScreenY=t[0].screenY}},{key:"doubleTouchStart",value:function(e){var t=e.touches,n=t[0].screenX,i=t[1].screenX,s=t[0].screenY,o=t[1].screenY;this.lastLength=Math.hypot(i-n,o-s),this.lastScreenX=(i+n)/2,this.lastScreenY=(o+s)/2,this.isDoubleTouched=!0}},{key:"singleTouchMove",value:function(e){var t="touchmove"===e.type?e.touches[0].screenX:e.screenX,n="touchmove"===e.type?e.touches[0].screenY:e.screenY;this.diffX=t-this.lastScreenX,this.diffY=n-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.moveImage(),this.render(),this.lastScreenX=t,this.lastScreenY=n}},{key:"doubleTouchMove",value:function(e){var t=e.touches,n=t[0].screenX,i=t[1].screenX,s=t[0].screenY,o=t[1].screenY,r=(i+n)/2,a=(o+s)/2,c=Math.hypot(i-n,o-s),h=c/this.lastLength;this.diffX=r-this.lastScreenX,this.diffY=a-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.resize(h),this.moveImage(),this.render(),this.lastLength=c,this.lastScreenX=r,this.lastScreenY=a}},{key:"resize",value:function(e){var t=this.lastScale*e,n=this.positionX+this.imageWidth*this.lastScale/2-150,i=this.positionY+this.imageHeight*this.lastScale/2-150;this.renderWidth=this.imageWidth*t,this.renderHeight=this.imageHeight*t,this.positionX=e*n-this.renderWidth/2+150,this.positionY=e*i-this.renderHeight/2+150,this.lastScale=t}},{key:"moveImage",value:function(){this.positionX+=this.diffX,this.positionY+=this.diffY,this.renderWidth=this.imageWidth*this.lastScale,this.renderHeight=this.imageHeight*this.lastScale}},{key:"adjustSize",value:function(){}},{key:"render",value:function(){this.adjustSize(),this.context.clearRect(0,0,300,300),this.offScreenContext.putImageData(this.originalImage,0,0),this.context.drawImage(this.$offScreen,this.positionX,this.positionY,this.renderWidth,this.renderHeight)}}])&&O(n.prototype,i),o&&O(n,o),t}();function E(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.camera=new u,this.imageEdit=new w,this.$canvas=document.querySelector(".canvas"),this.context=this.$canvas.getContext("2d"),this.originalImage=null,this.bind()}var t,n,i;return t=e,(n=[{key:"bind",value:function(){var e=this;this.camera.on("renderCameraImage",function(t){e.originalImage=t.getImageData(0,0,300,300),e.imageEdit.init(e.originalImage)}),this.imageEdit.on("requestedRenderSticker",function(t){e.originalImage=t.getImageData(0,0,300,300),e.sticker=new y(e.originalImage)})}}])&&E(t.prototype,n),i&&E(t,i),e}())}});