const head = document.querySelector('.head-snake');
const food = document.querySelector('.food');
const containerSnake = document.querySelector('.container-snake');
const score = document.querySelector('.score');
const world = document.querySelector('.world');

const step = 16;
let snakeSize = 1;
let keyA = 'ArrowRight';
let positive = false;
const alterWorld = 3;


const getPosition = (element) => {
    return [+element.style.marginRight.replace('px', ''), +element.style.marginTop.replace('px', '')];
}

const checkPosition = () => {
    return (getPosition(head)[0] === getPosition(food)[0]) && (getPosition(head)[1] === getPosition(food)[1])
}

const insertScore = () => {
    let valueSpan = +score.lastChild.textContent;
    return valueSpan < 9 ? score.lastChild.textContent = `0${valueSpan += 1}` : score.lastChild.textContent = `${valueSpan += 1}`;
}

const insertWorld = () => {
    let valueWorld = +world.lastChild.textContent;
    if(+insertScore() === (alterWorld * valueWorld))
        valueWorld < 9 ? world.lastChild.textContent = `0${valueWorld += 1}` : world.lastChild.textContent = `${valueWorld += 1}`;
}

const insertBody = () => {
    const bodySnake = document.createElement('div');
    containerSnake.insertBefore(bodySnake, food);
    bodySnake.classList.add("body-snake-plus");
    bodySnake.classList.add(`body-snake-plus-${snakeSize}`);
}

const insertFood = () => {
    food.style.marginRight = `${Math.floor(Math.floor((Math.random() * 600) / step) * step)}px`;
    food.style.marginTop = `${Math.floor(Math.floor((Math.random() * 300) / step) * step)}px`;
}

const removeFood = () => {
    if(checkPosition()) {
        insertFood();
        insertBody();
        insertWorld();
        snakeSize += 1;
    }
}

const checkPositionWindows = () => {
    // console.log(containerSnake.clientWidth)
    if(getPosition(head)[0] < 0) 
    // if(containerSnake.clientWidth == position)
    //     // console.log(containerSnake.clientWidth)
        console.log("chegou")
}

const moveBody = () => {
    let headRightAux = getPosition(head)[0], headTopAux = getPosition(head)[1];
    
    const bodySnakeAll = document.querySelectorAll('.body-snake-plus');
    let bodyRight, bodyTop;

    for(let i = 0; i < bodySnakeAll.length; i++) {
        
        bodyRight = +bodySnakeAll[i].style.marginRight.replace('px', '');
        bodyTop = +bodySnakeAll[i].style.marginTop.replace('px', '');
        
        bodySnakeAll[i].style.marginRight = `${headRightAux}px`;
        bodySnakeAll[i].style.marginTop = `${headTopAux}px`;
        bodySnakeAll[i].style.display = 'block';

        headRightAux = bodyRight;
        headTopAux = bodyTop;
    }
    removeFood()
}

const moveSnake = () => {
    moveBody()

    switch(keyA){
        case 'ArrowRight':
        case 'ArrowLeft':
            positive === false ? head.style.marginRight = `${getPosition(head)[0] -= step}px` : head.style.marginRight = `${getPosition(head)[0] += step}px`;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            positive === false ? head.style.marginTop = `${getPosition(head)[1] -= step}px` : head.style.marginTop = `${getPosition(head)[1] += step}px`;
    }
    // console.log(getPosition(head)[0])
    checkPositionWindows()
    // console.log(head.style.marginRight)
    // if(checkPositionWindows()) console.log("passou")
}

const direction = () => {
    insertFood()
    addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                keyA = e.key;
                e.key === 'ArrowRight' || e.key === 'ArrowUp' ? positive = false : positive = true;
                break;
        }
    })
}

// console.log(containerSnake.clientWidth)


direction()
setInterval(moveSnake, 200)