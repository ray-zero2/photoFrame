!function(t){function e(e){for(var i,a,o=e[0],c=e[1],h=e[2],l=0,f=[];l<o.length;l++)a=o[l],n[a]&&f.push(n[a][0]),n[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);for(u&&u(e);f.length;)f.shift()();return r.push.apply(r,h||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],i=!0,o=1;o<s.length;o++){var c=s[o];0!==n[c]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=s[0]))}return t}var i={},n={0:0},r=[];function a(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=i,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(s,i,function(e){return t[e]}.bind(null,i));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var h=0;h<o.length;h++)e(o[h]);var u=c;r.push([100,1]),s()}({100:function(t,e,s){"use strict";s.r(e);s(25),s(36),s(37),s(62),s(24),s(39),s(40),s(41),s(42),s(70),s(43);var i=s(13),n=s.n(i);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var u=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=o(this,c(e).call(this))).$canvas=document.querySelector(".canvas"),t.context=t.$canvas.getContext("2d"),t.$video=document.querySelector(".camera"),t.$captureButton=document.querySelector(".js-capture"),t.startCamera(),t.bind(),t}var s,i,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(e,n.a),s=e,(i=[{key:"bind",value:function(){var t=this;this.$captureButton.addEventListener("click",function(){t.renderCameraImageInCanvas()})}},{key:"startCamera",value:function(){var t=this;navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:300,height:300},audio:!1}).then(function(e){t.$video.srcObject=e}).catch(function(e){console.log(t.$video),alert(e)})}},{key:"stopCamera",value:function(){this.$video.srcObject.getTracks().forEach(function(t){t.stop()}),this.$video.srcObject=null}},{key:"renderCameraImageInCanvas",value:function(){var t=this.$video.offsetWidth,e=this.$video.offsetHeight;this.context.drawImage(this.$video,0,0,t,e),this.$video.classList.add("js-hide"),this.$captureButton.classList.add("js-hide"),this.stopCamera(),this.emit("renderCameraImage",this.context)}}])&&a(s.prototype,i),r&&a(s,r),e}();s(88),s(89),s(95),s(97),s(73),s(98);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t){return function(t){if(Array.isArray(t)){for(var e=0,s=new Array(t.length);e<t.length;e++)s[e]=t[e];return s}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function v(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var y=function t(e,s){g(this,t),this.id=s,this.src="/public/images/sticker/sticker".concat(e,".png"),this.leftTopPoint={x:100,y:100},this.scale=1,this.width=100,this.height=100},m=function(t){function e(t){var s;return g(this,e),(s=v(this,k(e).call(this))).$canvas=document.querySelector(".canvas"),s.context=s.$canvas.getContext("2d"),s.$offScreen=document.createElement("canvas"),s.$offScreen.width=s.$canvas.width,s.$offScreen.height=s.$canvas.height,s.offScreenContext=s.$offScreen.getContext("2d"),s.$backImageScreen=document.createElement("canvas"),s.$backImageScreen.width=s.$canvas.width,s.$backImageScreen.height=s.$canvas.height,s.backImageScreenContext=s.$backImageScreen.getContext("2d"),s.backImageScreenContext.putImageData(t,0,0),s.context.drawImage(s.$backImageScreen,0,0,300,300),s.$stickerWrapper=document.querySelector(".sticker-wrapper"),s.$stickers=document.querySelectorAll(".js-sticker"),s.$removeStickerButton=document.querySelector(".js-removeSticker"),s.$createImageButton=document.querySelector(".js-createImageButton"),s.pointerPosition={startX:0,startY:0,currentX:0,currentY:0},s.diff={x:0,y:0},s.isStickerTouched=!1,s.stickerId=0,s.activeStickerId=0,s.stickersOnCanvas=[],s.stickerPosition_past={x:0,y:0},s.stickerSize_past={width:0,height:0},s.RANGE_OFFSET=5,s.LEFT_LINE=1,s.BOTTOM_LINE=2,s.RIGHT_LINE=4,s.TOP_LINE=8,s.LEFT_TOP_POINT=s.LEFT_LINE+s.TOP_LINE,s.LEFT_BOTTOM_POINT=s.LEFT_LINE+s.BOTTOM_LINE,s.RIGHT_BOTTOM_POINT=s.RIGHT_LINE+s.BOTTOM_LINE,s.RIGHT_TOP_POINT=s.RIGHT_LINE+s.TOP_LINE,s.clickProperty=0,s.$stickerWrapper.classList.remove("js-hide"),s.$removeStickerButton.classList.remove("js-hide"),s.$createImageButton.classList.remove("js-hide"),s.bind(),s}var s,i,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,n.a),s=e,(i=[{key:"bind",value:function(){var t=this;this.$canvas.addEventListener("mousedown",function(e){t.handleMouseDown(e)}),this.$canvas.addEventListener("mousemove",function(e){t.handleMouseMove(e)}),document.addEventListener("mouseup",function(e){t.handleMouseUp(e)}),this.$canvas.addEventListener("touchstart",function(e){t.handleTouchStart(e)}),this.$canvas.addEventListener("touchmove",function(e){t.handleTouchMove(e)}),document.addEventListener("touchend",function(e){t.handleTouchEnd(e)}),f(this.$stickers).forEach(function(e){e.addEventListener("click",function(s){t.handleClickStickerList(e,s)})}),this.$removeStickerButton.addEventListener("click",function(){t.stickersOnCanvas.splice(t.stickersOnCanvas.length-1,1),t.renderStickers()}),this.$createImageButton.addEventListener("click",function(){t.renderOutputImage(),t.$stickerWrapper.classList.add("js-hide"),t.$removeStickerButton.classList.add("js-hide"),t.$createImageButton.classList.add("js-hide"),t.createImage(),document.querySelector(".image-wrapper").classList.remove("js-hide")})}},{key:"handleMouseDown",value:function(t){this.singleTouchStart(t)}},{key:"handleMouseMove",value:function(t){this.singleTouchMove(t)}},{key:"handleMouseUp",value:function(){this.isStickerTouched=!1,this.pointerPosition.startX=0,this.pointerPosition.startY=0,this.pointerPosition.currentX=0,this.pointerPosition.currentY=0,this.clickProperty=0}},{key:"handleTouchStart",value:function(t){var e=t.touches;t.preventDefault(),1===e.length?this.singleTouchStart(t):(this.doubleTouchStart(t),this.isDoubleTouched=!0),this.isTouched=!0}},{key:"handleTouchMove",value:function(t){if(this.isTouched){var e=t.touches;1===e.length?this.singleTouchMove(t):e.length>=2&&this.isDoubleTouched&&this.doubleTouchMove(t)}}},{key:"handleTouchEnd",value:function(){this.handleMouseUp(),this.isTouched=!1,this.isDoubleTouched=!1}},{key:"singleTouchStart",value:function(t){var e="touchstart"===t.type?t.touches[0].screenX:t.screenX,s="touchstart"===t.type?t.touches[0].screenY:t.screenY;this.pointerPosition.startX=e,this.pointerPosition.startY=s,this.isStickerTouched=this.judgeWhereClickOnTheSticker(t),this.isStickerTouched&&(this.decideOperatedSticker(t),this.renderStickers())}},{key:"singleTouchMove",value:function(t){if(!1!==this.isStickerTouched){var e="touchmove"===t.type?t.touches[0].screenX:t.screenX,s="touchmove"===t.type?t.touches[0].screenY:t.screenY;this.pointerPosition.currentX=e,this.pointerPosition.currentY=s,this.diff.x=e-this.pointerPosition.startX,this.diff.y=s-this.pointerPosition.startY,this.operateSticker(),this.renderStickers()}}},{key:"doubleTouchStart",value:function(t){var e=t.touches,s=e[0].screenX,i=e[1].screenX,n=e[0].screenY,r=e[1].screenY;this.lastLength=Math.hypot(i-s,r-n),this.pointerPosition.startX=(i+s)/2,this.pointerPosition.startY=(r+n)/2,this.isDoubleTouched=!0}},{key:"doubleTouchMove",value:function(t){var e=t.touches,s=e[0].screenX,i=e[1].screenX,n=e[0].screenY,r=e[1].screenY,a=Math.hypot(i-s,r-n);this.stickersOnCanvas[this.stickersOnCanvas.length-1].scale*=a/this.lastLength,this.renderStickers(),this.lastLength=a}},{key:"judgeWhereClickOnTheSticker",value:function(t){console.log(t);for(var e=t.target.getBoundingClientRect(),s="touchstart"===t.type?t.touches[0].clientX-window.pageXOffset-e.left:t.offsetX,i="touchstart"===t.type?t.touches[0].clientY-window.pageYOffset-e.top:t.offsetY,n=!1,r=0;r<this.stickersOnCanvas.length;r++){var a=this.stickersOnCanvas[r],o=a.leftTopPoint.x,c=a.leftTopPoint.x+a.width*a.scale,h=a.leftTopPoint.y,u=a.leftTopPoint.y+a.height*a.scale;r===this.stickersOnCanvas.length-1&&(o-=this.RANGE_OFFSET,c+=this.RANGE_OFFSET,h-=this.RANGE_OFFSET,u+=this.RANGE_OFFSET),o<=s&&s<=c&&h<=i&&i<=u?(this.activeStickerId=a.id,r===this.stickersOnCanvas.length-1&&this.judgeClickOnTheLine(s,i,o,c,h,u),console.log("onSticker"),n=!0):console.log("notOnSticker")}return n}},{key:"judgeClickOnTheLine",value:function(t,e,s,i,n,r){this.judgeLeftLine(t,s),this.judgeBottomLine(e,r),this.judgeRightLine(t,i),this.judgeTopLine(e,n)}},{key:"judgeLeftLine",value:function(t,e){e<=t&&t<=e+2*this.RANGE_OFFSET&&(this.clickProperty+=this.LEFT_LINE)}},{key:"judgeBottomLine",value:function(t,e){e-2*this.RANGE_OFFSET<=t&&t<=e&&(this.clickProperty+=this.BOTTOM_LINE)}},{key:"judgeRightLine",value:function(t,e){e-2*this.RANGE_OFFSET<=t&&t<=e&&(this.clickProperty+=this.RIGHT_LINE)}},{key:"judgeTopLine",value:function(t,e){e<=t&&t<=e+2*this.RANGE_OFFSET&&(this.clickProperty+=this.TOP_LINE)}},{key:"operateSticker",value:function(){0===this.clickProperty?this.moveSticker():this.resizeSticker()}},{key:"decideOperatedSticker",value:function(){var t=this,e=this.stickersOnCanvas.findIndex(function(e){return e.id===t.activeStickerId}),s=this.stickersOnCanvas[e];this.stickersOnCanvas.splice(e,1),this.stickersOnCanvas.push(s),this.stickerPosition_past.x=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x,this.stickerPosition_past.y=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y,this.stickerSize_past.width=this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickerSize_past.height=this.stickersOnCanvas[this.stickersOnCanvas.length-1].height}},{key:"moveSticker",value:function(){this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.diff.x+this.stickerPosition_past.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.diff.y+this.stickerPosition_past.y}},{key:"resizeSticker",value:function(){switch(this.clickProperty){case this.LEFT_TOP_POINT:this.resizeHandleLeftTop();break;case this.LEFT_BOTTOM_POINT:this.resizeHandleLeftBottom();break;case this.RIGHT_BOTTOM_POINT:this.resizeHandleRightBottom();break;case this.RIGHT_TOP_POINT:this.resizeHandleRightTop()}}},{key:"resizeHandleLeftTop",value:function(){-this.diff.y<=-this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+-this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+-this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.y)}},{key:"resizeHandleLeftBottom",value:function(){this.diff.y<=-this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+-this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+-this.diff.y)}},{key:"resizeHandleRightBottom",value:function(){this.diff.y<=this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height)}},{key:"resizeHandleRightTop",value:function(){-this.diff.y<=this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+-this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+-this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.y)}},{key:"handleClickStickerList",value:function(t,e){this.addSticker(t),this.renderStickers()}},{key:"addSticker",value:function(t){var e=new y(t.dataset.stickerNum,this.stickerId);this.stickersOnCanvas.push(e),this.activeStickerId=this.stickerId,this.stickerId++}},{key:"renderStickers",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var t=new Image,e="grey",s=2,i=0;i<this.stickersOnCanvas.length;i++){i===this.stickersOnCanvas.length-1&&(e="white",s=3),t.src=this.stickersOnCanvas[i].src;var n=this.stickersOnCanvas[i].leftTopPoint.x,r=this.stickersOnCanvas[i].leftTopPoint.y,a=this.stickersOnCanvas[i].width*this.stickersOnCanvas[i].scale,o=this.stickersOnCanvas[i].height*this.stickersOnCanvas[i].scale;this.offScreenContext.drawImage(t,n,r,a,o),this.drawFrameLine(n,r,a,o,e),this.drawCornerMark(n,r,a,o,s)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"drawFrameLine",value:function(t,e,s,i,n){this.offScreenContext.strokeStyle=n,this.offScreenContext.beginPath(),this.offScreenContext.strokeRect(t,e,s,i)}},{key:"drawCornerMark",value:function(t,e,s,i,n){this.offScreenContext.strokeStyle="black",this.offScreenContext.fillStyle="white",this.drawArc(t,e,n),this.drawArc(t,e+i,n),this.drawArc(t+s,e,n),this.drawArc(t+s,e+i,n)}},{key:"drawArc",value:function(t,e,s){this.offScreenContext.beginPath(),this.offScreenContext.arc(t,e,s,0,2*Math.PI,!1),this.offScreenContext.stroke()}},{key:"renderOutputImage",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var t=new Image,e=0;e<this.stickersOnCanvas.length;e++){t.src=this.stickersOnCanvas[e].src;var s=this.stickersOnCanvas[e].leftTopPoint.x,i=this.stickersOnCanvas[e].leftTopPoint.y,n=this.stickersOnCanvas[e].width*this.stickersOnCanvas[e].scale,r=this.stickersOnCanvas[e].height*this.stickersOnCanvas[e].scale;this.offScreenContext.drawImage(t,s,i,n,r)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"createImage",value:function(){var t=this.$canvas.toDataURL();document.querySelector(".image").src=t}}])&&d(s.prototype,i),r&&d(s,r),e}();function O(t){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function S(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function T(t,e){return!e||"object"!==O(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function C(t){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var w=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=T(this,C(e).call(this))).$canvas=document.querySelector(".canvas"),t.context=t.$canvas.getContext("2d"),t.$offScreen=document.createElement("canvas"),t.$offScreen.width=t.$canvas.width,t.$offScreen.height=t.$canvas.height,t.offScreenContext=t.$offScreen.getContext("2d"),t.$scaleUpButton=document.querySelector(".js-scaleUp"),t.$scaleDownButton=document.querySelector(".js-scaleDown"),t.$scaleOkButton=document.querySelector(".js-scaleOk"),t}var s,i,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,n.a),s=e,(i=[{key:"init",value:function(t){this.$scaleUpButton.classList.remove("js-hide"),this.$scaleDownButton.classList.remove("js-hide"),this.$scaleOkButton.classList.remove("js-hide"),this.originalImage=t,this.imageWidth=300,this.imageHeight=300,this.lastTranslateX=0,this.lastTranslateY=0,this.lastScreenX=0,this.lastScreenY=0,this.diffX=0,this.diffY=0,this.lastLength=0,this.lastScale=1,this.positionX=0,this.positionY=0,this.renderWidth=0,this.renderHeight=0,this.isTouched=!1,this.isDoubleTouched=!1,this.bind()}},{key:"bind",value:function(){var t=this;this.handlers={mousedown:this.handleMouseDown.bind(this),mousemove:this.handleMouseMove.bind(this),mouseup:this.handleMouseUp.bind(this),touchstart:this.handleTouchStart.bind(this),touchmove:this.handleTouchMove.bind(this),touchend:this.handleTouchEnd.bind(this)},this.$canvas.addEventListener("mousedown",this.handlers.mousedown),this.$canvas.addEventListener("mousemove",this.handlers.mousemove),document.addEventListener("mouseup",this.handlers.mouseup),this.$canvas.addEventListener("touchstart",this.handlers.touchstart),this.$canvas.addEventListener("touchmove",this.handlers.touchmove),document.addEventListener("touchend",this.handlers.touchend),this.$scaleUpButton.addEventListener("click",function(e){e.preventDefault();t.resize(1.1),t.render()}),this.$scaleDownButton.addEventListener("click",function(e){e.preventDefault();t.resize(1/1.1),t.render()}),this.$scaleOkButton.addEventListener("click",function(){t.$scaleUpButton.classList.add("js-hide"),t.$scaleDownButton.classList.add("js-hide"),t.$scaleOkButton.classList.add("js-hide"),t.$canvas.removeEventListener("mousedown",t.handlers.mousedown),t.$canvas.removeEventListener("mousemove",t.handlers.mousemove),document.removeEventListener("mouseup",t.handlers.mouseup),t.$canvas.removeEventListener("touchstart",t.handlers.touchstart),t.$canvas.removeEventListener("touchmove",t.handlers.touchmove),document.removeEventListener("touchend",t.handlers.mouseup),t.emit("requestedRenderSticker",t.context)})}},{key:"handleMouseDown",value:function(t){var e=t.screenX,s=t.screenY;this.lastScreenX=e,this.lastScreenY=s,this.isTouched=!0}},{key:"handleMouseMove",value:function(t){this.isTouched&&this.singleTouchMove(t)}},{key:"handleMouseUp",value:function(){this.resetValues()}},{key:"resetValues",value:function(){this.isTouched=!1,this.isDoubleTouched=!1,this.lastTranslateX=0,this.lastTranslateY=0,this.diffX=0,this.diffY=0,this.lastScreenX=0,this.lastScreenY=0}},{key:"handleTouchStart",value:function(t){var e=t.touches;t.preventDefault(),1===e.length?this.singleTouchStart(t):(this.doubleTouchStart(t),this.isDoubleTouched=!0),this.isTouched=!0}},{key:"handleTouchMove",value:function(t){if(this.isTouched){var e=t.touches;1===e.length?this.singleTouchMove(t):e.length>=2&&this.isDoubleTouched&&this.doubleTouchMove(t)}}},{key:"handleTouchEnd",value:function(){this.resetValues()}},{key:"singleTouchStart",value:function(t){var e=t.touches;this.lastScreenX=e[0].screenX,this.lastScreenY=e[0].screenY}},{key:"doubleTouchStart",value:function(t){var e=t.touches,s=e[0].screenX,i=e[1].screenX,n=e[0].screenY,r=e[1].screenY;this.lastLength=Math.hypot(i-s,r-n),this.lastScreenX=(i+s)/2,this.lastScreenY=(r+n)/2,this.isDoubleTouched=!0}},{key:"singleTouchMove",value:function(t){var e="touchmove"===t.type?t.touches[0].screenX:t.screenX,s="touchmove"===t.type?t.touches[0].screenY:t.screenY;this.diffX=e-this.lastScreenX,this.diffY=s-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.moveImage(),this.render(),this.lastScreenX=e,this.lastScreenY=s}},{key:"doubleTouchMove",value:function(t){var e=t.touches,s=e[0].screenX,i=e[1].screenX,n=e[0].screenY,r=e[1].screenY,a=(i+s)/2,o=(r+n)/2,c=Math.hypot(i-s,r-n),h=c/this.lastLength;this.diffX=a-this.lastScreenX,this.diffY=o-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.resize(h),this.moveImage(),this.render(),this.lastLength=c,this.lastScreenX=a,this.lastScreenY=o}},{key:"resize",value:function(t){var e=this.lastScale*t,s=this.positionX+this.imageWidth*this.lastScale/2-150,i=this.positionY+this.imageHeight*this.lastScale/2-150;this.renderWidth=this.imageWidth*e,this.renderHeight=this.imageHeight*e,this.positionX=t*s-this.renderWidth/2+150,this.positionY=t*i-this.renderHeight/2+150,this.lastScale=e}},{key:"moveImage",value:function(){this.positionX+=this.diffX,this.positionY+=this.diffY,this.renderWidth=this.imageWidth*this.lastScale,this.renderHeight=this.imageHeight*this.lastScale}},{key:"adjustSize",value:function(){}},{key:"render",value:function(){this.adjustSize(),this.context.clearRect(0,0,300,300),this.offScreenContext.putImageData(this.originalImage,0,0),this.context.drawImage(this.$offScreen,this.positionX,this.positionY,this.renderWidth,this.renderHeight)}}])&&S(s.prototype,i),r&&S(s,r),e}();function P(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.camera=new u,this.imageEdit=new w,this.$canvas=document.querySelector(".canvas"),this.context=this.$canvas.getContext("2d"),this.originalImage=null,this.bind()}var e,s,i;return e=t,(s=[{key:"bind",value:function(){var t=this;this.camera.on("renderCameraImage",function(e){t.originalImage=e.getImageData(0,0,300,300),t.imageEdit.init(t.originalImage)}),this.imageEdit.on("requestedRenderSticker",function(e){t.originalImage=e.getImageData(0,0,300,300),t.sticker=new m(t.originalImage)})}}])&&P(e.prototype,s),i&&P(e,i),t}())}});