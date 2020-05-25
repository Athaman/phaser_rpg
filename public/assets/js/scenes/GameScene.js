class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
    this.score = 0;
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

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound', {
      loop: false,
      volume: 0.2,
    });
  }

  createChests() {
    this.chests = this.physics.add.group();
    this.maxNumberOfChests = 3;
    this.chestPositions = [
      [100, 100],
      [200, 200],
      [300, 300],
      [400, 400],
      [500, 500],
    ];
    for (let i = 0; i < this.maxNumberOfChests; i++) {
      this.spawnChest();
    }
  }

  collectChest(_player, chest) {
    this.goldPickupAudio.play();
    this.score += chest.coins;
    this.events.emit('updatescore', this.score);
    chest.makeInactive();
    this.time.delayedCall(1000, this.spawnChest, [], this);
  }

  spawnChest() {
    const location = this.chestPositions[
      Math.floor(Math.random() * this.chestPositions.length)
    ];

    let chest = this.chests.getFirstDead();
    if (!chest) {
      const chest = new Chest(this, location[0], location[1], 'items', 0);
      this.chests.add(chest);
    } else {
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }
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
      this.chests,
      this.collectChest,
      null,
      this
    );
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
}
