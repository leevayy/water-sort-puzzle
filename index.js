const bottles = [
    {
        fillings: [
            {name: 'green', size: 30},
            {name: 'red', size: 50},
            {name: 'blue', size: 10},
        ]
    },
    {
        fillings: [
            {name: 'red', size: 30},
            {name: 'blue', size: 40},
            {name: 'green', size: 15},
        ]
    },
    {
        fillings: [
            {name: 'blue', size: 40},
            {name: 'green', size: 20},
            {name: 'red', size: 35},
        ]
    },
    {
        fillings: []
    }
]

const bottlesParent = document.getElementById('bottles-parent');

bottles.forEach( bottle => {
    const bottleDom = document.createElement("div");
    bottleDom.id = "bottle";
    bottleDom.className = "bottle";

    const colorsContainer = document.createElement("div");
    colorsContainer.className = "colors-container";
    bottleDom.appendChild(colorsContainer);

    bottle.fillings.forEach( (filling, i) => {
        const color = document.createElement("div");
        color.className = 'color';
        color.id = filling.name;
        color.style = `height: ${filling.size}px`
        colorsContainer.appendChild(color);
    })

    bottlesParent.appendChild(bottleDom);

})

