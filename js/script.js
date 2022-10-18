const head = document.querySelector('.head-snake');
const food = document.querySelector('.food');
const containerSnake = document.querySelector('.container-snake');
const score = document.querySelector('.score');
const world = document.querySelector('.world');

const step       = 16;
const alterWorld = 3;
let snakeSize    = 1;
let keyA         = 'ArrowRight';
let positive     = false;


const getPosition = (element) => {
    return [+element.style.marginRight.replace('px', ''), +element.style.marginTop.replace('px', '')];
}

const checkPosition = () => {
    return (getPosition(head)[0] === getPosition(food)[0]) && (getPosition(head)[1] === getPosition(food)[1]);
}

const insertScore = () => {
    let valueSpan = +score.lastElementChild.textContent;
    return valueSpan < 9 ? score.lastElementChild.textContent = `0${valueSpan += 1}` : score.lastElementChild.textContent = `${valueSpan += 1}`;
}

const insertWorld = () => {
    let valueWorld = +world.lastElementChild.textContent;
    if(+insertScore() === (alterWorld * valueWorld))
        valueWorld < 9 ? world.lastElementChild.textContent = `0${valueWorld += 1}` : world.lastElementChild.textContent = `${valueWorld += 1}`;
}

const insertBody = () => {
    const bodySnake = document.createElement('div');
    containerSnake.insertBefore(bodySnake, food);
    bodySnake.classList.add("body-snake-plus");
    bodySnake.setAttribute('id', snakeSize);
}

const insertFood = () => {
    // Math.floor(Math.random() * (max - min + 1) ) + min;
    food.style.marginRight = `${Math.floor(Math.floor((Math.random() * (600 - (-600) + 1) + (-600)) / step) * step)}px`;
    food.style.marginTop   = `${Math.floor(Math.floor((Math.random() * (300 - (-300) + 1) + (-300)) / step) * step)}px`;
}

const removeFood = () => {
    if(checkPosition()) {
        insertFood();
        insertBody();
        insertWorld();
        snakeSize += 1;
    }
}

const removeCredits = () => {
    let credSpan      = +document.querySelector('.credits').lastElementChild.textContent;
    const elementSpan = document.querySelector('.credits').lastElementChild;
    if(credSpan <= 1) {
        document.querySelector('.show').style.display = 'block';
        document.querySelector('.hide').style.display = 'none';
    }
    credSpan < 9 ? elementSpan.textContent = `0${credSpan -= 1}` : elementSpan.textContent = `${credSpan -= 1}`; 
}

const checkPositionWindows = () => {
    let containerSnakeWidth  = getPosition(head)[0];
    let containerSnakeHeight = getPosition(head)[1];
    
    if(containerSnakeWidth < 0)
        containerSnakeWidth *= -1;
    if(containerSnakeHeight < 0 )
        containerSnakeHeight *= -1;
    
    return (containerSnake.clientWidth === containerSnakeWidth || containerSnake.clientHeight === containerSnakeHeight);
}

const moveBody = () => {
    let bodyRight, bodyTop;
    let headRightAux   = getPosition(head)[0];
    let headTopAux     = getPosition(head)[1];
    const bodySnakeAll = document.querySelectorAll('.body-snake-plus');

    for(let i = 0; i < bodySnakeAll.length; i++) {
        bodyRight = getPosition(bodySnakeAll[i])[0];
        bodyTop   = getPosition(bodySnakeAll[i])[1];
        
        bodySnakeAll[i].style.marginRight = `${headRightAux}px`;
        bodySnakeAll[i].style.marginTop   = `${headTopAux}px`;
        bodySnakeAll[i].style.display     = 'block';

        headRightAux = bodyRight;
        headTopAux   = bodyTop;
    }
    removeFood();
}

const removeBody = () => {
    const bodySnakeAll = document.querySelectorAll('.body-snake-plus');

    for(let i = 1; i <= bodySnakeAll.length; i++) {
        // Removendo um elemento específico sem precisar especificar seu pai
        let noBodySnake = document.getElementById(i);
        if (noBodySnake.parentNode)
            noBodySnake.parentNode.removeChild(noBodySnake);
    }
    snakeSize = 1;
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
}

const direction = () => {
    insertFood()

    addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                keyA  = e.key;
                e.key === 'ArrowRight' || e.key === 'ArrowUp' ? positive = false : positive = true;
                break;
        }
    })
}

const stopGame = stop => {
    if(checkPositionWindows()) {
        removeCredits();
        clearInterval(stop);
        document.querySelector('.menu').style.display = 'flex';
    }
}

const starGame = () => {
    const stop = setInterval(() => {
        moveSnake();
        stopGame(stop);
    }, 200)
}

const exitGame = () => {
    const main    = document.querySelector('.container-main');
    const footer  = document.getElementById('footer');
    const btnExit = document.querySelector('.exit');
    
    btnExit.addEventListener('click', () => {
        main.style.display   = 'none';
        footer.style.display = 'flex';
    })
}

const continueGame = () => {
    const btnContinue = document.querySelector('.continue');

    btnContinue.addEventListener('click', () => {
        document.querySelector('.menu').style.display = 'none';
        head.style.marginRight = head.style.marginTop = 0;
        keyA     = 'ArrowRight';
        positive = false;
        
        starGame();
        removeBody();
        insertFood();
    })
}

direction();
starGame();
continueGame();
exitGame();