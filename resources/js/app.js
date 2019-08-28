import Camera from './modules/CameraInCanvas';
import Sticker from './modules/StickerInCanvas';
import ImageEdit from './modules/CanvasEditing';
class App {
  constructor() {
    this.camera = new Camera();
    this.imageEdit = new ImageEdit();
    //キャンバス
    this.$canvas = document.querySelector('.canvas');
    this.context = this.$canvas.getContext('2d');

    // //変数等
    this.originalImage = null;

    this.bind();
  }

  bind() {
    //画面キャプチャ
    this.camera.on('renderCameraImage', canvasData => {
      this.originalImage = canvasData.getImageData(
        0,
        0,
        this.$canvas.width,
        this.$canvas.height
      );
      this.imageEdit.init(this.originalImage);
    });

    this.imageEdit.on('requestedRenderSticker', canvasData => {
      this.originalImage = canvasData.getImageData(
        0,
        0,
        this.$canvas.width,
        this.$canvas.height
      );
      this.sticker = new Sticker(this.originalImage);
    });
  }
}
new App();
