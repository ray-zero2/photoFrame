import Camera from './modules/cameraInCanvas';
import Sticker from './modules/stickerInCanvas';
import CanvasEditing from './modules/canvasEditing';
class App {
  constructor() {
    this.camera = new Camera();
    this.transration = new CanvasEditing();
    //キャンバス
    this.$canvas = document.querySelector('.canvas');
    this.context = this.$canvas.getContext('2d');

    this.phase = 1; //フェーズ番号1〜3

    // //変数等
    this.originalImage = null;
    // this.imageWidth = 300;
    // this.imageHeight = 300;
    // this.scale = 1;
    // this.scale_past = 1;

    // this.imagePosition = { x: 0, y: 0 };
    // this.imagePosition_past = { x: 0, y: 0 };
    // this.imageGeometricCenter = { x: 0, y: 0 };
    // this.pointerPosition = {
    //   startX: 0,
    //   startY: 0,
    //   currentX: 0,
    //   currentY: 0
    // };
    // this.diff = { x: 0, y: 0 };
    // this.isTouched = false;

    this.bind();
  }

  bind() {
    //画面キャプチャ
    this.camera.on('renderCameraImage', canvasData => {
      this.phase = 2;
      this.originalImage = canvasData.getImageData(0, 0, 300, 300);
      this.transration.init(this.originalImage);
    });

    this.transration.on('requestedRenderSticker', canvasData => {
      this.originalImage = canvasData.getImageData(0, 0, 300, 300);
      this.sticker = new Sticker(this.originalImage);
    });

    // //拡大縮小ボタン
    // this.$scaleUpButton.addEventListener('click', event => {
    //   this.scale_past = this.scale;
    //   this.scale *= 1.1;
    //   this.resize();
    // });
    // this.$scaleDownButton.addEventListener('click', () => {
    //   this.scale_past = this.scale;
    //   this.scale *= 0.9;
    //   this.resize();
    // });
    // this.$scaleOkButton.addEventListener('click', () => {
    //   this.$scaleUpButton.classList.add('js-hide');
    //   this.$scaleDownButton.classList.add('js-hide');
    //   this.$scaleOkButton.classList.add('js-hide');
    //   // this.$stickerWrapper.classList.remove('js-hide');
    //   // this.$removeStickerButton.classList.remove('js-hide');
    //   // this.$createImageButton.classList.remove('js-hide');

    //   this.originalImage = this.context.getImageData(0, 0, 300, 300);
    //   // this.backImageScreenContext.putImageData(this.originalImage, 0, 0);

    //   this.sticker = new Sticker(this.originalImage);
    //   this.phase = 3;
    // });
  }

  // handleMouseDown(event) {
  //   const START_X = event.screenX;
  //   const START_Y = event.screenY;
  //   this.pointerPosition.startX = START_X;
  //   this.pointerPosition.startY = START_Y;
  //   if (this.phase === 2) {
  //     this.imagePosition_past.x = this.imagePosition.x;
  //     this.imagePosition_past.y = this.imagePosition.y;
  //     console.log('pastPosition_x:' + this.imagePosition_past.x);
  //   } else if (this.phase === 3) {
  //     this.moveStickerFlag = this.judgeWhereClickOnTheSticker(event);
  //     if (this.moveStickerFlag) {
  //       this.decideOperatedSticker(event);
  //       this.renderStickers();
  //     }
  //   }

  //   this.isTouched = true;
  // }

  // handleMouseMove(event) {
  //   if (!this.isTouched) return;
  //   const CURRENT_X = event.screenX;
  //   const CURRENT_Y = event.screenY;
  //   this.pointerPosition.currentX = CURRENT_X;
  //   this.pointerPosition.currentY = CURRENT_Y;
  //   this.diff.x = CURRENT_X - this.pointerPosition.startX;
  //   this.diff.y = CURRENT_Y - this.pointerPosition.startY;

  //   if (this.phase === 2) {
  //     this.imagePosition.x = this.diff.x + this.imagePosition_past.x;
  //     this.imagePosition.y = this.diff.y + this.imagePosition_past.y;
  //     this.moveImage();
  //   } else if (this.phase === 3 && this.moveStickerFlag) {
  //     this.operateSticker();
  //   }
  // }

  // handleMouseUp() {
  //   this.isTouched = false;
  //   this.moveStickerFlag = false;
  //   this.pointerPosition.startX = 0;
  //   this.pointerPosition.startY = 0;
  //   this.pointerPosition.currentX = 0;
  //   this.pointerPosition.currentY = 0;
  //   console.log(this.clickProperty);
  //   this.clickProperty = 0;
  // }
}
new App();
