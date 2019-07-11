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

    this.startCamera();
    this.bind();
  }

  bind() {
    //画面キャプチャ
    this.$captureButton.addEventListener('click', () => {
      this.renderCameraImageInCanvas();
    });

    //拡大縮小ボタン
    this.$scaleUpButton.addEventListener('click', () => {
      this.scaleUpRender();
    });
    this.$scaleDownButton.addEventListener('click', () => {
      this.scaleDownRender();
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

  scaleUpRender() {
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(this.originalImage, 0, 0);
    this.context.scale(1.2, 1.2);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }
  scaleDownRender() {
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(this.originalImage, 0, 0);
    this.context.scale(0.8, 0.8);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }
}
