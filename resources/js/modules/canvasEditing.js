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
    this.scale = 1;
    this.scale_past = 1;

    this.imagePosition = { x: 0, y: 0 };
    this.imagePosition_past = { x: 0, y: 0 };
    this.imageGeometricCenter = { x: 0, y: 0 };
    this.position = {
      startX: 0,
      startY: 0,
      startSecondX: 0,
      startSecondY: 0,
      currentX: 0,
      currentY: 0,
      currentSecondX: 0,
      currentSecondY: 0
    };
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;
    this.lastScreenX2 = 0;
    this.lastScreenY2 = 0;
    this.diffX = 0;
    this.diffY = 0;
    this.lastLength = 0;

    this.isTouched = false;
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
      this.scale_past = this.scale;
      this.scale *= 1.1;
      event.preventDefault();
      this.resize();
    });
    this.$scaleDownButton.addEventListener('click', event => {
      this.scale_past = this.scale;
      this.scale /= 1.1;
      event.preventDefault();
      this.resize();
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
    this.isTouched = false;
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
    this.diffX = 0;
    this.diffY = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;
  }

  handleTouchStart(event) {
    const TOUCHES_ARRAY = event.touches;
    if (TOUCHES_ARRAY.length > 1) {
      console.log('multi touch on');
      const X1 = TOUCHES_ARRAY[0].screenX;
      const X2 = TOUCHES_ARRAY[1].screenX;
      const Y1 = TOUCHES_ARRAY[0].screenY;
      const Y2 = TOUCHES_ARRAY[1].screenY;
      this.lastScreenX = (X2 + X1) / 2;
      this.lastScreenY = (Y2 + Y1) / 2;
      // this.pinchSize = Math.abs((X2 - X1) * (Y2 - Y1));
    } else {
      this.lastScreenX = TOUCHES_ARRAY[0].screenX;
      this.lastScreenY = TOUCHES_ARRAY[0].screenY;
    }
    event.preventDefault();
    this.isTouched = true;
  }

  handleTouchMove(event) {
    if (!this.isTouched) return;
    const TOUCHES_ARRAY = event.touches;
    if (TOUCHES_ARRAY.length === 1) {
      this.singleTouchMove(event);
    } else {
      // this.doubleTouchMove(event);
    }
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
    //指の中心とる
    this.getCenterBetweenFingers();
    //指の間の距離とる
    const CURRENT_LENGTH = this.calcLengthBetweenFingers(event);
    const DIFF_LENGTH = CURRENT_LENGTH - this.lastLength;
    //拡大縮小処理
    this.calcScale();
    //画像移動
    this.moveImage();
    this.lastLength = CURRENT_LENGTH;
  }

  calcLengthBetweenFingers(event) {
    const EVENT_TOUCHES = event.touches;
    const X1 = EVENT_TOUCHES[0].screenX;
    const X2 = EVENT_TOUCHES[1].screenX;
    const Y1 = EVENT_TOUCHES[0].screenY;
    const Y2 = EVENT_TOUCHES[1].screenY;

    return Math.sqrt(Math.pow(X2 - X1, 2) * Math.pow(Y2 - Y1, 2));
  }
  // if (TOUCHES_ARRAY.length > 1) {
  //   // this.position.currentSecondX = TOUCHES_ARRAY[1].screenX;
  //   // this.position.currentSecondY = TOUCHES_ARRAY[1].screenY;
  //   const START_X = (this.position.startX + this.position.startSecondX) / 2;
  //   const START_Y = (this.position.startY + this.position.startSecondY) / 2;
  //   const CURRENT_X =
  //     (TOUCHES_ARRAY[0].screenX + TOUCHES_ARRAY[1].screenX) / 2;
  //   const CURRENT_Y =
  //     (TOUCHES_ARRAY[0].screenY + TOUCHES_ARRAY[1].screenY) / 2;
  //   this.lastTranslateX = CURRENT_X - START_X;
  //   this.lastTranslateY = CURRENT_Y - START_Y;
  // } else {
  //   const CURRENT_X = TOUCHES_ARRAY[0].screenX;
  //   const CURRENT_Y = TOUCHES_ARRAY[0].screenY;
  //   this.lastTranslateX = CURRENT_X - this.position.startX;
  //   this.lastTranslateY = CURRENT_Y - this.position.startY;
  // }

  handleTouchEnd(event) {
    if (event.touches.length === 0) {
      this.isTouched = false;
      this.lastTranslateX = 0;
      this.lastTranslateY = 0;
      this.diffX = 0;
      this.diffY = 0;
      this.lastScreenX = 0;
      this.lastScreenY = 0;
      this.lastScreenX2 = 0;
      this.lastScreenY2 = 0;
    } else {
      const TOUCHES_ARRAY = event.touches;
      this.lastScreenX = TOUCHES_ARRAY[0].screenX;
      this.lastScreenY = TOUCHES_ARRAY[0].screenY;
    }
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
    this.imagePosition.x += this.diffX;
    this.imagePosition.y += this.diffY;
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
}
