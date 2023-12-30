const $tbody = document.querySelector("#table tbody");
const $form = document.querySelector("#form");
const $result = document.querySelector("#result");
const $timer = document.querySelector("#timer");
let row;
let cell;
let mine;
let interval;
const CODE = {
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    MINE: -6,
    OPENED: 0,
};
let data;
let startTime;
let openCount;
let searched = [];
let normalCellFound;
function plantMine() {
    const inputData = Array(row * cell)
        .fill()
        .map((r, i) => i);

    const shuffled = [];
    for (let i = 0; i < mine; i++) {
        const chosen = inputData.splice(
            Math.floor(Math.random() * inputData.length),
            1
        )[0];
        shuffled.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let i = 0; i < shuffled.length; i++) {
        const rowIndex = Math.floor(shuffled[i] / cell);
        const cellIndex = shuffled[i] % cell;
        data[rowIndex][cellIndex] = CODE.MINE;
    }
    return data;
}
function onRightClick(event) {
    event.preventDefault();
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    if (data[rowIndex][cellIndex] === CODE.MINE) {
        data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
        target.className = "question";
        target.textContent = "?";
    } else if (data[rowIndex][cellIndex] === CODE.QUESTION_MINE) {
        data[rowIndex][cellIndex] = CODE.FLAG_MINE;
        target.className = "flag";
        target.textContent = "!";
    } else if (data[rowIndex][cellIndex] === CODE.FLAG_MINE) {
        data[rowIndex][cellIndex] = CODE.MINE;
        target.className = "";
        target.textContent = "";
    } else if (data[rowIndex][cellIndex] === CODE.NORMAL) {
        data[rowIndex][cellIndex] = CODE.QUESTION;
        target.className = "question";
        target.textContent = "?";
    } else if (data[rowIndex][cellIndex] === CODE.QUESTION) {
        data[rowIndex][cellIndex] = CODE.FLAG;
        target.className = "flag";
        target.textContent = "!";
    } else if (data[rowIndex][cellIndex] === CODE.FLAG) {
        data[rowIndex][cellIndex] = CODE.NORMAL;
        target.className = "";
        target.textContent = "";
    }
}
function countMine(rowIndex, cellIndex) {
    const mines = [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE];
    let i = 0;
    mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++; //옵셔널 체이닝
    mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
    mines.includes(data[rowIndex]?.[cellIndex - 1]) && i++;
    mines.includes(data[rowIndex]?.[cellIndex + 1]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
    return i;
}
function open(rI, cI) {
    if (data[rI]?.[cI] >= CODE.OPENED) return;
    const target = $tbody.children[rI]?.children[cI];
    if (!target) return;
    const count = countMine(rI, cI);
    target.textContent = count || "0";
    target.className = "opened";
    data[rI][cI] = count;
    openCount++;
    console.log(openCount);
    if (openCount === row * cell - mine) {
        const time = (new Date() - startTime) / 1000;
        clearInterval(interval);
        $tbody.removeEventListener("contextmenu", onRightClick);
        $tbody.removeEventListener("click", onLeftClick);
        setTimeout(() => {
            alert(`승리했습니다! ${time}초가 걸렸습니다!`);
        }, 100);
    }
    return count;
}
function openAround(rI, cI) {
    setTimeout(() => {
        //setTimeOut 함수는 재귀로 인한 호출스택 초과 방지
        const count = open(rI, cI);
        if (count === 0) {
            openAround(rI - 1, cI - 1);
            openAround(rI - 1, cI);
            openAround(rI - 1, cI + 1);
            openAround(rI, cI - 1);
            openAround(rI, cI + 1);
            openAround(rI + 1, cI - 1);
            openAround(rI + 1, cI);
            openAround(rI + 1, cI + 1);
        }
    }, 0);
}

function onLeftClick(event) {
    event.preventDefault();
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if (cellData === CODE.NORMAL) {
        openAround(rowIndex, cellIndex);
    } else if (cellData === CODE.MINE) {
        if (openCount) {
            //칸이 열린 갯수 ..
            clearInterval(interval);
            target.textContent = "펑!";
            target.className = "opened";
            $tbody.removeEventListener("contextmenu", onRightClick);
            $tbody.removeEventListener("click", onLeftClick);
        } else {
            //첫번째로 누른 칸이면서 그 칸이 지뢰일때
            searched = Array(row)
                .fill()
                .map(() => []);
            let normalCellFound = false;
            checkFirst(rowIndex, cellIndex);
            data[rowIndex][cellIndex] = CODE.NORMAL;
            openAround(rowIndex, cellIndex);
        }
    }
}
function checkFirst(rI, cI) {
    if (normalCellFound) return;
    if (searched[rI][cI]) return;
    if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return;
    searched[rI][cI] = true;

    if (data[rI]?.[cI] === CODE.NORMAL) {
        data[rI][cI] = CODE.MINE;
        normalCellFound = true;
        return;
    } else {
        setTimeout(() => {
            checkFirst(rI - 1, cI - 1);
            checkFirst(rI - 1, cI);
            checkFirst(rI - 1, cI + 1);
            checkFirst(rI, cI - 1);
            checkFirst(rI, cI + 1);
            checkFirst(rI + 1, cI - 1);
            checkFirst(rI + 1, cI);
            checkFirst(rI + 1, cI + 1);
        }, 0);
    }
}
function drawTable() {
    data = plantMine();
    data.forEach((row) => {
        const $tr = document.createElement("tr");
        row.forEach((cell) => {
            const $td = document.createElement("td");
            if (cell == CODE.MINE) {
                //$td.textContent = "X";
            }
            $tr.append($td);
        });
        $tbody.append($tr);
        $tbody.addEventListener("contextmenu", onRightClick);
        $tbody.addEventListener("click", onLeftClick);
    });
}
function onSubmit(event) {
    event.preventDefault();
    row = parseInt(event.target.row.value);
    cell = parseInt(event.target.cell.value);
    mine = parseInt(event.target.mine.value);
    $tbody.innerHTML = "";
    openCount = 0;
    drawTable();
    startTime = new Date();
    interval = setInterval(() => {
        const time = Math.floor((new Date() - startTime) / 1000);
        $timer.textContent = `${time}초`;
    }, 1000);
}
$form.addEventListener("submit", onSubmit);
