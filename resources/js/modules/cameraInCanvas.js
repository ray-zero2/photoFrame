export default class {
  constructor() {
    this.$video = document.querySelector('.camera');
    this.$canvas = document.querySelector('.canvas');
    this.$captureButton = document.querySelector('.js-capture');

    this.context = this.$canvas.getContext('2d');

    // this.context.fillRect(0, 0, 100, 100);
    this.startCamera();
    this.bind();
  }
  bind() {
    //イベント登録
    ////ボタン押した時にキャプチャ
    //////バックのキャンバスに固定する
  }

  // getDeviceStream() {
  //   if (navigator.mediaDevices.contains('getUserMedia')) {
  //     console.log('test');
  //   }
  // }
  startCamera() {
    // this.getDeviceStream();
    const MEDIA = navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    });

    MEDIA.then(stream => {
      this.$video.srcObject = stream;
    }).catch(error => {
      alert(error);
    });
  }
  renderInCanvas() {}
}
