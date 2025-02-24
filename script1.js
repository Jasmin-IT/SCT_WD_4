const boxes = document.querySelectorAll('.box');
const statustxt = document.querySelector('.status'); // Corrected here
const resetBtn = document.querySelector('#reset'); // Corrected here
let x = "<img src='./x.png'>";
let o = "<img src='./o.png'>";

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();

function init() {
    boxes.forEach(box => box.addEventListener("click", boxClick));
    resetBtn.addEventListener("click", restartGame);
    statustxt.textContent = `${player} Your turn`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (board[index] != "" || !running) {
        return;
    }
    updateBox(this, index);
    checkWinner();
}

function updateBox(data, index) {
    board[index] = player;
    data.innerHTML = currentPlayer;
}

function changePlayer() {
    player = (player == 'X') ? "O" : "X";
    currentPlayer = (currentPlayer == x) ? o : x;
    statustxt.textContent = `${player} Your turn`;
}

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = board[condition[0]];
        const box2 = board[condition[1]];
        const box3 = board[condition[2]];
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }
    if (isWon) {
        statustxt.textContent = `${player} WON...`;
        running = false;
    } else if (board.includes("")) {
        changePlayer();
    } else {
        statustxt.textContent = 'GAME DRAW';
        running = false;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "",""];
    currentPlayer = x;
    player = "X";
    running = true;
    statustxt.textContent = `${player} Your Turn`;
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
}
