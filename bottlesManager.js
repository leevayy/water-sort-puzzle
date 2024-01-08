const NO_CONTEXT_OR_METHOD_CALL = "No context or method were provided for callWithRedraw call";

import { Bottle, Color } from "./bottle.js";

export const bottles = [
    new Bottle([
        new Color('red', 30),
        new Color('green', 10),
        new Color('blue', 30),
    ]),
    new Bottle([
        new Color('red', 30),
    ]),
    new Bottle([
        new Color('red', 30),
        new Color('green', 30),
        new Color('blue', 20),
    ]),
    new Bottle([
        new Color('blue', 15),
        new Color('green', 45),
        new Color('red', 20),
    ]),
    new Bottle([
        new Color('red', 30),
        new Color('green', 36),
        new Color('blue', 16),
    ]),
];

let chosenBottleIndex = -1;
const bottlesParent = document.getElementById('bottles-parent');

export function callWithRedraw(context, method, ...args) {
    if (!context || !method) {
        throw new Error(NO_CONTEXT_OR_METHOD_CALL);
    }
    const returnValue = context[method](...args);
    draw();
    return returnValue;
}

export function draw() {
    console.log(bottles);
    
    while (bottlesParent.lastChild) {
        bottlesParent.removeChild(bottlesParent.lastChild);
    }

    bottles.forEach( (bottle, i) => {
        const bottleDom = bottle.getDOM(handleBottleOnClick, i);
        bottlesParent.appendChild(bottleDom);
    })
}

function handleBottleOnClick(index) {
    const CHOSEN = 'chosen';
    const removeChosen = (bottle) => {
        return bottle.dom.classList.remove(CHOSEN);
    }

    if (bottles[index].dom.classList.contains(CHOSEN)) {
        return removeChosen(bottles[index]);
    }

    for (const bottle of bottles) {
        if (bottle.dom.classList.contains(CHOSEN)) {
            removeChosen(bottle);
            return callWithRedraw(bottles[index], "mixin", bottle);
        }

    }
    return bottles[index].dom.classList.add(CHOSEN);
}