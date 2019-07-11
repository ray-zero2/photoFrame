export default class {
  constructor() {
    //要素取得
    this.$video = document.querySelector('.camera');
    this.$canvas = document.querySelector('.canvas');
    this.$captureButton = document.querySelector('.js-capture');
    this.$scareUpButton = document.querySelector('.js-scaleUp');
    this.$scareDownButton = document.querySelector('.js-scaleDown');

    this.context = this.$canvas.getContext('2d');

    this.startCamera();
    this.bind();
  }

  bind() {
    //画面キャプチャ
    this.$captureButton.addEventListener('click', () => {
      this.renderCameraImageInCanvas();
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
    this.$captureButton.classList.add('js-hide');
    this.$scareUpButton.classList.remove('js-hide');
    this.$scareDownButton.classList.remove('js-hide');

    this.stopCamera();
  }
}
