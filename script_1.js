const grid = document.getElementById('grid');
const goalGrid = document.getElementById('goal');
const resetButton = document.getElementById('reset');
const size = 5;
let board = [];
let goalPattern = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0]
];

// 初期化
function initBoard() {
    board = [];
    grid.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            grid.appendChild(cell);
            row.push(cell);
        }
        board.push(row);
    }
    randomizeBoard();
    displayGoalPattern();
}

// ランダムにオン・オフを設定
function randomizeBoard() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (Math.random() > 0.5) {
                toggleCell(i, j);
            }
        }
    }
}

// セルをクリックしたときの処理
function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    toggleCell(row, col);
    toggleAdjacentCells(row, col);
    checkWinCondition();
}

// セルのオン・オフを切り替える
function toggleCell(row, col) {
    const cell = board[row][col];
    cell.classList.toggle('on');
}

// 隣接するセルも切り替える
function toggleAdjacentCells(row, col) {
    if (row > 0) toggleCell(row - 1, col); // 上
    if (row < size - 1) toggleCell(row + 1, col); // 下
    if (col > 0) toggleCell(row, col - 1); // 左
    if (col < size - 1) toggleCell(row, col + 1); // 右
}

// 勝利条件のチェック
function checkWinCondition() {
    const isWin = board.flat().every(cell => !cell.classList.contains('on'));
    if (isWin) {
        alert('クリアしました！');
    }
}

// 目標パターンを表示
function displayGoalPattern() {
    goalGrid.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const goalCell = document.createElement('div');
            goalCell.classList.add('goal-cell');
            if (goalPattern[i][j] === 1) {
                goalCell.classList.add('on');
            }
            goalGrid.appendChild(goalCell);
        }
    }
}

// リセットボタンの動作
resetButton.addEventListener('click', initBoard);

// 初期化を実行
initBoard();
