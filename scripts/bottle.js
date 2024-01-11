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

        const pouredOut = bottle.pourOut();
        if (this.fillings[0] && pouredOut.name === this.fillings[0].name) {
            this.fillings[0].size += pouredOut.size;
        } else {
            this.fillings.unshift(pouredOut);
        }
    }

    isFilled() {
        if ((new Set(this.fillings.map(color => color.name))).size !== 1) {
            return false;
        }
            
        let fillingCount = 0;
        for (const color of this.fillings) {
            fillingCount += color.size;
        }
        return fillingCount >= 95;
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

    getDOM(handleOnClick, indexInBottles) {
        this.dom = document.createElement("div");
        this.dom.className = "bottle";
        
        const colorsContainer = document.createElement("div");
        colorsContainer.className = "colors-container";
        this.dom.appendChild(colorsContainer);
        
        this.fillings.forEach( (filling, i) => {
            const color = document.createElement("div");
            color.className = `color ${filling.name}`;
            color.style = `height: ${filling.size}px`;
            colorsContainer.appendChild(color);
        })

        if (this.isFilled()) {
            this.dom.classList.add('filled');
            return this.dom;
        }

        this.dom.onclick = () => handleOnClick(indexInBottles);
        
        // this.dom.ondrag = (e) => console.log(e, 'ondrag');
        // this.dom.ondrop = (e) => console.log(e, 'ondrop');
        // this.dom.ondragstart = (e) => console.log(e, 'ondragstart');
        // this.dom.ondragend = (e) => console.log(e, 'ondragend');
        // this.dom.ondragenter = (e) => console.log(e, 'ondragenter');
        // this.dom.ondragleave = (e) => console.log(e, 'ondragleave');
        // this.dom.ondragover = (e) => console.log(e, 'ondragover');

        return this.dom;
    }
}

export class Color {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}