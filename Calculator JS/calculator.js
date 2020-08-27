function init(){
    let result = document.getElementById("result");
    let seven = document.getElementById("seven");
    let eight = document.getElementById("eight");
    let nine = document.getElementById("nine");
    let division = document.getElementById("division");
    let four = document.getElementById("four");
    let five = document.getElementById("five");
    let six = document.getElementById("six");
    let multiplication = document.getElementById("multiplication");
    let one = document.getElementById("one");
    let two = document.getElementById("two");
    let three = document.getElementById("three");
    let subtraction = document.getElementById("subtraction");
    let clear = document.getElementById("clear");
    let zero = document.getElementById("zero");
    let equal = document.getElementById("equal");
    let sum = document.getElementById("sum");

    //Events
    zero.onclick = function(e){
        result.textContent = result.textContent + "0";
    }
    one.onclick = function(e){
        result.textContent = result.textContent + "1";
    }
    two.onclick = function(e){
        result.textContent = result.textContent + "2";
    }
    three.onclick = function(e){
        result.textContent = result.textContent + "3";
    }
    four.onclick = function(e){
        result.textContent = result.textContent + "4";
    }
    five.onclick = function(e){
        result.textContent = result.textContent + "5";
    }
    six.onclick = function(e){
        result.textContent = result.textContent + "6";
    }
    seven.onclick = function(e){
        result.textContent = result.textContent + "7";
    }
    eight.onclick = function(e){
        result.textContent = result.textContent + "8";
    }
    nine.onclick = function(e){
        result.textContent = result.textContent + "9";
    }
    division.onclick = function(e){
        result.textContent = result.textContent + "/";
    }
    multiplication.onclick = function(e){
        result.textContent = result.textContent + "*";
    }
    sum.onclick = function(e){
        result.textContent = result.textContent + "+";
    }
    subtraction.onclick = function(e){
        result.textContent = result.textContent + "-";
    }
    clear.onclick = function(e){
        result.textContent = "";
    }
    equal.onclick = function(e){
        result.textContent = eval(result.textContent);
    }
}

