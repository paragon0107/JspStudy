const $num0 = document.querySelector("#num-0");
const $num1 = document.querySelector("#num-1");
const $num2 = document.querySelector("#num-2");
const $num3 = document.querySelector("#num-3");
const $num4 = document.querySelector("#num-4");
const $num5 = document.querySelector("#num-5");
const $num6 = document.querySelector("#num-6");
const $num7 = document.querySelector("#num-7");
const $num8 = document.querySelector("#num-8");
const $num9 = document.querySelector("#num-9");
const $reset = document.querySelector("#reset");

const $result = document.querySelector("#result");

let n1 = "";
let n2 = "";
let ope;

const sendNum = (e) => {
    if (!ope) {
        n1 += e.target.textContent;
    } else {
        if (!n2) {
            $result.value = "";
        }
        n2 += e.target.textContent;
    }
    $result.value += e.target.innerText;
};

$num0.addEventListener("click", sendNum);
$num1.addEventListener("click", sendNum);
$num2.addEventListener("click", sendNum);
$num3.addEventListener("click", sendNum);
$num4.addEventListener("click", sendNum);
$num5.addEventListener("click", sendNum);
$num6.addEventListener("click", sendNum);
$num7.addEventListener("click", sendNum);
$num8.addEventListener("click", sendNum);
$num9.addEventListener("click", sendNum);

$reset.addEventListener("click", () => {
    $result.value = "";
    if (n2) {
        n2 = "";
    } else {
        n1 = "";
    }
});

const $plus = document.querySelector("#plus");
const $minus = document.querySelector("#minus");
const $divide = document.querySelector("#divide");
const $multiply = document.querySelector("#multiply");
const $operator = document.querySelector("#operator");
const $calculate = document.querySelector("#calculate");

const cal = (e) => {
    if (!n2 && n1) {
        n1 = Number(n1);
        ope = e.target.textContent;
        $operator.value = ope;
    } else if (n2 && n1) {
        n2 = Number(n2);
        if (ope == "+") {
            $result.value = n1 + n2;
            n1 = n1 + n2;
            n2 = "";
        } else if (ope == "-") {
            $result.value = n1 - n2;
            n1 = n1 - n2;
            n2 = "";
        } else if (ope == "/") {
            $result.value = n1 / n2;
            n1 = n1 / n2;
            n2 = "";
        } else if (ope == "x") {
            $result.value = n1 * n2;
            n1 = n1 * n2;
            n2 = "";
        }

        ope = e.target.textContent;
        $operator.value = ope;
    }
};

$plus.addEventListener("click", cal);
$minus.addEventListener("click", cal);
$divide.addEventListener("click", cal);
$multiply.addEventListener("click", cal);

$calculate.addEventListener("click", () => {
    n2 = Number(n2);
    $operator.value = "";
    if (ope === "+") {
        $result.value = n1 + n2;
        n1 = n1 + n2;
        n2 = "";
    } else if (ope == "-") {
        $result.value = n1 - n2;
        n1 = n1 - n2;
        n2 = "";
    } else if (ope == "/") {
        $result.value = n1 / n2;
        n1 = n1 / n2;
        n2 = "";
    } else if (ope == "x") {
        $result.value = n1 * n2;
        n1 = n1 * n2;
        n2 = "";
    }
    $operator.textContent = "";
});
