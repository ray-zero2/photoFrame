import Events from 'events';
export default class extends Events {
  constructor() {
    super();
    //キャンバス
    this.$canvas = document.querySelector('.canvas');
    this.context = this.$canvas.getContext('2d');

    this.$video = document.querySelector('.camera');
    this.$captureButton = document.querySelector('.js-capture');
    this.startCamera();
    this.bind();
  }

  bind() {
    this.$captureButton.addEventListener('click', () => {
      this.renderCameraImageInCanvas();
    });
  }
  startCamera() {
    const MEDIA = navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: 600,
        height: 600
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
    const VIDEO_WIDTH = this.$video.width;
    const VIDEO_HEIGHT = this.$video.height;
    this.context.drawImage(this.$video, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    this.$video.classList.add('js-hide');
    this.$captureButton.classList.add('js-hide');
    this.stopCamera();
    this.emit('renderCameraImage', this.context);
  }
}
