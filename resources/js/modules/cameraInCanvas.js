class Sticker {
  constructor(stickerNum, idNumber) {
    this.id = idNumber;
    this.src = `/public/images/sticker/sticker${stickerNum}.png`;
    this.leftTopPoint = { x: 100, y: 100 };
    this.width = 100;
    this.height = 100;
    this.scale = 1;
    // this.isActive = false;
  }
}

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

    this.$backImageScreen = document.createElement('canvas');
    this.$backImageScreen.width = this.$canvas.width;
    this.$backImageScreen.height = this.$canvas.height;
    this.backImageScreenContext = this.$backImageScreen.getContext('2d');

    //その他の要素取得
    this.$video = document.querySelector('.camera');
    this.$captureButton = document.querySelector('.js-capture');
    this.$scaleUpButton = document.querySelector('.js-scaleUp');
    this.$scaleDownButton = document.querySelector('.js-scaleDown');
    this.$scaleOkButton = document.querySelector('.js-scaleOk');

    this.$stickerWrapper = document.querySelector('.sticker-wrapper');
    this.$stickers = document.querySelectorAll('.js-sticker');
    this.$removeStickerButton = document.querySelector('.js-removeSticker');

    this.phase = 1; //フェーズ番号1〜3

    //変数等
    this.originalImage = null;
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
      currentX: 0,
      currentY: 0
    };
    this.diff = { x: 0, y: 0 };
    this.isTouched = false;
    this.moveStickerFlag = false;

    this.stickerId = 0; //スタンプ追加時に付与していくid番号
    this.activeStickerId = 0; //現在アクティブ状態のスタンプid
    this.selectedStickerIds = []; //クリック時にマウス下にあるスタンプ画像のid
    this.stickersOnCanvas = []; //キャンバス上に存在するスタンプの配列
    this.stickerPosition_past = { x: 0, y: 0 };

    this.startCamera();
    this.bind();
  }

  bind() {
    //画面キャプチャ
    this.$captureButton.addEventListener('click', () => {
      this.renderCameraImageInCanvas();
      this.phase = 2;
    });

    this.$canvas.addEventListener('mousedown', event => {
      this.handleMouseDown(event);
    });

    this.$canvas.addEventListener('mousemove', event => {
      this.handleMouseMove(event);
    });

    document.addEventListener('mouseup', event => {
      this.handleMouseUp(event);
    });

    //拡大縮小ボタン
    this.$scaleUpButton.addEventListener('click', event => {
      this.scale_past = this.scale;
      this.scale *= 1.1;
      this.resize();
    });
    this.$scaleDownButton.addEventListener('click', () => {
      this.scale_past = this.scale;
      this.scale *= 0.9;
      this.resize();
    });
    this.$scaleOkButton.addEventListener('click', () => {
      this.$scaleUpButton.classList.add('js-hide');
      this.$scaleDownButton.classList.add('js-hide');
      this.$scaleOkButton.classList.add('js-hide');
      this.$stickerWrapper.classList.remove('js-hide');
      this.$removeStickerButton.classList.remove('js-hide');
      this.originalImage = this.context.getImageData(0, 0, 300, 300);
      this.backImageScreenContext.putImageData(this.originalImage, 0, 0);
      this.phase = 3;
    });

    //sticker一覧
    [...this.$stickers].forEach(element => {
      element.addEventListener('click', event => {
        this.handleClickStickerList(element, event);
      });
    });

    this.$removeStickerButton.addEventListener('click', () => {
      this.stickersOnCanvas.splice(this.stickersOnCanvas.length - 1, 1);
      this.renderStickers();
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
    this.$scaleOkButton.classList.remove('js-hide');
    ////////////////////////////////////////////////

    this.stopCamera();
    this.originalImage = this.context.getImageData(0, 0, 300, 300);
  }

  handleMouseDown(event) {
    const START_X = event.screenX;
    const START_Y = event.screenY;
    this.pointerPosition.startX = START_X;
    this.pointerPosition.startY = START_Y;
    if (this.phase === 2) {
      this.imagePosition_past.x = this.imagePosition.x;
      this.imagePosition_past.y = this.imagePosition.y;
      console.log('pastPosition_x:' + this.imagePosition_past.x);
    } else if (this.phase === 3) {
      this.stickersOnCanvas.forEach(stickerObj => {
        if (
          stickerObj.leftTopPoint.x <= event.offsetX &&
          event.offsetX <= stickerObj.leftTopPoint.x + stickerObj.width &&
          event.offsetY <= stickerObj.leftTopPoint.y + stickerObj.height &&
          stickerObj.leftTopPoint.y <= event.offsetY
        ) {
          this.selectedStickerIds.push(stickerObj.id);
          this.moveStickerFlag = true;
          console.log('onSticker');
        } else {
          console.log('notOnSticker');
        }
      });
      if (this.moveStickerFlag) {
        this.decideOperatedSticker(event);
        this.renderStickers();
      }
    }

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

    if (this.phase === 2) {
      this.imagePosition.x = this.diff.x + this.imagePosition_past.x;
      this.imagePosition.y = this.diff.y + this.imagePosition_past.y;
      // console.log('displacePosition:' + this.imagePosition.x);
      this.moveImage();
    } else if (this.phase === 3 && this.moveStickerFlag) {
      this.operateSticker();
    }
  }

  handleMouseUp() {
    this.isTouched = false;
    this.moveStickerFlag = false;
    this.selectedStickerIds.length = 0;
    this.pointerPosition.startX = 0;
    this.pointerPosition.startY = 0;
    this.pointerPosition.currentX = 0;
    this.pointerPosition.currentY = 0;
  }

  decideOperatedSticker(event) {
    //クリックした地点にアクティブなスタンプがあるかどうか
    const MATCHED_STICKER_ID = this.selectedStickerIds.find(
      id => id === this.activeStickerId
    );

    //アクティブスタンプがなければ配列の最後に近いスタンプをアクティブにする
    if (MATCHED_STICKER_ID === undefined) {
      const ARRAY_LAST_NUM = this.selectedStickerIds.length - 1;
      this.activeStickerId = this.selectedStickerIds[ARRAY_LAST_NUM];
    }

    //現在アクティブ状態のスタンプが何番目の配列に入っているか取得
    const INDEX_OPERATED_STICKER = this.stickersOnCanvas.findIndex(
      stickerObj => {
        return stickerObj.id === this.activeStickerId;
      }
    );

    //アクティブなスタンプを配列の最後に移動
    const ACTIVE_STICKER_OBJ = this.stickersOnCanvas[INDEX_OPERATED_STICKER];
    this.stickersOnCanvas.splice(INDEX_OPERATED_STICKER, 1);
    this.stickersOnCanvas.push(ACTIVE_STICKER_OBJ);

    //アクティブなスタンプの初期位置を保持
    this.stickerPosition_past.x = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].leftTopPoint.x;

    this.stickerPosition_past.y = this.stickersOnCanvas[
      this.stickersOnCanvas.length - 1
    ].leftTopPoint.y;
  }
  operateSticker() {
    this.moveSticker();
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
    // console.log('RENDER_POINT_X:' + this.imagePosition.x);
  }

  moveSticker() {
    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.x =
      this.diff.x + this.stickerPosition_past.x;

    this.stickersOnCanvas[this.stickersOnCanvas.length - 1].leftTopPoint.y =
      this.diff.y + this.stickerPosition_past.y;

    this.renderStickers();
  }

  handleClickStickerList(element, event) {
    this.addSticker(element);
    this.renderStickers();
  }

  addSticker(element) {
    const newSticker = new Sticker(element.dataset.stickerNum, this.stickerId);
    this.stickersOnCanvas.push(newSticker);
    this.activeStickerId = this.stickerId;
    this.stickerId++;
    // console.log(this.stickersOnCanvas);
  }

  renderStickers() {
    //オフスクリーンに描画
    this.offScreenContext.clearRect(0, 0, 300, 300);
    this.offScreenContext.drawImage(this.$backImageScreen, 0, 0, 300, 300);
    let img = new Image();

    //枠線の色とマークの大きさ
    let color = 'grey';
    let size = 2;

    //スタンプの配列を描画
    for (let i = 0; i < this.stickersOnCanvas.length; i++) {
      //最後のスタンプ(アクティブ)のみ枠線の色とマークの大きさ変更
      if (i === this.stickersOnCanvas.length - 1) {
        color = 'white';
        size = 3;
      }

      img.src = this.stickersOnCanvas[i].src;
      let x = this.stickersOnCanvas[i].leftTopPoint.x,
        y = this.stickersOnCanvas[i].leftTopPoint.y,
        width = this.stickersOnCanvas[i].width,
        height = this.stickersOnCanvas[i].height;

      this.offScreenContext.drawImage(img, x, y, width, height);
      this.drawFrameLine(x, y, width, height, color);
      this.drawCornerMark(x, y, width, height, size);
    }

    //まとめてキャンバスへ描画
    this.context.clearRect(0, 0, 300, 300);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }

  drawFrameLine(x, y, width, height, color) {
    this.offScreenContext.strokeStyle = color;
    this.offScreenContext.beginPath();
    this.offScreenContext.strokeRect(x, y, width, height);
  }
  drawCornerMark(x, y, width, height, size) {
    this.offScreenContext.strokeStyle = 'black';
    this.offScreenContext.fillStyle = 'white';
    this.drawArc(x, y, size);
    this.drawArc(x, y + height, size);
    this.drawArc(x + width, y, size);
    this.drawArc(x + width, y + height, size);
  }

  drawArc(x, y, size) {
    this.offScreenContext.beginPath();
    this.offScreenContext.arc(x, y, size, 0, Math.PI * 2, false);
    this.offScreenContext.stroke();
  }
}
