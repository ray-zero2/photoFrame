export default class {
  constructor() {
    this.$canvas = document.querySelector('.canvas');
    this.$scaleUpButton = document.querySelector('.js-scaleUp');
    this.$scaleDownButton = document.querySelector('.js-scaleDown');

    this.context = this.$canvas.getContext('2d');

    this.$offScreen = document.createElement('canvas');
    this.$offScreen.width = this.$canvas.width;
    this.$offScreen.height = this.$canvas.height;
    this.offScreenContext = this.$offScreen.getContext('2d');

    this.bind();
  }

  bind() {
    this.$scaleUpButton.addEventListener('click', () => {
      this.scaleUpRender();
    });

    this.$scaleDownButton.addEventListener('click', () => {
      this.scaleDownRender();
    });
  }

  scaleUpRender() {
    const ORIGINAL_IMAGE = this.context.getImageData(0, 0, 300, 300);
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(ORIGINAL_IMAGE, 0, 0);
    // console.log(this.$offScreen);
    this.context.scale(1.2, 1.2);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }
  scaleDownRender() {
    const ORIGINAL_IMAGE = this.context.getImageData(0, 0, 300, 300);
    this.context.clearRect(0, 0, 300, 300);
    this.offScreenContext.putImageData(ORIGINAL_IMAGE, 0, 0);
    // console.log(this.$offScreen);
    this.context.scale(0.8, 0.8);
    this.context.drawImage(this.$offScreen, 0, 0, 300, 300);
  }
}
