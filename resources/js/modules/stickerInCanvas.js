import Events from 'events';
class Sticker {
  constructor(stickerNum, idNumber) {
    this.id = idNumber;
    this.src = `./images/sticker/sticker${stickerNum}.png`;
    this.width = 300;
    this.height = 300;
    this.position = { x: 300, y: 300 };
  }
}
export default class extends Events {
  constructor(backgroundImage) {
    super();

    //キャンバス
    this.$canvas = document.querySelector('.canvas');
    this.context = this.$canvas.getContext('2d');
    //キャンバスの内部での幅と見た目の幅の比率
    this.magnificationRatioX = this.$canvas.width / this.$canvas.offsetWidth;
    this.magnificationRatioY = this.$canvas.height / this.$canvas.offsetHeight;

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
    this.context.drawImage(
      this.$backImageScreen,
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );

    this.$stickerWrapper = document.querySelector('.sticker-wrapper');
    this.$stickers = document.querySelectorAll('.js-sticker');
    this.$removeStickerButton = document.querySelector('.js-removeSticker');
    this.$createImageButton = document.querySelector('.js-createImageButton');

    this.diffX = 0;
    this.diffY = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;
    this.isStickerTouched = false;
    this.stickerId = 0; //スタンプ追加時に付与していくid番号
    this.activeStickerId = 0; //現在アクティブ状態のスタンプid
    this.stickersOnCanvas = []; //キャンバス上に存在するスタンプの配列
    this.aspect = 1;

    //メンバ変数だけど一旦定数扱いに
    this.RANGE_OFFSET =
      15 * Math.max(this.magnificationRatioX, this.magnificationRatioY); //クリック範囲のオフセット

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

    this.$removeStickerButton.addEventListener('click', event => {
      event.preventDefault();
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
    this.singleTouchStart(event);
  }

  handleMouseMove(event) {
    this.singleTouchMove(event);
  }

  handleMouseUp() {
    this.isStickerTouched = false;
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
    this.lastScreenX = START_X;
    this.lastScreenY = START_Y;
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
    this.diffX = (CURRENT_X - this.lastScreenX) * this.magnificationRatioX;
    this.diffY = (CURRENT_Y - this.lastScreenY) * this.magnificationRatioY;
    this.lastTranslateX += this.diffX;
    this.lastTranslateY += this.diffY;

    this.operateSticker(event);
    this.renderStickers();
    this.lastScreenX = CURRENT_X;
    this.lastScreenY = CURRENT_Y;
  }

  doubleTouchStart(event) {
    const TOUCHES_ARRAY = event.touches;
    const X1 = TOUCHES_ARRAY[0].screenX;
    const X2 = TOUCHES_ARRAY[1].screenX;
    const Y1 = TOUCHES_ARRAY[0].screenY;
    const Y2 = TOUCHES_ARRAY[1].screenY;
    this.lastScreenX = (X2 + X1) / 2;
    this.lastScreenY = (Y2 + Y1) / 2;
    this.lastLength = Math.hypot(X2 - X1, Y2 - Y1);
    this.isDoubleTouched = true;
  }

  doubleTouchMove(event) {
    console.log('doubleTouchMove  Start');
    const TOUCHES_ARRAY = event.touches;
    const X1 = TOUCHES_ARRAY[0].screenX;
    const X2 = TOUCHES_ARRAY[1].screenX;
    const Y1 = TOUCHES_ARRAY[0].screenY;
    const Y2 = TOUCHES_ARRAY[1].screenY;
    const CURRENT_X = (X2 + X1) / 2;
    const CURRENT_Y = (Y2 + Y1) / 2;
    const CURRENT_LENGTH = Math.hypot(X2 - X1, Y2 - Y1);
    const SCALE = CURRENT_LENGTH / this.lastLength;

    this.diffX = (CURRENT_X - this.lastScreenX) * this.magnificationRatioX;
    this.diffY = (CURRENT_Y - this.lastScreenY) * this.magnificationRatioY;
    this.lastTranslateX += this.diffX;
    this.lastTranslateY += this.diffY;
    this.pinchSticker(SCALE);
    this.moveSticker();
    this.renderStickers();
    this.lastLength = CURRENT_LENGTH;
    this.lastScreenX = CURRENT_X;
    this.lastScreenY = CURRENT_Y;
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
      (event.type === 'touchstart'
        ? event.touches[0].clientX - window.pageXOffset - rect.left
        : event.offsetX) * this.magnificationRatioX;
    const OFFSET_Y =
      (event.type === 'touchstart'
        ? event.touches[0].clientY - window.pageYOffset - rect.top
        : event.offsetY) * this.magnificationRatioY;

    let onStickerFlag = false;

    for (let i = 0, end = this.stickersOnCanvas.length; i < end; i++) {
      const STICKER_OBJ = this.stickersOnCanvas[i];
      let minPointX = STICKER_OBJ.position.x;
      let maxPointX = STICKER_OBJ.position.x + STICKER_OBJ.width;
      let minPointY = STICKER_OBJ.position.y;
      let maxPointY = STICKER_OBJ.position.y + STICKER_OBJ.height;

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
  operateSticker(event) {
    const rect = event.target.getBoundingClientRect();
    const OFFSET_X =
      (event.type === 'touchmove'
        ? event.touches[0].clientX - window.pageXOffset - rect.left
        : event.offsetX) * this.magnificationRatioX;
    const OFFSET_Y =
      (event.type === 'touchmove'
        ? event.touches[0].clientY - window.pageYOffset - rect.top
        : event.offsetY) * this.magnificationRatioY;

    if (this.clickProperty === 0) {
      this.moveSticker();
    } else {
      this.resizeSticker(OFFSET_X, OFFSET_Y);
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
  }

  moveSticker() {
    this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].position.x += this.diffX;

    this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].position.y += this.diffY;
  }

  pinchSticker(SCALE) {
    const LAST_INDEX = this.stickersOnCanvas.length - 1;
    const ACTIVE_STICKER_OBJ = this.stickersOnCanvas[LAST_INDEX];

    const WIDTH = ACTIVE_STICKER_OBJ.width;
    const HEIGHT = ACTIVE_STICKER_OBJ.height;
    console.log(WIDTH);
    this.adjustSize(WIDTH * SCALE, HEIGHT * SCALE);
    const WIDTH_AFTER = this.stickersOnCanvas[LAST_INDEX].width;
    console.log(WIDTH_AFTER);
    const HEIGHT_AFTER = this.stickersOnCanvas[LAST_INDEX].height;
    const DIFF_WIDTH = WIDTH_AFTER - WIDTH;
    const DIFF_HEIGHT = HEIGHT_AFTER - HEIGHT;

    this.stickersOnCanvas[LAST_INDEX].position.x -= DIFF_WIDTH / 2;
    this.stickersOnCanvas[LAST_INDEX].position.y -= DIFF_HEIGHT / 2;
  }

  resizeSticker(offsetX, offsetY) {
    switch (this.clickProperty) {
      case this.LEFT_TOP_POINT:
        console.log('left top point');
        this.resizeHandleLeftTop(offsetX, offsetY);
        break;
      case this.LEFT_BOTTOM_POINT:
        console.log('left bottom point');
        this.resizeHandleLeftBottom(offsetX, offsetY);
        break;
      case this.RIGHT_BOTTOM_POINT:
        console.log('right bottom point');
        this.resizeHandleRightBottom(offsetX, offsetY);
        break;
      case this.RIGHT_TOP_POINT:
        console.log('right top point');
        this.resizeHandleRightTop(offsetX, offsetY);
        break;
      default:
        break;
    }
  }
  resizeHandleLeftTop(offsetX, offsetY) {
    const STICKER = this.stickersOnCanvas[this.stickersOnCanvas.length - 1];
    const RIGHT = STICKER.width + STICKER.position.x;
    const BOTTOM = STICKER.height + STICKER.position.y;
    const WIDTH = RIGHT - offsetX;
    const HEIGHT = BOTTOM - offsetY;
    this.adjustSize(WIDTH, HEIGHT);

    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].position.x =
      RIGHT - this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width;
    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].position.y =
      BOTTOM - this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height;
  }

  resizeHandleLeftBottom(offsetX, offsetY) {
    const STICKER = this.stickersOnCanvas[this.stickersOnCanvas.length - 1];
    const RIGHT = STICKER.width + STICKER.position.x;
    const WIDTH = RIGHT - offsetX;
    const HEIGHT = offsetY - STICKER.position.y;
    this.adjustSize(WIDTH, HEIGHT);

    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].position.x =
      RIGHT - this.stickersOnCanvas[this.stickersOnCanvas.length - 1].width;
  }

