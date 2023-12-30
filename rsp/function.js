const $computer = document.querySelector("#computer");
const $scissors = document.querySelector("#scissors");
const $rock = document.querySelector("#rock");
const $paper = document.querySelector("#paper");
const $btn = document.querySelector(".btn");
const $score = document.querySelector("#score");
const URL_IMG = "./rsp.png";
$computer.style.background = `url(${URL_IMG}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

const rspX = {
    scissors: "0px",
    rock: "-220px",
    paper: "-440px",
};
const scoreTable = {
    scissors: 1,
    rock: 2,
    paper: 3,
};

let computerChoice = "scissors";
const changeComputerHand = () => {
    if (computerChoice == "scissors") {
        computerChoice = "rock";
    } else if (computerChoice == "rock") {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }
    $computer.style.background = `url(${URL_IMG}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = "auto 200px";
};

let interVald = setInterval(changeComputerHand, 50);
let toggle = true;
let win = 0;
let lose = 0;
let message;

const clickButton = (e) => {
    if (toggle) {
        clearInterval(interVald);
        toggle = false;
        const a = scoreTable[computerChoice];
        const b = scoreTable[e.target.id];
        const diff = a - b;

        if (diff == -1 || diff == 2) {
            win += 1;
            message = "승리";
        } else if (diff == 1 || diff == -2) {
            lose += 1;
            message = "패배";
        } else {
            message = "무승부";
        }
        if (win >= 3) {
            $score.textContent = "게임에서 승리했습니다.";
        } else if (lose >= 3) {
            $score.textContent = "게임에서 패배했습니다.";
        } else {
            $score.textContent = `${message} 총 ${win}승 ${lose}패`;
            setTimeout(() => {
                interVald = setInterval(changeComputerHand, 50);
                toggle = true;
            }, 1000);
        }
    }
};

$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
