!function(t){function e(e){for(var i,a,o=e[0],c=e[1],h=e[2],l=0,f=[];l<o.length;l++)a=o[l],n[a]&&f.push(n[a][0]),n[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);for(u&&u(e);f.length;)f.shift()();return r.push.apply(r,h||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],i=!0,o=1;o<s.length;o++){var c=s[o];0!==n[c]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=s[0]))}return t}var i={},n={0:0},r=[];function a(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=i,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(s,i,function(e){return t[e]}.bind(null,i));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var h=0;h<o.length;h++)e(o[h]);var u=c;r.push([100,1]),s()}({100:function(t,e,s){"use strict";s.r(e);s(25),s(36),s(37),s(62),s(24),s(39),s(40),s(41),s(42),s(70),s(43);var i=s(13),n=s.n(i);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var u=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=o(this,c(e).call(this))).$canvas=document.querySelector(".canvas"),t.context=t.$canvas.getContext("2d"),t.$video=document.querySelector(".camera"),t.$captureButton=document.querySelector(".js-capture"),t.startCamera(),t.bind(),t}var s,i,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(e,n.a),s=e,(i=[{key:"bind",value:function(){var t=this;this.$captureButton.addEventListener("click",function(){t.renderCameraImageInCanvas()})}},{key:"startCamera",value:function(){var t=this;navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:300,height:300},audio:!1}).then(function(e){t.$video.srcObject=e}).catch(function(e){console.log(t.$video),alert(e)})}},{key:"stopCamera",value:function(){this.$video.srcObject.getTracks().forEach(function(t){t.stop()}),this.$video.srcObject=null}},{key:"renderCameraImageInCanvas",value:function(){var t=this.$video.offsetWidth,e=this.$video.offsetHeight;this.context.drawImage(this.$video,0,0,t,e),this.$video.classList.add("js-hide"),this.$captureButton.classList.add("js-hide"),this.stopCamera(),this.emit("renderCameraImage",this.context)}}])&&a(s.prototype,i),r&&a(s,r),e}();s(87),s(88),s(94),s(96),s(97);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t){return function(t){if(Array.isArray(t)){for(var e=0,s=new Array(t.length);e<t.length;e++)s[e]=t[e];return s}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function v(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function g(t,e){return(g=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var m=function t(e,s){p(this,t),this.id=s,this.src="./images/sticker/sticker".concat(e,".png"),this.leftTopPoint={x:100,y:100},this.width=100,this.height=100},y=function(t){function e(t){var s;return p(this,e),(s=v(this,k(e).call(this))).$canvas=document.querySelector(".canvas"),s.context=s.$canvas.getContext("2d"),s.$offScreen=document.createElement("canvas"),s.$offScreen.width=s.$canvas.width,s.$offScreen.height=s.$canvas.height,s.offScreenContext=s.$offScreen.getContext("2d"),s.$backImageScreen=document.createElement("canvas"),s.$backImageScreen.width=s.$canvas.width,s.$backImageScreen.height=s.$canvas.height,s.backImageScreenContext=s.$backImageScreen.getContext("2d"),s.backImageScreenContext.putImageData(t,0,0),s.context.drawImage(s.$backImageScreen,0,0,300,300),s.$stickerWrapper=document.querySelector(".sticker-wrapper"),s.$stickers=document.querySelectorAll(".js-sticker"),s.$removeStickerButton=document.querySelector(".js-removeSticker"),s.$createImageButton=document.querySelector(".js-createImageButton"),s.pointerPosition={startX:0,startY:0,startSecondX:0,startSecondY:0,currentX:0,currentY:0,currentSecondX:0,currentSecondY:0},s.diff={x:0,y:0},s.isStickerTouched=!1,s.stickerId=0,s.activeStickerId=0,s.stickersOnCanvas=[],s.stickerPosition_past={x:0,y:0},s.stickerSize_past={width:0,height:0},s.RANGE_OFFSET=5,s.LEFT_LINE=1,s.BOTTOM_LINE=2,s.RIGHT_LINE=4,s.TOP_LINE=8,s.LEFT_TOP_POINT=s.LEFT_LINE+s.TOP_LINE,s.LEFT_BOTTOM_POINT=s.LEFT_LINE+s.BOTTOM_LINE,s.RIGHT_BOTTOM_POINT=s.RIGHT_LINE+s.BOTTOM_LINE,s.RIGHT_TOP_POINT=s.RIGHT_LINE+s.TOP_LINE,s.clickProperty=0,s.$stickerWrapper.classList.remove("js-hide"),s.$removeStickerButton.classList.remove("js-hide"),s.$createImageButton.classList.remove("js-hide"),s.bind(),s}var s,i,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&g(t,e)}(e,n.a),s=e,(i=[{key:"bind",value:function(){var t=this;this.$canvas.addEventListener("mousedown",function(e){t.handleMouseDown(e)}),this.$canvas.addEventListener("mousemove",function(e){t.handleMouseMove(e)}),document.addEventListener("mouseup",function(e){t.handleMouseUp(e)}),f(this.$stickers).forEach(function(e){e.addEventListener("click",function(s){t.handleClickStickerList(e,s)})}),this.$removeStickerButton.addEventListener("click",function(){t.stickersOnCanvas.splice(t.stickersOnCanvas.length-1,1),t.renderStickers()}),this.$createImageButton.addEventListener("click",function(){t.renderOutputImage(),t.$stickerWrapper.classList.add("js-hide"),t.$removeStickerButton.classList.add("js-hide"),t.$createImageButton.classList.add("js-hide"),t.createImage(),document.querySelector(".image-wrapper").classList.remove("js-hide")})}},{key:"handleMouseDown",value:function(t){var e=t.screenX,s=t.screenY;this.pointerPosition.startX=e,this.pointerPosition.startY=s,this.isStickerTouched=this.judgeWhereClickOnTheSticker(t),this.isStickerTouched&&(this.decideOperatedSticker(t),this.renderStickers())}},{key:"handleMouseMove",value:function(t){if(!1!==this.isStickerTouched){var e=t.screenX,s=t.screenY;this.pointerPosition.currentX=e,this.pointerPosition.currentY=s,this.diff.x=e-this.pointerPosition.startX,this.diff.y=s-this.pointerPosition.startY,this.operateSticker(),this.renderStickers()}}},{key:"handleMouseUp",value:function(){this.isStickerTouched=!1,this.pointerPosition.startX=0,this.pointerPosition.startY=0,this.pointerPosition.currentX=0,this.pointerPosition.currentY=0,this.clickProperty=0}},{key:"judgeWhereClickOnTheSticker",value:function(t){for(var e=!1,s=0;s<this.stickersOnCanvas.length;s++){var i=this.stickersOnCanvas[s],n=i.leftTopPoint.x,r=i.leftTopPoint.x+i.width,a=i.leftTopPoint.y,o=i.leftTopPoint.y+i.height;s===this.stickersOnCanvas.length-1&&(n-=this.RANGE_OFFSET,r+=this.RANGE_OFFSET,a-=this.RANGE_OFFSET,o+=this.RANGE_OFFSET),n<=t.offsetX&&t.offsetX<=r&&a<=t.offsetY&&t.offsetY<=o?(this.activeStickerId=i.id,s===this.stickersOnCanvas.length-1&&this.judgeClickOnTheLine(t,n,r,a,o),console.log("onSticker"),e=!0):console.log("notOnSticker")}return e}},{key:"judgeClickOnTheLine",value:function(t,e,s,i,n){this.judgeLeftLine(t.offsetX,e),this.judgeBottomLine(t.offsetY,n),this.judgeRightLine(t.offsetX,s),this.judgeTopLine(t.offsetY,i)}},{key:"judgeLeftLine",value:function(t,e){e<=t&&t<=e+2*this.RANGE_OFFSET&&(this.clickProperty+=this.LEFT_LINE)}},{key:"judgeBottomLine",value:function(t,e){e-2*this.RANGE_OFFSET<=t&&t<=e&&(this.clickProperty+=this.BOTTOM_LINE)}},{key:"judgeRightLine",value:function(t,e){e-2*this.RANGE_OFFSET<=t&&t<=e&&(this.clickProperty+=this.RIGHT_LINE)}},{key:"judgeTopLine",value:function(t,e){e<=t&&t<=e+2*this.RANGE_OFFSET&&(this.clickProperty+=this.TOP_LINE)}},{key:"operateSticker",value:function(){0===this.clickProperty?this.moveSticker():this.resizeSticker()}},{key:"decideOperatedSticker",value:function(){var t=this,e=this.stickersOnCanvas.findIndex(function(e){return e.id===t.activeStickerId}),s=this.stickersOnCanvas[e];this.stickersOnCanvas.splice(e,1),this.stickersOnCanvas.push(s),this.stickerPosition_past.x=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x,this.stickerPosition_past.y=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y,this.stickerSize_past.width=this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickerSize_past.height=this.stickersOnCanvas[this.stickersOnCanvas.length-1].height}},{key:"moveSticker",value:function(){this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.diff.x+this.stickerPosition_past.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.diff.y+this.stickerPosition_past.y}},{key:"resizeSticker",value:function(){switch(this.clickProperty){case this.LEFT_TOP_POINT:this.resizeHandleLeftTop();break;case this.LEFT_BOTTOM_POINT:this.resizeHandleLeftBottom();break;case this.RIGHT_BOTTOM_POINT:this.resizeHandleRightBottom();break;case this.RIGHT_TOP_POINT:this.resizeHandleRightTop()}}},{key:"resizeHandleLeftTop",value:function(){-this.diff.y<=-this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+-this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+-this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.y)}},{key:"resizeHandleLeftBottom",value:function(){this.diff.y<=-this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+-this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+-this.diff.y)}},{key:"resizeHandleRightBottom",value:function(){this.diff.y<=this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height)}},{key:"resizeHandleRightTop",value:function(){-this.diff.y<=this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+-this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+-this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.y)}},{key:"handleClickStickerList",value:function(t,e){this.addSticker(t),this.renderStickers()}},{key:"addSticker",value:function(t){var e=new m(t.dataset.stickerNum,this.stickerId);this.stickersOnCanvas.push(e),this.activeStickerId=this.stickerId,this.stickerId++}},{key:"renderStickers",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var t=new Image,e="grey",s=2,i=0;i<this.stickersOnCanvas.length;i++){i===this.stickersOnCanvas.length-1&&(e="white",s=3),t.src=this.stickersOnCanvas[i].src;var n=this.stickersOnCanvas[i].leftTopPoint.x,r=this.stickersOnCanvas[i].leftTopPoint.y,a=this.stickersOnCanvas[i].width,o=this.stickersOnCanvas[i].height;this.offScreenContext.drawImage(t,n,r,a,o),this.drawFrameLine(n,r,a,o,e),this.drawCornerMark(n,r,a,o,s)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"drawFrameLine",value:function(t,e,s,i,n){this.offScreenContext.strokeStyle=n,this.offScreenContext.beginPath(),this.offScreenContext.strokeRect(t,e,s,i)}},{key:"drawCornerMark",value:function(t,e,s,i,n){this.offScreenContext.strokeStyle="black",this.offScreenContext.fillStyle="white",this.drawArc(t,e,n),this.drawArc(t,e+i,n),this.drawArc(t+s,e,n),this.drawArc(t+s,e+i,n)}},{key:"drawArc",value:function(t,e,s){this.offScreenContext.beginPath(),this.offScreenContext.arc(t,e,s,0,2*Math.PI,!1),this.offScreenContext.stroke()}},{key:"renderOutputImage",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var t=new Image,e=0;e<this.stickersOnCanvas.length;e++){t.src=this.stickersOnCanvas[e].src;var s=this.stickersOnCanvas[e].leftTopPoint.x,i=this.stickersOnCanvas[e].leftTopPoint.y,n=this.stickersOnCanvas[e].width,r=this.stickersOnCanvas[e].height;this.offScreenContext.drawImage(t,s,i,n,r)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"createImage",value:function(){var t=this.$canvas.toDataURL();document.querySelector(".image").src=t}}])&&d(s.prototype,i),r&&d(s,r),e}();s(99);function O(t){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function S(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function C(t,e){return!e||"object"!==O(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var w=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=C(this,T(e).call(this))).$canvas=document.querySelector(".canvas"),t.context=t.$canvas.getContext("2d"),t.$offScreen=document.createElement("canvas"),t.$offScreen.width=t.$canvas.width,t.$offScreen.height=t.$canvas.height,t.offScreenContext=t.$offScreen.getContext("2d"),t.$scaleUpButton=document.querySelector(".js-scaleUp"),t.$scaleDownButton=document.querySelector(".js-scaleDown"),t.$scaleOkButton=document.querySelector(".js-scaleOk"),t}var s,i,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,n.a),s=e,(i=[{key:"init",value:function(t){this.$scaleUpButton.classList.remove("js-hide"),this.$scaleDownButton.classList.remove("js-hide"),this.$scaleOkButton.classList.remove("js-hide"),this.originalImage=t,this.imageWidth=300,this.imageHeight=300,this.scale=1,this.lastScale=1,this.imagePosition={x:0,y:0},this.lastTranslateX=0,this.lastTranslateY=0,this.lastScreenX=0,this.lastScreenY=0,this.diffX=0,this.diffY=0,this.lastLength=0,this.isTouched=!1,this.isDoubleTouched=!1,this.bind()}},{key:"bind",value:function(){var t=this;this.handlers={mousedown:this.handleMouseDown.bind(this),mousemove:this.handleMouseMove.bind(this),mouseup:this.handleMouseUp.bind(this),touchstart:this.handleTouchStart.bind(this),touchmove:this.handleTouchMove.bind(this),touchend:this.handleTouchEnd.bind(this)},this.$canvas.addEventListener("mousedown",this.handlers.mousedown),this.$canvas.addEventListener("mousemove",this.handlers.mousemove),document.addEventListener("mouseup",this.handlers.mouseup),this.$canvas.addEventListener("touchstart",this.handlers.touchstart),this.$canvas.addEventListener("touchmove",this.handlers.touchmove),document.addEventListener("touchend",this.handlers.touchend),this.$scaleUpButton.addEventListener("click",function(e){t.lastScale=t.scale,t.scale*=1.1,e.preventDefault(),t.resize()}),this.$scaleDownButton.addEventListener("click",function(e){t.lastScale=t.scale,t.scale/=1.1,e.preventDefault(),t.resize()}),this.$scaleOkButton.addEventListener("click",function(){t.$scaleUpButton.classList.add("js-hide"),t.$scaleDownButton.classList.add("js-hide"),t.$scaleOkButton.classList.add("js-hide"),t.$canvas.removeEventListener("mousedown",t.handlers.mousedown),t.$canvas.removeEventListener("mousemove",t.handlers.mousemove),document.removeEventListener("mouseup",t.handlers.mouseup),t.$canvas.removeEventListener("touchstart",t.handlers.touchstart),t.$canvas.removeEventListener("touchmove",t.handlers.touchmove),document.removeEventListener("touchend",t.handlers.mouseup),t.emit("requestedRenderSticker",t.context)})}},{key:"handleMouseDown",value:function(t){var e=t.screenX,s=t.screenY;this.lastScreenX=e,this.lastScreenY=s,this.isTouched=!0}},{key:"handleMouseMove",value:function(t){this.isTouched&&this.singleTouchMove(t)}},{key:"handleMouseUp",value:function(){this.isTouched=!1,this.lastTranslateX=0,this.lastTranslateY=0,this.diffX=0,this.diffY=0,this.lastScreenX=0,this.lastScreenY=0}},{key:"handleTouchStart",value:function(t){var e=t.touches;t.preventDefault(),1===e.length?this.singleTouchStart(t):(this.handleMouseUp(),this.doubleTouchStart(t)),this.isTouched=!0}},{key:"handleTouchMove",value:function(t){if(this.isTouched){var e=t.touches;1===e.length?this.singleTouchMove(t):e.length>=2&&this.doubleTouchMove(t)}}},{key:"handleTouchEnd",value:function(t){if(this.handleMouseUp(),0===t.touches.length)this.isTouched=!1;else if(1===t.touches.length){this.isDoubleTouched=!1;var e=t.touches;this.lastScreenX=e[0].screenX,this.lastScreenY=e[0].screenY}}},{key:"singleTouchStart",value:function(t){var e=t.touches;this.lastScreenX=e[0].screenX,this.lastScreenY=e[0].screenY}},{key:"doubleTouchStart",value:function(t){var e=t.touches;console.log("multi touch on"),this.lastLength=this.calcLengthBetweenFingers(t);var s=e[0].screenX,i=e[1].screenX,n=e[0].screenY,r=e[1].screenY;this.lastScreenX=(i+s)/2,this.lastScreenY=(r+n)/2}},{key:"singleTouchMove",value:function(t){var e="touchmove"===t.type?t.touches[0].screenX:t.screenX,s="touchmove"===t.type?t.touches[0].screenY:t.screenY;this.diffX=e-this.lastScreenX,this.diffY=s-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.moveImage(),this.lastScreenX=e,this.lastScreenY=s}},{key:"doubleTouchMove",value:function(t){var e=t.touches,s=e[0].screenX,i=e[1].screenX,n=e[0].screenY,r=(i+s)/2,a=(e[1].screenY+n)/2;!1===this.isDoubleTouched&&(this.isDoubleTouched=!0,this.lastLength=this.calcLengthBetweenFingers(t),this.lastScreenX=r,this.lastScreenY=a);var o=this.calcLengthBetweenFingers(t);this.lastScale=this.scale,this.scale*=o/this.lastLength,this.diffX=r-this.lastScreenX,this.diffY=a-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.moveImage(),this.resize(),this.lastLength=o,this.lastScreenX=r,this.lastScreenY=a}},{key:"calcLengthBetweenFingers",value:function(t){var e=t.touches,s=e[0].screenX,i=e[1].screenX,n=e[0].screenY,r=e[1].screenY;return Math.hypot(i-s,r-n)}},{key:"resize",value:function(){this.context.clearRect(0,0,300,300),this.offScreenContext.putImageData(this.originalImage,0,0);var t=this.imagePosition.x+this.imageWidth*this.lastScale/2-150,e=this.imagePosition.y+this.imageHeight*this.lastScale/2-150,s=this.imageWidth*this.scale,i=this.imageHeight*this.scale,n=this.scale/this.lastScale*t-s/2+150,r=this.scale/this.lastScale*e-i/2+150;this.context.drawImage(this.$offScreen,n,r,s,i),this.imagePosition.x=n,this.imagePosition.y=r}},{key:"moveImage",value:function(){this.imagePosition.x+=this.diffX,this.imagePosition.y+=this.diffY,this.context.clearRect(0,0,300,300),this.offScreenContext.putImageData(this.originalImage,0,0);var t=this.imagePosition.x,e=this.imagePosition.y,s=this.imageWidth*this.scale,i=this.imageHeight*this.scale;this.context.drawImage(this.$offScreen,t,e,s,i)}},{key:"adjustSize",value:function(){this.imageWidth,this.scale,this.imageHeight,this.scale,this.imagePosition.x,this.imagePosition.y}}])&&S(s.prototype,i),r&&S(s,r),e}();function P(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.camera=new u,this.imageEdit=new w,this.$canvas=document.querySelector(".canvas"),this.context=this.$canvas.getContext("2d"),this.originalImage=null,this.bind()}var e,s,i;return e=t,(s=[{key:"bind",value:function(){var t=this;this.camera.on("renderCameraImage",function(e){t.originalImage=e.getImageData(0,0,300,300),t.imageEdit.init(t.originalImage)}),this.imageEdit.on("requestedRenderSticker",function(e){t.originalImage=e.getImageData(0,0,300,300),t.sticker=new y(t.originalImage)})}}])&&P(e.prototype,s),i&&P(e,i),t}())}});