  resizeHandleRightBottom(offsetX, offsetY) {
    const STICKER = this.stickersOnCanvas[this.stickersOnCanvas.length - 1];
    const WIDTH = offsetX - STICKER.position.x;
    const HEIGHT = offsetY - STICKER.position.y;
    this.adjustSize(WIDTH, HEIGHT);
  }

  resizeHandleRightTop(offsetX, offsetY) {
    const STICKER = this.stickersOnCanvas[this.stickersOnCanvas.length - 1];
    const BOTTOM = STICKER.height + STICKER.position.y;
    const WIDTH = offsetX - STICKER.position.x;
    const HEIGHT = BOTTOM - offsetY;
    this.adjustSize(WIDTH, HEIGHT);

    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].position.y =
      BOTTOM - this.stickersOnCanvas[this.stickersOnCanvas.length - 1].height;
  }

  adjustSize(width, height) {
    const LAST_INDEX = this.stickersOnCanvas.length - 1;
    console.log(width);

    const ADJUST_WIDTH = Math.max(width, this.RANGE_OFFSET * 3);
    console.log(ADJUST_WIDTH);
    const ADJUST_HEIGHT = Math.max(height, this.RANGE_OFFSET * 3);
    if (width >= height) {
      this.stickersOnCanvas[LAST_INDEX].width = ADJUST_WIDTH;
      this.stickersOnCanvas[LAST_INDEX].height = ADJUST_WIDTH * this.aspect;
    } else {
      this.stickersOnCanvas[LAST_INDEX].height = ADJUST_HEIGHT;
      this.stickersOnCanvas[LAST_INDEX].width = ADJUST_HEIGHT * this.aspect;
    }
  }

  handleClickStickerList(element, event) {
    event.preventDefault();
    this.addSticker(element);
    this.renderStickers();
  }

  addSticker(element) {
    const newSticker = new Sticker(element.dataset.stickerNum, this.stickerId);
    this.stickersOnCanvas.push(newSticker);
    this.activeStickerId = this.stickerId;
    this.stickerId++;
  }

  renderStickers() {
    //オフスクリーンに描画
    this.offScreenContext.clearRect(
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
    this.offScreenContext.drawImage(
      this.$backImageScreen,
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
    let img = new Image();

    //枠線の色とマークの大きさ
    let color = 'grey';
    let magRatio = Math.max(this.magnificationRatioX, this.magnificationRatioY);
    let size = 2;

    //スタンプの配列を描画
    for (let i = 0, end = this.stickersOnCanvas.length; i < end; i++) {
      //最後のスタンプ(アクティブ)のみ枠線の色とマークの大きさ変更
      if (i === end - 1) {
        color = 'white';
        size = 3;
      }

      img.src = this.stickersOnCanvas[i].src;
      let x = this.stickersOnCanvas[i].position.x,
        y = this.stickersOnCanvas[i].position.y,
        width = this.stickersOnCanvas[i].width,
        height = this.stickersOnCanvas[i].height;

      this.offScreenContext.drawImage(img, x, y, width, height);
      this.drawFrameLine(x, y, width, height, color, magRatio);
      this.drawCornerMark(x, y, width, height, size, magRatio);
    }

    //まとめてキャンバスへ描画
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.context.drawImage(
      this.$offScreen,
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
  }

  drawFrameLine(x, y, width, height, color, ratio) {
    this.offScreenContext.strokeStyle = color;
    this.offScreenContext.lineWidth = 1 * ratio;
    this.offScreenContext.beginPath();
    this.offScreenContext.strokeRect(x, y, width, height);
  }
  drawCornerMark(x, y, width, height, size, ratio) {
    this.offScreenContext.strokeStyle = 'black';
    this.offScreenContext.fillStyle = 'white';
    this.drawArc(x, y, size, ratio);
    this.drawArc(x, y + height, size, ratio);
    this.drawArc(x + width, y, size, ratio);
    this.drawArc(x + width, y + height, size, ratio);
  }

  drawArc(x, y, size, ratio) {
    this.offScreenContext.lineWidth = 1 * ratio;
    this.offScreenContext.beginPath();
    this.offScreenContext.arc(x, y, size * ratio, 0, Math.PI * 2, false);
    this.offScreenContext.stroke();
  }
  renderOutputImage() {
    //オフスクリーンに描画
    this.offScreenContext.clearRect(
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
    this.offScreenContext.drawImage(
      this.$backImageScreen,
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
    let img = new Image();

    //スタンプの配列を描画
    for (let i = 0, end = this.stickersOnCanvas.length; i < end; i++) {
      img.src = this.stickersOnCanvas[i].src;
      let x = this.stickersOnCanvas[i].position.x,
        y = this.stickersOnCanvas[i].position.y,
        width = this.stickersOnCanvas[i].width,
        height = this.stickersOnCanvas[i].height;

      this.offScreenContext.drawImage(img, x, y, width, height);
    }
    //まとめてキャンバスへ描画
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.context.drawImage(
      this.$offScreen,
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
  }
  createImage() {
    let png = this.$canvas.toDataURL();
    document.querySelector('.image').src = png;
  }
}
