class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
  }

  preload() {}

  create() {
    this.goldPickupAudio = this.sound.add('goldSound', {
      loop: false,
      volume: 0.2,
    });

    this.chest = new Chest(this, 300, 300, 'items', 0);

    this.player = new Player(this, 32, 32, 'characters', 0);

    // this.physics.add.collider(this.player, this.wall);
    this.physics.add.overlap(
      this.player,
      this.chest,
      this.collectChest,
      null,
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.cursors);
  }

  collectChest(_player, chest) {
    this.goldPickupAudio.play();
    this.events.emit('updatescore', chest.coins);
    chest.destroy();
  }
}
