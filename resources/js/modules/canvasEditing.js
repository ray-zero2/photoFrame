import Events from 'events';
export default class extends Events {
  constructor() {
    super();

    //キャンバス
    this.$canvas = document.querySelector('.canvas');
    this.context = this.$canvas.getContext('2d');

    //オフスクリーン
    this.$offScreen = document.createElement('canvas');
    this.$offScreen.width = this.$canvas.width;
    this.$offScreen.height = this.$canvas.height;
    this.offScreenContext = this.$offScreen.getContext('2d');

    //その他の要素取得
    this.$scaleUpButton = document.querySelector('.js-scaleUp');
    this.$scaleDownButton = document.querySelector('.js-scaleDown');
    this.$scaleOkButton = document.querySelector('.js-scaleOk');
  }

  init(backgroundImage) {
    this.$scaleUpButton.classList.remove('js-hide');
    this.$scaleDownButton.classList.remove('js-hide');
    this.$scaleOkButton.classList.remove('js-hide');

    //変数等
    this.originalImage = backgroundImage;

    this.imageWidth = 300;
    this.imageHeight = 300;

    this.positionX = 0;
    this.positionY = 0;
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;
    this.diffX = 0;
    this.diffY = 0;
    this.lastLength = 0;
    this.lastScale = 1;

    this.isTouched = false;
    this.isDoubleTouched = false;
    this.bind();
  }

  bind() {
    this.handlers = {
      mousedown: this.handleMouseDown.bind(this),
      mousemove: this.handleMouseMove.bind(this),
      mouseup: this.handleMouseUp.bind(this),
      touchstart: this.handleTouchStart.bind(this),
      touchmove: this.handleTouchMove.bind(this),
      touchend: this.handleTouchEnd.bind(this)
    };

    this.$canvas.addEventListener('mousedown', this.handlers.mousedown);

    this.$canvas.addEventListener('mousemove', this.handlers.mousemove);

    document.addEventListener('mouseup', this.handlers.mouseup);

    this.$canvas.addEventListener('touchstart', this.handlers.touchstart);
    this.$canvas.addEventListener('touchmove', this.handlers.touchmove);
    document.addEventListener('touchend', this.handlers.touchend);
    //拡大縮小ボタン
    this.$scaleUpButton.addEventListener('click', event => {
      event.preventDefault();
      // this.lastScale = this.scale;
      const SCALE = 1.1;
      this.resize(SCALE);
    });
    this.$scaleDownButton.addEventListener('click', event => {
      event.preventDefault();
      const SCALE = 1 / 1.1;

      this.resize(SCALE);
    });
    this.$scaleOkButton.addEventListener('click', () => {
      this.$scaleUpButton.classList.add('js-hide');
      this.$scaleDownButton.classList.add('js-hide');
      this.$scaleOkButton.classList.add('js-hide');
      this.$canvas.removeEventListener('mousedown', this.handlers.mousedown);
      this.$canvas.removeEventListener('mousemove', this.handlers.mousemove);
      document.removeEventListener('mouseup', this.handlers.mouseup);
      this.$canvas.removeEventListener('touchstart', this.handlers.touchstart);
      this.$canvas.removeEventListener('touchmove', this.handlers.touchmove);
      document.removeEventListener('touchend', this.handlers.mouseup);
      this.emit('requestedRenderSticker', this.context);
    });
  }

  handleMouseDown(event) {
    const START_X = event.screenX;
    const START_Y = event.screenY;
    this.lastScreenX = START_X;
    this.lastScreenY = START_Y;
    this.isTouched = true;
  }

  handleMouseMove(event) {
    if (!this.isTouched) return;
    this.singleTouchMove(event);
  }

  handleMouseUp() {
    this.resetValues();
  }

  resetValues() {
    this.isTouched = false;
    this.isDoubleTouched = false;
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
    this.diffX = 0;
    this.diffY = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;
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
    this.resetValues();
  }

  singleTouchStart(event) {
    const TOUCHES_ARRAY = event.touches;
    this.lastScreenX = TOUCHES_ARRAY[0].screenX;
    this.lastScreenY = TOUCHES_ARRAY[0].screenY;
  }
  doubleTouchStart(event) {
    const TOUCHES_ARRAY = event.touches;
    const X1 = TOUCHES_ARRAY[0].screenX;
    const X2 = TOUCHES_ARRAY[1].screenX;
    const Y1 = TOUCHES_ARRAY[0].screenY;
    const Y2 = TOUCHES_ARRAY[1].screenY;
    this.lastLength = this.calcLengthBetweenFingers(event);
    this.lastScreenX = (X2 + X1) / 2;
    this.lastScreenY = (Y2 + Y1) / 2;
    this.isDoubleTouched = true;
  }

