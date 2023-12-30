const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");
let date1;
let date2;
const record = [];
let Timer;
let toggle = 1;
let count = 5;
const onTimer = (e) => {
    const state = e.target;

    if (state.classList.contains("waiting")) {
        state.classList.replace("waiting", "ready");
        state.textContent = "초록색으로 변하면 클릭!";
        Timer = setTimeout(() => {
            state.className = "now";
            date1 = new Date();
        }, (Math.random() + 1) * 1000);
    } else if (state.classList.contains("ready")) {
        //contains 사용
        $screen.removeEventListener("click", onTimer);
        clearTimeout(Timer);
        state.className = "waiting"; //classlist 사용
        state.textContent = "너무 빨랐습니다.";
        setTimeout(() => {
            $screen.addEventListener("click", onTimer);
            e.target.textContent = "클릭해서 시작하십시오.";
        }, 3000);
    } else if (state.classList.contains("now")) {
        count--;
        date2 = new Date();
        state.className = "waiting";
        const diff = date2.getTime() - date1.getTime();
        const child = document.createElement("div");
        child.textContent = diff / 1000 + "s";
        $result.appendChild(child);
        record.push(diff);
        state.textContent = `${count}번 더!`;
    }
    if (count <= 0) {
        $screen.removeEventListener("click", onTimer);
        const sum = record.reduce((a, b) => a + b) / record.length / 1000;
        state.textContent = `평균 ${sum.toFixed(3)}초!`;
        const child = document.createElement("div");
        child.textContent = `가장빠른 시간: ${record.sort()[0] / 1000}초`;
        $result.appendChild(child);
        count = 5;
        $screen.addEventListener("click", onTimer);
    }
};
$screen.addEventListener("click", onTimer);
