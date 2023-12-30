const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const $firstP = document.querySelectorAll(".firstP");
const $secondP = document.querySelectorAll(".secondP");
const $input = document.querySelector("input");
const $button = document.querySelector("button");

const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
const shuffle = [];

while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    console.log(spliceArray);
    shuffle.push(value);
}
console.log(shuffle);
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];

const colorize = (number, $ball) => {
    if (number < 10) {
        $ball.style.backgroundColor = "red";
        $ball.style.color = "white";
    } else if (number < 20) {
        $ball.style.backgroundColor = "orange";
    } else if (number < 30) {
        $ball.style.backgroundColor = "yellow";
    } else if (number < 40) {
        $ball.style.backgroundColor = "blue";
        $ball.style.color = "white";
    } else {
        $ball.style.backgroundColor = "green";
        $ball.style.color = "white";
    }
};

const createBall = ($target, number) => {
    setTimeout(() => {
        const $ball = document.createElement("div");
        $ball.className = "ball";
        $ball.textContent = number;
        colorize(number, $ball);
        $target.appendChild($ball);
    }, (i + 1) * 1000);
};
let i;

$button.addEventListener("click", () => {
    const answer = $input.value.split(" ");
    $firstP.forEach((e) => {
        e.style.display = "none";
    });
    $secondP.forEach((e) => {
        e.style.display = "block";
    });

    for (i = 0; i < winBalls.length; i++) {
        createBall($result, winBalls[i]);
    }
    createBall($bonus, bonus);
    winBalls.push(bonus);
    let n = 0;
    for (let i = 0; i < winBalls.length + 1; i++) {
        if (winBalls.includes(parseInt(answer[i]))) {
            n += 1;
        }
    }
    setTimeout(() => {
        alert("맞은 개수는 " + n + "개!");
    }, (i + 1) * 1300);
});
