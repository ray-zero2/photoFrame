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

    //最終描画前のオフスクリーン
    this.$offScreen = document.createElement('canvas');
    this.$offScreen.width = this.$canvas.width;
    this.$offScreen.height = this.$canvas.height;
    this.offScreenContext = this.$offScreen.getContext('2d');

    //非アクティブなスタンプの描画用オフスクリーン
    this.$inactiveStickerScreen = document.createElement('canvas');
    this.$inactiveStickerScreen.width = this.$canvas.width;
    this.$inactiveStickerScreen.height = this.$canvas.height;
    this.inactiveContext = this.$inactiveStickerScreen.getContext('2d');

    //背景画像用オフスクリーン
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
    this.activeSticker = null; //現在アクティブ状態のスタンプ
    this.activeStickerId = 0;
    this.stickersOnCanvas = []; //キャンバス上に存在するスタンプの配列
    this.inactiveStickers = [];
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
      const LAST_INDEX = this.inactiveStickers.length - 1;
      console.log(LAST_INDEX);
      if (LAST_INDEX >= 0) {
        this.activeSticker = this.inactiveStickers.pop();
        this.setInactiveStickers();
        this.render();
      } else {
        this.activeSticker = null;
        //ここの部分でスタンプが何もない状態を出力する必要があり。
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.context.drawImage(
          this.$backImageScreen,
          0,
          0,
          this.$canvas.width,
          this.$canvas.height
        );
      }
    });

    this.$createImageButton.addEventListener('click', () => {
      this.setInactiveStickers('create');
      this.render('create');
      this.createImage();
      this.$stickerWrapper.classList.add('js-hide');
      this.$removeStickerButton.classList.add('js-hide');
      this.$createImageButton.classList.add('js-hide');
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
      // this.decideOperatedSticker(event);
      this.render();
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
    this.render();
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
    this.pinchZoomSticker(SCALE);
    this.moveSticker();
    this.render();
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

    const ACTIVE_STICKER = this.activeSticker;
    const RANGE = this.RANGE_OFFSET;

    let onStickerFlag = false;
    let minPointX = 0;
    let maxPointX = 0;
    let minPointY = 0;
    let maxPointY = 0;

    //judge active sticker
    minPointX = ACTIVE_STICKER.position.x - RANGE;
    maxPointX = ACTIVE_STICKER.position.x + ACTIVE_STICKER.width + RANGE;
    minPointY = ACTIVE_STICKER.position.y - RANGE;
    maxPointY = ACTIVE_STICKER.position.y + ACTIVE_STICKER.height + RANGE;
    if (
      minPointX <= OFFSET_X &&
      OFFSET_X <= maxPointX &&
      minPointY <= OFFSET_Y &&
      OFFSET_Y <= maxPointY
    ) {
      //アクティブスタンプのクリック箇所も調べる
      this.judgeClickOnTheLine(
        OFFSET_X,
        OFFSET_Y,
        minPointX,
        maxPointX,
        minPointY,
        maxPointY
      );
      onStickerFlag = true;
      return onStickerFlag;
    } else {
      //judge inactive stickers
      //reverse loop
      for (let index = this.inactiveStickers.length - 1; index >= 0; index--) {
        const STICKER_OBJ = this.inactiveStickers[index];
        minPointX = STICKER_OBJ.position.x;
        maxPointX = STICKER_OBJ.position.x + STICKER_OBJ.width;
        minPointY = STICKER_OBJ.position.y;
        maxPointY = STICKER_OBJ.position.y + STICKER_OBJ.height;
        if (
          minPointX <= OFFSET_X &&
          OFFSET_X <= maxPointX &&
          minPointY <= OFFSET_Y &&
          OFFSET_Y <= maxPointY
        ) {
          this.decideOperatedSticker(index);
          this.setInactiveStickers();
          onStickerFlag = true;
          return onStickerFlag;
        }
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

  decideOperatedSticker(INDEX) {
    //アクティブなスタンプを配列の最後に移動
    const ACTIVE_STICKER_OBJ = this.inactiveStickers[INDEX];
    this.inactiveStickers.splice(INDEX, 1);
    this.inactiveStickers.push(this.activeSticker);
    this.activeSticker = ACTIVE_STICKER_OBJ;
  }

  moveSticker() {
    const STICKER = this.activeSticker;
    STICKER.position.x += this.diffX;
    STICKER.position.y += this.diffY;
  }

  pinchZoomSticker(SCALE) {
    const ACTIVE_STICKER = this.activeSticker;

    const WIDTH = ACTIVE_STICKER.width;
    const HEIGHT = ACTIVE_STICKER.height;
    // console.log(`first width = ${WIDTH}`);
    this.adjustSize(WIDTH * SCALE, HEIGHT * SCALE);
    const WIDTH_AFTER = this.activeSticker.width;
    // console.log(`width_after = ${WIDTH_AFTER}`);
    const HEIGHT_AFTER = this.activeSticker.height;
    const DIFF_WIDTH = WIDTH_AFTER - WIDTH;
    const DIFF_HEIGHT = HEIGHT_AFTER - HEIGHT;

    this.activeSticker.position.x -= DIFF_WIDTH / 2;
    this.activeSticker.position.y -= DIFF_HEIGHT / 2;
  }

  resizeSticker(offsetX, offsetY) {
    switch (this.clickProperty) {
      case this.LEFT_TOP_POINT:
        // console.log('left top point');
        this.resizeHandleLeftTop(offsetX, offsetY);
        break;
      case this.LEFT_BOTTOM_POINT:
        // console.log('left bottom point');
        this.resizeHandleLeftBottom(offsetX, offsetY);
        break;
      case this.RIGHT_BOTTOM_POINT:
        // console.log('right bottom point');
        this.resizeHandleRightBottom(offsetX, offsetY);
        break;
      case this.RIGHT_TOP_POINT:
        // console.log('right top point');
        this.resizeHandleRightTop(offsetX, offsetY);
        break;
      default:
        break;
    }
  }
  resizeHandleLeftTop(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const RIGHT = STICKER.width + STICKER.position.x;
    const BOTTOM = STICKER.height + STICKER.position.y;
    const WIDTH = RIGHT - offsetX;
    const HEIGHT = BOTTOM - offsetY;
    this.adjustSize(WIDTH, HEIGHT);

    this.activeSticker.position.x = RIGHT - this.activeSticker.width;
    this.activeSticker.position.y = BOTTOM - this.activeSticker.height;
  }

  resizeHandleLeftBottom(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const RIGHT = STICKER.width + STICKER.position.x;
    const WIDTH = RIGHT - offsetX;
    const HEIGHT = offsetY - STICKER.position.y;
    this.adjustSize(WIDTH, HEIGHT);

    this.activeSticker.position.x = RIGHT - this.activeSticker.width;
  }

  resizeHandleRightBottom(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const WIDTH = offsetX - STICKER.position.x;
    const HEIGHT = offsetY - STICKER.position.y;
    this.adjustSize(WIDTH, HEIGHT);
  }

  resizeHandleRightTop(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const BOTTOM = STICKER.height + STICKER.position.y;
    const WIDTH = offsetX - STICKER.position.x;
    const HEIGHT = BOTTOM - offsetY;
    this.adjustSize(WIDTH, HEIGHT);

    this.activeSticker.position.y = BOTTOM - this.activeSticker.height;
  }

  adjustSize(width, height) {
    const ADJUST_WIDTH = Math.max(width, this.RANGE_OFFSET * 3);
    const ADJUST_HEIGHT = Math.max(height, this.RANGE_OFFSET * 3);
    if (width >= height) {
      this.activeSticker.width = ADJUST_WIDTH;
      this.activeSticker.height = ADJUST_WIDTH * this.aspect;
    } else {
      this.activeSticker.height = ADJUST_HEIGHT;
      this.activeSticker.width = ADJUST_HEIGHT * this.aspect;
    }
  }

  handleClickStickerList(element, event) {
    event.preventDefault();
    this.addSticker(element);
    this.render();
  }

  addSticker(element) {
    const NEW_STICKER = new Sticker(element.dataset.stickerNum, this.stickerId);
    const INACTIVE_ARRAY_LENGTH = this.inactiveStickers.length;
    console.log(`INACTIVE_ARRAY_LENGTH = ${INACTIVE_ARRAY_LENGTH}`);
    if (this.activeSticker !== null) {
      this.inactiveStickers.push(this.activeSticker);
      this.setInactiveStickers();
    }
    this.activeSticker = NEW_STICKER;
    this.stickerId++;
  }

  render(mode = 'default') {
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

    this.offScreenContext.drawImage(
      this.$inactiveStickerScreen,
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );

    //枠線の色とマークの大きさ
    const MAG_RATIO = Math.max(
      this.magnificationRatioX,
      this.magnificationRatioY
    );
    const COLOR = 'white';
    const MARK_SIZE = 3 * MAG_RATIO;
    const LINE_SIZE = 1 * MAG_RATIO;
    const STICKER = this.activeSticker;
    let img = new Image();
    img.src = STICKER.src;

    const X = STICKER.position.x,
      Y = STICKER.position.y,
      WIDTH = STICKER.width,
      HEIGHT = STICKER.height;

    this.offScreenContext.drawImage(img, X, Y, WIDTH, HEIGHT);
    if (mode === 'default') {
      this.drawFrameLine(
        this.offScreenContext,
        X,
        Y,
        WIDTH,
        HEIGHT,
        COLOR,
        LINE_SIZE
      );
      this.drawCornerMark(
        this.offScreenContext,
        X,
        Y,
        WIDTH,
        HEIGHT,
        COLOR,
        LINE_SIZE,
        MARK_SIZE
      );
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

  setInactiveStickers(mode = 'default') {
    this.inactiveContext.clearRect(
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
    const MAG_RATIO = Math.max(
      this.magnificationRatioX,
      this.magnificationRatioY
    );

    //枠線の色とマークの大きさ
    const COLOR = 'grey';
    const MARK_SIZE = 2 * MAG_RATIO;
    const LINE_SIZE = 1 * MAG_RATIO;
    const INACTIVE_STICKERS = this.inactiveStickers;
    let img = new Image();
    //スタンプの配列を描画
    INACTIVE_STICKERS.forEach(sticker => {
      img.src = sticker.src;
      let x = sticker.position.x,
        y = sticker.position.y,
        width = sticker.width,
        height = sticker.height;

      this.inactiveContext.drawImage(img, x, y, width, height);
      if (mode === 'default') {
        this.drawFrameLine(
          this.inactiveContext,
          x,
          y,
          width,
          height,
          COLOR,
          LINE_SIZE
        );
        this.drawCornerMark(
          this.inactiveContext,
          x,
          y,
          width,
          height,
          COLOR,
          LINE_SIZE,
          MARK_SIZE
        );
      }
    });
  }

  drawFrameLine(TARGET, X, Y, WIDTH, HEIGHT, COLOR, LINE_SIZE) {
    TARGET.strokeStyle = COLOR;
    TARGET.lineWidth = LINE_SIZE;
    TARGET.beginPath();
    TARGET.strokeRect(X, Y, WIDTH, HEIGHT);
  }
  drawCornerMark(TARGET, X, Y, WIDTH, HEIGHT, COLOR, LINE_SIZE, MARK_SIZE) {
    TARGET.strokeStyle = 'black';
    TARGET.fillStyle = 'white';
    this.drawArc(TARGET, X, Y, LINE_SIZE, MARK_SIZE);
    this.drawArc(TARGET, X, Y + HEIGHT, LINE_SIZE, MARK_SIZE);
    this.drawArc(TARGET, X + WIDTH, Y, LINE_SIZE, MARK_SIZE);
    this.drawArc(TARGET, X + WIDTH, Y + HEIGHT, LINE_SIZE, MARK_SIZE);
  }

  drawArc(TARGET, X, Y, LINE_SIZE, MARK_SIZE) {
    TARGET.lineWidth = LINE_SIZE;
    TARGET.beginPath();
    TARGET.arc(X, Y, MARK_SIZE, 0, Math.PI * 2, false);
    TARGET.stroke();
  }

  createImage() {
    let png = this.$canvas.toDataURL();
    document.querySelector('.image').src = png;
  }
}
