class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab game scene reference
    this.gameScene = this.scene.get('Game');
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    // create the score text game object
    this.scoreText = this.add.text(35, 8, 'Coins: 0', {
      fontSize: '16px',
      fill: '#fff',
    });
    this.coinIcon = this.add.image(15, 15, 'items', 3);
  }

  setupEvents() {
    this.gameScene.events.on('updatescore', (score) => {
      this.scoreText.setText(`Coins: ${score}`);
    });
  }
}
