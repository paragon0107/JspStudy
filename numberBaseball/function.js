const $start = document.querySelector("#start");
const $firstP = document.querySelectorAll(".firstP");
const $secondP = document.querySelectorAll(".secondP");
const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $life = document.querySelector("#life");

$start.addEventListener("click", () => {
    $firstP.forEach((e) => (e.style.display = "none"));
    $secondP.forEach((e) => (e.style.display = "inline-block"));
    document.querySelector(".submit").style.display = "block";
});

const numbers = [];
for (let i = 0; i < 10; i += 1) {
    numbers.push(i);
}
const answer = [];
for (let i = 0; i < 4; i += 1) {
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index]);
    numbers.splice(index, 1);
}

const tries = [];
const inputCheck = (value) => {
    if (value.length !== 4) {
        return alert("4글자를 입력하세요.");
    }
    if (new Set(value).size !== 4) {
        return alert("중복되지 않게 입력하세요.");
    }
    if (tries.includes(value)) {
        return alert("이미 시도한 값 입니다.");
    }
    return true;
};
const checkAnswer = (value) => {
    let ball = 0;
    let strike = 0;
    for (let i = 0; i < 4; i += 1) {
        if (value[i] == answer[i]) {
            ball += 1;
        } else {
            strike += 1;
        }
    }
    if (ball === 4) {
        alert("홈런!!!!");
        return true;
    } else if (strike === 4) {
        return alert("아웃.");
    } else {
        return alert(ball + "볼 " + strike + "스트라이크");
    }
};

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = $input.value;
    $input.value = "";
    $life.textContent -= 1;
    if (inputCheck(value)) {
        console.log(value);
        tries.push(value);
        if (checkAnswer(value)) {
            location.reload();
        } else if (tries.length >= 10) {
            alert("실패입니다. 답은 " + answer + "입니다.");
            location.reload();
        }
    }
});
