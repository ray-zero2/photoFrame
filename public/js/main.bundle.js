!function(t){function e(e){for(var s,a,o=e[0],c=e[1],h=e[2],l=0,f=[];l<o.length;l++)a=o[l],n[a]&&f.push(n[a][0]),n[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);for(u&&u(e);f.length;)f.shift()();return r.push.apply(r,h||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],s=!0,o=1;o<i.length;o++){var c=i[o];0!==n[c]&&(s=!1)}s&&(r.splice(e--,1),t=a(a.s=i[0]))}return t}var s={},n={0:0},r=[];function a(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=s,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(i,s,function(e){return t[e]}.bind(null,s));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var h=0;h<o.length;h++)e(o[h]);var u=c;r.push([99,1]),i()}({99:function(t,e,i){"use strict";i.r(e);i(25),i(36),i(37),i(62),i(24),i(39),i(40),i(41),i(42),i(70),i(43);var s=i(13),n=i.n(s);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function o(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var u=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=o(this,c(e).call(this))).$canvas=document.querySelector(".canvas"),t.context=t.$canvas.getContext("2d"),t.$video=document.querySelector(".camera"),t.$captureButton=document.querySelector(".js-capture"),t.startCamera(),t.bind(),t}var i,s,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(e,n.a),i=e,(s=[{key:"bind",value:function(){var t=this;this.$captureButton.addEventListener("click",function(){t.renderCameraImageInCanvas()})}},{key:"startCamera",value:function(){var t=this;navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:300,height:300},audio:!1}).then(function(e){t.$video.srcObject=e}).catch(function(e){console.log(t.$video),alert(e)})}},{key:"stopCamera",value:function(){this.$video.srcObject.getTracks().forEach(function(t){t.stop()}),this.$video.srcObject=null}},{key:"renderCameraImageInCanvas",value:function(){var t=this.$video.offsetWidth,e=this.$video.offsetHeight;this.context.drawImage(this.$video,0,0,t,e),this.$video.classList.add("js-hide"),this.$captureButton.classList.add("js-hide"),this.stopCamera(),this.emit("renderCameraImage",this.context)}}])&&a(i.prototype,s),r&&a(i,r),e}();i(87),i(88),i(94),i(96),i(97);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function v(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var m=function t(e,i){g(this,t),this.id=i,this.src="./images/sticker/sticker".concat(e,".png"),this.leftTopPoint={x:100,y:100},this.width=100,this.height=100},y=function(t){function e(t){var i;return g(this,e),(i=v(this,k(e).call(this))).$canvas=document.querySelector(".canvas"),i.context=i.$canvas.getContext("2d"),i.$offScreen=document.createElement("canvas"),i.$offScreen.width=i.$canvas.width,i.$offScreen.height=i.$canvas.height,i.offScreenContext=i.$offScreen.getContext("2d"),i.$backImageScreen=document.createElement("canvas"),i.$backImageScreen.width=i.$canvas.width,i.$backImageScreen.height=i.$canvas.height,i.backImageScreenContext=i.$backImageScreen.getContext("2d"),i.backImageScreenContext.putImageData(t,0,0),i.context.drawImage(i.$backImageScreen,0,0,300,300),i.$stickerWrapper=document.querySelector(".sticker-wrapper"),i.$stickers=document.querySelectorAll(".js-sticker"),i.$removeStickerButton=document.querySelector(".js-removeSticker"),i.$createImageButton=document.querySelector(".js-createImageButton"),i.pointerPosition={startX:0,startY:0,startSecondX:0,startSecondY:0,currentX:0,currentY:0,currentSecondX:0,currentSecondY:0},i.diff={x:0,y:0},i.isStickerTouched=!1,i.stickerId=0,i.activeStickerId=0,i.stickersOnCanvas=[],i.stickerPosition_past={x:0,y:0},i.stickerSize_past={width:0,height:0},i.RANGE_OFFSET=5,i.LEFT_LINE=1,i.BOTTOM_LINE=2,i.RIGHT_LINE=4,i.TOP_LINE=8,i.LEFT_TOP_POINT=i.LEFT_LINE+i.TOP_LINE,i.LEFT_BOTTOM_POINT=i.LEFT_LINE+i.BOTTOM_LINE,i.RIGHT_BOTTOM_POINT=i.RIGHT_LINE+i.BOTTOM_LINE,i.RIGHT_TOP_POINT=i.RIGHT_LINE+i.TOP_LINE,i.clickProperty=0,i.$stickerWrapper.classList.remove("js-hide"),i.$removeStickerButton.classList.remove("js-hide"),i.$createImageButton.classList.remove("js-hide"),i.bind(),i}var i,s,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,n.a),i=e,(s=[{key:"bind",value:function(){var t=this;this.$canvas.addEventListener("mousedown",function(e){t.handleMouseDown(e)}),this.$canvas.addEventListener("mousemove",function(e){t.handleMouseMove(e)}),document.addEventListener("mouseup",function(e){t.handleMouseUp(e)}),f(this.$stickers).forEach(function(e){e.addEventListener("click",function(i){t.handleClickStickerList(e,i)})}),this.$removeStickerButton.addEventListener("click",function(){t.stickersOnCanvas.splice(t.stickersOnCanvas.length-1,1),t.renderStickers()}),this.$createImageButton.addEventListener("click",function(){t.renderOutputImage(),t.$stickerWrapper.classList.add("js-hide"),t.$removeStickerButton.classList.add("js-hide"),t.$createImageButton.classList.add("js-hide"),t.createImage(),document.querySelector(".image-wrapper").classList.remove("js-hide")})}},{key:"handleMouseDown",value:function(t){var e=t.screenX,i=t.screenY;this.pointerPosition.startX=e,this.pointerPosition.startY=i,this.isStickerTouched=this.judgeWhereClickOnTheSticker(t),this.isStickerTouched&&(this.decideOperatedSticker(t),this.renderStickers())}},{key:"handleMouseMove",value:function(t){if(!1!==this.isStickerTouched){var e=t.screenX,i=t.screenY;this.pointerPosition.currentX=e,this.pointerPosition.currentY=i,this.diff.x=e-this.pointerPosition.startX,this.diff.y=i-this.pointerPosition.startY,this.operateSticker(),this.renderStickers()}}},{key:"handleMouseUp",value:function(){this.isStickerTouched=!1,this.pointerPosition.startX=0,this.pointerPosition.startY=0,this.pointerPosition.currentX=0,this.pointerPosition.currentY=0,this.clickProperty=0}},{key:"judgeWhereClickOnTheSticker",value:function(t){for(var e=!1,i=0;i<this.stickersOnCanvas.length;i++){var s=this.stickersOnCanvas[i],n=s.leftTopPoint.x,r=s.leftTopPoint.x+s.width,a=s.leftTopPoint.y,o=s.leftTopPoint.y+s.height;i===this.stickersOnCanvas.length-1&&(n-=this.RANGE_OFFSET,r+=this.RANGE_OFFSET,a-=this.RANGE_OFFSET,o+=this.RANGE_OFFSET),n<=t.offsetX&&t.offsetX<=r&&a<=t.offsetY&&t.offsetY<=o?(this.activeStickerId=s.id,i===this.stickersOnCanvas.length-1&&this.judgeClickOnTheLine(t,n,r,a,o),console.log("onSticker"),e=!0):console.log("notOnSticker")}return e}},{key:"judgeClickOnTheLine",value:function(t,e,i,s,n){this.judgeLeftLine(t.offsetX,e),this.judgeBottomLine(t.offsetY,n),this.judgeRightLine(t.offsetX,i),this.judgeTopLine(t.offsetY,s)}},{key:"judgeLeftLine",value:function(t,e){e<=t&&t<=e+2*this.RANGE_OFFSET&&(this.clickProperty+=this.LEFT_LINE)}},{key:"judgeBottomLine",value:function(t,e){e-2*this.RANGE_OFFSET<=t&&t<=e&&(this.clickProperty+=this.BOTTOM_LINE)}},{key:"judgeRightLine",value:function(t,e){e-2*this.RANGE_OFFSET<=t&&t<=e&&(this.clickProperty+=this.RIGHT_LINE)}},{key:"judgeTopLine",value:function(t,e){e<=t&&t<=e+2*this.RANGE_OFFSET&&(this.clickProperty+=this.TOP_LINE)}},{key:"operateSticker",value:function(){0===this.clickProperty?this.moveSticker():this.resizeSticker()}},{key:"decideOperatedSticker",value:function(){var t=this,e=this.stickersOnCanvas.findIndex(function(e){return e.id===t.activeStickerId}),i=this.stickersOnCanvas[e];this.stickersOnCanvas.splice(e,1),this.stickersOnCanvas.push(i),this.stickerPosition_past.x=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x,this.stickerPosition_past.y=this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y,this.stickerSize_past.width=this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickerSize_past.height=this.stickersOnCanvas[this.stickersOnCanvas.length-1].height}},{key:"moveSticker",value:function(){this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.diff.x+this.stickerPosition_past.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.diff.y+this.stickerPosition_past.y}},{key:"resizeSticker",value:function(){switch(this.clickProperty){case this.LEFT_TOP_POINT:this.resizeHandleLeftTop();break;case this.LEFT_BOTTOM_POINT:this.resizeHandleLeftBottom();break;case this.RIGHT_BOTTOM_POINT:this.resizeHandleRightBottom();break;case this.RIGHT_TOP_POINT:this.resizeHandleRightTop()}}},{key:"resizeHandleLeftTop",value:function(){-this.diff.y<=-this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+-this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+-this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.y)}},{key:"resizeHandleLeftBottom",value:function(){this.diff.y<=-this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+-this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.x=this.stickerPosition_past.x+-this.diff.y)}},{key:"resizeHandleRightBottom",value:function(){this.diff.y<=this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height)}},{key:"resizeHandleRightTop",value:function(){-this.diff.y<=this.diff.x?(this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=this.stickerSize_past.width+this.diff.x,this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].width,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+-this.diff.x):(this.stickersOnCanvas[this.stickersOnCanvas.length-1].height=this.stickerSize_past.height+-this.diff.y,this.stickersOnCanvas[this.stickersOnCanvas.length-1].width=1*this.stickersOnCanvas[this.stickersOnCanvas.length-1].height,this.stickersOnCanvas[this.stickersOnCanvas.length-1].leftTopPoint.y=this.stickerPosition_past.y+this.diff.y)}},{key:"handleClickStickerList",value:function(t,e){this.addSticker(t),this.renderStickers()}},{key:"addSticker",value:function(t){var e=new m(t.dataset.stickerNum,this.stickerId);this.stickersOnCanvas.push(e),this.activeStickerId=this.stickerId,this.stickerId++}},{key:"renderStickers",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var t=new Image,e="grey",i=2,s=0;s<this.stickersOnCanvas.length;s++){s===this.stickersOnCanvas.length-1&&(e="white",i=3),t.src=this.stickersOnCanvas[s].src;var n=this.stickersOnCanvas[s].leftTopPoint.x,r=this.stickersOnCanvas[s].leftTopPoint.y,a=this.stickersOnCanvas[s].width,o=this.stickersOnCanvas[s].height;this.offScreenContext.drawImage(t,n,r,a,o),this.drawFrameLine(n,r,a,o,e),this.drawCornerMark(n,r,a,o,i)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"drawFrameLine",value:function(t,e,i,s,n){this.offScreenContext.strokeStyle=n,this.offScreenContext.beginPath(),this.offScreenContext.strokeRect(t,e,i,s)}},{key:"drawCornerMark",value:function(t,e,i,s,n){this.offScreenContext.strokeStyle="black",this.offScreenContext.fillStyle="white",this.drawArc(t,e,n),this.drawArc(t,e+s,n),this.drawArc(t+i,e,n),this.drawArc(t+i,e+s,n)}},{key:"drawArc",value:function(t,e,i){this.offScreenContext.beginPath(),this.offScreenContext.arc(t,e,i,0,2*Math.PI,!1),this.offScreenContext.stroke()}},{key:"renderOutputImage",value:function(){this.offScreenContext.clearRect(0,0,300,300),this.offScreenContext.drawImage(this.$backImageScreen,0,0,300,300);for(var t=new Image,e=0;e<this.stickersOnCanvas.length;e++){t.src=this.stickersOnCanvas[e].src;var i=this.stickersOnCanvas[e].leftTopPoint.x,s=this.stickersOnCanvas[e].leftTopPoint.y,n=this.stickersOnCanvas[e].width,r=this.stickersOnCanvas[e].height;this.offScreenContext.drawImage(t,i,s,n,r)}this.context.clearRect(0,0,300,300),this.context.drawImage(this.$offScreen,0,0,300,300)}},{key:"createImage",value:function(){var t=this.$canvas.toDataURL();document.querySelector(".image").src=t}}])&&d(i.prototype,s),r&&d(i,r),e}();function O(t){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function S(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function C(t,e){return!e||"object"!==O(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function T(t,e){return(T=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var w=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=C(this,b(e).call(this))).$canvas=document.querySelector(".canvas"),t.context=t.$canvas.getContext("2d"),t.$offScreen=document.createElement("canvas"),t.$offScreen.width=t.$canvas.width,t.$offScreen.height=t.$canvas.height,t.offScreenContext=t.$offScreen.getContext("2d"),t.$scaleUpButton=document.querySelector(".js-scaleUp"),t.$scaleDownButton=document.querySelector(".js-scaleDown"),t.$scaleOkButton=document.querySelector(".js-scaleOk"),t}var i,s,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&T(t,e)}(e,n.a),i=e,(s=[{key:"init",value:function(t){this.$scaleUpButton.classList.remove("js-hide"),this.$scaleDownButton.classList.remove("js-hide"),this.$scaleOkButton.classList.remove("js-hide"),this.originalImage=t,this.imageWidth=300,this.imageHeight=300,this.scale=1,this.scale_past=1,this.imagePosition={x:0,y:0},this.imagePosition_past={x:0,y:0},this.imageGeometricCenter={x:0,y:0},this.position={startX:0,startY:0,startSecondX:0,startSecondY:0,currentX:0,currentY:0,currentSecondX:0,currentSecondY:0},this.lastTranslateX=0,this.lastTranslateY=0,this.lastScreenX=0,this.lastScreenY=0,this.lastScreenX2=0,this.lastScreenY2=0,this.diffX=0,this.diffY=0,this.pinchSize=0,this.isTouched=!1,this.bind()}},{key:"bind",value:function(){var t=this;this.handlers={mousedown:this.handleMouseDown.bind(this),mousemove:this.handleMouseMove.bind(this),mouseup:this.handleMouseUp.bind(this),touchstart:this.handleTouchStart.bind(this),touchmove:this.handleTouchMove.bind(this),touchend:this.handleTouchEnd.bind(this)},this.$canvas.addEventListener("mousedown",this.handlers.mousedown),this.$canvas.addEventListener("mousemove",this.handlers.mousemove),document.addEventListener("mouseup",this.handlers.mouseup),this.$canvas.addEventListener("touchstart",this.handlers.touchstart),this.$canvas.addEventListener("touchmove",this.handlers.touchmove),document.addEventListener("touchend",this.handlers.touchend),this.$scaleUpButton.addEventListener("click",function(e){t.scale_past=t.scale,t.scale*=1.1,e.preventDefault(),t.resize()}),this.$scaleDownButton.addEventListener("click",function(e){t.scale_past=t.scale,t.scale/=1.1,e.preventDefault(),t.resize()}),this.$scaleOkButton.addEventListener("click",function(){t.$scaleUpButton.classList.add("js-hide"),t.$scaleDownButton.classList.add("js-hide"),t.$scaleOkButton.classList.add("js-hide"),t.$canvas.removeEventListener("mousedown",t.handlers.mousedown),t.$canvas.removeEventListener("mousemove",t.handlers.mousemove),document.removeEventListener("mouseup",t.handlers.mouseup),t.$canvas.removeEventListener("touchstart",t.handlers.touchstart),t.$canvas.removeEventListener("touchmove",t.handlers.touchmove),document.removeEventListener("touchend",t.handlers.mouseup),t.emit("requestedRenderSticker",t.context)})}},{key:"handleMouseDown",value:function(t){var e=t.screenX,i=t.screenY;this.lastScreenX=e,this.lastScreenY=i,this.isTouched=!0}},{key:"handleMouseMove",value:function(t){if(this.isTouched){var e=t.screenX,i=t.screenY;this.diffX=e-this.lastScreenX,this.diffY=i-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,this.moveImage(),this.lastScreenX=e,this.lastScreenY=i}}},{key:"handleMouseUp",value:function(){this.isTouched=!1,this.lastTranslateX=0,this.lastTranslateY=0,this.diffX=0,this.diffY=0,this.lastScreenX=0,this.lastScreenY=0}},{key:"handleTouchStart",value:function(t){var e=t.touches;if(e.length>1){var i=e[0].screenX,s=e[1].screenX,n=e[0].screenY,r=e[1].screenY;this.lastScreenX=(s+i)/2,this.lastScreenY=(r+n)/2,this.pinchSize=Math.abs((s-i)*(r-n))}else this.lastScreenX=e[0].screenX,this.lastScreenY=e[0].screenY;t.preventDefault(),this.isTouched=!0}},{key:"handleTouchMove",value:function(t){if(this.isTouched){var e=t.touches,i=e[0].screenX,s=e[0].screenY;if(e.length>1){var n=e[1].screenX,r=e[1].screenY,a=(i+n)/2,o=(s+r)/2,c=Math.abs((n-i)*(r-s));c<this.pinchSize?this.scale/=1.02:this.scale*=1.02,this.diffX=a-this.lastScreenX,this.diffY=o-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,t.preventDefault(),this.moveImage(),this.lastScreenX=a,this.lastScreenX=a,this.pinchSize=c}else this.diffX=i-this.lastScreenX,this.diffY=s-this.lastScreenY,this.lastTranslateX+=this.diffX,this.lastTranslateY+=this.diffY,t.preventDefault(),this.moveImage(),this.lastScreenX=i,this.lastScreenY=s}}},{key:"handleTouchEnd",value:function(t){if(0===t.touches.length)this.isTouched=!1,this.lastTranslateX=0,this.lastTranslateY=0,this.diffX=0,this.diffY=0,this.lastScreenX=0,this.lastScreenY=0,this.lastScreenX2=0,this.lastScreenY2=0;else{var e=t.touches;this.lastScreenX=e[0].screenX,this.lastScreenY=e[0].screenY}}},{key:"resize",value:function(){this.context.clearRect(0,0,300,300),this.offScreenContext.putImageData(this.originalImage,0,0);var t=this.imageWidth*this.scale,e=this.imageHeight*this.scale;this.imageGeometricCenter.x=this.imagePosition.x+this.imageWidth*this.scale_past/2,this.imageGeometricCenter.y=this.imagePosition.y+this.imageHeight*this.scale_past/2;var i=this.imageGeometricCenter.x-150,s=this.imageGeometricCenter.y-150,n=this.scale/this.scale_past*i-t/2+150,r=this.scale/this.scale_past*s-e/2+150;this.context.drawImage(this.$offScreen,n,r,t,e),this.imagePosition.x=n,this.imagePosition.y=r}},{key:"moveImage",value:function(){this.imagePosition.x+=this.diffX,this.imagePosition.y+=this.diffY,this.context.clearRect(0,0,300,300),this.offScreenContext.putImageData(this.originalImage,0,0);var t=this.imagePosition.x,e=this.imagePosition.y,i=this.imageWidth*this.scale,s=this.imageHeight*this.scale;this.context.drawImage(this.$offScreen,t,e,i,s)}}])&&S(i.prototype,s),r&&S(i,r),e}();function P(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.camera=new u,this.imageEdit=new w,this.$canvas=document.querySelector(".canvas"),this.context=this.$canvas.getContext("2d"),this.originalImage=null,this.bind()}var e,i,s;return e=t,(i=[{key:"bind",value:function(){var t=this;this.camera.on("renderCameraImage",function(e){t.originalImage=e.getImageData(0,0,300,300),t.imageEdit.init(t.originalImage)}),this.imageEdit.on("requestedRenderSticker",function(e){t.originalImage=e.getImageData(0,0,300,300),t.sticker=new y(t.originalImage)})}}])&&P(e.prototype,i),s&&P(e,s),t}())}});