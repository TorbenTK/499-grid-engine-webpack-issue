# #499 Grid Engine issue with Webpack

> Issue: https://github.com/Annoraaq/grid-engine/issues/499

`webpack` fails to load the Grid Engine plugin through package installing. It mentions the following as a warning in the console:

```
Missing `plugin` for key: gridEngine
```

Trying to enter the scene with the game throws an error on `create()` being `undefined`.

Changing the import statement in the game configuration from `{ GridEngine }` to `GridEngine` will cause the map creation to work. However, this will then cause the code to crash whenever the engine is addressed (_for example, when it is requested to move a character to a new position using `moveTo()`_).

## Setup

This repository is a merge of two repo's:
- [Grid Engine](https://github.com/Annoraaq/grid-engine) project using TypeScript (applied first)
- [Phaser Webpack](https://github.com/phaserjs/template-webpack-ts) example using TypeScript

Small changes to make it resemble other ongoing projects:

- There's an additional Preloader scene for textures, audio, etcetera. Existing texture loading has been moved to here (this scene also helps confirm whether assets and plugins are available)
- GameScene has been moved to `game.ts`

`/assets` folder has been duplicated to `/public` due to the different `publicPath` entries esbuild and webpack both use. I could've changed it for webpack, but decided to keep them as close to the example repo's as possible.

## Requirements

This project was built using `yarn` (1.22.13), but `npm` (10.7.0) can also be used.

## How to run

First, install dependencies using either `yarn` or `npm i`.

To run the project with EsBuild, run `yarn serve` or `npm run serve`.

To run the project with Webpack, run `yarn webpack` or `npm run webpack`.