//3*3 이차원 배열 생성
const array = [];
for (let i = 0; i < 3; i++) {
    array.push([undefined, undefined, undefined]);
}
//테이블 생성
const $table = document.createElement("table");
let n = 0;
for (let i = 0; i < 3; i++) {
    const $tr = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
        const $td = document.createElement("td");
        $tr.append($td);
        $td.classList.add(n);
        n++;
    }
    $table.append($tr);
}

document.querySelector("body").append($table);
//턴 설정
let turn = 1;
const check = () => {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (array[i][j]) {
                sum += array[i][j];
            }
        }
        if (sum == 3) {
            alert("O플레이어 승리!");
        }
        if (sum == -3) {
            alert("X플레이어 승리!");
        }
        console.log(sum);
        sum = 0;
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (array[j][i]) {
                sum += array[j][i];
            }
        }
        if (sum == 3) {
            alert("O플레이어 승리!");
        }
        if (sum == -3) {
            alert("X플레이어 승리!");
        }
        console.log(sum);
        sum = 0;
    }
};
const rotate = (e) => {
    if (!e.target.textContent) {
        if (turn == 1) {
            e.target.textContent = "0";
            array[parseInt(e.target.className / 3)][
                parseInt(e.target.className % 3)
            ] = 1;
            turn = -1;
        } else if (turn == -1) {
            e.target.textContent = "X";
            array[parseInt(e.target.className / 3)][
                parseInt(e.target.className % 3)
            ] = -1;
            turn = 1;
        }
    }
    check();
};
$tdL = document.querySelectorAll("td");
$tdL.forEach((elements) => {
    elements.addEventListener("click", (event) => {
        rotate(event);
    });
});
