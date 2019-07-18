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

    //その他の要素取得
    this.$video = document.querySelector('.camera');
    this.$captureButton = document.querySelector('.js-capture');
    this.$scaleUpButton = document.querySelector('.js-scaleUp');
    this.$scaleDownButton = document.querySelector('.js-scaleDown');

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

    this.startCamera();
    this.bind();
  }

  bind() {
    //画面キャプチャ
    this.$captureButton.addEventListener('click', () => {
      this.renderCameraImageInCanvas();
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
      this.scale *= 1.1;
      this.render();
    });
    this.$scaleDownButton.addEventListener('click', () => {
      this.scale_past = this.scale;
      this.scale *= 0.9;
      this.render();
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
    ////////////////////////////////////////////////

    this.stopCamera();
    this.originalImage = this.context.getImageData(0, 0, 300, 300);
  }

  handleMouseDown(event) {
    const START_X = event.screenX;
    const START_Y = event.screenY;

    this.pointerPosition.startX = START_X;
    this.pointerPosition.startY = START_Y;
    this.eventTarget = event.target;
    this.imagePosition_past.x = this.imagePosition.x;
    this.imagePosition_past.y = this.imagePosition.y;
    console.log('pastPosition_x:' + this.imagePosition_past.x);

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

    this.imagePosition.x = DISPLACEMENT_X + this.imagePosition_past.x;
    this.imagePosition.y = DISPLACEMENT_Y + this.imagePosition_past.y;
    console.log('displacePosition:' + this.imagePosition.x);
    this.moveImage();
  }

  handleMouseUp(event) {
    this.moveImageFlag = false;
    this.pointerPosition.startX = 0;
    this.pointerPosition.startY = 0;
    this.pointerPosition.currentX = 0;
    this.pointerPosition.currentY = 0;
  }

  render() {
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
    // this.imagePosition.x = RENDER_POINT_X;
    // this.imagePosition.y = RENDER_POINT_Y;
    console.log('RENDER_POINT_X:' + this.imagePosition.x);
  }
}
