import { action, observable } from "mobx";

export let globalSettings = observable({
  codePlaySpeed: 1,
  maxCodePlaySpeed: 8,
});

globalSettings.setCodePlaySpeed = action(function setCodePlaySpeed(speed) {
  console.log('action setCodePlaySpeed', speed);
  globalSettings.codePlaySpeed = speed;
});

globalSettings.setMaxCodePlaySpeed = action(function setCodePlaySpeed(maxSpeed) {
  console.log('action setMaxCodePlaySpeed', maxSpeed);
  globalSettings.maxCodePlaySpeed = maxSpeed;
});