  singleTouchMove(event) {
    const CURRENT_X =
      event.type === 'touchmove' ? event.touches[0].screenX : event.screenX;
    const CURRENT_Y =
      event.type === 'touchmove' ? event.touches[0].screenY : event.screenY;
    this.diffX = CURRENT_X - this.lastScreenX;
    this.diffY = CURRENT_Y - this.lastScreenY;
    this.lastTranslateX += this.diffX;
    this.lastTranslateY += this.diffY;
    this.moveImage();
    this.lastScreenX = CURRENT_X;
    this.lastScreenY = CURRENT_Y;
  }
  doubleTouchMove(event) {
    const TOUCHES_ARRAY = event.touches;
    const X1 = TOUCHES_ARRAY[0].screenX;
    const X2 = TOUCHES_ARRAY[1].screenX;
    const Y1 = TOUCHES_ARRAY[0].screenY;
    const Y2 = TOUCHES_ARRAY[1].screenY;
    const CURRENT_X = (X2 + X1) / 2;
    const CURRENT_Y = (Y2 + Y1) / 2;
    const CURRENT_LENGTH = this.calcLengthBetweenFingers(event);
    // this.lastScale = this.scale;
    const SCALE = CURRENT_LENGTH / this.lastLength;

    this.diffX = CURRENT_X - this.lastScreenX;
    this.diffY = CURRENT_Y - this.lastScreenY;
    this.lastTranslateX += this.diffX;
    this.lastTranslateY += this.diffY;
    this.resize(SCALE);
    this.moveImage();
    this.lastLength = CURRENT_LENGTH;
    this.lastScreenX = CURRENT_X;
    this.lastScreenY = CURRENT_Y;
  }

  calcLengthBetweenFingers(event) {
    const EVENT_TOUCHES = event.touches;
    const X1 = EVENT_TOUCHES[0].screenX;
    const X2 = EVENT_TOUCHES[1].screenX;
    const Y1 = EVENT_TOUCHES[0].screenY;
    const Y2 = EVENT_TOUCHES[1].screenY;

    return Math.hypot(X2 - X1, Y2 - Y1);
  }

  resize(scale) {
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(this.originalImage, 0, 0);

    const CURRENT_SCALE = this.lastScale * scale;
    const GEOMETRIC_CENTER_X =
      this.positionX + (this.imageWidth * this.lastScale) / 2;
    const GEOMETRIC_CENTER_Y =
      this.positionY + (this.imageHeight * this.lastScale) / 2;

    const CENTER_DIFF_X = GEOMETRIC_CENTER_X - 150; //150: キャンバスサイズの半分
    const CENTER_DIFF_Y = GEOMETRIC_CENTER_Y - 150;

    const RENDER_WIDTH = this.imageWidth * CURRENT_SCALE;
    const RENDER_HEIGHT = this.imageHeight * CURRENT_SCALE;
    const RENDER_POINT_X = scale * CENTER_DIFF_X - RENDER_WIDTH / 2 + 150;
    const RENDER_POINT_Y = scale * CENTER_DIFF_Y - RENDER_HEIGHT / 2 + 150;

    this.context.drawImage(
      this.$offScreen,
      RENDER_POINT_X,
      RENDER_POINT_Y,
      RENDER_WIDTH,
      RENDER_HEIGHT
    );
    this.positionX = RENDER_POINT_X;
    this.positionY = RENDER_POINT_Y;
    this.lastScale = CURRENT_SCALE;
  }

  moveImage() {
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(this.originalImage, 0, 0);
    this.positionX += this.diffX;
    this.positionY += this.diffY;

    const RENDER_POINT_X = this.positionX;
    const RENDER_POINT_Y = this.positionY;
    const RENDER_WIDTH = this.imageWidth * this.lastScale;
    const RENDER_HEIGHT = this.imageHeight * this.lastScale;
    this.context.drawImage(
      this.$offScreen,
      RENDER_POINT_X,
      RENDER_POINT_Y,
      RENDER_WIDTH,
      RENDER_HEIGHT
    );
  }
}
