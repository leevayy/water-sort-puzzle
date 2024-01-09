import { Bottle, Color } from "./bottle.js";

const NO_CONTEXT_OR_METHOD_CALL =
  "No context or method were provided for callWithRedraw call";

export const bottles = [
  new Bottle([
    new Color("yellow", 20),
    new Color("green", 45),
  ]),
  new Bottle([
    new Color("red", 20),
    new Color("yellow", 60),
  ]),
  new Bottle([
    new Color("yellow", 20),
    new Color("blue", 60),
    new Color("green", 20),
  ]),
  new Bottle([
    new Color("red", 40),
  ]),
  new Bottle([
    new Color("blue", 10),
    new Color("green", 50),
  ]),
  new Bottle([
    new Color("blue", 20),
    new Color("red", 40),
  ]),
  new Bottle([
    new Color("blue", 10),
    new Color("yellow", 10),
    new Color("green", 80),
  ]),
  new Bottle([
    new Color("yellow", 90),
  ]),
];

const bottlesParent = document.getElementById("bottles-parent");

export function callWithRedraw(context, method, ...args) {
  if (!context || !method) {
    throw new Error(NO_CONTEXT_OR_METHOD_CALL);
  }
  const returnValue = context[method](...args);
  draw();
  return returnValue;
}

export function draw() {
  while (bottlesParent.lastChild) {
    bottlesParent.removeChild(bottlesParent.lastChild);
  }

  bottles.forEach((bottle, i) => {
    const bottleDom = bottle.getDOM(handleBottleOnClick, i);
    bottlesParent.appendChild(bottleDom);
  });
}

function handleBottleOnClick(index) {
  const removeChosen = (bottle) => {
    return bottle.dom.classList.remove("chosen");
  };

  const containsChosen = (bottle) => {
    return bottle.dom.classList.contains("chosen");
  };

  if (containsChosen(bottles[index])) {
    return removeChosen(bottles[index]);
  }

  for (const bottle of bottles) {
    if (containsChosen(bottle)) {
      removeChosen(bottle);
      return callWithRedraw(bottles[index], "mixin", bottle);
    }
  }
  return bottles[index].dom.classList.add("chosen");
}
