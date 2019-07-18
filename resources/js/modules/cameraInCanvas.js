class Sticker {
  constructor(stickerNum, zIndexNum) {
    this.src = `/public/images/sticker/sticker${stickerNum}.png`;
    this.leftTopPoint = { x: 100, y: 100 };
    this.leftBottomPoint = { x: 100, y: 200 };
    this.rightTopPoint = { x: 200, y: 100 };
    this.rightBottomPoint = { x: 200, y: 200 };
    this.zIndex = zIndexNum;
    this.isActive = false;
  }
}

export default class {
  constructor() {
    //キャンバス
    this.$canvas = document.querySelector('.canvas');
    this.context = this.$canvas.getContext('2d');

    //オフスクリーン
    this.$offScreen = document.createElement('canvas');
    this.$offScreen.width = this.$canvas.width;
    this.$offScreen.height = this.$canvas.height;
    this.offScreenContext = this.$offScreen.getContext('2d');

    this.$backImageScreen = document.createElement('canvas');
    this.$backImageScreen.width = this.$canvas.width;
    this.$backImageScreen.height = this.$canvas.height;
    this.backImageScreenContext = this.$backImageScreen.getContext('2d');

    //その他の要素取得
    this.$video = document.querySelector('.camera');
    this.$captureButton = document.querySelector('.js-capture');
    this.$scaleUpButton = document.querySelector('.js-scaleUp');
    this.$scaleDownButton = document.querySelector('.js-scaleDown');
    this.$scaleOkButton = document.querySelector('.js-scaleOk');

    this.$stickerWrapper = document.querySelector('.sticker-wrapper');
    this.$stickers = document.querySelectorAll('.js-sticker');

    this.phase = 1; //フェーズ番号1〜3

    //変数等
    this.originalImage = null;
    this.imageWidth = 300;
    this.imageHeight = 300;
    this.scale = 1;
    this.scale_past = 1;
    // this.trimmingRate = 1;
    this.imagePosition = { x: 0, y: 0 };
    this.imagePosition_past = { x: 0, y: 0 };
    this.imageGeometricCenter = { x: 0, y: 0 };
    this.pointerPosition = {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    };
    this.diff = { x: 0, y: 0 };
    this.moveImageFlag = false;
    this.moveStickerFlag = false;

    this.stickerId = 1;
    this.stickersOnCanvas = [];

    this.startCamera();
    this.bind();
  }

  bind() {
    //画面キャプチャ
    this.$captureButton.addEventListener('click', () => {
      this.renderCameraImageInCanvas();
      this.phase = 2;
    });

    this.$canvas.addEventListener('mousedown', event => {
      this.handleMouseDown(event);
    });

    document.addEventListener('mousemove', event => {
      this.handleMouseMove(event);
    });

    document.addEventListener('mouseup', event => {
      this.handleMouseUp(event);
    });

    //拡大縮小ボタン
    this.$scaleUpButton.addEventListener('click', event => {
      this.scale_past = this.scale;
      this.scale *= 1.2;
      this.resize();
    });
    this.$scaleDownButton.addEventListener('click', () => {
      this.scale_past = this.scale;
      this.scale *= 0.8;
      this.resize();
    });
    this.$scaleOkButton.addEventListener('click', () => {
      this.$scaleUpButton.classList.add('js-hide');
      this.$scaleDownButton.classList.add('js-hide');
      this.$scaleOkButton.classList.add('js-hide');
      this.$stickerWrapper.classList.remove('js-hide');
      this.originalImage = this.context.getImageData(0, 0, 300, 300);
      this.backImageScreenContext.putImageData(this.originalImage, 0, 0);
      this.phase = 3;
    });

    //sticker
    [...this.$stickers].forEach(element => {
      element.addEventListener('click', event => {
        this.handleStickerClick(element, event);
      });
    });
  }

