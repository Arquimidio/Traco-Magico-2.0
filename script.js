let colorPicker = document.getElementById('color-selector')
let wrapper = document.getElementById('picker-wrapper')
let range = document.getElementById('squares-range')
let rangeInfo = document.getElementById('range-info')
let modeSwitcher = document.querySelector('.mode-switcher')
let eraser = document.getElementById('eraser')
let bucket = document.getElementById('bucket')
let reset = document.getElementById('reset')
let rainbowMode = document.getElementById('rainbow')
let gridContainer;

console.log('teste')
function startFirstGrid(){
    let grid = document.getElementById('grid')
    gridContainer = document.createElement('div')
    gridContainer.id = 'grid-container'
    gridContainer.style.height = '500px'
    gridContainer.style.width = '500px'
    grid.appendChild(gridContainer)
}

let colorover = window.addEventListener('mouseover', changeColor)
range.addEventListener('change', changeSquareAmount)
colorPicker.addEventListener('change', updatePicker)
modeSwitcher.addEventListener('click', turnSwitcher)
eraser.addEventListener('click', toggleEraser)
bucket.addEventListener('click', changeBgColor)
reset.addEventListener('click', clearDrawing)
rainbowMode.addEventListener('click', switchRainbow)


function changeColor(e){
    if(modeSwitcher.id && e.target.className === 'grid-square'){
        if(e.ctrlKey === true || e.altKey === true){
            e.target.style.backgroundColor = document.getElementById('color-selector').value
        }
    }
    else if (Array.from(rainbowMode.classList).includes('toggled') && e.target.className === 'grid-square'){
        let randomColor = randomizeColors()
        e.target.style.backgroundColor = randomColor
    }

    else if(e.target.className === 'grid-square'){
        e.target.style.backgroundColor = document.getElementById('color-selector').value
    }
}

function createGrid(squares){
    for(let i = 0; i < squares; i += 1){
        let row = document.createElement('div')
        row.style.height = 500/squares + 'px'
        row.style.width = '500px'
        row.className = 'grid-row'
        for(let i = 0; i < squares; i++){
            let square = document.createElement('div')
            square.style.width = 500/squares + 'px'
            square.style.height = 500/squares + 'px'
            square.className = 'grid-square'
            row.appendChild(square)
        }
        gridContainer.appendChild(row)
    }
}

function changeSquareAmount(e){
    gridContainer.innerHTML = ''
    let amount = e.target.value
    rangeInfo.textContent = `${amount} X ${amount}`
    createGrid(amount)
}

function randomizeColors(){
    let rand = () => Math.floor(Math.random() * 255) + 1
    let r = rand()
    let g = rand()
    let b = rand()
    return `rgb(${r}, ${g}, ${b})`
}

function updatePicker(){
    wrapper.style.backgroundColor = document.getElementById('color-selector').value
}

function turnSwitcher(){
    let id = this.id
    if(id){
        this.id = ''
    }else{
        this.id = 'active'
    }
}

function toggleEraser(){
    document.getElementById('color-selector').value = '#FFFFFF'
    wrapper.style.backgroundColor = document.getElementById('color-selector').value
}

function changeBgColor(){
    let squareList = document.getElementsByClassName('grid-square')
    let colorInSelector = document.getElementById('color-selector').value
    for(let item of squareList){
        item.style.backgroundColor = colorInSelector
    }
}

function switchRainbow(){
    if(Array.from(this.classList).includes('toggled')){
        this.classList.remove('toggled')
    }else{
        this.classList.add('toggled')
    }
}

function clearDrawing(){
    let squareList = document.getElementsByClassName('grid-square')
    for(let item of squareList){
        item.style.backgroundColor = 'white'
    }
}

startFirstGrid()
wrapper.style.backgroundColor = document.getElementById('color-selector').value
createGrid(16)
