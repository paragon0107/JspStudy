const { body } = document; //구조분해 할당

const obj = {
    a: "hello",
    b: {
        c: "hi",
        d: { e: "wow" },
    },
};
const {
    a,
    b: {
        c,
        d: { e },
    },
} = obj;
const $result = document.createElement("div");
//3*3 이차원 배열 생성
const rows = [];
//테이블 생성
const checkWinner = (target) => {
    let rowIndex;
    let cellIndex;

    rows.forEach((row, rI) => {
        row.forEach((cell, cI) => {
            if (cell === target) {
                rowIndex = rI;
                cellIndex = cI;
            }
        });
    });

    //let rowIndex = target.parentNode.rowIndex;
    //let cellIndex = target.cellIndex;
    //tr과 td에는 각각 rowIndex 와 cellIndex기능이 있다.

    if (
        rows[rowIndex][0].textContent === turn &&
        rows[rowIndex][1].textContent === turn &&
        rows[rowIndex][2].textContent === turn
    )
        return true;
    console.log(cellIndex);
    if (
        rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn
    )
        return true;
    if (
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
    )
        return true;
    if (
        rows[0][2].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn
    )
        return true;

    return false;
};
const checkWinnerDraw = (e) => {
    if (checkWinner(e)) {
        $result.textContent = `${turn}승리!`;
        $table.removeEventListener("click", callback);
    }
    //무승부 검사

    //const draw = rows.flat().every((td)=>td.textContent); -> 한번에 가능
    let draw;
    rows.forEach((row) => {
        row.forEach((cell) => {
            if (!cell.textContent) {
                draw = false;
            }
        });
    });
    if (draw) {
        $result.textContent = "무승부";
    }
    turn = turn === "O" ? "X" : "O";
};
const callback = (e) => {
    if (e.target.textContent) return;
    e.target.textContent = turn;
    //승자 검사
    checkWinnerDraw(e.target);

    const floatArr = rows.flat().filter((v) => !v.textContent);
    const randomCell = floatArr[Math.floor(Math.random() * floatArr.length)];
    if (randomCell) {
        randomCell.textContent = "X";
        checkWinnerDraw(randomCell);
    }
};

const $table = document.createElement("table");

let turn = "O";
for (let i = 0; i < 3; i++) {
    const $tr = document.createElement("tr");
    const cells = [];
    for (let j = 0; j < 3; j++) {
        const $td = document.createElement("td");
        cells.push($td);
        $tr.append($td);
    }
    rows.push(cells);
    $table.append($tr);
}
$table.addEventListener("click", callback);
document.querySelector("body").append($table);
document.querySelector("body").append($result);
