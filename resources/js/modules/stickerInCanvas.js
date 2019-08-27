import Events from 'events';
class Sticker {
  constructor(stickerNum) {
    this.src = `./images/sticker/sticker${stickerNum}.png`;
    this.width = 300;
    this.height = 300;
    this.positionX = 300;
    this.positionY = 300;
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
    this.backgroundImage = backgroundImage;
    this.context.putImageData(this.backgroundImage, 0, 0);

    //背景画像と非アクティブなスタンプ群の描画用オフスクリーン
    this.$backGroundOffscreen = document.createElement('canvas');
    this.$backGroundOffscreen.width = this.$canvas.width;
    this.$backGroundOffscreen.height = this.$canvas.height;
    this.bgOffscreenContext = this.$backGroundOffscreen.getContext('2d');

    this.$stickerWrapper = document.querySelector('.sticker-wrapper');
    this.$stickers = document.querySelectorAll('.js-sticker');
    this.$removeStickerButton = document.querySelector('.js-removeSticker');
    this.$createImageButton = document.querySelector('.js-createImageButton');

    this.diffX = 0;
    this.diffY = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;
    this.isStickerTouched = false;
    this.activeSticker = null; //現在アクティブ状態のスタンプ
    this.inactiveStickers = []; //非アクティブ状態のスタンプを格納する配列
    this.aspect = 1; //スタンプのアスペクト比

    //メンバ変数だけど一旦定数扱いに
    //クリック範囲のオフセット
    const OFFSET = /iPhone|iPad|Android/.test(navigator.userAgent) ? 16 : 8;
    this.RANGE_OFFSET =
      OFFSET * Math.max(this.magnificationRatioX, this.magnificationRatioY);
    //ライン上クリックの判定に必要な定数
    this.LEFT_LINE = 1;
    this.BOTTOM_LINE = 2;
    this.RIGHT_LINE = 4;
    this.TOP_LINE = 8;
    this.LEFT_TOP_POINT = this.LEFT_LINE + this.TOP_LINE;
    this.LEFT_BOTTOM_POINT = this.LEFT_LINE + this.BOTTOM_LINE;
    this.RIGHT_BOTTOM_POINT = this.RIGHT_LINE + this.BOTTOM_LINE;
    this.RIGHT_TOP_POINT = this.RIGHT_LINE + this.TOP_LINE;

    this.clickProperty = 0; //スタンプのどの辺をクリックしたかを保持

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
      //スタンプ削除を押した時に消えるスタンプが最後の1つかどうか
      if (this.inactiveStickers.length === 0) {
        //全部消して背景画像再セット
        this.activeSticker = null;
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.context.putImageData(this.backgroundImage, 0, 0);
      } else {
        this.activeSticker = this.inactiveStickers.pop();
        this.setBackGroundOffscreen();
        this.render();
      }
    });

    this.$createImageButton.addEventListener('click', () => {
      this.setBackGroundOffscreen('create');
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
    this.handleTouchEnd();
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
    this.isStickerTouched = false;
    this.clickProperty = 0;
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
    this.judgeWhereClickOnTheSticker(event);
    if (this.isStickerTouched) {
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
   * クリック箇所にあるスタンプがアクティブか非アクティブかを調べ、それぞれに対応した処理を行う。
   * アクティブの場合：クリック箇所の判定（どの辺上をクリックしたか）
   * 非アクティブの場合：アクティブにし、元アクティブスタンプを非アクティブ配列に入れる
   * @param {object} event クリックイベント
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

    let minPointX = 0;
    let maxPointX = 0;
    let minPointY = 0;
    let maxPointY = 0;

    //judge active sticker
    minPointX = ACTIVE_STICKER.positionX - RANGE;
    maxPointX = ACTIVE_STICKER.positionX + ACTIVE_STICKER.width + RANGE;
    minPointY = ACTIVE_STICKER.positionY - RANGE;
    maxPointY = ACTIVE_STICKER.positionY + ACTIVE_STICKER.height + RANGE;

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
      this.isStickerTouched = true;
      return;
    } else {
      //judge inactive stickers
      //上のレイヤのスタンプから調べるため配列を逆順に捜査する
      const LAST_INDEX = this.inactiveStickers.length - 1;
      for (let index = LAST_INDEX; index >= 0; index--) {
        const STICKER_OBJ = this.inactiveStickers[index];
        minPointX = STICKER_OBJ.positionX;
        maxPointX = STICKER_OBJ.positionX + STICKER_OBJ.width;
        minPointY = STICKER_OBJ.positionY;
        maxPointY = STICKER_OBJ.positionY + STICKER_OBJ.height;
        if (
          minPointX <= OFFSET_X &&
          OFFSET_X <= maxPointX &&
          minPointY <= OFFSET_Y &&
          OFFSET_Y <= maxPointY
        ) {
          this.activateTouchedSticker(index);
          this.setBackGroundOffscreen();
          this.isStickerTouched = true;
          return;
        }
      }
    }
    return;
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

  /**
   * クリックされた非アクティブなスタンプを配列から抜き出しthis.activeStickerに代入
   * @param {num} INDEX クリックされたスタンプの配列index number
   */
  activateTouchedSticker(INDEX) {
    //アクティブなスタンプを配列の最後に移動
    const ACTIVE_STICKER_OBJ = this.inactiveStickers[INDEX];
    this.inactiveStickers.splice(INDEX, 1);
    this.inactiveStickers.push(this.activeSticker);
    this.activeSticker = ACTIVE_STICKER_OBJ;
  }

  moveSticker() {
    const STICKER = this.activeSticker;
    STICKER.positionX += this.diffX;
    STICKER.positionY += this.diffY;
  }

  pinchZoomSticker(SCALE) {
    const ACTIVE_STICKER = this.activeSticker;
    const WIDTH = ACTIVE_STICKER.width;
    const HEIGHT = ACTIVE_STICKER.height;
    this.adjustSize(WIDTH * SCALE, HEIGHT * SCALE);
    const WIDTH_AFTER = this.activeSticker.width;
    const HEIGHT_AFTER = this.activeSticker.height;
    const DIFF_WIDTH = WIDTH_AFTER - WIDTH;
    const DIFF_HEIGHT = HEIGHT_AFTER - HEIGHT;
    this.activeSticker.positionX -= DIFF_WIDTH / 2;
    this.activeSticker.positionY -= DIFF_HEIGHT / 2;
  }

  resizeSticker(offsetX, offsetY) {
    switch (this.clickProperty) {
      case this.LEFT_TOP_POINT:
        this.handleLeftTop(offsetX, offsetY);
        break;

      case this.LEFT_BOTTOM_POINT:
        this.handleLeftBottom(offsetX, offsetY);
        break;

      case this.RIGHT_BOTTOM_POINT:
        this.handleRightBottom(offsetX, offsetY);
        break;

      case this.RIGHT_TOP_POINT:
        this.handleRightTop(offsetX, offsetY);
        break;

      case this.LEFT_LINE:
        this.handleLeft(offsetX);
        break;

      case this.BOTTOM_LINE:
        this.handleBottom(offsetY);
        break;

      case this.RIGHT_LINE:
        this.handleRight(offsetX);
        break;

      case this.TOP_LINE:
        this.handleTop(offsetY);
        break;

      default:
        break;
    }
  }

  handleLeftTop(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const RIGHT = STICKER.width + STICKER.positionX;
    const BOTTOM = STICKER.height + STICKER.positionY;
    const WIDTH = RIGHT - offsetX;
    const HEIGHT = BOTTOM - offsetY;
    this.adjustSize(WIDTH, HEIGHT);
    this.activeSticker.positionX = RIGHT - this.activeSticker.width;
    this.activeSticker.positionY = BOTTOM - this.activeSticker.height;
  }

  handleLeftBottom(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const RIGHT = STICKER.width + STICKER.positionX;
    const WIDTH = RIGHT - offsetX;
    const HEIGHT = offsetY - STICKER.positionY;
    this.adjustSize(WIDTH, HEIGHT);
    this.activeSticker.positionX = RIGHT - this.activeSticker.width;
  }

  handleRightBottom(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const WIDTH = offsetX - STICKER.positionX;
    const HEIGHT = offsetY - STICKER.positionY;
    this.adjustSize(WIDTH, HEIGHT);
  }

  handleRightTop(offsetX, offsetY) {
    const STICKER = this.activeSticker;
    const BOTTOM = STICKER.height + STICKER.positionY;
    const WIDTH = offsetX - STICKER.positionX;
    const HEIGHT = BOTTOM - offsetY;
    this.adjustSize(WIDTH, HEIGHT);
    this.activeSticker.positionY = BOTTOM - this.activeSticker.height;
  }

  handleLeft(offsetX) {
    const STICKER = this.activeSticker;
    const RIGHT = STICKER.width + STICKER.positionX;
    const WIDTH = RIGHT - offsetX;
    const HEIGHT = STICKER.height;
    this.adjustSize(WIDTH, 0);
    const HEIGHT_AFTER = this.activeSticker.height;
    const DIFF_HEIGHT = HEIGHT_AFTER - HEIGHT;
    this.activeSticker.positionX = RIGHT - this.activeSticker.width;
    this.activeSticker.positionY -= DIFF_HEIGHT / 2;
  }

  handleBottom(offsetY) {
    const STICKER = this.activeSticker;
    const WIDTH = STICKER.width;
    const HEIGHT = offsetY - STICKER.positionY;
    this.adjustSize(0, HEIGHT);
    const WIDTH_AFTER = this.activeSticker.width;
    const DIFF_WIDTH = WIDTH_AFTER - WIDTH;
    this.activeSticker.positionX -= DIFF_WIDTH / 2;
  }

  handleRight(offsetX) {
    const STICKER = this.activeSticker;
    const WIDTH = offsetX - STICKER.positionX;
    const HEIGHT = STICKER.height;
    this.adjustSize(WIDTH, 0);
    const HEIGHT_AFTER = this.activeSticker.height;
    const DIFF_HEIGHT = HEIGHT_AFTER - HEIGHT;
    this.activeSticker.positionY -= DIFF_HEIGHT / 2;
  }

  handleTop(offsetY) {
    const STICKER = this.activeSticker;
    const BOTTOM = STICKER.height + STICKER.positionY;
    const WIDTH = STICKER.width;
    const HEIGHT = BOTTOM - offsetY;
    this.adjustSize(0, HEIGHT);
    const WIDTH_AFTER = this.activeSticker.width;
    const DIFF_WIDTH = WIDTH_AFTER - WIDTH;
    this.activeSticker.positionX -= DIFF_WIDTH / 2;
    this.activeSticker.positionY = BOTTOM - this.activeSticker.height;
  }

  adjustSize(width, height) {
    //最小サイズ = RANGE_OFFSET*3
    const ADJUST_WIDTH = Math.max(width, this.RANGE_OFFSET * 3);
    const ADJUST_HEIGHT = Math.max(height, this.RANGE_OFFSET * 3);
    if (width >= height) {
      this.activeSticker.width = ADJUST_WIDTH;
      this.activeSticker.height = ADJUST_WIDTH / this.aspect;
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
    const NEW_STICKER = new Sticker(element.dataset.stickerNum);
    if (this.activeSticker !== null) {
      this.inactiveStickers.push(this.activeSticker);
      this.setBackGroundOffscreen();
    } else {
      this.bgOffscreenContext.putImageData(this.backgroundImage, 0, 0);
    }
    this.activeSticker = NEW_STICKER;
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
      this.$backGroundOffscreen,
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );

    this.drawActiveStickerOnOffscreen(mode);
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

  drawActiveStickerOnOffscreen(mode = 'default') {
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

    const X = STICKER.positionX,
      Y = STICKER.positionY,
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
  }

  /**
   * もともとの背景画像と動かない非アクティブスタンプ群を専用オフスクリーンにセットする
   * @param {str} mode 何か文字をいれると最後の決定時の画像生成モードになる
   */
  setBackGroundOffscreen(mode = 'default') {
    this.bgOffscreenContext.clearRect(
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
    this.bgOffscreenContext.putImageData(this.backgroundImage, 0, 0);
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
      let x = sticker.positionX,
        y = sticker.positionY,
        width = sticker.width,
        height = sticker.height;

      this.bgOffscreenContext.drawImage(img, x, y, width, height);
      if (mode === 'default') {
        this.drawFrameLine(
          this.bgOffscreenContext,
          x,
          y,
          width,
          height,
          COLOR,
          LINE_SIZE
        );
        this.drawCornerMark(
          this.bgOffscreenContext,
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
