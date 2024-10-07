import { GridEngine } from "grid-engine";
import * as Phaser from "phaser";
import { GameScene } from "./game";

export class BootScene extends Phaser.Scene {
  readonly LOADER_EVENTS = Phaser.Loader.Events;
  readonly KEY_EVENTS = Phaser.Input.Keyboard.Events;
  readonly CONTINUE_KEY = 'ENTER';

  constructor() {
    super({
      key: "Boot",
      active: false,
    });
  }
  
  preload() {
    this.load.image("tiles", "assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");

    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 52,
      frameHeight: 72,
    });

    this.initLoaderEvents();
  }

  initLoaderEvents() {
    const { width, height } = this.scale;
    const fileList = this.add.text(10, height - 10, '> PRELOADED').setOrigin(0, 1);

    this.load.on(this.LOADER_EVENTS.FILE_LOAD, (file: Phaser.Loader.File) => {
      fileList.appendText(file.src);
    });
    this.load.on(this.LOADER_EVENTS.COMPLETE, () => {
      this.add.text(width / 2, height / 2, `Press ${this.CONTINUE_KEY}`).setOrigin(0.5);
    });
  }

  async create() {
    const keys = {
      open: this.scene.scene.input.keyboard?.addKey(this.CONTINUE_KEY),
    };

    keys.open?.on(this.KEY_EVENTS.DOWN, () => {
      this.scene.start('Game');
      keys.open?.off(this.KEY_EVENTS.DOWN);
    });
  }
}

export class PrebootScene extends Phaser.Scene {
  private gridEngine!: GridEngine;

  preload() {
    this.loaderEvents();

    // Game config debug logging
    console.info(this.plugins.scenePlugins);
    console.info(this.plugins);
    console.info(this.gridEngine);
  }

  loaderEvents() {
    this.load.on(Phaser.Loader.Events.COMPLETE, () => {
      this.load.off(Phaser.Loader.Events.COMPLETE);
      this.scene.start('Boot');
    });
  }
}

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: [
    PrebootScene,
    BootScene,
    GameScene
  ],
  scale: {
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
  parent: "game",
};

export const game = new Phaser.Game(gameConfig);
