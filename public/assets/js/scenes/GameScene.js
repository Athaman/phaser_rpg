class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
  }

  preload() {}

  create() {
    this.createAudio();

    this.createChests();

    this.createPlayer();

    this.createWalls();

    this.addCollisions();

    this.createInput();
  }

  update() {
    this.player.update(this.cursors);
  }

  collectChest(_player, chest) {
    this.goldPickupAudio.play();
    this.events.emit('updatescore', chest.coins);
    chest.destroy();
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound', {
      loop: false,
      volume: 0.2,
    });
  }

  createChests() {
    this.chest = new Chest(this, 300, 300, 'items', 0);
  }

  createPlayer() {
    this.player = new Player(this, 32, 32, 'characters', 0);
  }

  createWalls() {
    this.wall = this.physics.add.image(500, 100, 'button1');
    this.wall.setImmovable();
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.overlap(
      this.player,
      this.chest,
      this.collectChest,
      null,
      this
    );
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
}
