const oneClickNumber = (number) => {
    return ()=> {
        if(operator){
            numTwo += number;
        }else{
            numOne += number;
        }
        $result.value += number;
    }
}
document.querySelector("#num-0").addEventListener('click',oneClickNumber('0'));
document.querySelector("#num-1").addEventListener('click',oneClickNumber('1'));
document.querySelector("#num-2").addEventListener('click',oneClickNumber('2'));
document.querySelector("#num-3").addEventListener('click',oneClickNumber('3'));
document.querySelector("#num-4").addEventListener('click',oneClickNumber('4'));
document.querySelector("#num-5").addEventListener('click',oneClickNumber('5'));
document.querySelector("#num-6").addEventListener('click',oneClickNumber('6'));
document.querySelector("#num-7").addEventListener('click',oneClickNumber('7'));
document.querySelector("#num-8").addEventListener('click',oneClickNumber('8'));
document.querySelector("#num-9").addEventListener('click',oneClickNumber('9'));