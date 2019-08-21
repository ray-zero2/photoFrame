import Events from 'events';
class Sticker {
  constructor(stickerNum, idNumber) {
    this.id = idNumber;
    this.src = `./images/sticker/sticker${stickerNum}.png`;
    this.leftTopPoint = { x: 100, y: 100 };
    this.scale = 1;
    this.width = 100;
    this.height = 100;
  }
}
export default class extends Events {
  constructor(backgroundImage) {
    super();

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
    this.backImageScreenContext.putImageData(backgroundImage, 0, 0);
    this.context.drawImage(this.$backImageScreen, 0, 0, 300, 300);

    this.$stickerWrapper = document.querySelector('.sticker-wrapper');
    this.$stickers = document.querySelectorAll('.js-sticker');
    this.$removeStickerButton = document.querySelector('.js-removeSticker');
    this.$createImageButton = document.querySelector('.js-createImageButton');

    this.pointerPosition = {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    };
    this.diff = { x: 0, y: 0 };
    this.isStickerTouched = false;
    this.stickerId = 0; //スタンプ追加時に付与していくid番号
    this.activeStickerId = 0; //現在アクティブ状態のスタンプid
    this.stickersOnCanvas = []; //キャンバス上に存在するスタンプの配列
    this.stickerPosition_past = { x: 0, y: 0 };
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

    this.$stickerWrapper.classList.remove('js-hide');
    this.$removeStickerButton.classList.remove('js-hide');
    this.$createImageButton.classList.remove('js-hide');
    this.bind();
  }

