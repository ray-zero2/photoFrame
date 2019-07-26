class Sticker {
  constructor(stickerNum, idNumber) {
    this.id = idNumber;
    this.src = `/public/images/sticker/sticker${stickerNum}.png`;
    this.leftTopPoint = { x: 100, y: 100 };
    this.width = 100;
    this.height = 100;
    this.scale = 1;
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
    this.$removeStickerButton = document.querySelector('.js-removeSticker');
    this.$createImageButton = document.querySelector('.js-createImageButton');

    this.phase = 1; //フェーズ番号1〜3

    //変数等
    this.originalImage = null;
    this.imageWidth = 300;
    this.imageHeight = 300;
    this.scale = 1;
    this.scale_past = 1;

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
    this.isTouched = false;
    this.moveStickerFlag = false;

    this.stickerId = 0; //スタンプ追加時に付与していくid番号
    this.activeStickerId = 0; //現在アクティブ状態のスタンプid
    this.stickersOnCanvas = []; //キャンバス上に存在するスタンプの配列
    this.stickerPosition_past = { x: 0, y: 0 };
    this.stickerScale_past = 1;
    this.stickerSize_past = { width: 0, height: 0 };

    //メンバ変数だけど一旦定数扱いに
    this.RANGE_OFFSET = 5; //クリック範囲のオフセット

    //ライン上クリックの判定に必要な定数
    this.LEFT_LINE = 1;
    this.BOTTOM_LINE = 2;
    this.RIGHT_LINE = 4;
    this.TOP_LINE = 8;
    this.LEFT_TOP_POINT = this.LEFT_LINE + this.TOP_LINE;
    this.LEFT_BOTTOM_POINT = this.LEFT_LINE + this.BOTTOM_LINE;
    this.RIGHT_BOTTOM_POINT = this.RIGHT_LINE + this.BOTTOM_LINE;
    this.RIGHT_TOP_POINT = this.RIGHT_LINE + this.TOP_LINE;

    this.clickProperty = 0;

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

    this.$canvas.addEventListener('mousemove', event => {
      this.handleMouseMove(event);
    });

    document.addEventListener('mouseup', event => {
      this.handleMouseUp(event);
    });

    //拡大縮小ボタン
    this.$scaleUpButton.addEventListener('click', event => {
      this.scale_past = this.scale;
      this.scale *= 1.1;
      this.resize();
    });
    this.$scaleDownButton.addEventListener('click', () => {
      this.scale_past = this.scale;
      this.scale *= 0.9;
      this.resize();
    });
    this.$scaleOkButton.addEventListener('click', () => {
      this.$scaleUpButton.classList.add('js-hide');
      this.$scaleDownButton.classList.add('js-hide');
      this.$scaleOkButton.classList.add('js-hide');
      this.$stickerWrapper.classList.remove('js-hide');
      this.$removeStickerButton.classList.remove('js-hide');
      this.$createImageButton.classList.remove('js-hide');

      this.originalImage = this.context.getImageData(0, 0, 300, 300);
      this.backImageScreenContext.putImageData(this.originalImage, 0, 0);
      this.phase = 3;
    });

    //sticker一覧
    [...this.$stickers].forEach(element => {
      element.addEventListener('click', event => {
        this.handleClickStickerList(element, event);
      });
    });

    this.$removeStickerButton.addEventListener('click', () => {
      this.stickersOnCanvas.splice(this.stickersOnCanvas.length - 1, 1);
      this.renderStickers();
    });

    this.$createImageButton.addEventListener('click', () => {
      this.renderOutputImage();
      this.$stickerWrapper.classList.add('js-hide');
      this.$removeStickerButton.classList.add('js-hide');
      this.$createImageButton.classList.add('js-hide');
      this.createImage();
      document.querySelector('.image-wrapper').classList.remove('js-hide');
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
    TRACKS.forEach(function (track) {
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
    const START_X = event.screenX;
    const START_Y = event.screenY;
    this.pointerPosition.startX = START_X;
    this.pointerPosition.startY = START_Y;
    if (this.phase === 2) {
      this.imagePosition_past.x = this.imagePosition.x;
      this.imagePosition_past.y = this.imagePosition.y;
      console.log('pastPosition_x:' + this.imagePosition_past.x);
    } else if (this.phase === 3) {
      this.moveStickerFlag = this.judgeWhereClickOnTheSticker(event);
      if (this.moveStickerFlag) {
        this.decideOperatedSticker(event);
        this.renderStickers();
      }
    }

    this.isTouched = true;
  }

  /**
   * スタンプをクリックしているかを調べ、アクティブなスタンプをクリックしていればそのクリック箇所も調べる
   * @param {object} event クリックイベント
   * @return {boolean} onStickerFlag いずれかのスタンプ上をクリックしていればtrueを返す
   */
  judgeWhereClickOnTheSticker(event) {
    let onStickerFlag = false;

    for (let i = 0; i < this.stickersOnCanvas.length; i++) {
      const STICKER_OBJ = this.stickersOnCanvas[i];
      let minPointX = STICKER_OBJ.leftTopPoint.x;
      let maxPointX =
        STICKER_OBJ.leftTopPoint.x + STICKER_OBJ.width * STICKER_OBJ.scale;
      let minPointY = STICKER_OBJ.leftTopPoint.y;
      let maxPointY =
        STICKER_OBJ.leftTopPoint.y + STICKER_OBJ.height * STICKER_OBJ.scale;

      //最後のスタンプ（現アクティブスタンプ）のみクリック範囲拡大
      if (i === this.stickersOnCanvas.length - 1) {
        minPointX -= this.RANGE_OFFSET;
        maxPointX += this.RANGE_OFFSET;
        minPointY -= this.RANGE_OFFSET;
        maxPointY += this.RANGE_OFFSET;
      }

      //クリック地点がどのステッカーの上にあるか捜査
      if (
        minPointX <= event.offsetX &&
        event.offsetX <= maxPointX &&
        minPointY <= event.offsetY &&
        event.offsetY <= maxPointY
      ) {
        this.activeStickerId = STICKER_OBJ.id;
        if (i === this.stickersOnCanvas.length - 1) {
          this.judgeClickOnTheLine(
            event,
            minPointX,
            maxPointX,
            minPointY,
            maxPointY
          );
        }
        console.log('onSticker');
        onStickerFlag = true;
      } else {
        console.log('notOnSticker');
      }
    }
    return onStickerFlag;
  }

  /**
   * アクティブなスタンプのライン上がクリックされたかどうかを調べ、そのクリック箇所を割り出す
   * @param {object} mouseDownEvent マウスダウンイベント
   * @param {int} minPointX 枠線のx最小値
   * @param {int} maxPointX 枠線のx最大値
   * @param {int} minPointY 枠線のy最小値
   * @param {int} maxPointY 枠線のy最大値
   */
  judgeClickOnTheLine(
    mouseDownEvent,
    minPointX,
    maxPointX,
    minPointY,
    maxPointY
  ) {
    this.judgeLeftLine(mouseDownEvent.offsetX, minPointX);
    this.judgeBottomLine(mouseDownEvent.offsetY, maxPointY);
    this.judgeRightLine(mouseDownEvent.offsetX, maxPointX);
    this.judgeTopLine(mouseDownEvent.offsetY, minPointY);
  }

  judgeLeftLine(clickPointX, minPointX) {
    if (
      minPointX <= clickPointX &&
      clickPointX <= minPointX + this.RANGE_OFFSET * 2
    ) {
      this.clickProperty += this.LEFT_LINE;
    }
  }
  judgeBottomLine(clickPointY, maxPointY) {
    if (
      maxPointY - this.RANGE_OFFSET * 2 <= clickPointY &&
      clickPointY <= maxPointY
    ) {
      this.clickProperty += this.BOTTOM_LINE;
    }
  }
  judgeRightLine(clickPointX, maxPointX) {
    if (
      maxPointX - this.RANGE_OFFSET * 2 <= clickPointX &&
      clickPointX <= maxPointX
    ) {
      this.clickProperty += this.RIGHT_LINE;
    }
  }
  judgeTopLine(clickPointY, minPointY) {
    if (
      minPointY <= clickPointY &&
      clickPointY <= minPointY + this.RANGE_OFFSET * 2
    ) {
      this.clickProperty += this.TOP_LINE;
    }
  }

  handleMouseMove(event) {
    if (!this.isTouched) return;
    const CURRENT_X = event.screenX;
    const CURRENT_Y = event.screenY;
    this.pointerPosition.currentX = CURRENT_X;
    this.pointerPosition.currentY = CURRENT_Y;
    this.diff.x = CURRENT_X - this.pointerPosition.startX;
    this.diff.y = CURRENT_Y - this.pointerPosition.startY;

    if (this.phase === 2) {
      this.imagePosition.x = this.diff.x + this.imagePosition_past.x;
      this.imagePosition.y = this.diff.y + this.imagePosition_past.y;
      this.moveImage();
    } else if (this.phase === 3 && this.moveStickerFlag) {
      this.operateSticker();
    }
  }

  /**
   * ステッカーのクリックした箇所に対応する処理を実行
   */
  operateSticker() {
    if (this.clickProperty === 0) {
      this.moveSticker();
    } else {
      this.resizeSticker();
    }
  }

  handleMouseUp() {
    this.isTouched = false;
    this.moveStickerFlag = false;
    this.pointerPosition.startX = 0;
    this.pointerPosition.startY = 0;
    this.pointerPosition.currentX = 0;
    this.pointerPosition.currentY = 0;
    console.log(this.clickProperty);
    this.clickProperty = 0;
  }

  decideOperatedSticker(event) {
    //現在アクティブ状態のスタンプが何番目の配列に入っているか取得
    const INDEX_OPERATED_STICKER = this.stickersOnCanvas.findIndex(
      stickerObj => {
        return stickerObj.id === this.activeStickerId;
      }
    );
    //アクティブなスタンプを配列の最後に移動
    const ACTIVE_STICKER_OBJ = this.stickersOnCanvas[INDEX_OPERATED_STICKER];
    this.stickersOnCanvas.splice(INDEX_OPERATED_STICKER, 1);
    this.stickersOnCanvas.push(ACTIVE_STICKER_OBJ);

    //アクティブなスタンプの初期状態を保持
    this.stickerPosition_past.x = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].leftTopPoint.x;

    this.stickerPosition_past.y = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].leftTopPoint.y;

    this.stickerScale_past = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].scale;

    this.stickerSize_past.width = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].width;

    this.stickerSize_past.height = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].height;
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
  }

  moveSticker() {
    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x =
      this.diff.x + this.stickerPosition_past.x;

    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y =
      this.diff.y + this.stickerPosition_past.y;

    this.renderStickers();
  }

  resizeSticker() {
    switch (this.clickProperty) {
      case this.LEFT_TOP_POINT:
        console.log('left top point');
        this.resizeReferenceLeftTop();
        break;
      case this.LEFT_BOTTOM_POINT:
        console.log('left bottom point');
        this.resizeReferenceLeftBottom();
        break;
      case this.RIGHT_BOTTOM_POINT:
        console.log('right bottom point');
        this.resizeReferenceRightBottom();
        break;
      case this.RIGHT_TOP_POINT:
        console.log('right top point');
        this.resizeReferenceRightTop();
        break;
      default:
        break;
    }
    this.renderStickers();
  }
  resizeReferenceLeftTop() {
    const ASPECT = 1;
    if (-this.diff.y <= -this.diff.x) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickerSize_past.width + -this.diff.x;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x =
        this.stickerPosition_past.x + this.diff.x;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y =
        this.stickerPosition_past.y + this.diff.x;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + -this.diff.y;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y =
        this.stickerPosition_past.y + this.diff.y;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x =
        this.stickerPosition_past.x + this.diff.y;
    }
  }
  resizeReferenceLeftBottom() {
    const ASPECT = 1;
    if (this.diff.y <= -this.diff.x) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickerSize_past.width + -this.diff.x;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x =
        this.stickerPosition_past.x + this.diff.x;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + this.diff.y;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x =
        this.stickerPosition_past.x + -this.diff.y;
    }
  }
  resizeReferenceRightBottom() {
    const ASPECT = 1;
    if (this.diff.y <= this.diff.x) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickerSize_past.width + this.diff.x;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + this.diff.y;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;
    }
  }
  resizeReferenceRightTop() {
    const ASPECT = 1;
    if (-this.diff.y <= this.diff.x) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickerSize_past.width + this.diff.x;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y =
        this.stickerPosition_past.y + -this.diff.x;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + -this.diff.y;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y =
        this.stickerPosition_past.y + this.diff.y;
    }
  }

  handleClickStickerList(element, event) {
    this.addSticker(element);
    this.renderStickers();
  }

  addSticker(element) {
    const newSticker = new Sticker(element.dataset.stickerNum, this.stickerId);
    this.stickersOnCanvas.push(newSticker);
    this.activeStickerId = this.stickerId;
    this.stickerId++;
    // console.log(this.stickersOnCanvas);
  }

  renderStickers() {
    //オフスクリーンに描画
    this.offScreenContext.clearRect(0, 0, 300, 300);
    this.offScreenContext.drawImage(this.$backImageScreen, 0, 0, 300, 300);
    let img = new Image();

    //枠線の色とマークの大きさ
    let color = 'grey';
    let size = 2;

    //スタンプの配列を描画
    for (let i = 0; i < this.stickersOnCanvas.length; i++) {
      //最後のスタンプ(アクティブ)のみ枠線の色とマークの大きさ変更
      if (i === this.stickersOnCanvas.length - 1) {
        color = 'white';
        size = 3;
      }

      img.src = this.stickersOnCanvas[i].src;
      let x = this.stickersOnCanvas[i].leftTopPoint.x,
        y = this.stickersOnCanvas[i].leftTopPoint.y,
        width = this.stickersOnCanvas[i].width * this.stickersOnCanvas[i].scale,
        height =
          this.stickersOnCanvas[i].height * this.stickersOnCanvas[i].scale;

      this.offScreenContext.drawImage(img, x, y, width, height);
      this.drawFrameLine(x, y, width, height, color);
      this.drawCornerMark(x, y, width, height, size);
    }

    //まとめてキャンバスへ描画
    this.context.clearRect(0, 0, 300, 300);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }

  drawFrameLine(x, y, width, height, color) {
    this.offScreenContext.strokeStyle = color;
    this.offScreenContext.beginPath();
    this.offScreenContext.strokeRect(x, y, width, height);
  }
  drawCornerMark(x, y, width, height, size) {
    this.offScreenContext.strokeStyle = 'black';
    this.offScreenContext.fillStyle = 'white';
    this.drawArc(x, y, size);
    this.drawArc(x, y + height, size);
    this.drawArc(x + width, y, size);
    this.drawArc(x + width, y + height, size);
  }

  drawArc(x, y, size) {
    this.offScreenContext.beginPath();
    this.offScreenContext.arc(x, y, size, 0, Math.PI * 2, false);
    this.offScreenContext.stroke();
  }
  renderOutputImage() {
    //オフスクリーンに描画
    this.offScreenContext.clearRect(0, 0, 300, 300);
    this.offScreenContext.drawImage(this.$backImageScreen, 0, 0, 300, 300);
    let img = new Image();

    //スタンプの配列を描画
    for (let i = 0; i < this.stickersOnCanvas.length; i++) {
      img.src = this.stickersOnCanvas[i].src;
      let x = this.stickersOnCanvas[i].leftTopPoint.x,
        y = this.stickersOnCanvas[i].leftTopPoint.y,
        width = this.stickersOnCanvas[i].width * this.stickersOnCanvas[i].scale,
        height =
          this.stickersOnCanvas[i].height * this.stickersOnCanvas[i].scale;

      this.offScreenContext.drawImage(img, x, y, width, height);
    }
    //まとめてキャンバスへ描画
    this.context.clearRect(0, 0, 300, 300);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }
  createImage() {
    let png = this.$canvas.toDataURL();
    document.querySelector('.image').src = png;
  }
}
