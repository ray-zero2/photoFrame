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
    this.pointerPosition = {
      startX: 0,
      startY: 0,
      startSecondX: 0,
      startSecondY: 0,
      currentX: 0,
      currentY: 0,
      currentSecondX: 0,
      currentSecondY: 0
    };
    this.diff = { x: 0, y: 0 };
    this.isTouched = false;

    this.handleFlag = true;

    this.bind();
  }

  bind() {
    this.handlers = {
      mousedown: this.handleMouseDown.bind(this),
      mousemove: this.handleMouseMove.bind(this),
      mouseup: this.handleMouseUp.bind(this),
      touchstart: this.handleTouchStart.bind(this),
      touchmove: this.handleTouchMove.bind(this)
    };

    this.$canvas.addEventListener('mousedown', this.handlers.mousedown);

    this.$canvas.addEventListener('mousemove', this.handlers.mousemove);

    document.addEventListener('mouseup', this.handlers.mouseup);

    this.$canvas.addEventListener('touchstart', this.handlers.touchstart);
    this.$canvas.addEventListener('touchmove', this.handlers.touchmove);
    document.addEventListener('touchend', this.handlers.mouseup);
    //拡大縮小ボタン
    this.$scaleUpButton.addEventListener('click', event => {
      this.scale_past = this.scale;
      this.scale *= 1.1;
      event.preventDefault();
      this.resize();
    });
    this.$scaleDownButton.addEventListener('click', event => {
      this.scale_past = this.scale;
      this.scale *= 0.9;
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
    this.pointerPosition.startX = START_X;
    this.pointerPosition.startY = START_Y;
    this.imagePosition_past.x = this.imagePosition.x;
    this.imagePosition_past.y = this.imagePosition.y;
    this.isTouched = true;
  }

  handleMouseMove(event) {
    if (!this.isTouched) return;
    const CURRENT_X = event.screenX;
    const CURRENT_Y = event.screenY;
    this.pointerPosition.currentX = CURRENT_X;
    this.pointerPosition.currentY = CURRENT_Y;
    this.diff.x = CURRENT_X - this.pointerPosition.startX;
    this.diff.y = CURRENT_Y - this.pointerPosition.startY;

    this.moveImage();
  }

  handleMouseUp() {
    this.isTouched = false;
    this.pointerPosition.startX = 0;
    this.pointerPosition.startY = 0;
    this.pointerPosition.currentX = 0;
    this.pointerPosition.currentY = 0;
    this.pointerPosition.startSecondX = 0;
    this.pointerPosition.startSecondY = 0;
    this.pointerPosition.currentSecondX = 0;
    this.pointerPosition.currentSecondY = 0;
  }

  handleTouchStart(event) {
    const TOUCHES_ARRAY = event.touches;

    this.pointerPosition.startX = TOUCHES_ARRAY[0].screenX;
    this.pointerPosition.startY = TOUCHES_ARRAY[0].screenY;
    if (TOUCHES_ARRAY.length > 1) {
      this.pointerPosition.startSecondX = TOUCHES_ARRAY[1].screenX;
      this.pointerPosition.startSecondY = TOUCHES_ARRAY[1].screenY;
    }

    this.imagePosition_past.x = this.imagePosition.x;
    this.imagePosition_past.y = this.imagePosition.y;
    event.preventDefault();
    this.isTouched = true;
  }

  handleTouchMove(event) {
    if (!this.isTouched) return;
    const TOUCHES_ARRAY = event.touches;
    this.pointerPosition.currentX = TOUCHES_ARRAY[0].screenX;
    this.pointerPosition.currentY = TOUCHES_ARRAY[0].screenY;
    if (TOUCHES_ARRAY.length > 1) {
      // this.pointerPosition.currentSecondX = TOUCHES_ARRAY[1].screenX;
      // this.pointerPosition.currentSecondY = TOUCHES_ARRAY[1].screenY;
      const START_X =
        (this.pointerPosition.startX + this.pointerPosition.startSecondX) / 2;
      const START_Y =
        (this.pointerPosition.startY + this.pointerPosition.startSecondY) / 2;
      const CURRENT_X =
        (TOUCHES_ARRAY[0].screenX + TOUCHES_ARRAY[1].screenX) / 2;
      const CURRENT_Y =
        (TOUCHES_ARRAY[0].screenY + TOUCHES_ARRAY[1].screenY) / 2;
      this.diff.x = CURRENT_X - START_X;
      this.diff.y = CURRENT_Y - START_Y;
    } else {
      const CURRENT_X = TOUCHES_ARRAY[0].screenX;
      const CURRENT_Y = TOUCHES_ARRAY[0].screenY;
      this.diff.x = CURRENT_X - this.pointerPosition.startX;
      this.diff.y = CURRENT_Y - this.pointerPosition.startY;
    }

    event.preventDefault();
    this.moveImage();
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
    this.imagePosition.x = this.diff.x + this.imagePosition_past.x;
    this.imagePosition.y = this.diff.y + this.imagePosition_past.y;
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
