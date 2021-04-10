[![Build Status](https://github.com/chinhodado/persona5_calculator/workflows/build/badge.svg)](https://github.com/chinhodado/persona5_calculator/actions?workflow=build)


### Persona 5 fusion calculator

A tool to help calculate fusions in Persona 5.

Link: https://chinhodado.github.io/persona5_calculator/

Also included are information about a persona's stats, elementals and skills.

Note: the cost is estimated and is not accurate.

### How fusion in Persona 5 works

In general, fusion in Persona 5 is still mostly the same as in Persona 3 and 4, with a few additional rules:

 - There are rare persona (aka Treasure Demon) that when fused with a normal persona X will result in another persona either one or two ranks above or below X's current level. Whether to move up or down rank and whether to move one or two steps depends on the rare persona and X's arcana.
   - In other word, given a rare persona and another non-rare persona X, when fusing them you will **not** always get a fixed result, but the result will vary depending on the non-rare persona X's current level. Please keep this in mind when using the fusion calculator.
   - The rare persona are Regent, Queen's Necklace, Stone of Scone, Koh-i-Noor, Orlov, Emperor's Amulet, Hope Diamond and Crystal Skull
 
 - When two rare persona are fused, the normal fusion formula is used.
  
 - Rare persona cannot be the result of a fusion.
  
 - When doing a fusion, either a normal one, a same-arcana-downrank one or a rare one, if the result is a rare persona, it will be skipped.
 
 - There is no longer 3-way fusion.
 
 - There are DLC persona. If you don't own a DLC persona, it will be skipped during fusion.
 
This calculator assumes that you own **no** DLC persona by default (you can change which DLC persona you own [here](https://chinhodado.github.io/persona5_calculator/#/setting)). It also assumes that when you do a rare fusion your persona is at the **base level**, so please keep that in mind if you don't get the same result as shown.

### Note on fusion with Judgement arcana

According to the [official guide](http://atlus.com/persona5/manual/ps4/?pid=50) a fusion between a persona of the Judgement arcana and another persona of the Justice/Strength/Chariot/Death arcana is possible, but this is actually not the case in game.
 
Backup [link](img/atlus_fusion_table.jpg) if above link is broken.

### Credits
 
Ideas, logics, data, etc. have been gathered from:

 - https://github.com/arantius/persona-fusion-calculator
 - https://github.com/Heimdall409/persona4-fusion-calculator
 - https://github.com/aqiu384/aqiu384.github.io/tree/master/p5-tool

## Building and Running Locally

This app uses `npm` for dependency management. [You can download npm here.](https://www.npmjs.com/get-npm)

### Clone the repo

```sh
$ git clone https://github.com/chinhodado/persona5_calculator.git # Or your fork's URL
```

### Install dependencies

```sh
$ npm install
```

### Compile source files

```sh
$ npm run compile
```

You will need to re-run this command and refresh the page any time to see changes to any of the Typescript (`*.ts`) source files.

### Run the app locally

Open the top-level `index.html` or `indexRoyal.html` in your browser. The app loads some dependencies (e.g. Angular.js) as external `<script>`s, so you may need to disable CORS temporarily to allow this if [you run into errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors).
