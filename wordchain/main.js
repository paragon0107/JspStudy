const $iWord = document.querySelector("#iWord");
const $submit = document.querySelector(".submit");
const $word = document.querySelector("#word");
const $order = document.querySelector(".order span");
const $startB = document.querySelector(".startB");
const $numI = document.querySelector("#numI");
const $b1 = document.querySelector(".b1");
const $b2 = document.querySelector(".b2");
const $secondP = document.querySelectorAll(".secondP");
const $secondPb = document.querySelectorAll(".secondPb");
const $thirdP = document.querySelectorAll(".thirdP");
const $end = document.querySelector("#end");
let number;
//firstP
const startGame = () => {
    number = parseInt($numI.value);

    const $firstP = document.querySelectorAll(".firstP");
    $firstP.forEach((e) => {
        e.style.display = "none";
    });

    $secondP.forEach((e) => {
        e.style.display = "block";
    });

    $secondPb.forEach((e) => {
        e.style.display = "inline-block";
    });
    document.querySelector("#numT").textContent = number + "명";
};

//secondP
const reLoad = () => {
    location.reload();
};
const gameStart = () => {
    $secondP.forEach((e) => {
        e.style.display = "none";
    });
    $secondPb.forEach((e) => {
        e.style.display = "none";
    });
    $thirdP.forEach((e) => {
        e.style.display = "block";
    });
};

//thirdP
let word; //제시어
let newWord; //제시어를 이을 단어

const onInput = (e) => {
    newWord = e.target.value;
    console.log(newWord);
};
const onClickButton = () => {
    const order = parseInt($order.textContent);
    if (
        (!word || word[word.length - 1] === newWord[0]) &&
        newWord.length <= 3
    ) {
        word = newWord;
        $word.textContent = word;
        if (order === number) {
            $order.textContent = 1;
        } else {
            $order.textContent = order + 1;
        }
    } else {
        alert("단어가 잘못됐거나 세글자 이하가 아닙니다.");
    }
    $iWord.value = "";
    $iWord.focus();
};

$iWord.addEventListener("input", onInput);
$submit.addEventListener("click", onClickButton);
$startB.addEventListener("click", startGame);
$b1.addEventListener("click", gameStart);
$b2.addEventListener("click", reLoad);
$end.addEventListener("click", reLoad);