  startCamera() {
    const MEDIA = navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: 300,
        height: 300
      },
      audio: false
    });

    MEDIA.then(stream => {
      this.$video.srcObject = stream;
    }).catch(error => {
      console.log(this.$video);
      alert(error);
    });
  }

  stopCamera() {
    const TRACKS = this.$video.srcObject.getTracks();
    TRACKS.forEach(function(track) {
      track.stop();
    });
    this.$video.srcObject = null;
  }

  renderCameraImageInCanvas() {
    const VIDEO_WIDTH = this.$video.offsetWidth;
    const VIDEO_HEIGHT = this.$video.offsetHeight;
    this.context.drawImage(this.$video, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    this.$video.classList.add('js-hide');

    //表示ボタンの入れ替え/////////////////////
    this.$captureButton.classList.add('js-hide');
    this.$scaleUpButton.classList.remove('js-hide');
    this.$scaleDownButton.classList.remove('js-hide');
    this.$scaleOkButton.classList.remove('js-hide');
    ////////////////////////////////////////////////

    this.stopCamera();
    this.originalImage = this.context.getImageData(0, 0, 300, 300);
  }

  handleMouseDown(event) {
    if (this.phase === 2) {
      const START_X = event.screenX;
      const START_Y = event.screenY;
      this.pointerPosition.startX = START_X;
      this.pointerPosition.startY = START_Y;
      this.eventTarget = event.target;
      this.imagePosition_past.x = this.imagePosition.x;
      this.imagePosition_past.y = this.imagePosition.y;
      console.log('pastPosition_x:' + this.imagePosition_past.x);
    } else if (this.phase === 3) {
      this.stickersOnCanvas.forEach(stickerObj => {
        if (
          stickerObj.leftTopPoint.x <= event.offsetX &&
          event.offsetX <= stickerObj.rightBottomPoint.x &&
          event.offsetY <= stickerObj.rightBottomPoint.y &&
          stickerObj.leftTopPoint.y <= event.offsetY
        ) {
          this.moveStickerFlag = true;
          console.log('onSticker');
        } else {
          console.log('notOnSticker');
        }
      });
    }

    this.moveImageFlag = true;
  }

  handleMouseMove(event) {
    if (!this.moveImageFlag) return;
    const CURRENT_X = event.screenX;
    const CURRENT_Y = event.screenY;
    this.pointerPosition.currentX = CURRENT_X;
    this.pointerPosition.currentY = CURRENT_Y;
    this.diff.x = CURRENT_X - this.pointerPosition.startX;
    this.diff.y = CURRENT_Y - this.pointerPosition.startY;

    const DISPLACEMENT_X = this.diff.x; // this.scale;
    const DISPLACEMENT_Y = this.diff.y; // this.scale;
    if (this.phase === 2) {
      this.imagePosition.x = DISPLACEMENT_X + this.imagePosition_past.x;
      this.imagePosition.y = DISPLACEMENT_Y + this.imagePosition_past.y;
      console.log('displacePosition:' + this.imagePosition.x);
      this.moveImage();
    } else if (this.phase === 3 && this.moveStickerFlag) {
      this.moveSticker();
    }
  }

  handleMouseUp(event) {
    this.moveImageFlag = false;
    this.moveStickerFlag = false;
    this.pointerPosition.startX = 0;
    this.pointerPosition.startY = 0;
    this.pointerPosition.currentX = 0;
    this.pointerPosition.currentY = 0;
  }

  resize() {
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(this.originalImage, 0, 0);

    const RENDER_WIDTH = this.imageWidth * this.scale;
    const RENDER_HEIGHT = this.imageHeight * this.scale;

    this.imageGeometricCenter.x =
      this.imagePosition.x + (this.imageWidth * this.scale_past) / 2;
    this.imageGeometricCenter.y =
      this.imagePosition.y + (this.imageHeight * this.scale_past) / 2;

    const CENTER_DIFF_X = this.imageGeometricCenter.x - 150; //150: キャンバスサイズの半分
    const CENTER_DIFF_Y = this.imageGeometricCenter.y - 150;

    const RENDER_POINT_X =
      (this.scale / this.scale_past) * CENTER_DIFF_X - RENDER_WIDTH / 2 + 150;

    const RENDER_POINT_Y =
      (this.scale / this.scale_past) * CENTER_DIFF_Y - RENDER_HEIGHT / 2 + 150;

    this.context.drawImage(
      this.$offScreen,
      RENDER_POINT_X,
      RENDER_POINT_Y,
      RENDER_WIDTH,
      RENDER_HEIGHT
    );
    this.imagePosition.x = RENDER_POINT_X;
    this.imagePosition.y = RENDER_POINT_Y;
  }

  moveImage() {
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(this.originalImage, 0, 0);

    const RENDER_POINT_X = this.imagePosition.x;
    const RENDER_POINT_Y = this.imagePosition.y;
    const RENDER_WIDTH = this.imageWidth * this.scale;
    const RENDER_HEIGHT = this.imageHeight * this.scale;
    this.context.drawImage(
      this.$offScreen,
      RENDER_POINT_X,
      RENDER_POINT_Y,
      RENDER_WIDTH,
      RENDER_HEIGHT
    );
    console.log('RENDER_POINT_X:' + this.imagePosition.x);
  }

  moveSticker() {
    console.log('pass');
  }

  handleStickerClick(element, event) {
    this.addSticker(element);
    this.renderSticker();
  }

  addSticker(element) {
    const newSticker = new Sticker(element.dataset.stickerNum, this.stickerId);
    this.stickersOnCanvas.push(newSticker);
    this.stickerId++;
    console.log(this.stickersOnCanvas);
  }

  renderSticker() {
    console.log(this);
    this.offScreenContext.clearRect(0, 0, 300, 300);
    this.offScreenContext.drawImage(this.$backImageScreen, 0, 0, 300, 300);
    let img = new Image();
    this.stickersOnCanvas.forEach(stickerObj => {
      img.src = stickerObj.src;
      this.offScreenContext.drawImage(
        img,
        stickerObj.leftTopPoint.x,
        stickerObj.leftTopPoint.y,
        stickerObj.rightTopPoint.x - stickerObj.leftTopPoint.x,
        stickerObj.leftBottomPoint.y - stickerObj.leftTopPoint.y
      );
      this.drawFrameLine(stickerObj);
      this.drawCornerMark(stickerObj);
    });
    this.context.clearRect(0, 0, 300, 300);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }

  drawFrameLine(stickerObj) {
    this.offScreenContext.strokeStyle = 'white';

    this.offScreenContext.beginPath();
    this.offScreenContext.strokeRect(
      stickerObj.leftTopPoint.x,
      stickerObj.leftTopPoint.y,
      stickerObj.rightTopPoint.x - stickerObj.leftTopPoint.x,
      stickerObj.leftBottomPoint.y - stickerObj.leftTopPoint.y
    );
  }
  drawCornerMark(stickerObj) {
    let markSize = 2;
    this.offScreenContext.strokeStyle = 'black';
    this.offScreenContext.fillStyle = 'white';

    this.offScreenContext.beginPath();
    this.offScreenContext.arc(
      stickerObj.leftTopPoint.x,
      stickerObj.leftTopPoint.y,
      markSize,
      0,
      Math.PI * 2,
      false
    );
    this.offScreenContext.stroke();

    this.offScreenContext.beginPath();
    this.offScreenContext.arc(
      stickerObj.leftBottomPoint.x,
      stickerObj.leftBottomPoint.y,
      markSize,
      0,
      Math.PI * 2,
      false
    );
    this.offScreenContext.stroke();

    this.offScreenContext.beginPath();
    this.offScreenContext.arc(
      stickerObj.rightTopPoint.x,
      stickerObj.rightTopPoint.y,
      markSize,
      0,
      Math.PI * 2,
      false
    );
    this.offScreenContext.stroke();

    this.offScreenContext.beginPath();
    this.offScreenContext.arc(
      stickerObj.rightBottomPoint.x,
      stickerObj.rightBottomPoint.y,
      markSize,
      0,
      Math.PI * 2,
      false
    );
    this.offScreenContext.stroke();
  }
}
