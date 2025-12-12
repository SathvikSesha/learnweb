let exp = document.querySelector("#calculation");
let submit = document.querySelector("#submit");
let res = document.querySelector("#result");
let isCalculating = true;
submit.addEventListener('click', () => {
    if (isCalculating) {
        let expression = exp.value.trim();
        if (expression === "") {
            res.innerText = "Please enter a valid expression!";
            return;
        }
        try {
            let result = eval(expression);
            res.innerText = `Result: ${result}`;
            submit.innerText = "Clear";
            isCalculating = false;
        } catch (error) {
            res.innerText = "Invalid Expression!";
        }
    } 
    else {
        res.innerText = "Hi, welcome to the calculator";
        exp.value = "";
        submit.innerText = "Calculate";
        isCalculating = true;
    }
});