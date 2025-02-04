const btns = document.querySelectorAll(".btn");
const eq = document.querySelector("#eq");
const res = document.querySelector("#result");

eq.innerText = "";
btns.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
  });
});

function clear() {
  res.innerText = "";
  eq.innerText = "";
}

function calc() {
  const eqtn = eq.innerText.split(" ");
  const a = eqtn[0];
  const b = eqtn[2];
  const op = eqtn[1];
  return operate(a, b, op);
}

function replaceChar(origString, replaceChar, index) {
  const firstPart = origString.substr(0, index);
  const lastPart = origString.substr(index + 1);

  const newString = firstPart + replaceChar + lastPart;
  return newString;
}
function isOperand(op) {
  return ["+", "-", "*", "/"].includes(op);
}

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  let res = 0;
  switch (op) {
    case "+":
      res = add(a, b);
      break;
    case "-":
      res = sub(a, b);
      break;
    case "*":
      res = mult(a, b);
      break;
    case "/":
      if (b == 0) {
        res = "TO INFINITY AND BEYOND";
      } else {
        res = div(a, b);
      }
      break;
  }
  return res.toFixed(2);
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mult(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}
