import Events from 'events';
class Sticker {
  constructor(stickerNum, idNumber) {
    this.id = idNumber;
    this.src = `./images/sticker/sticker${stickerNum}.png`;
    this.positionX = 100;
    this.positionY = 100;
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

    this.isDoubleTouched = false;
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
    this.diffX = 0;
    this.diffY = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;
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

    // this.$canvas.addEventListener('touchstart', event => {
    //   this.handleTouchStart(event);
    // });

    // this.$canvas.addEventListener('touchmove', event => {
    //   this.handleTouchMove(event);
    // });

    // document.addEventListener('touchend', event => {
    //   this.handleTouchEnd(event);
    // });
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
    const START_X = event.screenX;
    const START_Y = event.screenY;
    this.lastScreenX = START_X;
    this.lastScreenY = START_Y;
    this.isStickerTouched = this.judgeWhereClickOnTheSticker(event);
    if (this.isStickerTouched) {
      this.decideOperatedSticker(event);
      this.renderStickers();
    }
  }

  handleMouseMove(event) {
    if (this.isStickerTouched === false) return;
    const CURRENT_X = event.screenX;
    const CURRENT_Y = event.screenY;
    this.diffX = CURRENT_X - this.lastScreenX;
    this.diffY = CURRENT_Y - this.lastScreenY;
    this.lastTranslateX += this.diffX;
    this.lastTranslateY += this.diffY;

    this.operateSticker();
    this.renderStickers();

    this.lastScreenX = CURRENT_X;
    this.lastScreenY = CURRENT_Y;
  }

  handleMouseUp() {
    this.isStickerTouched = false;
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
    this.clickProperty = 0;
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
      let minPointX = STICKER_OBJ.positionX;
      let maxPointX = STICKER_OBJ.positionX + STICKER_OBJ.width;
      let minPointY = STICKER_OBJ.positionY;
      let maxPointY = STICKER_OBJ.positionY + STICKER_OBJ.height;

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
    ].positionX;

    this.stickerPosition_past.y = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].positionY;

    this.stickerSize_past.width = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].width;

    this.stickerSize_past.height = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].height;
  }

  moveSticker() {
    this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].positionX += this.diffX;

    this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].positionY += this.diffY;
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
    if (-this.diffY <= -this.diffX) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width += -this
        .diff.x;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionX =
        this.stickerPosition_past.x + this.diffX;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionY =
        this.stickerPosition_past.y + this.diffX;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + -this.diffY;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionY =
        this.stickerPosition_past.y + this.diffY;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionX =
        this.stickerPosition_past.x + this.diffY;
    }
  }
  resizeHandleLeftBottom() {
    const ASPECT = 1;
    if (this.diffY <= -this.diffX) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickerSize_past.width + -this.diffX;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionX =
        this.stickerPosition_past.x + this.diffX;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + this.diffY;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionX =
        this.stickerPosition_past.x + -this.diffY;
    }
  }
  resizeHandleRightBottom() {
    const ASPECT = 1;
    if (this.diffY <= this.diffX) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickerSize_past.width + this.diffX;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + this.diffY;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;
    }
  }
  resizeHandleRightTop() {
    const ASPECT = 1;
    if (-this.diffY <= this.diffX) {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickerSize_past.width + this.diffX;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionY =
        this.stickerPosition_past.y + -this.diffX;
    } else {
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height =
        this.stickerSize_past.height + -this.diffY;
      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width =
        this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height * ASPECT;

      this.stickersOnCanvas[this.stickersOnCanvas.length - 1].positionY =
        this.stickerPosition_past.y + this.diffY;
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
      let x = this.stickersOnCanvas[i].positionX,
        y = this.stickersOnCanvas[i].positionY,
        width = this.stickersOnCanvas[i].width,
        height = this.stickersOnCanvas[i].height;

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
      let x = this.stickersOnCanvas[i].positionX,
        y = this.stickersOnCanvas[i].positionY,
        width = this.stickersOnCanvas[i].width,
        height = this.stickersOnCanvas[i].height;

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