  bind() {
    this.$canvas.addEventListener('mousedown', event => {
      this.handleMouseDown(event);
    });

    this.$canvas.addEventListener('mousemove', event => {
      this.handleMouseMove(event);
    });

    document.addEventListener('mouseup', event => {
      this.handleMouseUp(event);
    });

    this.$canvas.addEventListener('touchstart', event => {
      this.handleTouchStart(event);
    });

    this.$canvas.addEventListener('touchmove', event => {
      this.handleTouchMove(event);
    });

    document.addEventListener('touchend', event => {
      this.handleTouchEnd(event);
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

  handleMouseDown(event) {
    // const START_X = event.screenX;
    // const START_Y = event.screenY;
    // this.pointerPosition.startX = START_X;
    // this.pointerPosition.startY = START_Y;
    // this.isStickerTouched = this.judgeWhereClickOnTheSticker(event);
    // if (this.isStickerTouched) {
    //   this.decideOperatedSticker(event);
    //   this.renderStickers();
    // }
    this.singleTouchStart(event);
  }

  handleMouseMove(event) {
    this.singleTouchMove(event);
  }

  handleMouseUp() {
    this.isStickerTouched = false;
    this.pointerPosition.startX = 0;
    this.pointerPosition.startY = 0;
    this.pointerPosition.currentX = 0;
    this.pointerPosition.currentY = 0;
    this.clickProperty = 0;
  }

  handleTouchStart(event) {
    const TOUCHES_ARRAY = event.touches;
    event.preventDefault();
    if (TOUCHES_ARRAY.length === 1) {
      this.singleTouchStart(event);
    } else {
      this.doubleTouchStart(event);
      this.isDoubleTouched = true;
    }
    this.isTouched = true;
  }

  handleTouchMove(event) {
    if (!this.isTouched) return;
    const TOUCHES_ARRAY = event.touches;
    if (TOUCHES_ARRAY.length === 1) {
      this.singleTouchMove(event);
    } else if (TOUCHES_ARRAY.length >= 2 && this.isDoubleTouched) {
      this.doubleTouchMove(event);
    }
  }

  handleTouchEnd() {
    this.handleMouseUp();
    this.isTouched = false;
    this.isDoubleTouched = false;
  }

  singleTouchStart(event) {
    const START_X =
      event.type === 'touchstart' ? event.touches[0].screenX : event.screenX;
    const START_Y =
      event.type === 'touchstart' ? event.touches[0].screenY : event.screenY;
    this.pointerPosition.startX = START_X;
    this.pointerPosition.startY = START_Y;
    this.isStickerTouched = this.judgeWhereClickOnTheSticker(event);
    if (this.isStickerTouched) {
      this.decideOperatedSticker(event);
      this.renderStickers();
    }
  }

  singleTouchMove(event) {
    if (this.isStickerTouched === false) return;
    const CURRENT_X =
      event.type === 'touchmove' ? event.touches[0].screenX : event.screenX;
    const CURRENT_Y =
      event.type === 'touchmove' ? event.touches[0].screenY : event.screenY;
    this.pointerPosition.currentX = CURRENT_X;
    this.pointerPosition.currentY = CURRENT_Y;
    this.diff.x = CURRENT_X - this.pointerPosition.startX;
    this.diff.y = CURRENT_Y - this.pointerPosition.startY;

    this.operateSticker();
    this.renderStickers();
  }

  doubleTouchStart(event) {
    const TOUCHES_ARRAY = event.touches;
    const X1 = TOUCHES_ARRAY[0].screenX;
    const X2 = TOUCHES_ARRAY[1].screenX;
    const Y1 = TOUCHES_ARRAY[0].screenY;
    const Y2 = TOUCHES_ARRAY[1].screenY;
    this.lastLength = Math.hypot(X2 - X1, Y2 - Y1);
    this.pointerPosition.startX = (X2 + X1) / 2;
    this.pointerPosition.startY = (Y2 + Y1) / 2;
    this.isDoubleTouched = true;
  }

  doubleTouchMove(event) {
    const TOUCHES_ARRAY = event.touches;
    const X1 = TOUCHES_ARRAY[0].screenX;
    const X2 = TOUCHES_ARRAY[1].screenX;
    const Y1 = TOUCHES_ARRAY[0].screenY;
    const Y2 = TOUCHES_ARRAY[1].screenY;
    const CURRENT_X = (X2 + X1) / 2;
    const CURRENT_Y = (Y2 + Y1) / 2;
    const CURRENT_LENGTH = Math.hypot(X2 - X1, Y2 - Y1);
    const SCALE = CURRENT_LENGTH / this.lastLength;
    //active Stickerのscaleを見たい（実装途中）
    // console.log(SCALE);

    this.pinchSticker(SCALE);
    // this.moveSticker();
    this.renderStickers();
    this.lastLength = CURRENT_LENGTH;
    // this.lastScreenX = CURRENT_X;
    // this.lastScreenY = CURRENT_Y;
  }
  /**
   * スタンプをクリックしているかを調べ、アクティブなスタンプをクリックしていればそのクリック箇所も調べる
   * @param {object} event クリックイベント
   * @return {boolean} onStickerFlag いずれかのスタンプ上をクリックしていればtrueを返す
   */
  judgeWhereClickOnTheSticker(event) {
    console.log(event);
    const rect = event.target.getBoundingClientRect();
    const OFFSET_X =
      event.type === 'touchstart'
        ? event.touches[0].clientX - window.pageXOffset - rect.left
        : event.offsetX;
    const OFFSET_Y =
      event.type === 'touchstart'
        ? event.touches[0].clientY - window.pageYOffset - rect.top
        : event.offsetY;

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

      // console.log(OFFSET_X);
      //クリック地点がどのステッカーの上にあるか捜査
      if (
        minPointX <= OFFSET_X &&
        OFFSET_X <= maxPointX &&
        minPointY <= OFFSET_Y &&
        OFFSET_Y <= maxPointY
      ) {
        this.activeStickerId = STICKER_OBJ.id;
        if (i === this.stickersOnCanvas.length - 1) {
          this.judgeClickOnTheLine(
            OFFSET_X,
            OFFSET_Y,
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
    offsetX,
    offsetY,
    minPointX,
    maxPointX,
    minPointY,
    maxPointY
  ) {
    this.judgeLeftLine(offsetX, minPointX);
    this.judgeBottomLine(offsetY, maxPointY);
    this.judgeRightLine(offsetX, maxPointX);
    this.judgeTopLine(offsetY, minPointY);
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

  decideOperatedSticker() {
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

    this.stickerSize_past.width = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].width;

    this.stickerSize_past.height = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].height;
  }

  moveSticker() {
    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x =
      this.diff.x + this.stickerPosition_past.x;

    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y =
      this.diff.y + this.stickerPosition_past.y;
  }

  pinchSticker(SCALE) {
    const ACTIVE_STICKER_OBJ = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ];

    const DIFF_WIDTH =
      ACTIVE_STICKER_OBJ.width * ACTIVE_STICKER_OBJ.scale * (SCALE - 1);
    const DIFF_HEIGHT =
      ACTIVE_STICKER_OBJ.height * ACTIVE_STICKER_OBJ.scale * (SCALE - 1);

    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].scale *= SCALE;
    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x -=
      DIFF_WIDTH / 2;
    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y -=
      DIFF_HEIGHT / 2;
  }

  resizeSticker() {
    switch (this.clickProperty) {
      case this.LEFT_TOP_POINT:
        // console.log('left top point');
        this.resizeHandleLeftTop();
        break;
      case this.LEFT_BOTTOM_POINT:
        // console.log('left bottom point');
        this.resizeHandleLeftBottom();
        break;
      case this.RIGHT_BOTTOM_POINT:
        // console.log('right bottom point');
        this.resizeHandleRightBottom();
        break;
      case this.RIGHT_TOP_POINT:
        // console.log('right top point');
        this.resizeHandleRightTop();
        break;
      default:
        break;
    }
  }
  resizeHandleLeftTop() {
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
  resizeHandleLeftBottom() {
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
  resizeHandleRightBottom() {
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
  resizeHandleRightTop() {
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
