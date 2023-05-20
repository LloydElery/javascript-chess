const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild && square.firstChild.setAttribute('draggable', true)
        square.setAttribute('square-id', i)
        square.classList.add('beige')
        // square.classList.add('beige')
        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
        }

        if (i <= 15) {
            square.firstChild.firstChild.classList.add('black')
        }

        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white')
        }


        gameBoard.append(square)
    })
}

createBoard()



const allSquares = document.querySelectorAll('#gameboard .square')

allSquares.forEach(square => {
    square.addEventListener('dragStart', dragStart)
    square.addEventListener('dragOver', dragOver)
    square.addEventListener('drop', dragDrop)

})

let startPositionId

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    e.target.parentNode.append(draggedElemnt)
    e.target.append(draggedElement)
    e.target.remove()
    const taken = e.target.classList.contains('pieces')
    changePlayer()
}

function changePlayer() {
    if (playerGo === 'black') {
        reverseIds()
        playerGo = 'white'
        playerDisplay.textContent = 'white'
    } else {
        revertIds()
        playerGo = 'black'
        playerDisplay.textContent = 'black'
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) =>
        square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() {
    const allSwuares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}