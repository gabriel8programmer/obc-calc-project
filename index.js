
const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.querySelector("#input");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");
const result = document.querySelector("#result");
const themeSwitcher = document.querySelector("#themeSwitcher");
const copyToClipboard = document.querySelector("#copyToClipboard");

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%"];

function calculate() {
    result.value = "ERROR!";
    result.classList.add("error");
    
    const value = eval(input.value);
    result.value = value;
    result.classList.remove("error");

    //clear input
    input.value = "";
}

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener("click", function () {
        const value = charKeyBtn.dataset.value;
        input.value += value;
    });
});

clear.addEventListener("click", function () {
    input.value = "";
});

equal.addEventListener("click", calculate);

input.addEventListener("keydown", function (e) {
    e.preventDefault();
    const caracters = ["(", ")", "/", "*", "-", "+", "%"];
    if (caracters.includes(e.key)) {
        input.value += " " + e.key + " ";
    }
    else if (allowedKeys.includes(e.key)) {
        input.value += e.key;
        return;
    }
    else if (e.key === "Backspace") {
        input.value = input.value.slice(0, -1);
    }
    else if (e.key === "Enter") {
        calculate();
    }
});

copyToClipboard.addEventListener("click", function () {
    if (copyToClipboard.classList.contains("success")) {
        copyToClipboard.classList.remove("success");
    } else {
        navigator.clipboard.writeText(result.value);
        copyToClipboard.classList.add("success");
    }
});

themeSwitcher.addEventListener("click", function(){
    if (main.dataset.theme === "dark"){
        root.style.setProperty("--bg-color", "#f1f5f9");
        root.style.setProperty("--border-color", "#aaa");
        root.style.setProperty("--font-color", "#212529");
        root.style.setProperty("--primary-color", "#1f974d");
        main.dataset.theme = "light";
        return;
    }

    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
});