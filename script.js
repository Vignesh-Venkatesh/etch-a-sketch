// Get the grid container element
const gridContainer = document.querySelector('.grid-container');
let gridContainerStyle = getComputedStyle(gridContainer) // Getting the style values from CSS

// Parameters
GRID_CONTAINER_WIDTH = gridContainerStyle.width
GRID_CONTAINER_HEIGHT= gridContainerStyle.height
NUMBER_OF_GRID_BOXES = 16// This is nxn number of boxes
GRID_BOX_WIDTH = `${GRID_CONTAINER_WIDTH/NUMBER_OF_GRID_BOXES}px`
GRID_BOX_HEIGHT = `${GRID_CONTAINER_HEIGHT/NUMBER_OF_GRID_BOXES}px`
GRID_BOX_BACKGROUND_COLOR = "#e8d4a0"
GRID_BOX_BORDER_COLOR = "#000"
GRID_BOX_BORDER_THICKNESS =  "1.5px"
GRID_BOX_BORDER_STYLE = "solid"
PICKED_COLOR = "#000"

RAINBOW_FLAG = false

const RAINBOW_COLOR_LIST = [
    "#FF5733",
    "#0074D9",
    "#2ECC40",
    "#FF4136",
    "#7FDBFF",
    "#B10DC9",
    "#01FF70",
    "#F012BE",
    "#39CCCC",
    "#FFDC00",
    "#DDDDDD",
    "#85144b",
    "#3D9970",
    "#111111",
    "#AAAAAA",
    "#FF851B",
    "#7FDBFF",
    "#39CCCC",
    "#F012BE",
    "#01FF70",
    "#111111",
    "#AAAAAA",
    "#2ECC40",
    "#85144b",
    "#3D9970",
    "#FF4136",
    "#FFDC00",
    "#0074D9",
    "#FF851B",
    "#B10DC9",
    "#7FDBFF",
    "#39CCCC",
    "#85144b",
    "#3D9970",
    "#F012BE",
    "#01FF70",
    "#111111",
    "#AAAAAA",
    "#2ECC40",
    "#FF4136",
    "#FFDC00",
    "#0074D9",
    "#FF851B",
    "#B10DC9",
    "#7FDBFF",
    "#39CCCC",
    "#85144b",
    "#3D9970",
    "#F012BE",
    "#01FF70",
    "#111111",
    "#AAAAAA",
    "#2ECC40",
    "#FF4136",
    "#FFDC00",
    "#0074D9",
    "#FF851B",
    "#B10DC9",
    "#7FDBFF",
    "#39CCCC",
    "#85144b",
    "#3D9970",
    "#F012BE",
    "#01FF70",
    "#111111",
    "#AAAAAA",
    "#2ECC40",
    "#FF4136",
    "#FFDC00",
    "#0074D9",
    "#FF851B",
    "#B10DC9",
    "#7FDBFF",
    "#39CCCC",
    "#85144b",
    "#3D9970",
    "#F012BE",
    "#01FF70",
    "#111111",
    "#AAAAAA",
    "#2ECC40",
    "#FF4136",
    "#FFDC00",
    "#0074D9",
    "#FF851B",
    "#B10DC9",
    "#7FDBFF",
    "#39CCCC",
    "#85144b",
    "#3D9970",
    "#F012BE",
    "#01FF70",
    "#111111",
    "#AAAAAA",
    "#2ECC40",
    "#FF4136",
    "#FFDC00",
    "#0074D9",
    "#FF851B",
    "#B10DC9",
    "#7FDBFF",
    "#39CCCC",
    "#85144b",
    "#3D9970",
    "#F012BE",
    "#01FF70"
  ];
  


// All control input buttons/inputs
eraseHTML = document.getElementById("erase")
penHTML = document.getElementById("pen")
colorHTML = document.getElementById("color-pick")
rainbowHTML = document.getElementById("rainbow-color")



