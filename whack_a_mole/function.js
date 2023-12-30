const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $game = document.querySelector("#game");
const $start = document.querySelector("#start");
const $$cells = document.querySelectorAll(".cell");

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let stop;
$start.addEventListener("click", () => {
    time = Math.random() * 3 + 1;
    if (started) return;
    // started = true;
    console.log("시작");
    stop = setInterval(() => {
        tock();
        console.log("!");
    }, 1000);
    tick();
});
function tick() {
    holes.forEach((hole, index) => {
        const $gopher = $$cells[index].querySelector(".gopher");
        holes[index] = setTimeout(() => {
            $gopher.classList.add("hidden");
            holes[index] = 0;
        }, 1000);
        $gopher.classList.remove("hidden");
    });
}
function tock() {
    const index = Math.floor(Math.random() * 9);
    const percent = Math.floor(Math.random() * 4);
    const $gopher = $$cells[index].querySelector(".gopher");
    const $bomb = $$cells[index].querySelector(".bomb");
    let target;

    if (percent <= 2) {
        target = $gopher;
    } else {
        target = $bomb;
    }

    if (!holes[index]) {
        holes[index] = setTimeout(() => {
            target.classList.add("hidden");
            holes[index] = 0;
            target.removeEventListener("click", gotcha);
        }, 1000);
        setTimeout(() => {
            target.classList.remove("dead");
        }, 2000);
        target.classList.remove("hidden");
        target.addEventListener("click", gotcha);
    }
}
function gotcha(e) {
    if (e.target.classList.contains("gopher")) {
        e.target.classList.add("dead");
        $score.textContent = parseInt($score.textContent) + 1 + "점";
    } else {
        e.target.classList.add("boom");
        clearInterval(stop);
        // clearTimeout(holes[index]);
        $timer.textContent = "게임종료.";
    }
}
