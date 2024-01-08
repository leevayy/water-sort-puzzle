const NOT_ENOUGH_SPACE = "Not enough space for mixin";
const NOTHING_TO_POUR_OUT = "Nothing to pour out of the bottle";
const ACCESSING_EMPTY_BOTTLE = "Trying to access an empty bottle";

export class Bottle {
    constructor(colors) {
        this.fillings = [...colors];
        this.dom = null;
    }

    mixin(bottle) {
        const spaceNeeded = bottle.getTop().size;

        let spaceLeft = 100;

        for (const color of this.fillings) {
            spaceLeft -= color.size;
        }

        if (spaceLeft < spaceNeeded) {
            throw new Error(NOT_ENOUGH_SPACE);
        }

        this.fillings.unshift( bottle.pourOut() );
    }

    pourOut() {
        if (this.fillings.length === 0) {
            throw new Error(NOTHING_TO_POUR_OUT);
        }
        return this.fillings.shift();
    }

    getTop() {
        if (this.fillings.length === 0) {
            throw new Error(ACCESSING_EMPTY_BOTTLE)
        }
        return this.fillings.at(0);
    }

    getDOM(onClickHandler, indexInBottles) {
        this.dom = document.createElement("div");
        this.dom.className = "bottle";
        
        const colorsContainer = document.createElement("div");
        colorsContainer.className = "colors-container";
        this.dom.appendChild(colorsContainer);
        
        this.fillings.forEach( (filling, i) => {
            const color = document.createElement("div");
            color.className = `color ${filling.name}`;
            color.style = `height: ${filling.size}px`
            colorsContainer.appendChild(color);
        })

        this.dom.onclick = () => onClickHandler(indexInBottles);

        return this.dom;
    }
}

export class Color {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}