// Setting up the canvas
setNumberOfGridBoxes(NUMBER_OF_GRID_BOXES)
function setNumberOfGridBoxes(n){
    // gridContainer.style.width = `${GRID_CONTAINER_WIDTH}px`
    // gridContainer.style.height = `${GRID_CONTAINER_HEIGHT}px`
    gridContainer.style.gridTemplateColumns = `repeat(${n}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${n}, 1fr)`
    for (let i = 1; i <= NUMBER_OF_GRID_BOXES; i++) {
        for(let j = 1; j<=NUMBER_OF_GRID_BOXES; j++){
            const gridItem = document.createElement('div')
            gridItem.classList.add('grid-item')
            gridItem.style.cursor = "pointer"
            setGridBoxProperty(gridItem, GRID_BOX_BACKGROUND_COLOR, GRID_BOX_BORDER_COLOR,GRID_BOX_BORDER_THICKNESS, GRID_BOX_BORDER_STYLE)
            gridContainer.appendChild(gridItem)
        }
    }
    setGridBoxEventListener()
}

// Reset Canvas
resetHTML = document.getElementById("reset")
resetHTML.addEventListener("click", function() {
    // remove all existing grid items
    let gridItems = document.querySelectorAll('.grid-item')
    gridItems.forEach(item => item.remove())
    // reset the canvas
    penHTML.innerHTML = "Pen (ON)"
    eraseHTML.innerHTML = "Erase (OFF)"
    rainbowHTML.innerHTML = "Rainbow Color (OFF)"
    PICKED_COLOR = "#000";
    setNumberOfGridBoxes(NUMBER_OF_GRID_BOXES)
    setGridBoxEventListener()
});

// Erase Option
eraseHTML.addEventListener("click", function(){
    penHTML.innerHTML = "Pen (OFF)"
    eraseHTML.innerHTML = "Erase (ON)"
    rainbowHTML.innerHTML = "Rainbow Color (OFF)"
    RAINBOW_FLAG = false
    PICKED_COLOR = GRID_BOX_BACKGROUND_COLOR
})

// Pen Option
penHTML.addEventListener("click", function(){
    penHTML.innerHTML = "Pen (ON)"
    eraseHTML.innerHTML = "Erase (OFF)"
    rainbowHTML.innerHTML = "Rainbow Color (OFF)"
    PICKED_COLOR = colorHTML.value
    RAINBOW_FLAG = false
})

// Rainbow Pen
rainbowHTML.addEventListener("click", function(){
    penHTML.innerHTML = "Pen (OFF)"
    eraseHTML.innerHTML = "Erase (OFF)"
    rainbowHTML.innerHTML = "Rainbow Color (ON)"
    
    RAINBOW_FLAG = true
    
})

colorHTML.addEventListener("change", function(){
    PICKED_COLOR = colorHTML.value
})

// Adding Event listeners to the individual grid boxes
function setGridBoxEventListener() {
    let gridItems = document.querySelectorAll('.grid-item')
    let isMouseDown = false // flag to track mouse button state
    
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].addEventListener('mousedown', function() {
                isMouseDown = true
                color.call(this) // call color function on this grid box
        })
        
        gridItems[i].addEventListener('mouseup', function() {
                isMouseDown = false
        })
        
        gridItems[i].addEventListener('mousemove', function() {
                if (isMouseDown) {
                    color.call(this) // call color function on this grid box
                }
        })
    }
}
  

function color(){
    if (RAINBOW_FLAG==true){
        PICKED_COLOR = RAINBOW_COLOR_LIST[Math.floor(RAINBOW_COLOR_LIST.length * Math.random())]
    }

    this.style.backgroundColor = PICKED_COLOR;

    
}


function setGridBoxProperty(gridBox, background_color="#fff", border_color="black", border_thickness="1px", border_style="solid"){
    gridBox.style.backgroundColor = background_color
    gridBox.style.width = GRID_BOX_WIDTH
    gridBox.style.width = GRID_BOX_HEIGHT
    gridBox.style.border = `${border_color} ${border_thickness} ${border_style}`
}
